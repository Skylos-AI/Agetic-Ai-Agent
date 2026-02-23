'use client';

import { Search, Moon, ChevronDown, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useProcedures } from '@/context/ProcedureContext';

export default function Header() {
    const { lang, setLang, t } = useLanguage();
    const { isDigitalCitizen } = useProcedures();

    return (
        <header style={{ background: 'white' }}>
            {/* National Banner */}
            <div className="top-bar"></div>
            <div className="official-site">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '35px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Bolivia.svg/1200px-Flag_of_Bolivia.svg.png"
                            alt="Bolivia Flag" style={{ width: '18px', height: '12px', borderRadius: '1px' }} />
                        <span style={{ fontWeight: 500, fontSize: '11px' }}>Sitio oficial del Estado Plurinacional de Bolivia</span>
                        <ChevronDown size={12} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Moon size={16} color="#666" style={{ cursor: 'pointer' }} />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            border: '1px solid #e0e0e0',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            background: 'white',
                            width: '240px',
                            justifyContent: 'space-between'
                        }}>
                            <span style={{ color: '#999', fontSize: '13px' }}>Buscar...</span>
                            <Search size={16} color="#999" />
                        </div>

                        {isDigitalCitizen && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: '#E0F2FE',
                                padding: '6px 14px',
                                borderRadius: '30px',
                                border: '1px solid #BAE6FD',
                                animation: 'fadeIn 0.5s ease-out'
                            }}>
                                <ShieldCheck size={16} color="#0369A1" />
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0369A1' }}>Identidad Verificada</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Brand Area */}
            <div className="container" style={{ padding: '35px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    {/* Brand Identity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
                        <img src="/assets/images/LOGO AGETIC VINO HORIZONTAL (2)_1.png"
                            alt="AGETIC Logo" style={{ height: '110px', width: 'auto' }} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <h1 style={{
                                fontSize: '54px',
                                fontWeight: '300',
                                color: '#333',
                                margin: 0,
                                lineHeight: '0.9',
                                letterSpacing: '2px',
                                fontFamily: 'Montserrat, sans-serif'
                            }}>AGETIC</h1>
                            <h2 style={{
                                fontSize: '26px',
                                fontWeight: '800',
                                color: '#444',
                                margin: '8px 0 2px 0',
                                lineHeight: '1.1'
                            }}>Agencia de Gobierno Electrónico y Tecnologías de Información y Comunicación</h2>
                            <span style={{
                                fontSize: '20px',
                                color: '#666',
                                fontWeight: '300',
                                letterSpacing: '0.5px'
                            }}>Digitalizando Bolivia</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/assets/images/logo_escudo_bolivia_0_0.png"
                        alt="Escudo de Bolivia" style={{ width: '135px', height: 'auto' }} />
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="nav-menu">
                <div className="container">
                    <ul className="nav-list" style={{ gap: '25px' }}>
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
