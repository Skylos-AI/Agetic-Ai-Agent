'use client';

import { X, Shield, Bot, Zap, Globe, Cpu, Lock, ChevronRight, Info } from 'lucide-react';
import { useProcedures } from '@/context/ProcedureContext';

export default function ProjectExplanationModal() {
    const { explanationType, closeExplanation } = useProcedures();

    if (!explanationType) return null;

    const content = {
        blockchain: {
            title: "Blockchain: Registro Cronológico",
            subtitle: "Integridad temporal y transparencia verificable",
            icon: <Shield size={32} />,
            color: "#1E40AF",
            bgGradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
            text: (
                <>
                    <p style={{ marginBottom: '20px', lineHeight: '1.7', color: '#334155' }}>
                        En esta propuesta planteamos un <strong>Sistema de Registro Cronológico basado en blockchain</strong>, pensado para garantizar la integridad temporal de los documentos públicos: es decir, poder demostrar con prueba irrefutable que un documento existía en una fecha y hora determinada.
                    </p>
                    <p style={{ marginBottom: '25px', lineHeight: '1.7', color: '#334155' }}>
                        La blockchain nos da características nativas clave como <strong>inmutabilidad, transparencia verificable y resistencia a la manipulación</strong>. Cada registro anclado genera un comprobante criptográfico, que puede ser verificado de forma independiente por cualquier parte interesada, sin depender de AGETIC como único verificador de confianza.
                    </p>

                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '15px' }}>Modelos de Implementación</h4>

                    <div style={{ display: 'grid', gap: '15px', marginBottom: '25px' }}>
                        {[
                            {
                                opt: "Opción A",
                                title: "Red Privada EVM",
                                desc: "Blockchain privada compatible con Ethereum (Polygon Edge/Geth). AGETIC controla el 100% de los nodos. Ideal para privacidad total y sin costo de gas."
                            },
                            {
                                opt: "Opción B",
                                title: "Híbrida (Privada + Pública con ZK Proof)",
                                desc: "Registro en red privada de AGETIC con ancla criptográfica en Base (L2 de Ethereum) mediante ZK Proof. Verificación ciudadana sin revelar contenido."
                            },
                            {
                                opt: "Opción C",
                                title: "100% Pública en Base L2",
                                desc: "El sistema vive completamente en Base. Registros on-chain usando ZK Proof para no exponer datos sensibles. Máxima transparencia directa."
                            }
                        ].map((item, i) => (
                            <div key={i} style={{
                                padding: '18px 24px',
                                background: 'white',
                                borderRadius: '24px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
                            }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                                    <div style={{
                                        background: '#eff6ff',
                                        padding: '4px 10px',
                                        borderRadius: '8px',
                                        fontSize: '10px',
                                        fontWeight: 800,
                                        color: '#1e40af',
                                        textTransform: 'uppercase'
                                    }}>{item.opt}</div>
                                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e293b' }}>{item.title}</div>
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>{item.desc}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        padding: '24px',
                        background: '#f8fafc',
                        borderRadius: '24px',
                        borderLeft: '4px solid #10b981',
                        fontSize: '14px',
                        color: '#475569',
                        lineHeight: '1.6'
                    }}>
                        <strong>Ventaja estratégica:</strong> Integración con <strong>gob.bo</strong>. Los trámites iniciados con el agente generan automáticamente registros cronológicos y entregan un certificado verificable con comprobante criptográfico.
                    </div>
                </>
            )
        },
        ai: {
            title: "Agente IA: Skylos",
            subtitle: "Evolución de gob.bo hacia un Estado más cercano",
            icon: <Bot size={32} />,
            color: "#DA291C",
            bgGradient: "linear-gradient(135deg, #fff1f0 0%, #fee2e2 100%)",
            text: (
                <>
                    <p style={{ marginBottom: '20px', lineHeight: '1.7', color: '#334155' }}>
                        Acceder a la información del Estado no debería ser una tarea compleja. Skylos propone la evolución de <strong>gob.bo</strong> mediante un <strong>Agente de IA basado en arquitectura RAG</strong> (Generación Aumentada por Recuperación).
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '25px' }}>
                        <div style={{ padding: '24px', background: 'white', borderRadius: '28px', border: '1px solid #fee2e2' }}>
                            <div style={{ color: '#ef4444', marginBottom: '12px' }}><Zap size={24} /></div>
                            <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '8px' }}>Respuestas Verificables</div>
                            <div style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '1.5' }}>Conecta con la base de conocimiento oficial de AGETIC, eliminando el riesgo de alucinaciones.</div>
                        </div>
                        <div style={{ padding: '24px', background: 'white', borderRadius: '28px', border: '1px solid #fee2e2' }}>
                            <div style={{ color: '#ef4444', marginBottom: '12px' }}><Globe size={24} /></div>
                            <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '8px' }}>Bolivia Multilingüe</div>
                            <div style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '1.5' }}>Capacidades en español, quechua y aymara para democratizar el acceso a la información.</div>
                        </div>
                    </div>

                    <p style={{ marginBottom: '20px', lineHeight: '1.7', color: '#334155' }}>
                        El ciudadano puede realizar consultas en <strong>Lenguaje Natural</strong> y recibir una guía personalizada. Cada interacción importante genera un registro inmutable en blockchain, proporcionando seguridad total.
                    </p>

                    <div style={{
                        padding: '28px',
                        background: '#0f172a',
                        borderRadius: '32px',
                        color: 'white',
                        textAlign: 'left',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Visión Estratégica</div>
                            <div style={{ fontSize: '15px', fontWeight: 500, lineHeight: '1.6', opacity: 0.9 }}>
                                AGETIC no solo moderniza un portal, sino que posiciona a Bolivia en la vanguardia de la innovación, creando un Estado más eficiente y transparente.
                            </div>
                        </div>
                        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1 }}>
                            <Bot size={120} />
                        </div>
                    </div>
                </>
            )
        }
    };

    const activeContent = content[explanationType];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(12px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Montserrat', sans-serif",
            padding: '20px'
        }} onClick={closeExplanation}>
            <div
                className="modal-appear"
                style={{
                    background: 'white',
                    width: '100%',
                    maxWidth: '650px',
                    maxHeight: '85vh',
                    borderRadius: '40px',
                    overflowY: 'auto',
                    position: 'relative',
                    boxShadow: '0 40px 80px -15px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.5)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Section */}
                <div style={{
                    padding: '50px 50px 30px',
                    background: activeContent.bgGradient,
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <button
                        onClick={closeExplanation}
                        style={{
                            position: 'absolute',
                            top: '30px',
                            right: '30px',
                            background: 'white',
                            border: 'none',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            transition: 'all 0.3s ease',
                            zIndex: 10
                        }}
                    >
                        <X size={20} color="#64748b" />
                    </button>

                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                        <div style={{
                            width: '72px',
                            height: '72px',
                            background: 'white',
                            borderRadius: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: activeContent.color,
                            boxShadow: '0 12px 24px -6px rgba(0,0,0,0.1)'
                        }}>
                            {activeContent.icon}
                        </div>
                        <div>
                            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
                                {activeContent.title}
                            </h2>
                            <p style={{ fontSize: '15px', color: '#444', marginTop: '4px', opacity: 0.8 }}>
                                {activeContent.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: '40px 50px 50px' }}>
                    {activeContent.text}

                    <button
                        onClick={closeExplanation}
                        style={{
                            width: '100%',
                            marginTop: '40px',
                            padding: '18px',
                            background: '#1e293b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '18px',
                            fontWeight: 700,
                            fontSize: '15px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Entendido <ChevronRight size={18} />
                    </button>
                </div>

                <style jsx>{`
                    .modal-appear {
                        animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                    @keyframes scaleIn {
                        from { opacity: 0; transform: scale(0.9) translateY(20px); }
                        to { opacity: 1; transform: scale(1) translateY(0); }
                    }
                `}</style>
            </div>
        </div>
    );
}
