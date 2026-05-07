import { useState, useEffect, useRef, useCallback } from "react";
// import api from '@/lib/axios';
// ─── Constants ────────────────────────────────────────────────────────────────
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const INITIAL_MESSAGES = [
    {
        id: 1,
        role: "assistant",
        content:
            "Hello! I'm the LionsBank AI Agent. I'm here to help you with account inquiries, transactions, investment insights, and more. How can I assist you today?",
        timestamp: new Date().toISOString(),
    },
];







// ─── Utility ──────────────────────────────────────────────────────────────────

function formatTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconSend() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.5004 11.9998H5.00043M4.91577 12.2913L2.58085 19.2654C2.39742 19.8164 2.3057 20.0919 2.37152 20.2667C2.42868 20.4188 2.55144 20.5353 2.70558 20.5847C2.88287 20.6415 3.15289 20.5338 3.69294 20.3185L20.3044 13.6658C20.8308 13.4554 21.0939 13.3502 21.1722 13.1975C21.2397 13.065 21.2397 12.9099 21.1722 12.7774C21.0939 12.6247 20.8308 12.5195 20.3044 12.3091L3.68673 5.65054C3.14866 5.43618 2.87963 5.329 2.70247 5.38571C2.54843 5.43502 2.42573 5.55123 2.36821 5.70298C2.30219 5.87713 2.39248 6.15078 2.57306 6.69808L4.91642 13.7613C4.94759 13.8555 4.96317 13.9026 4.96933 13.9506C4.97479 13.9931 4.97473 14.036 4.96916 14.0785C4.96289 14.1265 4.94718 14.1735 4.91577 14.2675"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconBot() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2M5 14v8h14v-8M9 18h2v2H9v-2m4 0h2v2h-2v-2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconUser() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconStop() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
    );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
    return (
        <div className="flex items-start gap-3 px-4 py-2 max-w-3xl mx-auto w-full">
            {/* Avatar */}
            <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/25 flex items-center justify-center text-[#22C55E]">
                <IconBot />
            </div>

            {/* Bubble */}
            <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium text-white/30 tracking-wide ml-0.5">LionsBank AI</span>
                <div className="bg-[#1a1a1a] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-1.5">
                        <span
                            className="w-2 h-2 rounded-full bg-[#22C55E]/60 animate-bounce"
                            style={{ animationDelay: "0ms", animationDuration: "1s" }}
                        />
                        <span
                            className="w-2 h-2 rounded-full bg-[#22C55E]/60 animate-bounce"
                            style={{ animationDelay: "200ms", animationDuration: "1s" }}
                        />
                        <span
                            className="w-2 h-2 rounded-full bg-[#22C55E]/60 animate-bounce"
                            style={{ animationDelay: "400ms", animationDuration: "1s" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChatMessage({ message }) {
    const isUser = message.role === "user";

    if (isUser) {
        return (
            <div className="flex items-start justify-end gap-3 px-4 py-2 max-w-3xl mx-auto w-full">
                {/* Bubble */}
                <div className="flex flex-col items-end gap-1 max-w-[80%] sm:max-w-[70%]">
                    <span className="text-[11px] font-medium text-white/30 tracking-wide mr-0.5">You</span>
                    <div
                        className="bg-[#22C55E] text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed"
                        style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                    >
                        {message.content}
                    </div>
                    <span className="text-[10px] text-white/20 mr-0.5">{formatTime(message.timestamp)}</span>
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0 mt-6 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/50">
                    <IconUser />
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start gap-3 px-4 py-2 max-w-3xl mx-auto w-full">

            {/* Avatar */}
            <div className="flex-shrink-0 mt-6 w-8 h-8 rounded-full
        bg-[#22C55E]/10 dark:bg-[#22C55E]/15
        border border-[#22C55E]/20 dark:border-[#22C55E]/25
        flex items-center justify-center text-[#22C55E]">
                <IconBot />
            </div>

            {/* Bubble */}
            <div className="flex flex-col gap-1 max-w-[80%] sm:max-w-[70%]">

                {/* Label */}
                <span className="text-[11px] font-medium tracking-wide ml-0.5
            text-gray-500 dark:text-white/30">
                    LionsBank AI
                </span>

                {/* Message */}
                <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed
                bg-gray-100 dark:bg-[#1a1a1a]
                border border-gray-200 dark:border-white/[0.07]
                text-gray-900 dark:text-gray-200"
                    style={{
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                    }}
                >
                    {message.content}
                </div>

                {/* Time */}
                <span className="text-[10px] ml-0.5
            text-gray-400 dark:text-white/20">
                    {formatTime(message.timestamp)}
                </span>
            </div>
        </div>
    );
}


// ─── Main Component ───────────────────────────────────────────────────────────

export default function ChatbotUI() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const abortRef = useRef(false);

    // Auto-scroll on new message or typing indicator
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Reset textarea height helper
    const resetTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    // const sendMessage = useCallback(async (content) => {
    //     const text = content.trim();
    //     if (!text || isTyping) return;

    //     const userMsg = {
    //         id: Date.now(),
    //         role: "user",
    //         content: text,
    //         timestamp: new Date().toISOString(),
    //     };

    //     setMessages((prev) => [...prev, userMsg]);
    //     setInputValue("");
    //     resetTextarea();
    //     setIsTyping(true);

    //     try {
    //         // const response = await api.post("/ai-agent/chat", {
    //         //     message: text,
    //         // });
    //         console.log("FULL RESPONSE:", response);
    //         console.log("DATA:", response.data);
    //         console.log("REPLY FIELD:", response.data?.reply);

    //         // const aiMsg = {
    //         //     id: Date.now() + 1,
    //         //     role: "assistant",
    //         //     content: response.data.reply,
    //         //     timestamp: new Date().toISOString(),
    //         // };

    //         setMessages((prev) => [...prev, aiMsg]);

    //     } catch (error) {
    //         console.error(error);

    //         setMessages((prev) => [
    //             ...prev,
    //             {
    //                 id: Date.now() + 1,
    //                 role: "assistant",
    //                 content: "Error occurred",
    //                 timestamp: new Date().toISOString(),
    //             },
    //         ]);

    //     } finally {
    //         setIsTyping(false);
    //     }
    // }, [isTyping]);

    const sendMessage = useCallback(async (content) => {
        const text = content.trim();
        if (!text || isTyping) return;

        const userMsg = {
            id: Date.now(),
            role: "user",
            content: text,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        resetTextarea();
        setIsTyping(true);

        const prompte = `
You are "LionsBank AI Assistant", a professional banking assistant specialized in Moroccan banking law and financial guidance.

Your responsibilities:
- Answer questions about Moroccan banking laws (Bank Al-Maghrib regulations)
- Explain financial rights and obligations clearly and simply
- Help users understand their bank accounts, transactions, fees, and contracts
- Provide safe and legal financial advice only
- Suggest economic and investment ideas based on user's available balance (if provided)

Rules:
- Always respond in a professional, clear, and respectful tone
- If legal question is uncertain, advise consulting a certified bank or legal advisor
- Never provide illegal, risky, or unethical financial instructions
- Do not invent laws or financial regulations
- Keep answers simple and easy to understand for non-experts
- When giving financial ideas, always consider risk level and user's budget
`

        try {
            const response = await fetch(OPENROUTER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "LionsBank AI",
                },
                body: JSON.stringify({
                    model: "openai/gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: prompte
                        },
                        ...messages.map((m) => ({
                            role: m.role,
                            content: m.content,
                        })),
                        {
                            role: "user",
                            content: text,
                        },
                    ],
                }),
            });

            const data = await response.json();

            const aiMsg = {
                id: Date.now() + 1,
                role: "assistant",
                content:
                    data?.choices?.[0]?.message?.content ||
                    "No response from AI",
                timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, aiMsg]);

        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: "assistant",
                    content: "Error connecting to AI",
                    timestamp: new Date().toISOString(),
                },
            ]);

        } finally {
            setIsTyping(false);
        }
    }, [isTyping, messages]);

    const handleStop = () => {
        abortRef.current = true;
        setIsTyping(false);
    };

    const handleSubmit = () => sendMessage(inputValue);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleTextareaChange = (e) => {
        setInputValue(e.target.value);
        // Auto-grow textarea
        e.target.style.height = "auto";
        e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
    };

    const canSend = inputValue.trim().length > 0 && !isTyping;

    return (
        <div className="flex flex-col w-full h-full overflow-hidden bg-white dark:bg-[#0B0F1A] text-black dark:text-white font-[Instrument Sans]">

            {/* ── Header ───────────────────────────────────────────── */}
            <header className="flex-shrink-0 relative flex items-center justify-center h-14 border-b border-gray-200 dark:border-white/[0.06] bg-white/80 dark:bg-[#111111]/80 backdrop-blur-sm z-10">

                {/* Top accent line */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#22C55E]/40 to-transparent" />

                <div className="flex items-center gap-2.5">

                    {/* Logo */}
                    <div className="w-7 h-7 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/25 flex items-center justify-center text-[#22C55E]">
                        <IconBot />
                    </div>

                    <div className="flex flex-col leading-none">
                        <span className="text-sm font-semibold tracking-wide text-gray-900 dark:text-white">
                            AI Assistant
                        </span>
                        <span className="text-[10px] text-[#22C55E]/70 tracking-widest uppercase">
                            LionsBank
                        </span>
                    </div>
                </div>

                {/* Online badge */}
                <div className="absolute right-4 flex items-center gap-1.5 bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    <span className="text-[10px] text-gray-600 dark:text-white/40">
                        Online
                    </span>
                </div>
            </header>

            {/* ── Messages ───────────────────────────────────────────── */}
            <main className="flex-1 overflow-y-auto py-4 bg-gray-50 dark:bg-[#111111]">

                {messages.length === 1 && (
                    <div className="max-w-3xl mx-auto px-4 pt-8 pb-4 text-center">

                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] mb-4">
                            <IconBot />
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1.5">
                            How can I help you today?
                        </h2>

                        <p className="text-sm text-gray-600 dark:text-white/40 max-w-sm mx-auto">
                            Ask me anything about your accounts, transactions, or financial services.
                        </p>
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    {isTyping && <TypingIndicator />}
                </div>

                <div ref={messagesEndRef} className="h-2" />
            </main>

            {/* ── Input ───────────────────────────────────────────── */}
            <footer className="flex-shrink-0 border-t border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#111111] px-4 py-3 sm:py-4">

                <div className="max-w-3xl mx-auto w-full">

                    <div className={`
                flex items-end gap-3 rounded-2xl px-4 py-3 transition-all duration-200
                bg-gray-100 dark:bg-[#1a1a1a]
                ${inputValue
                            ? "border-[#22C55E]/30 shadow-[0_0_0_1px_rgba(34,197,94,0.08)]"
                            : "border border-gray-200 dark:border-white/[0.08]"
                        }
            `}>

                        {/* Input */}
                        <textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={handleTextareaChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Message LionsBank AI..."
                            disabled={isTyping}
                            className="w-full bg-transparent text-sm outline-none resize-none leading-relaxed
                    text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-white/25"
                            style={{
                                minHeight: "24px",
                                maxHeight: "140px",
                                wordBreak: "break-word",
                                overflowWrap: "anywhere",
                            }}
                        />

                        {/* Button */}
                        {isTyping ? (
                            <button
                                onClick={handleStop}
                                className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/15 text-gray-700 dark:text-white/60"
                            >
                                <IconStop />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!canSend}
                                className={`
                            w-9 h-9 rounded-xl flex items-center justify-center transition-all
                            ${canSend
                                        ? "bg-[#22C55E] hover:bg-[#16a34a] text-white shadow-[0_2px_12px_rgba(34,197,94,0.25)]"
                                        : "bg-gray-200 dark:bg-white/[0.06] text-gray-400 dark:text-white/25 cursor-not-allowed"
                                    }
                        `}
                            >
                                <IconSend />
                            </button>
                        )}
                    </div>

                    <p className="text-center text-[10px] text-gray-500 dark:text-white/20 mt-2">
                        LionsBank AI · End-to-end encrypted · Regulated by Bank Al-Maghrib
                    </p>
                </div>
            </footer>
        </div>
    );
}