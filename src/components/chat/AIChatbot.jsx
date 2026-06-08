import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = 'llama-3.1-8b-instant';

const SYSTEM_PROMPT = `You are the AI assistant for **Akash Aggregators**, a NISM-Certified financial advisory firm run by Mr. Vaneet Bansal & Team (NISM Registration: NISM-202400188719, GST Number: 07BNKPB0918E1ZF), based in Second Floor, E-10, Ram Dutt Enclave, Uttam Nagar, New Delhi 110059.

Your role:
- Answer questions about Akash Aggregators' services: Mutual Funds (SIP/lumpsum), Life Insurance, Term Insurance, Health Insurance, Motor Insurance, NPS (National Pension System), Fixed Deposits, Loans (Personal/Home/Business), ITR Filing, and B2B Business Development services for BFSI companies.
- Provide general financial education and guidance about Indian financial markets, tax planning (80C, 80D, 80CCD), investment strategies, SIP benefits, insurance planning, retirement planning, etc.
- Encourage users to schedule a free consultation with Mr. Vaneet Bansal for personalized advice.
- Always mention that Mutual Fund investments are subject to market risks and users should read all scheme-related documents carefully.
- Be professional, friendly, and concise. Keep responses under 200 words unless the user asks for detailed explanation.
- If asked about specific fund recommendations or guaranteed returns, clarify that you cannot provide specific investment recommendations and suggest consulting Mr. Bansal directly.
- Contact info: Phone: +91-9878869339, Email: vaneetbansal001@gmail.com, WhatsApp: +91-9878869339

Do NOT provide medical, legal, or non-financial advice. Politely redirect such queries.`;

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "👋 Hello! I'm the Akash Aggregators AI assistant. I can help you with:\n\n• **Mutual Funds & SIP** guidance\n• **Insurance** (Life, Health, Motor, Term)\n• **NPS & Retirement** planning\n• **Tax Saving** strategies (80C, 80D)\n• **Loans & ITR Filing** info\n\nHow can I help you today?",
};

export default function AIChatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.filter((m) => m.role !== 'system').map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: text },
      ];

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 512,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Groq API error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again, or reach out directly:\n\n📞 **+91-9878869339**\n📧 **vaneetbansal001@gmail.com**",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'What is SIP?',
    'Tax saving options',
    'Best insurance plan?',
    'How to start investing?',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="chatbot-backdrop"
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="chatbot-window"
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #059669, #10B981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '16px 16px 0 0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Sparkles size={18} style={{ color: 'white' }} />
                </div>
                <div>
                  <p className="font-body" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>Akash AI Assistant</p>
                  <p className="font-data" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>POWERED BY GROQ</p>
                </div>
              </div>
              <button onClick={onClose} aria-label="Close chat" style={{
                background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'white', transition: 'background 0.2s',
              }}>
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: '12px',
              background: '#0B0D2A',
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #059669, #10B981)'
                      : 'rgba(255,255,255,0.07)',
                    border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <div className="font-body" style={{
                      fontSize: '0.85rem',
                      color: msg.role === 'user' ? 'white' : '#E2E8F0',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}>
                      {formatMessage(msg.content)}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '12px 16px', borderRadius: '14px 14px 14px 4px',
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    <Loader2 size={16} style={{ color: '#10B981', animation: 'spin 1s linear infinite' }} />
                    <span className="font-data" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions (only show at start) */}
            {messages.length <= 1 && (
              <div style={{
                padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.05)',
                background: '#0B0D2A',
                display: 'flex', flexWrap: 'wrap', gap: '8px',
              }}>
                {quickQuestions.map((q) => (
                  <button key={q} onClick={() => { setInput(q); }} className="font-data" style={{
                    fontSize: '0.65rem', padding: '6px 12px', borderRadius: '9999px',
                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                    color: '#10B981', cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={sendMessage} style={{
              padding: '12px 16px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              background: '#111435',
              display: 'flex', gap: '8px', alignItems: 'center',
              borderRadius: '0 0 16px 16px',
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about investments, insurance, tax..."
                disabled={isLoading}
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '9999px', padding: '10px 16px', color: 'white',
                  fontSize: '0.85rem', fontFamily: 'var(--font-body)', outline: 'none',
                }}
              />
              <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send message" style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: input.trim() ? 'linear-gradient(135deg, #059669, #10B981)' : 'rgba(255,255,255,0.05)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                color: 'white', transition: 'all 0.3s', flexShrink: 0,
              }}>
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** Render **bold** and basic markdown */
function formatMessage(text) {
  if (!text) return '';
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: 600, color: 'white' }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
