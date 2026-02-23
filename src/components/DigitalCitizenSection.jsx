'use client';

import { useProcedures } from '@/context/ProcedureContext';
import { ShieldCheck } from 'lucide-react';

export default function DigitalCitizenSection() {
    const { isDigitalCitizen } = useProcedures();

    return (
        <section className="citizen-section container">
            <div className="citizen-grid">
                <div className="dark-card" style={{ position: 'relative' }}>
                    {isDigitalCitizen && (
                        <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            <ShieldCheck size={14} color="#10B981" />
                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>Activo</span>
                        </div>
                    )}
                    <span style={{ fontSize: '12px', fontWeight: 700, marginBottom: '10px', display: 'block' }}>CD</span>
                    <h2>Registro en Ciudadanía Digital</h2>
                    <p>
                        Ciudadanía Digital es la identidad digital de las y los ciudadanos bolivianos, mediante la misma podrás interactuar con el Estado boliviano a través de servicios...
                    </p>
                    <a href="#" className="btn-link">{isDigitalCitizen ? 'Ver mi registro →' : 'Ver trámite →'}</a>
                </div>
                <div className="dark-card">
                    <h2>Verifica tu registro en Ciudadanía Digital</h2>
                    <p>
                        La constancia de registro es un archivo digital en formato PDF que certifica que, al momento de realizar la consulta, la persona cuenta con un registro activo en Ciudadanía Digital.
                    </p>
                    <a href="#" className="btn-link">Descargar Constancia →</a>
                </div>
            </div>
        </section>
    );
}
