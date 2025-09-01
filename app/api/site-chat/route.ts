import { NextResponse } from 'next/server';
import { SITE_KB } from '@/lib/site-knowledge';

/**
 * Tokenizes a string into a list of lowercase words. Non‑alphanumeric
 * characters are removed. This very simple tokenizer is sufficient for
 * matching short user questions against the site knowledge base.
 */
function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s]/gi, ' ') // allow Chinese characters and whitespace
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Converts a list of tokens into a term frequency map.
 */
function tf(tokens: string[]): Map<string, number> {
  const map = new Map<string, number>();
  tokens.forEach((token) => {
    map.set(token, (map.get(token) ?? 0) + 1);
  });
  return map;
}

/**
 * Computes cosine similarity between two term frequency maps. This is used to
 * measure how similar a user question is to each knowledge base entry. A
 * higher value indicates more similarity.
 */
function cosine(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  const allKeys = new Set<string>([...a.keys(), ...b.keys()]);
  allKeys.forEach((key) => {
    const va = a.get(key) ?? 0;
    const vb = b.get(key) ?? 0;
    dot += va * vb;
    normA += va * va;
    normB += vb * vb;
  });
  return normA && normB ? dot / (Math.sqrt(normA) * Math.sqrt(normB)) : 0;
}

/**
 * POST handler for the chatbot. Accepts a JSON payload with a `question`
 * property. It ranks knowledge base entries using cosine similarity and
 * returns the best match. If no match exceeds a small threshold, it
 * responds with a fallback message. The response includes an `answer` and
 * `sources`, which list the matching knowledge base entries with scores.
 */
export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid question' }, { status: 400 });
    }
    const qTokens = tokenize(question);
    const qTf = tf(qTokens);
    const ranked = SITE_KB.map((kb) => {
      const combined = kb.title + ' ' + kb.content;
      const tokens = tokenize(combined);
      const kbTf = tf(tokens);
      const score = cosine(qTf, kbTf);
      return { kb, score };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const top = ranked[0];
    const fallback =
      '很抱歉，我只能回答与本站内容相关的问题，请尝试询问有关服务、流程、预约或健康档案等信息。';
    if (!top || top.score < 0.05) {
      return NextResponse.json({ answer: fallback, sources: [] });
    }
    const answer = `以下是来自 "${top.kb.title}" 的信息：${top.kb.content}`;
    return NextResponse.json({
      answer,
      sources: ranked.map((r) => ({ id: r.kb.id, title: r.kb.title, score: parseFloat(r.score.toFixed(3)) })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}