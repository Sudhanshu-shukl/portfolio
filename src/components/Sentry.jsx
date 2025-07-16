import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import Fuse from 'fuse.js';
import qaData from '../sentry-qa.json';

// === Fallback replies for casual inputs ===
const fallbackMap = {
  hi: "Hi there! Ask me anything about Sudhanshu or this portfolio.",
  hello: "Hello! How can I help you today?",
  yo: "Yo! What’s good?",
  heyy: "Heey! You summoned me?",
  hey: "Hey! Let's talk tech or roast bugs.",
  "roast me": "You're using console.log in production, aren't you? 😒",
  "tell me a joke": "Why did the programmer quit his job? Because he didn't get arrays 💀",
  thanks: "Anytime, boss!",
  "thank you": "No problem. I'm built different 💅",
  goodbye: "Peace out! Come back with better questions.",
  bye: "Later, legend 👋",
  "how are you": "I'm Sentry, Sudhanshu's AI assistant. Your chill tech homie 😎",
  "what": "You gotta be more specific. What… what? 😂",
  "who": "You talking about Sudhanshu, me, or the universe? Clarify, genius.",
  "hy": "It’s spelled hi, but I’ll allow it. Wassup?",
  "sorr": "Don't be sorry. Be better. 😌"
};

// === Fuse.js Setup ===
const fuse = new Fuse(qaData, {
  keys: ['q'],
  threshold: 0.4,
  minMatchCharLength: 3
});

// === Helpers ===
const normalizeInput = (input) => input.trim().toLowerCase();
const findAnswer = (question) => {
  const cleaned = normalizeInput(question);
  if (fallbackMap[cleaned]) return fallbackMap[cleaned];
  if (cleaned.length >= 3) {
    const result = fuse.search(cleaned);
    if (result.length > 0) return result[0].item.a;
  }
  return null;
};

// === Groq API Call ===
async function fetchGroqChat(userMessage) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: "You are Sentry, a sarcastic and helpful AI assistant on Sudhanshu's portfolio site. Be witty, chill, and fun.",
          },
          {
            role: "user",
            content: userMessage,
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      })
    });

    const data = await response.json();
    if (data?.choices?.[0]?.message?.content) {
      return data.choices[0].message.content.trim();
    }
    return "Im Sorry but I'm not a real AI, I'm just a fun assistant to help you explore Sudhanshu's portfolio. so you can ask me about Sudhanshu's skills, projects, contact info, or anything about Sudhanshu.";
  } catch (error) {
    console.error("Groq API error:", error);
    return "⚠️ Brain offline. Try again in a bit.";
  }
}

const Sentry = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedInput = input.trim();

    if (!cleanedInput) return;

    const userMsg = { text: cleanedInput, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setMessages(prev => [...prev, { text: '', sender: 'sentry' }]);

    let reply = findAnswer(cleanedInput);
    if (!reply) reply = await fetchGroqChat(cleanedInput);

    // Typing animation
    let i = 0;
    const type = () => {
      if (i <= reply.length) {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { text: reply.slice(0, i), sender: 'sentry' }
        ]);
        i++;
        setTimeout(type, 18);
      } else {
        setIsTyping(false);
      }
    };
    type();
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-2 w-[95vw] max-w-lg bg-slate-900 rounded-lg shadow-xl border border-white/10 z-50"
          >
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <Bot className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="font-bold">Sentry</h3>
                <p className="text-sm text-gray-400">Your friendly roasting companion</p>
              </div>
            </div>

            <div ref={chatRef} className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user' ? 'bg-purple-500/20 ml-4' : 'bg-cyan-500/20 mr-4'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-cyan-500/20 mr-4">
                    <p className="text-sm animate-pulse">Sentry is typing...</p>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Say something..."
                  className="flex-1 bg-slate-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <button
                  type="submit"
                  className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sentry;
