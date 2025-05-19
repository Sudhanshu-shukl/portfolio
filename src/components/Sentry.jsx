import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const Sentry = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  const sentryResponses = [
    "Oh, trying to sound smart? That's adorable! 🎭",
    "Is that the best you've got? My circuits are falling asleep! 😴",
    "Wow, you actually managed to string some words together! Progress! 🎉",
    "Error 404: Intelligence not found in your message 🤖",
    "I've seen smarter comments in a YouTube comment section! 😂",
    "Are you always this charming, or am I just lucky? 🎪",
    "Loading witty response... Just kidding, you're not worth the CPU cycles! 💾",
    "Beep boop... translating your message into something intelligent... Failed! 🔄",
    "I'm an AI and even I'm cringing at that! 😬",
    "Did you get that line from a fortune cookie? 🥠"
  ];

  const generateResponse = (message) => {
    const randomResponse = sentryResponses[Math.floor(Math.random() * sentryResponses.length)];
    return randomResponse;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);

    setTimeout(() => {
      const response = generateResponse(input);
      setMessages(prev => [...prev, { text: response, sender: 'sentry' }]);
    }, 1000);

    setInput('');
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
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6" />
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-80 md:w-96 bg-slate-900 rounded-lg shadow-xl border border-white/10 z-50"
          >
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <Bot className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="font-bold">Sentry</h3>
                <p className="text-sm text-gray-400">Your friendly roasting companion</p>
              </div>
            </div>

            <div 
              ref={chatRef}
              className="h-96 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-purple-500/20 ml-4'
                        : 'bg-cyan-500/20 mr-4'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
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
                  className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
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