'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ChatbotPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm MUSC-AI. How can I help you today?", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const generateResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        // 1. Branding / Greeting
        if (lowerQuery.includes('hello') || lowerQuery.includes('hi ') || lowerQuery.startsWith('hi') || lowerQuery.includes('hey')) {
            return "Hello! I'm your MUSC-AI assistant. Ask me about our gym wear, orders, shipping, or returns!";
        }
        if (lowerQuery.includes('muscfit') || lowerQuery.includes('brand') || lowerQuery.includes('about us')) {
            return "MUSCFIT is a premium fitness apparel brand designed for peak performance. We offer high-quality compression gear, training essentials, and accessories.";
        }

        // 2. Products & Categories
        if (lowerQuery.includes('men') || lowerQuery.includes('man') || lowerQuery.includes('guy')) {
            return "For men, we have a great collection of compression tops, training shorts, and joggers. Check out the 'Men' category in the menu.";
        }
        if (lowerQuery.includes('women') || lowerQuery.includes('woman') || lowerQuery.includes('girl') || lowerQuery.includes('ladies')) {
            return "Our women's collection features high-performance leggings, sports bras, and crop tops. You can browse them under the 'Women' tab.";
        }
        if (lowerQuery.includes('compression') || lowerQuery.includes('base layer')) {
            return "Our Compression Series is our specialty! It helps improve blood flow and recovery. We have compression shirts, pants, and full suits.";
        }
        if (lowerQuery.includes('accessory') || lowerQuery.includes('accessories') || lowerQuery.includes('bag') || lowerQuery.includes('equipment')) {
            return "Don't forget the essentials! We stock gym bags, lifting belts, and other training equipment in our Accessories section.";
        }

        // 3. Operations (Order, Shipping, Returns, Payment)
        if (lowerQuery.includes('order') || lowerQuery.includes('buy') || lowerQuery.includes('purchase')) {
            return "Ordering is easy! Just add your favorite gear to the cart and proceed to checkout. You'll receive an email confirmation once your order is placed.";
        }
        if (lowerQuery.includes('track') || lowerQuery.includes('status')) {
            return "You can track your order status in your Profile under 'My Orders'. You'll also get a tracking link via email once your order ships.";
        }
        if (lowerQuery.includes('shipping') || lowerQuery.includes('delivery') || lowerQuery.includes('ship')) {
            return "We offer FREE express shipping on orders above ₹2,999! Standard delivery typically takes 2-4 business days depending on your location.";
        }
        if (lowerQuery.includes('return') || lowerQuery.includes('exchange') || lowerQuery.includes('refund')) {
            return "We have a hassle-free 30-day return policy. If the size doesn't fit or you're not satisfied, you can initiate a return or exchange from your User Profile.";
        }
        if (lowerQuery.includes('payment') || lowerQuery.includes('pay') || lowerQuery.includes('cod') || lowerQuery.includes('upi')) {
            return "We accept all major secure payment methods including UPI, Credit/Debit Cards, and Net Banking. Cash on Delivery (COD) is available for select pin codes.";
        }
        if (lowerQuery.includes('size') || lowerQuery.includes('fit') || lowerQuery.includes('chart')) {
            return "Not sure about the fit? Each product page has a detailed Size Guide. Our gear is designed for an athletic fit, so check the measurements!";
        }

        // 4. Support / Contact
        if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('support') || lowerQuery.includes('human')) {
            return "Need human help? You can reach our support team at support@muscfit.com. We usually respond within 24 hours.";
        }

        // 5. Fallback for unrelated queries (Strict Mode)
        return "I'm designed to help only with Muscfit-related inquiries. Please ask me about our products, your order, shipping, or returns.";
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { id: Date.now(), text: inputValue, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI processing time
        setTimeout(() => {
            const responseText = generateResponse(userMessage.text);
            const botMessage = { id: Date.now() + 1, text: responseText, isBot: true };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto font-sans">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out hover:scale-110 active:scale-95 ${isOpen ? 'bg-black rotate-90' : 'bg-gradient-to-tr from-rose-500 to-indigo-600'}`}
                aria-label="Toggle Chat"
            >
                <Icon
                    name={isOpen ? 'XMarkIcon' : 'ChatBubbleLeftRightIcon'}
                    size={26}
                    className="text-white transition-transform duration-500"
                />

                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
                    </span>
                )}
            </button>

            {/* Chat Interface */}
            <div
                className={`absolute bottom-20 right-0 w-[300px] sm:w-[350px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-rose-600 to-indigo-600 p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                        <Icon name="SparklesIcon" size={16} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm tracking-wide">MUSC-AI Assistant</h3>
                        <div className="flex items-center gap-1.5 opacity-80">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-xs text-white font-medium">Online</span>
                        </div>
                    </div>
                </div>

                {/* Messages messages */}
                <div className="h-[350px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 text-sm rounded-2xl ${msg.isBot
                                    ? 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-white/5'
                                    : 'bg-white text-black rounded-tr-none shadow-lg'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center h-10 w-16 justify-center">
                                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900/50 border-t border-white/5">
                    <div className="relative flex items-center">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your question..."
                            className="w-full bg-zinc-800 text-white text-sm rounded-full pl-4 pr-12 py-3 border border-white/10 focus:outline-none focus:border-indigo-500 focus:bg-zinc-800/80 transition-all placeholder:text-zinc-500"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="absolute right-1.5 p-2 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white disabled:opacity-50 disabled:hover:bg-indigo-500 transition-all shadow-lg hover:scale-105 active:scale-95"
                        >
                            <Icon name="PaperAirplaneIcon" size={16} className="-ml-0.5 mt-0.5 -rotate-45" />
                        </button>
                    </div>
                    <p className="text-[10px] text-zinc-500 text-center mt-2">AI can make mistakes. Check important info.</p>
                </form>
            </div>
        </div>
    );
}
