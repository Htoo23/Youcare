// components/chat/FabChat.tsx
"use client";

import * as React from "react";

// ------- Bilingual Knowledge Base -------
// t = title, k = keywords, x_en/x_zh = answer text
const KB = [
  { t: "About YouCare", k: ["about","youcare","mission"], x_en: "YouCare helps people improve overall health through modern, patient-first care. We offer consultations, diagnostics, and tailored treatment plans.", x_zh: "YouCare 通过现代化、以患者为中心的医疗服务，帮助提升整体健康。提供：咨询、诊断与个性化治疗方案。" },
  { t: "Services", k: ["services","care","clinic","门诊","服务"], x_en: "Core services: general consultation, diagnostics, preventive care, chronic condition management, personalized wellness programs.", x_zh: "核心服务：常规问诊、诊断检查、预防保健、慢病管理与个性化健康计划。" },
  { t: "Process", k: ["process","steps","how","流程","步骤"], x_en: "Process: 1) Book an appointment 2) Meet your doctor 3) Diagnosis & plan 4) Follow-up and ongoing support.", x_zh: "流程：1) 在线预约 2) 面诊 3) 诊断与方案 4) 随访与持续支持。" },
  { t: "Booking", k: ["book","appointment","schedule","预约","挂号"], x_en: "Go to /book to schedule. Fill name, contact, doctor, date & time, then submit. It will appear under /bookings.", x_zh: "前往 /book 填写姓名、联系方式、医生、日期与时间并提交。预约创建后可在 /bookings 查看。" },
  { t: "Bookings management", k: ["bookings","confirm","cancel","status","预约管理","确认","取消"], x_en: "On /bookings you can search and manage appointments. Staff can confirm or cancel a booking.", x_zh: "在 /bookings 可搜索与管理预约，工作人员可以确认或取消。" },
  { t: "Patient Records", k: ["records","patients","allergies","档案","过敏","病史"], x_en: "The /records page lists basic patient info such as allergies, conditions, and contacts collected during booking.", x_zh: "/records 显示患者基本信息（过敏、病史与联系方式等）。" },
  { t: "Clinic Stats", k: ["stats","experience","doctors","patients","统计"], x_en: "Highlights: 13+ years experience, 85+ professional doctors, over 3M happy patients, and many successful treatments.", x_zh: "亮点：13+ 年经验、85+ 位专业医生、300万+ 满意患者以及众多成功治疗案例。" },
];

// ------- Helpers -------
function tokenize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5\s]/g, " ").split(/\s+/).filter(Boolean);
}

function detectLang(s: string): "en" | "zh" {
  // crude: if it contains a lot of ASCII letters and few CJK, prefer EN
  const letters = (s.match(/[a-z]/gi) || []).length;
  const cjk = (s.match(/[\u4e00-\u9fa5]/g) || []).length;
  if (letters >= cjk) return "en";
  return "zh";
}

function score(q: string, doc: (typeof KB)[number]) {
  const qTokens = tokenize(q);
  const text = (doc.t + " " + doc.k.join(" ") + " " + doc.x_en + " " + doc.x_zh).toLowerCase();
  let s = 0;
  for (const t of qTokens) if (text.includes(t)) s += 1;
  return s;
}

function answer(question: string, lang: "en" | "zh"): string {
  const ranked = KB.map(d => ({ d, s: score(question, d) })).sort((a, b) => b.s - a.s);
  const top = ranked[0];
  if (!top || top.s === 0) {
    // lightweight DOM fallback
    const ids = ["services", "process", "faq"];
    for (const id of ids) {
      const el = document.getElementById(id);
      const txt = el?.textContent?.trim() || "";
      if (txt) {
        return lang === "en"
          ? "I couldn’t find an exact match in my notes. Here’s what I found on the page:\n\n" + txt.slice(0, 600)
          : "我没在知识库里找到完全匹配，页面上相关信息：\n\n" + txt.slice(0, 600);
      }
    }
    return lang === "en"
      ? "Sorry, I couldn’t find that. Try asking about: services, process, booking, bookings, or records."
      : "抱歉，我没有找到相关内容。可尝试询问：服务、流程、预约、预约管理或健康档案。";
  }
  const d = top.d;
  return lang === "en" ? `**${d.t}**\n${d.x_en}` : `**${d.t}**\n${d.x_zh}`;
}

// ------- Chat UI -------
type Msg = { role: "user" | "assistant"; content: string };

export function FabChat() {
  const [open, setOpen] = React.useState(false);
  const [lang, setLang] = React.useState<"en" | "zh">("zh");
  const [text, setText] = React.useState("");
  const [msgs, setMsgs] = React.useState<Msg[]>([
    { role: "assistant", content: "你好！可以问我关于本站内容：服务、流程、预约、预约管理、健康档案～ / Hi! Ask me about services, process, booking, bookings, or records." },
  ]);
  const boxRef = React.useRef<HTMLDivElement | null>(null);

  function send() {
    const q = text.trim();
    if (!q) return;
    // auto-detect language for this message; keep global toggle as user override
    const detected = detectLang(q);
    const activeLang = lang ?? detected;

    setMsgs(m => [...m, { role: "user", content: q }]);
    const a = answer(q, activeLang);
    setMsgs(m => [...m, { role: "assistant", content: a }]);
    setText("");
    setTimeout(() => boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" }), 0);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { e.preventDefault(); send(); }
  }

  const label = lang === "en" ? {
    title: "YouCare Assistant",
    placeholder: "Try: How to book?",
    send: "Send",
    toggle: "EN/中文",
  } : {
    title: "YouCare 助手",
    placeholder: "试着问：如何预约？",
    send: "发送",
    toggle: "中文/EN",
  };

  return (
    <>
      {/* FAB */}
      <button
        aria-label="Chat"
        onClick={() => setOpen(true)}
        style={{ position: "fixed", right: 20, bottom: 20, zIndex: 50 }}
        className="rounded-full bg-blue-600 text-white p-4 shadow-lg hover:opacity-90"
      >
        💬
      </button>

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          right: 20,
          bottom: 100,
          zIndex: 50,
          width: "min(92vw, 360px)"
        }}
        className={`rounded-2xl border bg-white shadow-2xl transition-all ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-semibold">{label.title}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(l => (l === "en" ? "zh" : "en"))}
              className="text-xs px-2 py-1 rounded border hover:bg-gray-50"
              aria-label="toggle language"
              title="Toggle language"
            >
              {label.toggle}
            </button>
            <button onClick={() => setOpen(false)} className="p-1 hover:opacity-80" aria-label="close">✕</button>
          </div>
        </div>

        <div ref={boxRef} className="px-4 py-3 space-y-3 max-h-80 overflow-y-auto">
          {msgs.map((m, i) => (
            <div key={i} className={`${m.role === "user" ? "text-right" : "text-left"} text-sm whitespace-pre-wrap`}>
              <span className={`inline-block rounded-xl px-3 py-2 ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                {m.content}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 p-3 border-t">
          <input
            className="flex-1 border rounded-md px-3 py-2"
            placeholder={label.placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKey}
          />
          <button onClick={send} className="px-3 py-2 rounded-md bg-blue-600 text-white">{label.send}</button>
        </div>
      </div>
    </>
  );
}
