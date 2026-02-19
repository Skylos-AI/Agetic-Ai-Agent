'use client';

import { Settings, FileText, Activity } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useProcedures } from '@/context/ProcedureContext';

export default function ProcedureCard({ procedure }) {
    const { t } = useLanguage();
    const { setActiveProcedure } = useProcedures();

    // Map categories to icons
    const icons = {
        "Identidad Legal": <FileText size={40} strokeWidth={1} />,
        "Transporte": <Settings size={40} strokeWidth={1} />,
        "Salud": <Activity size={40} strokeWidth={1} />
    };

    return (
        <div className="inst-card animate-fade" style={{ height: '100%', flexDirection: 'column', padding: '40px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ color: '#888' }}>
                    {icons[procedure.category] || <FileText size={40} strokeWidth={1} />}
                </div>
                <span className="badge" style={{ background: '#f5f5f5', color: '#666' }}>
                    {procedure.status}
                </span>
            </div>

            <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#333', lineHeight: '1.3' }}>
                    {procedure.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                    {procedure.description.substring(0, 100)}...
                </p>
            </div>

            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: '#999' }}>
                    {t('estimated-time')}: <strong style={{ color: '#444' }}>{procedure.time}</strong>
                </div>
                <button
                    onClick={() => setActiveProcedure(procedure)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--primary-blue)',
                        fontWeight: 700,
                        fontSize: '14px',
                        cursor: 'pointer'
                    }}
                >
                    Ver trámite →
                </button>
            </div>

            {/* Progress bar in institutional style (discreet) */}
            {procedure.progress > 0 && procedure.progress < 100 && (
                <div style={{ marginTop: '15px' }}>
                    <div style={{ height: '3px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            background: 'var(--primary-blue)',
                            width: `${procedure.progress}%`
                        }}></div>
                    </div>
                </div>
            )}
        </div>
    );
}
