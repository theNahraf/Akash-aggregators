import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, X, Bot } from 'lucide-react';
import AIChatbot from '../chat/AIChatbot';

const WHATSAPP_NUMBER = '919878869339';
const WHATSAPP_MESSAGE = encodeURIComponent('Hi, I would like to know more about your financial services.');
const EMAIL = 'support@Aakashaggregators.com';
const EMAIL_SUBJECT = encodeURIComponent('Inquiry — Aakash Aggregators');

export default function FloatingActions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const actions = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      color: '#25D366',
      onClick: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank'),
    },
    {
      id: 'email',
      label: 'Email Us',
      icon: <Mail size={22} />,
      color: '#F59E0B',
      onClick: () => window.location.href = `mailto:${EMAIL}?subject=${EMAIL_SUBJECT}`,
    },
    {
      id: 'ai-chat',
      label: 'AI Assistant',
      icon: <Bot size={22} />,
      color: '#10B981',
      onClick: () => { setIsChatOpen(true); setIsExpanded(false); },
    },
  ];

  return (
    <>
      {/* Floating Action Buttons */}
      <div style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 40,
      }}>
        {/* Action Items — positioned above the main button */}
        <div style={{
          position: 'absolute', bottom: '68px', right: '0',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px',
        }}>
          <AnimatePresence>
            {isExpanded && !isChatOpen && [...actions].reverse().map((action, i) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: i * 0.06, type: 'spring', damping: 20, stiffness: 300 }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                {/* Label */}
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                  className="font-data"
                  style={{
                    fontSize: '0.7rem', color: 'white', fontWeight: 500,
                    background: 'rgba(11,13,42,0.9)', backdropFilter: 'blur(8px)',
                    padding: '6px 12px', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    whiteSpace: 'nowrap', letterSpacing: '0.05em',
                  }}
                >
                  {action.label}
                </motion.span>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.onClick}
                  aria-label={action.label}
                  style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: action.color, border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'white',
                    boxShadow: `0 4px 20px -4px ${action.color}60`,
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  {action.icon}
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Main Toggle Button — always fixed at the bottom */}
        {!isChatOpen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: isExpanded ? '#EF4444' : 'linear-gradient(135deg, #059669, #10B981)',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white',
              boxShadow: isExpanded
                ? '0 4px 25px -4px rgba(239,68,68,0.5)'
                : '0 4px 25px -4px rgba(16,185,129,0.5)',
              transition: 'all 0.3s',
            }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* AI Chatbot */}
      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Chatbot CSS */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .chatbot-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          z-index: 45;
        }

        .chatbot-window {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: calc(100vw - 32px);
          max-width: 400px;
          height: calc(100vh - 120px);
          max-height: 600px;
          border-radius: 16px;
          overflow: hidden;
          z-index: 50;
          display: flex;
          flex-direction: column;
          background: #0B0D2A;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 25px 60px -12px rgba(0,0,0,0.5);
        }

        @media (max-width: 480px) {
          .chatbot-window {
            bottom: 0;
            right: 0;
            width: 100vw;
            max-width: 100vw;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
}
