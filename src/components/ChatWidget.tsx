import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { getChatResponse } from "../utils/gemini";
import { FiMessageSquare, FiX, FiSend, FiMinimize2 } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";

interface Message {
    id: string;
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            text: "Hi there! I'm Antonio AI. Ask me anything about his projects, skills, or experience.",
            sender: "ai",
            timestamp: new Date(),
        },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const responseText = await getChatResponse(userMessage.text);
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText || "",
                sender: "ai",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error getting AI response:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, something went wrong. Please try again.",
                sender: "ai",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-bounce-subtle"
                    aria-label="Open Chat"
                >
                    <FiMessageSquare size={28} />
                </button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-8 right-8 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-2 h-2 absolute bottom-0 right-0 bg-green-400 rounded-full border-2 border-blue-600"></div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
                                        <FaRobot size={22} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Antonio AI</h3>
                                    <p className="text-xs text-blue-100">Always online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <FiMinimize2 size={18} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-neutral-950">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed overflow-hidden ${msg.sender === "user"
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-bl-none shadow-sm"
                                            }`}
                                    >
                                        <div
                                            className={`prose prose-sm max-w-none ${msg.sender === "user"
                                                ? "prose-invert"
                                                : "dark:prose-invert"
                                                }`}
                                        >
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-neutral-800 p-3 rounded-2xl rounded-bl-none border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
                            <form
                                onSubmit={handleSendMessage}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about my experience..."
                                    className="flex-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <FiSend size={18} />
                                </button>
                            </form>
                            <p className="text-[10px] text-center text-neutral-400 mt-2">
                                Antonio AI • Satria Herman
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
