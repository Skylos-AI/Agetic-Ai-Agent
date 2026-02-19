'use client';

import { Search, Moon, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
    const { lang, setLang, t } = useLanguage();

    return (
        <header style={{ background: 'white' }}>
            {/* National Banner */}
            <div className="top-bar"></div>
            <div className="official-site">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Bolivia.svg/1200px-Flag_of_Bolivia.svg.png"
                            alt="Bolivia Flag" style={{ width: '20px', height: '14px', borderRadius: '2px' }} />
                        <span style={{ fontWeight: 500 }}>Sitio oficial del Estado Plurinacional de Bolivia</span>
                        <ChevronDown size={14} />
                    </div>
                    {/* Centered logic: Language switcher moved to AI Agent for cleaner header */}
                    <div style={{ fontSize: '10px', opacity: 0.6, letterSpacing: '0.5px' }}>
                        AGENCIA DE GOBIERNO ELECTRÓNICO
                    </div>
                </div>
            </div>

            {/* Main Brand Area */}
            <div className="container" style={{ padding: '30px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ position: 'relative', width: '220px', height: '80px', display: 'flex', alignItems: 'center' }}>
                        <img src="/assets/images/LOGO AGETIC VINO HORIZONTAL (2)_1.png"
                            alt="AGETIC" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    {/* Right side icons and Shield */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#f5f5f5', padding: '10px 20px', borderRadius: '30px' }}>
                        <Moon size={18} color="#666" />
                        <div style={{ width: '1px', height: '20px', background: '#ddd' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Search size={18} color="#999" />
                            <span style={{ color: '#999', fontSize: '14px' }}>Buscar...</span>
                        </div>
                    </div>
                    <img src="/assets/images/logo_escudo_bolivia_0_0.png"
                        alt="Escudo Bolivia" style={{ width: '80px' }} />
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="nav-menu">
                <div className="container">
                    <ul className="nav-list">
                        <li className="nav-item">Institucional <ChevronDown size={14} /></li>
                        <li className="nav-item" style={{ color: 'var(--primary-blue)' }}>Trámites y Servicios <ChevronDown size={14} /></li>
                        <li className="nav-item">Comunicación <ChevronDown size={14} /></li>
                        <li className="nav-item">Normativa <ChevronDown size={14} /></li>
                        <li className="nav-item">Recursos Humanos <ChevronDown size={14} /></li>
                        <li className="nav-item">Contrataciones <ChevronDown size={14} /></li>
                        <li className="nav-item">Contacto <ChevronDown size={14} /></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
