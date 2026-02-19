'use client';

import React, { createContext, useContext, useState } from 'react';

const translations = {
    es: {
        "header-title": "AGETIC",
        "hero-title": "¿Qué trámite deseas realizar hoy?",
        "search-placeholder": "Escribe lo que necesitas (ej: Perdí mi carnet)...",
        "tag-id": "Renovar Carnet",
        "tag-license": "Licencia de Conducir",
        "tag-health": "Seguro de Salud",
        "tag-education": "Certificado Notas",
        "categories-title": "Categorías de Vida",
        "cat-identity": "Identidad Legal",
        "cat-health": "Salud",
        "cat-education": "Educación",
        "cat-housing": "Vivienda",
        "cat-transport": "Transporte",
        "active-procedures": "Mis Trámites Activos",
        "agent-name": "Asistente Digital",
        "agent-status": "En línea - Listo para ayudar",
        "welcome-msg": "¡Hola! Soy tu asistente ciudadano. ¿En qué trámite puedo orientarte hoy?",
        "chat-placeholder": "Escribe un mensaje...",
        "user-name": "Juan Pérez",
        "start-btn": "Iniciar Trámite",
        "continue-btn": "Continuar",
        "details-btn": "Ver detalles",
        "estimated-time": "Tiempo estimado",
        "cost-label": "Costo",
        "req-validated": "Validado en sistema",
        "req-pending": "Pendiente de entrega",
        "alert-match": "He detectado un trámite para ti:",
        "carnet-response": "Para trámites de identidad, necesitas tu certificado de nacimiento. He cargado la información en tu panel.",
        "cost-response": "El costo varía según el trámite, pero la mayoría de las validaciones de documentos estatales son gratuitas.",
        "generic-response": "Entendido. Estoy procesando tu solicitud sobre '{query}'. ¿Deseas que te muestre los requisitos detallados?"
    },
    qu: {
        "header-title": "AGETIC",
        "hero-title": "Imatata punchay rurayta munanki?",
        "search-placeholder": "Munaskaykita qillqay...",
        "tag-id": "Yupananchata jukmanta ruray",
        "tag-license": "Antawa purichina p'anqa",
        "tag-health": "Qhalikay qhawanapaq",
        "tag-education": "Yachay wasi qillqa",
        "categories-title": "Kawsaypa t'aqankuna",
        "cat-identity": "Kikinyachiy",
        "cat-health": "Qhalikay",
        "cat-education": "Yachay",
        "cat-housing": "Wasi",
        "cat-transport": "Antawakuna",
        "active-procedures": "Rurachkanki chaykuna",
        "agent-name": "Yanapaq",
        "agent-status": "Llamkachkan - Yanapasurqanki",
        "welcome-msg": "¡Allillachu! Ñuqa kani yanapaqniyki. Ima ruranapitaq yanapasayki?",
        "chat-placeholder": "Qillqay kayman...",
        "user-name": "Juan Pérez",
        "start-btn": "Qallariy",
        "continue-btn": "Kallpachakuy",
        "details-btn": "Allinta qhaway",
        "estimated-time": "Hayk'aq tukunqa",
        "cost-label": "Chani",
        "req-validated": "Llamkaypi kachkan",
        "req-pending": "Mana kanchu",
        "alert-match": "Kay ruranata tarini qampaq:",
        "carnet-response": "Kikinyachiy ruranapaqqa, paqariymanta qillqaykita munanki. Willaytaqa ñawpaqman churaniña.",
        "cost-response": "Chaninqa sapa ruranamanjina t'aqakun, ichaqa astawanqa ruranakunaqa mana chaninniyuq kanku.",
        "generic-response": "Allin. Llamkachkani ruranaykimanta '{query}'. Munankichu rikuchisayki imakunachus munasqaykita?"
    },
    ay: {
        "header-title": "AGETIC",
        "hero-title": "Kuna lurañsa jichhür lurañ muntasti?",
        "search-placeholder": "Muntaita qillqt'am...",
        "tag-id": "Uñt'añ p'anqa Machaq",
        "tag-license": "Auto apnaqaña p'anqa",
        "tag-health": "Qullañ uta",
        "tag-education": "Yatiqañ uta",
        "categories-title": "Jakawi t'aqanaka",
        "cat-identity": "Jakawi",
        "cat-health": "Qullaña",
        "cat-education": "Yatiqaña",
        "cat-housing": "Uta",
        "cat-transport": "Autonaka",
        "active-procedures": "Luraskta ukanaka",
        "agent-name": "Yanapaña",
        "agent-status": "Akanwa - Yanapt'awu",
        "welcome-msg": "¡Aski alwa! Nayax yanapirisitwa. Kuns yanpt'irisma?",
        "chat-placeholder": "Qillqt'am...",
        "user-name": "Juan Pérez",
        "start-btn": "Qalltaña",
        "continue-btn": "Sartaña",
        "details-btn": "Uñjaña",
        "estimated-time": "Kunan tukunqa",
        "cost-label": "Qullqi",
        "req-validated": "Luratawa",
        "req-pending": "Jan kanchu",
        "alert-match": "Kast luraña jumanakatak jikxta:",
        "carnet-response": "Jakawi lurañatakix, yuriwi p'anqam munasta. Yatichawix panel ch'usamaruw uskuwayta.",
        "cost-response": "Qullqix lurañarjamaw mayjt'i, jilpachax estado ukan ruranakapax gratis ukhamawa.",
        "generic-response": "Yatiytawa. Lurasktawa '{query}' uka mayitamarjama. Munatasti uñjaña kuna p'anqanakas munasi?"
    }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('es');

    const t = (key) => translations[lang][key] || key;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
