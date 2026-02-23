

'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Bot, Send, ShieldCheck, Check, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useProcedures } from '@/context/ProcedureContext';

export default function AiAgent() {
    const { t, lang, setLang } = useLanguage();
    const { activeProcedure, aiTrigger, isDigitalCitizen, toggleDigitalCitizenship, openExplanation } = useProcedures();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const scrollContainerRef = useRef(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStep, setVerificationStep] = useState(0);
    const [showGuide, setShowGuide] = useState(true);

    useEffect(() => {
        // Update messages when language changes
        setMessages(prev => prev.map(msg => {
            if (msg.role === 'ai') {
                if (msg.text === t('welcome-msg')) return msg;
            }
            return msg;
        }));

        // Ensure the initial welcome message is correct for the selected language
        if (messages.length === 0 || (messages.length === 1 && messages[0].role === 'ai')) {
            setMessages([{ role: 'ai', text: t('welcome-msg') }]);
        }
    }, [lang, t]);

    // Handle external triggers from SearchHero or elsewhere
    useEffect(() => {
        if (aiTrigger) {
            handleSend(aiTrigger.message);
            setIsOpen(true);
        }
    }, [aiTrigger]);

    useEffect(() => {
        if (activeProcedure && activeProcedure.id === 2) {
            setTimeout(() => {
                const msg = "He notado que estás en el trámite de Licencia de Conducir. ¿Deseas que agende tu examen médico en el centro más cercano a tu ubicación?";
                setMessages(prev => [...prev, { role: 'ai', text: msg }]);
                setIsOpen(true);
                setShowGuide(false);
            }, 2000);
        }
    }, [activeProcedure]);

    // Targeted container scrolling
    useEffect(() => {
        if (isOpen && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isOpen]);

    const handleSend = (text = null) => {
        const msgText = text || input.trim();
        if (!msgText) return;

        setMessages(prev => [...prev, { role: 'user', text: msgText }]);
        setInput('');
        setShowGuide(false);

        setTimeout(() => {
            const lowerMsg = msgText.toLowerCase();
            let response = t('generic-response').replace('{query}', msgText);

            // Digital Citizenship Check
            const isProcedureQuery = lowerMsg.includes("carnet") ||
                lowerMsg.includes("licencia") ||
                lowerMsg.includes("tramite") ||
                lowerMsg.includes("bolivia") ||
                lowerMsg.includes("certificado") ||
                lowerMsg.includes("documento");

            if (isProcedureQuery && !isDigitalCitizen) {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    text: t('cd-required'),
                    action: { label: t('cd-verify-btn'), type: 'verify_cd' }
                }]);
                return;
            }

            if (lowerMsg.includes("hola")) response = t('welcome-msg');
            if (lowerMsg.includes("costo")) response = t('cost-response');
            if (lowerMsg.includes("carnet") || lowerMsg.includes("id") || lowerMsg.includes("p'anqa")) response = t('carnet-response');

            setMessages(prev => [...prev, { role: 'ai', text: response }]);
        }, 1000);
    };

    const handleAction = (action) => {
        if (action.type === 'verify_cd') {
            setIsVerifying(true);
            setVerificationStep(1);

            setMessages(prev => [...prev, { role: 'ai', text: t('cd-verifying') }]);

            setTimeout(() => {
                setVerificationStep(2); // Biometric Scan
                setMessages(prev => [...prev, { role: 'ai', text: t('cd-biometric') }]);
            }, 2000);

            setTimeout(() => {
                setVerificationStep(3); // Encryption
                setMessages(prev => [...prev, { role: 'ai', text: t('cd-encryption') }]);
            }, 4500);

            setTimeout(() => {
                setIsVerifying(false);
                setVerificationStep(0);
                toggleDigitalCitizenship();
                setMessages(prev => [...prev, {
                    role: 'ai',
                    text: t('cd-success')
                }]);
            }, 7000);
        }
    };

    const languages = [
        { code: 'es', label: 'Español' },
        { code: 'qu', label: 'Quechua' },
        { code: 'ay', label: 'Aymara' }
    ];

    return (
        <>
            <div
                style={{
                    position: 'fixed', bottom: '32px', right: '32px',
                    width: '64px', height: '64px',
                    background: 'var(--primary)', color: 'white',
                    borderRadius: '20px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    boxShadow: 'var(--shadow-lg)', cursor: 'pointer',
                    zIndex: 1000, transition: 'var(--transition)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
                className="hover-scale"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div style={{ position: 'relative' }}>
                    <MessageCircle size={28} />
                    {!isOpen && <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '12px', height: '12px', background: '#10B981', borderRadius: '50%', border: '2px solid var(--primary)' }}></div>}
                </div>
            </div>

            {isOpen && (
                <div style={{
                    position: 'fixed', bottom: '110px', right: '32px',
                    width: '450px', height: '650px',
                    background: 'rgba(255, 254, 250, 0.95)',
                    backdropFilter: 'blur(24px)',
                    borderRadius: '32px',
                    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    flexDirection: 'column', zIndex: 1000,
                    overflow: 'hidden',
                    fontFamily: "'Montserrat', sans-serif",
                    animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                    {isVerifying && (
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 2000,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '40px',
                            textAlign: 'center'
                        }}>
                            <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '32px' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    border: '2px dashed #1E40AF',
                                    borderRadius: '50%',
                                    animation: 'spin 10s linear infinite'
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    top: '50%', left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: '#1E40AF'
                                }}>
                                    {verificationStep === 2 ? (
                                        <div className="biometric-pulse">
                                            <div style={{ width: '60px', height: '60px', border: '2px solid #1E40AF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ShieldCheck size={32} />
                                            </div>
                                        </div>
                                    ) : (
                                        <ShieldCheck size={48} />
                                    )}
                                </div>
                                {verificationStep === 2 && (
                                    <div style={{
                                        position: 'absolute',
                                        left: '10%', right: '10%',
                                        height: '2px', background: '#3B82F6',
                                        boxShadow: '0 0 15px #3B82F6',
                                        top: '0%', animation: 'scanLine 2s ease-in-out infinite',
                                        zIndex: 10
                                    }}></div>
                                )}
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                                {verificationStep === 1 && t('cd-verifying')}
                                {verificationStep === 2 && t('cd-biometric')}
                                {verificationStep === 3 && t('cd-encryption')}
                            </h3>
                            <p style={{ fontSize: '13px', color: '#6B7280' }}>
                                {verificationStep === 2 ? t('biometric-prompt') : 'Procesando identidad segura...'}
                            </p>
                        </div>
                    )}

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.5)',
                        padding: '24px 28px',
                        display: 'flex',
                        flexDirection: 'column', gap: '16px',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{
                                    width: '48px', height: '48px',
                                    background: 'rgba(30, 64, 175, 0.1)',
                                    color: '#1E40AF',
                                    borderRadius: '14px', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    border: '1px solid rgba(30, 64, 175, 0.2)'
                                }}>
                                    <Bot size={28} />
                                </div>
                                <div>
                                    <strong style={{ fontSize: '18px', color: '#111827', letterSpacing: '-0.02em', fontWeight: 700 }}>{t('agent-name')}</strong>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                                        <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 12px #10B981' }}></div>
                                        <p style={{ fontSize: '12px', color: '#4B5563', fontWeight: 500 }}>{t('agent-status')}</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => openExplanation('ai')}
                                    style={{
                                        background: 'rgba(218, 41, 28, 0.05)',
                                        border: '1px solid rgba(218, 41, 28, 0.1)',
                                        color: '#DA291C', cursor: 'pointer',
                                        width: '32px', height: '32px', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'var(--transition)'
                                    }}
                                    className="hover-scale"
                                    title="Acerca de Skylos"
                                >
                                    <Info size={16} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        background: 'rgba(0, 0, 0, 0.05)',
                                        border: 'none', color: '#111827', cursor: 'pointer',
                                        width: '32px', height: '32px', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'var(--transition)'
                                    }}
                                    className="close-btn-hover-light"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <p style={{ fontSize: '10px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Preferencia de Idioma</p>
                            <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.03)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                {languages.map((l) => (
                                    <button
                                        key={l.code}
                                        onClick={() => setLang(l.code)}
                                        style={{
                                            flex: 1, cursor: 'pointer', fontSize: '11px', padding: '8px 4px', borderRadius: '9px',
                                            background: lang === l.code ? '#1E40AF' : 'transparent',
                                            color: lang === l.code ? 'white' : '#4B5563',
                                            border: 'none', fontWeight: 700, transition: 'var(--transition)'
                                        }}
                                    >
                                        {l.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: 'transparent' }}
                    >
                        {showGuide && (
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.6)',
                                border: '1px solid rgba(0, 0, 0, 0.06)',
                                padding: '20px', borderRadius: '24px'
                            }}>
                                <h4 style={{ fontSize: '14px', color: '#111827', marginBottom: '12px', fontWeight: 700 }}>¿Cómo puedo ayudarte hoy?</h4>
                                <ul style={{ fontSize: '13px', color: '#4B5563', listStyle: 'none', padding: 0, margin: 0 }}>
                                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '6px', height: '6px', background: '#1E40AF', borderRadius: '50%' }}></div>
                                        Consulta requisitos de trámites nacionales
                                    </li>
                                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '6px', height: '6px', background: '#1E40AF', borderRadius: '50%' }}></div>
                                        Revisa el estado de tus documentos digitales
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '6px', height: '6px', background: '#1E40AF', borderRadius: '50%' }}></div>
                                        Solicita ayuda técnica personalizada
                                    </li>
                                </ul>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} style={{
                                maxWidth: '85%',
                                alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end',
                                display: 'flex', flexDirection: 'column', gap: '8px'
                            }}>
                                <div style={{
                                    padding: '16px 20px',
                                    borderRadius: msg.role === 'ai' ? '24px 24px 24px 8px' : '24px 24px 8px 24px',
                                    fontSize: '14.5px',
                                    background: msg.role === 'ai' ? '#F3F4F6' : '#1E40AF',
                                    color: msg.role === 'ai' ? '#111827' : 'white',
                                    lineHeight: '1.6',
                                    boxShadow: msg.role === 'ai' ? 'none' : '0 10px 20px -5px rgba(30, 64, 175, 0.4)',
                                    border: msg.role === 'ai' ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}>
                                    <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                </div>
                                {msg.action && !isDigitalCitizen && (
                                    <button
                                        onClick={() => handleAction(msg.action)}
                                        style={{
                                            alignSelf: 'flex-start', padding: '10px 20px', borderRadius: '12px',
                                            background: '#1E40AF', color: 'white', border: 'none', fontSize: '13px',
                                            fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(30, 64, 175, 0.2)',
                                            transition: 'var(--transition)'
                                        }}
                                        className="hover-scale"
                                    >
                                        {msg.action.label}
                                    </button>
                                )}
                            </div>
                        ))}

                        {showGuide && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                {['Mi Carnet', 'Licencia de Conducir', 'Certificado Digital'].map(action => (
                                    <button
                                        key={action}
                                        onClick={() => handleSend(action)}
                                        style={{
                                            padding: '10px 18px', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.08)',
                                            background: 'white', fontSize: '12px', color: '#111827',
                                            fontWeight: 600, cursor: 'pointer', transition: 'var(--transition)',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                        }}
                                        className="chip-hover-light"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div style={{ height: '1px' }} />
                    </div>

                    <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.5)', borderTop: '1px solid rgba(0, 0, 0, 0.06)', display: 'flex', gap: '12px' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <input
                                type="text"
                                className="chat-input-light"
                                placeholder={t('chat-placeholder')}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                style={{
                                    width: '100%', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '16px',
                                    padding: '14px 20px', outline: 'none', fontSize: '15px', background: 'white',
                                    color: '#111827', transition: 'var(--transition)'
                                }}
                            />
                        </div>
                        <button
                            className="btn-send-modern"
                            style={{
                                width: '52px', height: '52px', borderRadius: '16px', background: '#1E40AF',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: 'none', cursor: 'pointer', boxShadow: '0 8px 16px rgba(30, 64, 175, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => handleSend()}
                        >
                            <Send size={22} color="white" />
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .hover-scale:hover { transform: scale(1.05); }
                .chat-input-light:focus { border-color: #1E40AF !important; box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.1); }
                .chip-hover-light:hover { background: #1E40AF !important; color: white !important; border-color: transparent !important; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2); }
                .close-btn-hover-light:hover { background: rgba(0, 0, 0, 0.1) !important; transform: rotate(90deg); }
                .btn-send-modern:hover { transform: translateY(-2px) scale(1.05); background: #2563EB !important; }
                .btn-send-modern:active { transform: translateY(0) scale(0.95); }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scanLine {
                    0% { top: 20%; opacity: 0; }
                    50% { top: 80%; opacity: 1; }
                    100% { top: 20%; opacity: 0; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .biometric-pulse {
                    animation: pulseScale 2s infinite ease-in-out;
                }
                @keyframes pulseScale {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }
            `}</style>
        </>
    );
}
