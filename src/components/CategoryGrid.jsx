'use client';

import { User, Heart, GraduationCap, Home, Car } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useProcedures } from '@/context/ProcedureContext';

export default function CategoryGrid() {
    const { t } = useLanguage();
    const { setSelectedCategory } = useProcedures();

    const categories = [
        { id: 'cat-identity', name: 'Identidad Legal', icon: <User size={32} strokeWidth={1.5} /> },
        { id: 'cat-health', name: 'Salud', icon: <Heart size={32} strokeWidth={1.5} /> },
        { id: 'cat-education', name: 'Educación', icon: <GraduationCap size={32} strokeWidth={1.5} /> },
        { id: 'cat-housing', name: 'Vivienda', icon: <Home size={32} strokeWidth={1.5} /> },
        { id: 'cat-transport', name: 'Transporte', icon: <Car size={32} strokeWidth={1.5} /> }
    ];

    return (
        <section className="container" style={{ margin: '80px auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
                <div style={{ width: '40px', height: '2px', background: '#ccc' }}></div>
                <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#333' }}>
                    {t('categories-title')}
                </h2>
                <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
                <span style={{ fontSize: '12px', color: '#999', cursor: 'pointer' }}>Ver todas →</span>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
            }}>
                {categories.map((cat, idx) => (
                    <div
                        key={cat.id}
                        className="animate-fade"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                        onClick={() => setSelectedCategory(cat.name)}
                    >
                        <div style={{
                            background: 'white',
                            padding: '30px 20px',
                            borderRadius: '16px',
                            border: '1px solid #eee',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '15px'
                        }} className="category-hover">
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: '#fcfcfc',
                                color: '#777',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #f0f0f0'
                            }}>
                                {cat.icon}
                            </div>
                            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#444' }}>{t(cat.id)}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .category-hover:hover {
                    border-color: var(--primary-blue);
                    box-shadow: var(--shadow-sm);
                    transform: translateY(-4px);
                }
                .category-hover:hover h3 { color: var(--primary-blue); }
            `}</style>
        </section>
    );
}
