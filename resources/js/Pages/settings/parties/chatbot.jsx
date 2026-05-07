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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const resetTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

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
- Answer questions about Moroccan banking laws
- Explain financial rights clearly
- Provide safe financial advice only
- Do not invent laws
- Keep answers simple
`;

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
                            content: prompte,
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
        e.target.style.height = "auto";
        e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
    };

    const canSend = inputValue.trim().length > 0 && !isTyping;

    return (
        <div
            className="
                flex flex-col w-full h-full overflow-hidden
                bg-white
                dark:bg-[#041f1e]
                text-black dark:text-white
                font-[Instrument Sans]
            "
        >

            {/* HEADER */}
            <header
                className="
                    flex-shrink-0 relative flex items-center justify-center h-14
                    border-b border-gray-200 dark:border-white/10
                    bg-white/80 dark:bg-[#041f1e]/80
                    backdrop-blur-sm z-10
                "
            >
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/25 flex items-center justify-center text-[#22C55E]">
                        <IconBot />
                    </div>

                    <div className="flex flex-col leading-none">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            AI Assistant
                        </span>
                        <span className="text-[10px] text-[#22C55E]/70 uppercase">
                            LionsBank
                        </span>
                    </div>
                </div>
            </header>

            {/* MAIN */}
            <main
                className="
                    flex-1 overflow-y-auto py-4
                    bg-gray-50
                    dark:bg-[#041f1e]
                "
            >
                <div className="flex flex-col gap-1">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    {isTyping && <TypingIndicator />}
                </div>

                <div ref={messagesEndRef} className="h-2" />
            </main>

            {/* INPUT */}
            <footer
                className="
                    flex-shrink-0 border-t
                    border-gray-200 dark:border-white/10
                    bg-white dark:bg-[#041f1e]
                    px-4 py-3
                "
            >
                <div className="max-w-3xl mx-auto w-full">

                    <div
                        className="
                            flex items-end gap-3 rounded-2xl px-4 py-3
                            bg-gray-100 dark:bg-[#052a27]
                            border border-gray-200 dark:border-white/10
                        "
                    >
                        <textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={handleTextareaChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Message LionsBank AI..."
                            disabled={isTyping}
                            className="
                                w-full bg-transparent text-sm outline-none resize-none
                                text-gray-900 dark:text-white
                                placeholder-gray-400 dark:placeholder-white/30
                            "
                        />

                        {isTyping ? (
                            <button onClick={handleStop}>
                                <IconStop />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!canSend}
                                className="text-white bg-[#22C55E] px-3 py-2 rounded-xl"
                            >
                                <IconSend />
                            </button>
                        )}
                    </div>

                </div>
            </footer>
        </div>
    );
}