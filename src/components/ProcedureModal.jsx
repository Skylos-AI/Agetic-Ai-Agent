'use client';

import { X, Check, ShieldCheck, Circle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useProcedures } from '@/context/ProcedureContext';

export default function ProcedureModal() {
    const { t } = useLanguage();
    const { activeProcedure, setActiveProcedure } = useProcedures();

    if (!activeProcedure) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(5px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Montserrat', sans-serif"
        }} onClick={() => setActiveProcedure(null)}>
            <div style={{
                background: 'white',
                width: '90%',
                maxWidth: '900px',
                maxHeight: '92vh',
                borderRadius: '8px',
                overflowY: 'auto',
                padding: '50px',
                position: 'relative'
            }} onClick={(e) => e.stopPropagation()}>
                <X
                    style={{ position: 'absolute', top: '24px', right: '24px', cursor: 'pointer', color: '#999' }}
                    onClick={() => setActiveProcedure(null)}
                />

                <div style={{ marginBottom: '40px' }}>
                    <p style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', marginBottom: '10px' }}>
                        {activeProcedure.category}
                    </p>
                    <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#333', marginBottom: '15px' }}>{activeProcedure.name}</h2>
                    <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>{activeProcedure.description}</p>
                </div>

                {/* Institutional Roadmap */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '50px',
                    position: 'relative',
                    padding: '0 20px'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '40px',
                        right: '40px',
                        height: '2px',
                        background: '#eee',
                        zIndex: 0
                    }}></div>
                    {activeProcedure.steps.map((step, idx) => (
                        <div key={step} style={{
                            position: 'relative',
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100px'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: idx < activeProcedure.currentStep ? 'var(--primary-blue)' : 'white',
                                border: '2px solid',
                                borderColor: idx <= activeProcedure.currentStep ? 'var(--primary-blue)' : '#eee',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight: 700,
                                color: idx < activeProcedure.currentStep ? 'white' : (idx === activeProcedure.currentStep ? 'var(--primary-blue)' : '#999'),
                                transition: 'var(--transition)',
                                boxShadow: idx === activeProcedure.currentStep ? '0 0 0 4px #eff6ff' : 'none'
                            }}>
                                {idx < activeProcedure.currentStep ? <Check size={18} /> : idx + 1}
                            </div>
                            <span style={{
                                fontSize: '11px',
                                textAlign: 'center',
                                color: idx === activeProcedure.currentStep ? '#333' : '#999',
                                fontWeight: idx === activeProcedure.currentStep ? 700 : 500
                            }}>{step}</span>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '50px' }}>
                    <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '4px', height: '20px', background: 'var(--primary-blue)' }}></div>
                            Lista de Requisitos
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {activeProcedure.requirements.map((req, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '20px',
                                    border: '1px solid',
                                    borderColor: req.validated ? '#DAEAD6' : '#eee',
                                    background: req.validated ? '#F8FAF7' : 'white',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{
                                        color: req.validated ? '#007A33' : '#ccc'
                                    }}>
                                        {req.validated ? <ShieldCheck size={24} /> : <Circle size={24} />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 600, fontSize: '14px', color: '#333' }}>{req.name}</p>
                                        <p style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                                            {req.validated ? t('req-validated') : t('req-pending')}
                                        </p>
                                    </div>
                                    {!req.validated && <button className="tag" style={{ margin: 0, fontSize: '12px', padding: '6px 15px' }}>Subir</button>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Resumen del Trámite</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666' }}>{t('cost-label')}</span>
                                <strong style={{ color: '#333' }}>{activeProcedure.cost}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666' }}>{t('estimated-time')}</span>
                                <strong style={{ color: '#333' }}>{activeProcedure.time}</strong>
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />
                            <button className="btn-primary" style={{ width: '100%', padding: '15px', borderRadius: '4px', fontSize: '14px', background: '#333', color: 'white' }}>
                                {t('continue-btn')}
                            </button>
                            <p style={{ fontSize: '11px', color: '#999', textAlign: 'center', marginTop: '10px' }}>
                                Al continuar, aceptas los términos de Ciudadanía Digital.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
