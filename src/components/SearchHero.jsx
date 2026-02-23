'use client';

import { Search, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useProcedures } from '@/context/ProcedureContext';

export default function SearchHero() {
    const { t } = useLanguage();
    const { searchQuery, setSearchQuery, detectedProcedure, setActiveProcedure, triggerAiMessage, openExplanation } = useProcedures();

    return (
        <section className="hero-banner" style={{ overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                {/* Information Overlay (Left) */}
                <div className="hero-overlay animate-slide" style={{
                    marginLeft: '0',
                    zIndex: 5,
                    position: 'relative'
                }}>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '15px', letterSpacing: '-0.02em' }}>Decreto Supremo N°5519</h2>
                    <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9, fontWeight: 400 }}>Regulación y modernización de servicios digitales del Estado.</p>
                    <button style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        color: 'white',
                        padding: '12px 28px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 600,
                        transition: 'var(--transition)'
                    }} className="btn-hover-effect">
                        Ver Decreto →
                    </button>
                </div>

                {/* Integrated NLP Search (Floating Center) */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    maxWidth: '800px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    zIndex: 10
                }}>
                    <div style={{
                        width: '100%',
                        position: 'relative',
                        background: 'rgba(255, 254, 250, 0.95)', // Cream White
                        backdropFilter: 'blur(12px)',
                        padding: '24px',
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        animation: 'slideUp 0.6s ease-out'
                    }}>
                        <Search style={{ position: 'absolute', left: '35px', top: '50%', transform: 'translateY(-50%)', color: '#1E40AF' }} size={24} />
                        <div style={{ display: 'flex', width: '100%', gap: '15px', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchQuery.trim()) {
                                        triggerAiMessage(searchQuery);
                                    }
                                }}
                                placeholder={t('search-placeholder')}
                                style={{
                                    flex: 1,
                                    padding: '12px 12px 12px 65px',
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '22px',
                                    outline: 'none',
                                    fontWeight: 500,
                                    color: '#111827' // Dark Text
                                }}
                            />
                            <button
                                onClick={() => {
                                    if (searchQuery.trim()) {
                                        triggerAiMessage(searchQuery);
                                    }
                                }}
                                style={{
                                    background: '#1E40AF',
                                    color: 'white',
                                    padding: '14px 32px',
                                    borderRadius: '16px',
                                    border: 'none',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)',
                                    transition: 'var(--transition)'
                                }}
                                className="hover-scale"
                            >
                                Consultar con IA
                            </button>
                        </div>
                    </div>

                    {/* Secondary Link for AI Proposal */}
                    <button
                        onClick={() => openExplanation('ai')}
                        style={{
                            background: 'rgba(218, 41, 28, 0.15)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid #DA291C',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 24px',
                            borderRadius: '100px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 0 20px rgba(218, 41, 28, 0.3)',
                            marginTop: '10px'
                        }}
                        className="hover-scale"
                    >
                        <Info size={16} color="#DA291C" fill="white" />
                        <span style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Conoce la Propuesta de IA (Skylos)</span>
                    </button>
                </div>

                {/* Carousel Arrows */}
                <div style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, cursor: 'pointer' }}><ArrowLeft size={40} /></div>
                <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, cursor: 'pointer' }}><ArrowRight size={40} /></div>
            </div>

            {/* Match Alert (Detection) */}
            {detectedProcedure && (
                <div style={{
                    position: 'absolute',
                    bottom: '-40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    maxWidth: '800px',
                    zIndex: 100
                }}>
                    <div className="inst-card animate-fade" style={{ background: '#EEF4FF', borderColor: 'var(--primary-blue)', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', textAlign: 'left', flex: 1 }}>
                            <div style={{
                                width: '48px', height: '48px',
                                background: 'white', color: 'var(--primary-blue)',
                                borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}><Info /></div>
                            <div>
                                <p style={{ fontSize: '13px', color: 'var(--primary-blue)', fontWeight: 700, margin: 0 }}>
                                    {t('alert-match')}
                                </p>
                                <h3 style={{ margin: 0, fontSize: '18px' }}>{detectedProcedure.name}</h3>
                            </div>
                        </div>
                        <button className="btn-primary" onClick={() => setActiveProcedure(detectedProcedure)}>
                            {t('start-btn')}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
