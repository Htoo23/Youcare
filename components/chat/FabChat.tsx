"use client";

import * as React from "react";

// Bilingual knowledge base. Each entry contains a title, keywords, and
// separate English and Chinese answer texts. Keywords help with matching
// user questions regardless of language.
const KB = [
  {
    t: "About YouCare",
    k: ["about", "youcare", "mission", "关于", "介绍"],
    x_en:
      "YouCare helps people improve their overall health through modern, patient‑first care. We offer consultations, diagnostics and personalized treatment plans.",
    x_zh:
      "YouCare 通过现代化、以患者为中心的医疗服务帮助提升整体健康水平，提供咨询、诊断与个性化治疗方案。",
  },
  {
    t: "Services",
    k: ["services", "service", "clinic", "门诊", "服务"],
    x_en:
      "Core services include general consultation, diagnostics, preventive care, chronic condition management and personalized wellness programs.",
    x_zh:
      "核心服务包括：常规问诊、诊断检查、预防保健、慢病管理和个性化健康计划。",
  },
  {
    t: "Process",
    k: ["process", "steps", "how", "流程", "步骤"],
    x_en:
      "Our process: 1) book an appointment online 2) meet your doctor 3) diagnosis & plan 4) follow‑up and ongoing support.",
    x_zh:
      "流程：1) 在线预约；2) 面诊；3) 诊断与方案；4) 随访与持续支持。",
  },
  {
    t: "Booking",
    k: ["book", "booking", "appointment", "schedule", "预约", "挂号"],
    x_en:
      "Go to /book to schedule an appointment. Provide your name, contact, doctor, date and time then submit. Your booking will appear on the bookings page.",
    x_zh:
      "请前往 /book 页面预约，填写姓名、联系方式、医生、日期和时间并提交，预约会显示在预约列表页面。",
  },
  {
    t: "Bookings Management",
    k: ["bookings", "manage", "confirm", "cancel", "预约管理", "确认", "取消"],
    x_en:
      "On the bookings page you can search and manage appointments. Staff can confirm or cancel a booking.",
    x_zh:
      "在预约页面您可以搜索和管理预约，工作人员可确认或取消预约。",
  },
  {
    t: "Patient Records",
    k: ["records", "patients", "allergies", "conditions", "档案", "过敏", "病史"],
    x_en:
      "The records page lists basic patient information such as allergies, conditions and contact details collected during booking.",
    x_zh:
      "健康档案页面列出在预约时收集的患者基本信息，如过敏史、病史和联系方式。",
  },
  {
    t: "Clinic Stats",
    k: ["stats", "experience", "doctors", "patients", "统计"],
    x_en:
      "Highlights: 13+ years of experience, 85+ professional doctors, over 3 million happy patients and many successful treatments.",
    x_zh:
      "亮点：13+ 年经验、85+ 位专业医生、超过 300 万满意患者以及众多成功治疗案例。",
  },
];

// Convert a string into lowercase tokens, keeping alphanumeric and
// CJK characters. Splits by whitespace.
function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

// Detect the language of the question. If it contains more ASCII letters
// than CJK characters, treat it as English; otherwise as Chinese.
function detectLang(s: string): "en" | "zh" {
  const letters = (s.match(/[a-z]/gi) || []).length;
  const cjk = (s.match(/[\u4e00-\u9fa5]/g) || []).length;
  return letters >= cjk ? "en" : "zh";
}

// Simple scoring: counts how many tokens from the question appear in the
// knowledge entry's title, keywords and answer text. Higher is better.
function score(q: string, entry: typeof KB[number]): number {
  const qTokens = tokenize(q);
  // Combine title, keywords and both language answers into one string
  const combined = (entry.t + " " + entry.k.join(" ") + " " + entry.x_en + " " + entry.x_zh).toLowerCase();
  let s = 0;
  for (const t of qTokens) {
    if (combined.includes(t)) s += 1;
  }
  return s;
}

// Find the best matching knowledge entry for a question and return the
// appropriate language response. If no match is found, fallback to the
// visible page text for some sections. If still nothing, return a generic
// message.
function answer(question: string, lang: "en" | "zh"): string {
  const ranked = KB.map((entry) => ({ entry, s: score(question, entry) }))
    .sort((a, b) => b.s - a.s);
  const top = ranked[0];
  // If no match or score zero, fallback to DOM search
  if (!top || top.s === 0) {
    // Try to extract some text from service/process/faq sections
    const ids = ["services", "process", "faq"];
    for (const id of ids) {
      const el = document.getElementById(id);
      const txt = el?.textContent?.trim() || "";
      if (txt) {
        return lang === "en"
          ? `I couldn’t find an exact match in my notes. Here’s what I found on the page:\n\n${txt.slice(0, 600)}`
          : `我没在知识库里找到完全匹配，页面上相关信息：\n\n${txt.slice(0, 600)}`;
      }
    }
    return lang === "en"
      ? "Sorry, I couldn’t find that. Try asking about services, process, booking, bookings or records."
      : "抱歉，我没有找到相关内容。可尝试询问：服务、流程、预约、预约管理或健康档案。";
  }
  const { entry } = top;
  return lang === "en" ? entry.x_en : entry.x_zh;
}

// Message type used in chat state
type Msg = { role: "user" | "assistant"; content: string };

/**
 * Floating chat widget with bilingual support. It appears as a FAB (💬) at
 * the bottom right of the screen. Clicking it opens a panel where users
 * can ask questions about the site in English or Chinese. The component
 * auto‑detects language per question and responds accordingly. Users can
 * also switch languages manually via a toggle in the header.
 */
export function FabChat() {
  const [open, setOpen] = React.useState(false);
  const [lang, setLang] = React.useState<"en" | "zh">("zh");
  const [text, setText] = React.useState("");
  const [msgs, setMsgs] = React.useState<Msg[]>([{
    role: "assistant",
    content:
      "你好！可以问我关于本站内容：服务、流程、预约、预约管理、健康档案～ / Hi! Ask me about services, process, booking, bookings or records.",
  }]);
  const boxRef = React.useRef<HTMLDivElement | null>(null);

  function send() {
    const q = text.trim();
    if (!q) return;
    // Detect language for this question but use user‑selected lang if toggled
    const detected = detectLang(q);
    const activeLang: "en" | "zh" = lang || detected;
    setMsgs((m) => [...m, { role: "user", content: q }]);
    const reply = answer(q, activeLang);
    setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    setText("");
    setTimeout(() => {
      boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
    }, 0);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }

  // Labels for UI depending on active language
  const labels = lang === "en"
    ? {
        title: "YouCare Assistant",
        placeholder: "Ask about services, process, booking…",
        send: "Send",
        toggle: "EN/中文",
      }
    : {
        title: "YouCare 聊天助手",
        placeholder: "提问：服务、流程、预约…",
        send: "发送",
        toggle: "中文/EN",
      };

  return (
    <>
      {/* Floating action button */}
      <button
        type="button"
        aria-label={lang === "en" ? "Open chat" : "打开聊天"}
        onClick={() => setOpen(true)}
        style={{ position: "fixed", right: 20, bottom: 20, zIndex: 50 }}
        className="rounded-full bg-blue-600 text-white p-4 shadow-lg hover:opacity-90"
      >
        💬
      </button>

      {/* Chat panel */}
      <div
        style={{ position: "fixed", right: 20, bottom: 100, zIndex: 50, width: "min(92vw, 360px)" }}
        className={`rounded-2xl border bg-white shadow-2xl transition-all ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-semibold">{labels.title}</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang((l) => (l === "en" ? "zh" : "en"))}
              className="text-xs px-2 py-1 rounded border hover:bg-gray-50"
            >
              {labels.toggle}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 hover:opacity-80"
              aria-label={lang === "en" ? "Close" : "关闭"}
            >
              ✕
            </button>
          </div>
        </div>

        <div
          ref={boxRef}
          className="px-4 py-3 space-y-3 max-h-80 overflow-y-auto"
        >
          {msgs.map((m, i) => (
            <div key={i} className={`${m.role === "user" ? "text-right" : "text-left"} text-sm whitespace-pre-wrap`}>
              <span
                className={`inline-block rounded-xl px-3 py-2 ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
              >
                {m.content}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 p-3 border-t">
          <input
            type="text"
            placeholder={labels.placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 border rounded-md px-3 py-2"
          />
          <button
            type="button"
            onClick={send}
            className="px-3 py-2 rounded-md bg-blue-600 text-white"
          >
            {labels.send}
          </button>
        </div>
      </div>
    </>
  );
}