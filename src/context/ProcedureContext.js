'use client';

import React, { createContext, useContext, useState } from 'react';

const mockProcedures = [
    {
        id: 1,
        name: "Reposición de Carnet de Identidad",
        category: "Identidad Legal",
        description: "Obtén un nuevo carnet de identidad en caso de robo, pérdida o extravío.",
        requirements: [
            { name: "Certificado de Nacimiento", validated: true },
            { name: "Denuncia de extravío (Policía)", validated: false },
            { name: "Boleta de pago (Banco Unión)", validated: false }
        ],
        steps: ["Inicio", "Pago", "Denuncia", "Cita SEGIP", "Recojo"],
        currentStep: 2,
        progress: 40,
        cost: "Bs. 15",
        time: "24-48 horas",
        status: "En curso"
    },
    {
        id: 2,
        name: "Licencia de Conducir (Nueva)",
        category: "Transporte",
        description: "Trámite para obtener la licencia de conducir por primera vez.",
        requirements: [
            { name: "Cédula de Identidad", validated: true },
            { name: "Certificado Médico", validated: false },
            { name: "Certificado de Antecedentes", validated: false },
            { name: "Examen de Conducir", validated: false }
        ],
        steps: ["Requisitos", "Examen Médico", "Escuela Conducción", "Emisión"],
        currentStep: 1,
        progress: 10,
        cost: "Bs. 200",
        time: "15 días",
        status: "Pendiente"
    },
    {
        id: 3,
        name: "Bono Juana Azurduy",
        category: "Salud",
        description: "Subsidio estatal para mujeres gestantes y niños menores de dos años.",
        requirements: [
            { name: "Carnet de Identidad", validated: true },
            { name: "Control Prenatal (SUS)", validated: true },
            { name: "Registro en Centro de Salud", validated: true }
        ],
        steps: ["Registro", "Verificación", "Pago 1", "Pago Final"],
        currentStep: 4,
        progress: 100,
        cost: "Gratuito",
        time: "Inmediato",
        status: "Completado"
    }
];

const ProcedureContext = createContext();

export function ProcedureProvider({ children }) {
    const [procedures, setProcedures] = useState(mockProcedures);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeProcedure, setActiveProcedure] = useState(null);
    const [aiTrigger, setAiTrigger] = useState(null);
    const [isDigitalCitizen, setIsDigitalCitizen] = useState(false);
    const [explanationType, setExplanationType] = useState(null); // 'blockchain' or 'ai'

    const toggleDigitalCitizenship = () => setIsDigitalCitizen(!isDigitalCitizen);

    const triggerAiMessage = (message) => {
        setAiTrigger({ message, timestamp: Date.now() });
    };

    const openExplanation = (type) => setExplanationType(type);
    const closeExplanation = () => setExplanationType(null);

    const filteredProcedures = selectedCategory
        ? procedures.filter(p => p.category === selectedCategory)
        : procedures;

    const detectedProcedure = searchQuery.length >= 3
        ? procedures.find(p => {
            const keywords = p.name.toLowerCase().split(' ').concat(p.category.toLowerCase().split(' '));
            return keywords.some(k => k.length > 3 && searchQuery.toLowerCase().includes(k));
        })
        : null;

    return (
        <ProcedureContext.Provider value={{
            procedures: filteredProcedures,
            searchQuery,
            setSearchQuery,
            selectedCategory,
            setSelectedCategory,
            detectedProcedure,
            activeProcedure,
            setActiveProcedure,
            aiTrigger,
            triggerAiMessage,
            isDigitalCitizen,
            toggleDigitalCitizenship,
            explanationType,
            openExplanation,
            closeExplanation
        }}>
            {children}
        </ProcedureContext.Provider>
    );
}

export const useProcedures = () => useContext(ProcedureContext);
