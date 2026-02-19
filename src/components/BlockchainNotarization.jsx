'use client';
import { useState, useEffect } from 'react';
import {
    FileUp,
    ShieldCheck,
    Loader2,
    CheckCircle2,
    ExternalLink,
    Search,
    AlertTriangle,
    Database,
    Link as LinkIcon,
    Lock,
    Clock,
    History,
    FileSearch,
    ChevronRight,
    Shield,
    Fingerprint,
    Cpu,
    Globe
} from 'lucide-react';

export default function BlockchainNotarization() {
    const [stage, setStage] = useState('dashboard'); // 'dashboard', 'processing', 'result', 'verify'
    const [fileName, setFileName] = useState('');
    const [description, setDescription] = useState('');
    const [processLog, setProcessLog] = useState([]);
    const [mockHash, setMockHash] = useState('');
    const [mockTxId, setMockTxId] = useState('');
    const [verificationFile, setVerificationFile] = useState('');
    const [verificationStatus, setVerificationStatus] = useState(null); // 'valid', 'tampered'
    const [isVerifying, setIsVerifying] = useState(false);

    const startRegistration = () => {
        if (!fileName) {
            alert("Por favor suba un documento primero.");
            return;
        }
        setStage('processing');
        setProcessLog([]);

        const steps = [
            { id: 1, icon: <Fingerprint size={14} />, text: "Calculando huella digital (SHA-256)...", delay: 1000 },
            { id: 2, icon: <Lock size={14} />, text: "Cifrando metadatos del titular...", delay: 800 },
            { id: 3, icon: <Globe size={14} />, text: "Difundiendo a nodos de red AGETIC...", delay: 1200 },
            { id: 4, icon: <Cpu size={14} />, text: "Confirmando anclaje en bloque #842,931...", delay: 1500 },
            { id: 5, icon: <Shield size={14} />, text: "Generando certificado de inmutabilidad...", delay: 1000 },
        ];

        let totalDelay = 0;
        steps.forEach((step, index) => {
            setTimeout(() => {
                setProcessLog(prev => [...prev, step]);
                if (index === steps.length - 1) {
                    setTimeout(() => {
                        setMockHash('3a7bd4...8e2f1');
                        setMockTxId('0x7a2d...f4e9');
                        setStage('result');
                    }, 800);
                }
            }, totalDelay + step.delay);
            totalDelay += step.delay;
        });
    };

    const simulateVerification = () => {
        if (!verificationFile) return;
        setIsVerifying(true);
        setTimeout(() => {
            if (verificationFile.toLowerCase().includes('original')) {
                setVerificationStatus('valid');
            } else {
                setVerificationStatus('tampered');
            }
            setIsVerifying(false);
        }, 2000);
    };

    const reset = () => {
        setStage('dashboard');
        setFileName('');
        setDescription('');
        setVerificationStatus(null);
        setVerificationFile('');
    };

    return (
        <section className="notarization-section" style={{ padding: '100px 0', background: 'radial-gradient(circle at top right, #f8fafc, #ffffff)' }}>
            <div className="container">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 20px',
                        background: '#eff6ff',
                        borderRadius: '100px',
                        color: 'var(--primary-blue)',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '20px'
                    }}>
                        <ShieldCheck size={16} /> Seguridad Criptográfica
                    </div>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1e293b', marginBottom: '15px' }}>
                        Servicio de Notarización Blockchain
                    </h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '16px' }}>
                        Proteja la integridad de sus documentos mediante el anclaje de huellas digitales en el libro mayor distribuido del Estado.
                    </p>
                </div>

                {/* Interaction Card */}
                <div style={{
                    background: 'white',
                    borderRadius: '32px',
                    boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #f1f5f9',
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: '300px 1fr',
                    minHeight: '600px'
                }}>
                    {/* Sidebar / Steps Guide */}
                    <div style={{
                        background: '#f8fafc',
                        padding: '40px',
                        borderRight: '1px solid #f1f5f9',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '30px', letterSpacing: '0.5px' }}>
                                Proceso de Registro
                            </h4>

                            <div style={{ position: 'relative' }}>
                                {/* Vertical Line */}
                                <div style={{
                                    position: 'absolute',
                                    left: '15px',
                                    top: '20px',
                                    bottom: '20px',
                                    width: '2px',
                                    background: '#e2e8f0'
                                }}></div>

                                {[
                                    { id: 'dashboard', label: 'Carga de Archivo', sub: 'Suba el documento original' },
                                    { id: 'processing', label: 'Anclaje Digital', sub: 'Generando hash SHA-256' },
                                    { id: 'result', label: 'Prueba de Existencia', sub: 'Registro completado' }
                                ].map((stepItem, idx) => {
                                    const isActive = stage === stepItem.id;
                                    const isPast = (stage === 'processing' && stepItem.id === 'dashboard') ||
                                        (stage === 'result' && (stepItem.id === 'dashboard' || stepItem.id === 'processing'));

                                    return (
                                        <div key={idx} style={{ position: 'relative', display: 'flex', gap: '20px', marginBottom: '40px', opacity: isActive || isPast ? 1 : 0.4 }}>
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: isPast ? '#10b981' : (isActive ? 'var(--primary-blue)' : 'white'),
                                                border: isActive || isPast ? 'none' : '2px solid #e2e8f0',
                                                zIndex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                transition: 'var(--transition)'
                                            }}>
                                                {isPast ? <CheckCircle2 size={16} /> : <span style={{ fontSize: '12px', fontWeight: 700, color: isActive ? 'white' : '#94a3b8' }}>{idx + 1}</span>}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: 700, color: isActive ? '#1e293b' : '#64748b' }}>{stepItem.label}</div>
                                                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{stepItem.sub}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <div style={{ background: '#ecfdf5', padding: '8px', borderRadius: '10px', color: '#10b981' }}>
                                <Database size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>Estado de Red</div>
                                <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div> Sincronizado
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div style={{ padding: '50px', position: 'relative', overflow: 'hidden' }}>

                        {/* Stage Switcher Button */}
                        <div style={{ position: 'absolute', top: '20px', right: '40px' }}>
                            <button
                                onClick={() => setStage(stage === 'verify' ? 'dashboard' : 'verify')}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    background: stage === 'verify' ? '#1e293b' : 'white',
                                    color: stage === 'verify' ? 'white' : '#475569',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'var(--transition)',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                                }}
                            >
                                {stage === 'verify' ? <FileUp size={16} /> : <FileSearch size={16} />}
                                {stage === 'verify' ? 'Ir a Registro' : 'Portal de Verificación'}
                            </button>
                        </div>

                        {stage === 'dashboard' && (
                            <div className="animate-slide" style={{ maxWidth: '600px', margin: '30px auto 0' }}>
                                <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>Cargar Documento</h3>
                                    <p style={{ color: '#64748b', fontSize: '15px' }}>Suba el archivo que desea notarizar. Generaremos una huella digital única sin almacenar el contenido del archivo.</p>
                                </div>

                                <div
                                    onClick={() => document.getElementById('file-upload').click()}
                                    style={{
                                        border: '2px dashed #e2e8f0',
                                        borderRadius: '24px',
                                        padding: '60px 40px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'var(--transition)',
                                        background: fileName ? '#f0f9ff' : '#fcfcfc',
                                        borderColor: fileName ? 'var(--primary-blue)' : '#e2e8f0',
                                        position: 'relative',
                                        boxShadow: fileName ? 'inset 0 0 0 1px var(--primary-blue)' : 'none'
                                    }}
                                >
                                    <input
                                        type="file"
                                        id="file-upload"
                                        hidden
                                        onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                                    />
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: fileName ? '#1E40AF' : '#ffffff',
                                        borderRadius: '24px',
                                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 20px',
                                        color: fileName ? 'white' : 'var(--primary-blue)',
                                        transition: 'var(--transition)'
                                    }}>
                                        {fileName ? <CheckCircle2 size={40} /> : <FileUp size={40} />}
                                    </div>
                                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                                        {fileName || "Arrastre su documento aquí"}
                                    </h4>
                                    <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                                        {fileName ? "Archivo listo para procesar" : "PDF, PNG, JPG hasta 10MB"}
                                    </p>
                                </div>

                                <div style={{ marginTop: '30px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: '#475569' }}>
                                        Etiqueta Referencial (Opcional)
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <History size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                        <input
                                            type="text"
                                            placeholder="Ej: Título de Propiedad - Lote 5"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '16px 16px 16px 48px',
                                                borderRadius: '16px',
                                                border: '1px solid #e2e8f0',
                                                fontSize: '15px',
                                                outline: 'none',
                                                background: '#f8fafc',
                                                transition: 'var(--transition)'
                                            }}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={startRegistration}
                                    disabled={!fileName}
                                    style={{
                                        width: '100%',
                                        marginTop: '40px',
                                        padding: '18px',
                                        background: fileName ? 'var(--primary-blue)' : '#e2e8f0',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '16px',
                                        fontWeight: 800,
                                        fontSize: '16px',
                                        cursor: fileName ? 'pointer' : 'not-allowed',
                                        transition: 'var(--transition)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        boxShadow: fileName ? '0 10px 30px -10px rgba(30, 64, 175, 0.5)' : 'none'
                                    }}
                                >
                                    Iniciar Notarización <ChevronRight size={20} />
                                </button>
                            </div>
                        )}

                        {stage === 'processing' && (
                            <div className="animate-slide" style={{ textAlign: 'center', paddingTop: '40px' }}>
                                <div style={{ marginBottom: '60px' }}>
                                    <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
                                        <div style={{ position: 'absolute', inset: 0, border: '6px solid #f1f5f9', borderRadius: '35%' }}></div>
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            border: '6px solid var(--primary-blue)',
                                            borderRadius: '35%',
                                            borderTopColor: 'transparent',
                                            animation: 'spin 2s cubic-bezier(0.5, 0, 0.5, 1) infinite'
                                        }}></div>
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Cpu size={48} style={{ color: 'var(--primary-blue)' }} />
                                        </div>
                                    </div>
                                    <h3 style={{ marginTop: '30px', fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>Anclando Documento...</h3>
                                    <p style={{ color: '#64748b', fontSize: '15px' }}>Este proceso es irreversible y permanente.</p>
                                </div>

                                <div style={{
                                    background: '#0f172a',
                                    borderRadius: '24px',
                                    padding: '30px',
                                    textAlign: 'left',
                                    fontFamily: '"Fira Code", monospace',
                                    fontSize: '14px',
                                    color: '#94a3b8',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                    maxWidth: '500px',
                                    margin: '0 auto'
                                }}>
                                    {processLog.map((log, i) => (
                                        <div key={i} style={{ marginBottom: '12px', display: 'flex', gap: '15px', animation: 'fadeIn 0.5s ease-out forwards' }}>
                                            <div style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px', borderRadius: '6px' }}>
                                                {log.icon}
                                            </div>
                                            <span style={{ color: '#f8fafc', alignSelf: 'center' }}>{log.text}</span>
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', paddingLeft: '44px' }}>
                                        <div style={{ width: '8px', height: '8px', background: '#38bdf8', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                                        <span style={{ color: '#38bdf8', fontSize: '12px' }}>PROCESANDO...</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {stage === 'result' && (
                            <div className="animate-slide" style={{ maxWidth: '700px', margin: '0 auto' }}>
                                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: '#ecfdf5',
                                        borderRadius: '30%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 20px',
                                        color: '#10b981',
                                        boxShadow: '0 10px 20px rgba(16, 185, 129, 0.1)'
                                    }}>
                                        <ShieldCheck size={48} />
                                    </div>
                                    <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#064e3b' }}>Registro Inmutable Completado</h3>
                                    <p style={{ color: '#64748b' }}>Su documento ha sido anclado con éxito en la red estatal de blockchain.</p>
                                </div>

                                <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px', position: 'relative' }}>

                                    {/* Data Fields */}
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Fingerprint size={12} /> Hash del Archivo (Fingerprint)
                                        </div>
                                        <div style={{ fontFamily: 'monospace', fontSize: '14px', background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', wordBreak: 'break-all', color: '#1e293b' }}>
                                            ae3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                                        </div>
                                    </div>

                                    <div style={{ gridColumn: 'span 2' }}>
                                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <History size={12} /> ID de Transacción Blockchain
                                        </div>
                                        <div style={{ fontFamily: 'monospace', fontSize: '14px', background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', color: 'var(--primary-blue)', fontWeight: 700 }}>
                                            0x7a2d42b1f8c149afbf4c8996fb92427ae41e46e9
                                        </div>
                                    </div>

                                    <div style={{ background: 'white', padding: '15px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '5px' }}>Bloque Maestro</div>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>#842,931</div>
                                    </div>

                                    <div style={{ background: 'white', padding: '15px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '5px' }}>Fecha y Hora</div>
                                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>19/02/2026 18:05</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                                    <button
                                        style={{
                                            flex: 1,
                                            padding: '18px',
                                            background: 'var(--primary-blue)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '16px',
                                            fontWeight: 800,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            cursor: 'pointer',
                                            fontSize: '15px'
                                        }}
                                    >
                                        <ExternalLink size={20} /> Certificado Digital PDF
                                    </button>
                                    <button
                                        onClick={reset}
                                        style={{
                                            padding: '18px 30px',
                                            background: '#f1f5f9',
                                            color: '#475569',
                                            border: 'none',
                                            borderRadius: '16px',
                                            fontWeight: 800,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Nuevo Trámite
                                    </button>
                                </div>
                            </div>
                        )}

                        {stage === 'verify' && (
                            <div className="animate-slide" style={{ maxWidth: '600px', margin: '30px auto 0' }}>
                                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                    <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b' }}>Portal de Auditoría</h3>
                                    <p style={{ color: '#64748b' }}>Verifique que un documento no haya sido alterado desde su registro original.</p>
                                </div>

                                <div
                                    onClick={() => document.getElementById('verify-upload').click()}
                                    style={{
                                        border: '2px dashed #cbd5e1',
                                        borderRadius: '24px',
                                        padding: '50px 40px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        background: verificationFile ? '#f8fafc' : 'transparent',
                                        borderColor: verificationStatus === 'valid' ? '#10b981' : (verificationStatus === 'tampered' ? '#ef4444' : '#cbd5e1'),
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <input
                                        type="file"
                                        id="verify-upload"
                                        hidden
                                        onChange={(e) => {
                                            setVerificationFile(e.target.files[0]?.name || '');
                                            setVerificationStatus(null);
                                        }}
                                    />
                                    <div style={{
                                        width: '70px',
                                        height: '70px',
                                        background: '#ffffff',
                                        borderRadius: '20px',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 20px',
                                        color: '#64748b'
                                    }}>
                                        {isVerifying ? <Loader2 size={36} className="spin" /> : <Search size={36} />}
                                    </div>
                                    <h4 style={{ fontSize: '18px', fontWeight: 700 }}>
                                        {verificationFile || "Seleccionar archivo para validar"}
                                    </h4>
                                    <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '5px' }}>Comparamos el contenido binario actual con el registro de la red.</p>
                                </div>

                                {verificationFile && !verificationStatus && !isVerifying && (
                                    <button
                                        onClick={simulateVerification}
                                        style={{
                                            width: '100%',
                                            marginTop: '30px',
                                            padding: '18px',
                                            background: '#1e293b',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '16px',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        Validar Integridad Criptográfica
                                    </button>
                                )}

                                {verificationStatus === 'valid' && (
                                    <div className="animate-slide" style={{ marginTop: '30px', padding: '30px', background: '#f0fdf4', borderRadius: '24px', border: '1px solid #10b981', display: 'flex', gap: '20px' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#10b981', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div>
                                            <h4 style={{ color: '#166534', fontWeight: 800, fontSize: '18px' }}>Integridad Confirmada</h4>
                                            <p style={{ fontSize: '14px', color: '#166534', opacity: 0.8, lineHeight: '1.5' }}>
                                                Este archivo es 100% idéntico al registrado originalmente. No ha sufrido alteraciones bit a bit.
                                            </p>
                                            <div style={{ marginTop: '15px', color: '#15803d', fontSize: '12px', fontWeight: 700, background: 'rgba(22, 101, 52, 0.05)', padding: '8px 12px', borderRadius: '8px', display: 'inline-block' }}>
                                                CONCORDANCIA: 100.00% | BLOQUE #842,931
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {verificationStatus === 'tampered' && (
                                    <div className="animate-slide" style={{ marginTop: '30px', padding: '30px', background: '#fef2f2', borderRadius: '24px', border: '1px solid #ef4444', display: 'flex', gap: '20px' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#ef4444', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <AlertTriangle size={24} />
                                        </div>
                                        <div>
                                            <h4 style={{ color: '#991b1b', fontWeight: 800, fontSize: '18px' }}>Archivo Alterado</h4>
                                            <p style={{ fontSize: '14px', color: '#991b1b', opacity: 0.8, lineHeight: '1.5' }}>
                                                ⚠️ ATENCIÓN: El contenido de este archivo ha sido modificado. La huella digital no coincide con los registros oficiales de AGETIC.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Badges */}
                <div style={{
                    marginTop: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px',
                    color: '#94a3b8',
                    fontSize: '13px',
                    fontWeight: 600
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Lock size={16} /> Encriptación AES-256
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Globe size={16} /> Red Descentralizada
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={16} /> Validez Legal Ley 164
                    </div>
                </div>

                <style jsx>{`
                    .spin { animation: spin 1s linear infinite; }
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.5; transform: scale(1.1); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(5px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-slide {
                        animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                `}</style>
            </div>
        </section>
    );
}
