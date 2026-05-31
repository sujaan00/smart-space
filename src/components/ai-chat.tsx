"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUp, Bot, Languages, LoaderCircle, MapPin, MessageCircle, Sparkles, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  sources?: string[];
};

const starterMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi, I’m your SmartSpace guide. I can compare neighborhoods, explain market movement, or help narrow down homes around your commute. What are you looking for?",
  },
];

const prompts = [
  "Quiet areas within 25 min of MG Road",
  "Compare Indiranagar and Whitefield",
  "मेट्रो के पास 3 BHK दिखाइए",
];

export function AiChat() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const nextMessageId = useRef(2);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { id: nextMessageId.current++, role: "user", text: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: trimmed, locale: /[\u0900-\u097F]/.test(trimmed) ? "hi" : "en" }),
      });
      const payload = await response.json();
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId.current++,
          role: "assistant",
          text: payload.data?.message ?? payload.error?.message ?? "I couldn’t answer that safely. Try adding a locality or commute goal.",
          sources: payload.data?.sources,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { id: nextMessageId.current++, role: "assistant", text: "I’m having trouble reaching the service. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
      <section className="flex min-h-[650px] flex-col overflow-hidden rounded-[26px] border border-[var(--line)] bg-white/60 shadow-sm dark:bg-white/5">
        <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e3efe9] text-[#4b806e] dark:bg-[#244139] dark:text-[#b5daca]">
              <Bot size={18} />
            </span>
            <div>
              <p className="text-xs font-bold">SmartSpace AI</p>
              <p className="mt-0.5 text-[10px] text-[var(--muted)]">Data-grounded property guidance</p>
            </div>
          </div>
          <Badge className="bg-[#edf7f1] text-[#4a806c] dark:bg-[#244139] dark:text-[#b3d9ca]"><span className="h-1.5 w-1.5 rounded-full bg-[#62a88b]" /> Available</Badge>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}>
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", message.role === "assistant" ? "bg-[#e3efe9] text-[#4b806e] dark:bg-[#244139]" : "bg-[#f5e7d6] text-[#9b683d] dark:bg-[#3a2e20]")}>
                {message.role === "assistant" ? <Sparkles size={14} /> : <UserRound size={14} />}
              </span>
              <div className={cn("max-w-[80%] rounded-[18px] p-3.5 text-xs leading-6", message.role === "assistant" ? "rounded-tl-sm bg-[#edf3ee] dark:bg-white/5" : "rounded-tr-sm bg-[#244f44] text-white dark:bg-[#2c5a4e]")}>
                <p>{message.text}</p>
                {message.sources && (
                  <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[var(--line)] pt-3">
                    {message.sources.map((source) => <Badge key={source} className="text-[9px]">{source}</Badge>)}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3 text-[11px] text-[var(--muted)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e3efe9] text-[#4b806e] dark:bg-[#244139]">
                <LoaderCircle size={14} className="animate-spin" />
              </span>
              Checking the available market data...
            </div>
          )}
        </div>

        <div className="border-t border-[var(--line)] p-4">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {prompts.map((prompt) => (
              <button key={prompt} onClick={() => void sendMessage(prompt)} className="shrink-0 rounded-full border border-[var(--line)] bg-white/65 px-3 py-2 text-[10px] font-semibold text-[var(--muted)] dark:bg-white/5">
                {prompt}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-[18px] border border-[var(--line)] bg-white/75 p-2 pl-4 dark:bg-white/5">
            <MessageCircle size={16} className="shrink-0 text-[var(--accent)]" />
            <label className="sr-only" htmlFor="smartspace-chat">Ask SmartSpace</label>
            <input id="smartspace-chat" value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 bg-transparent text-xs focus:outline-none" placeholder="Ask about a locality, commute, or property..." />
            <Button variant="accent" className="h-9 w-9 p-0" aria-label="Send message"><ArrowUp size={15} /></Button>
          </form>
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-[22px] border border-[var(--line)] bg-white/60 p-5 dark:bg-white/5">
          <Languages size={17} className="text-[var(--accent)]" />
          <h2 className="mt-4 text-xs font-bold">English + Hindi</h2>
          <p className="mt-2 text-[11px] leading-5 text-[var(--muted)]">Ask naturally in either language. SmartSpace keeps answers simple and grounded in the available property data.</p>
        </div>
        <div className="rounded-[22px] border border-[var(--line)] bg-white/60 p-5 dark:bg-white/5">
          <MapPin size={17} className="text-[var(--forest)]" />
          <h2 className="mt-4 text-xs font-bold">Context it can use</h2>
          <ul className="mt-3 space-y-2 text-[11px] text-[var(--muted)]">
            {["Neighborhood market signals", "Verified listing details", "Your commute preferences", "Your saved shortlist"].map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </div>
        <div className="rounded-[22px] bg-[#f5eee3] p-5 dark:bg-[#30291f]">
          <Sparkles size={17} className="text-[#a87342]" />
          <h2 className="mt-4 text-xs font-bold text-[#765431] dark:text-[#e3bd88]">AI transparency</h2>
          <p className="mt-2 text-[11px] leading-5 text-[var(--muted)]">When a fact is not available, the assistant says so instead of filling the gap with a guess.</p>
        </div>
      </aside>
    </div>
  );
}
