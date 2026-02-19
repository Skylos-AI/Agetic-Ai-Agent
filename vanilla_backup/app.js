// --- MOCK DATA ---
const procedures = [
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
        "alert-match": "He detectado un trámite para ti:"
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
        "alert-match": "Kay ruranata tarini qampaq:"
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
        "alert-match": "Kast luraña jumanakatak jikxta:"
    }
};

let currentLang = 'es';

// --- DOM ELEMENTS ---
const mainSearch = document.getElementById('mainSearch');
const detectionAlert = document.getElementById('detectionAlert');
const proceduresGrid = document.getElementById('proceduresGrid');
const categoriesGrid = document.getElementById('categoriesGrid');
const langToggle = document.getElementById('langToggle');
const chatFab = document.getElementById('chatFab');
const chatPanel = document.getElementById('chatPanel');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const procedureModal = document.getElementById('procedureModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

// --- FUNCTIONS ---

function init() {
    renderProcedures(procedures);
    setupEventListeners();
}

function setupEventListeners() {
    mainSearch.addEventListener('input', handleSearch);
    
    langToggle.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-btn')) {
            switchLanguage(e.target.dataset.lang);
        }
    });

    chatFab.addEventListener('click', () => {
        chatPanel.style.display = chatPanel.style.display === 'flex' ? 'none' : 'flex';
    });

    sendBtn.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });

    closeModal.addEventListener('click', () => { procedureModal.style.display = 'none'; });
    
    window.onclick = (e) => {
        if (e.target === procedureModal) procedureModal.style.display = 'none';
        if (!chatPanel.contains(e.target) && e.target !== chatFab && !chatFab.contains(e.target)) {
            chatPanel.style.display = 'none';
        }
    };

    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => filterByCategory(card.dataset.category));
    });

    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            mainSearch.value = tag.innerText;
            handleSearch({ target: mainSearch });
        });
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update all i18n text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    renderProcedures(procedures); // Re-render to update dynamic text
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (query.length < 3) {
        detectionAlert.style.display = 'none';
        return;
    }

    // "NLP" Map
    const keywords = {
        "carnet": 1, "perdi": 1, "extravio": 1, "identidad": 1, "id": 1,
        "licencia": 2, "conducir": 2, "manejar": 2, "auto": 2, "driver": 2,
        "bono": 3, "juana": 3, "azurduy": 3, "subsidio": 3, "gestante": 3
    };

    let matchId = null;
    for (const key in keywords) {
        if (query.includes(key)) {
            matchId = keywords[key];
            break;
        }
    }

    if (matchId) {
        const proc = procedures.find(p => p.id === matchId);
        showDetectionAlert(proc);
    } else {
        detectionAlert.style.display = 'none';
    }
}

function showDetectionAlert(proc) {
    detectionAlert.innerHTML = `
        <div class="procedure-card animate-fade" style="border-color: var(--primary); background: var(--primary-light); flex-direction: row; align-items: center; justify-content: space-between;">
            <div style="display: flex; gap: 20px; align-items: center;">
                <div class="category-icon" style="margin: 0;"><i data-lucide="info"></i></div>
                <div>
                    <p style="font-size: 0.875rem; color: var(--primary); font-weight: 600;">${translations[currentLang]['alert-match']}</p>
                    <h3 style="margin: 0;">${proc.name}</h3>
                </div>
            </div>
            <button class="btn-primary" onclick="openProcedure(${proc.id})">${translations[currentLang]['start-btn']}</button>
        </div>
    `;
    detectionAlert.style.display = 'block';
    lucide.createIcons();
}

function renderProcedures(data) {
    proceduresGrid.innerHTML = data.map(proc => `
        <div class="procedure-card animate-fade">
            <div class="procedure-header">
                <div>
                    <p style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">${proc.category}</p>
                    <h3 style="margin-bottom: 8px;">${proc.name}</h3>
                </div>
                <span class="badge badge-active">${proc.status === 'Completado' ? 'Finalizado' : proc.status}</span>
            </div>
            <div class="progress-container">
                <div class="progress-labels">
                    <span>Progreso</span>
                    <span>${proc.progress}%</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${proc.progress}%"></div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                <div style="font-size: 0.8125rem; color: var(--text-muted);">
                    ${translations[currentLang]['estimated-time']}: <strong>${proc.time}</strong>
                </div>
                <button class="btn-primary" onclick="openProcedure(${proc.id})">${proc.progress > 0 ? translations[currentLang]['continue-btn'] : translations[currentLang]['start-btn']}</button>
            </div>
        </div>
    `).join('');
}

function filterByCategory(cat) {
    const filtered = procedures.filter(p => p.category === cat);
    renderProcedures(filtered);
    // Scroll to section
    document.querySelector('.procedures-section').scrollIntoView({ behavior: 'smooth' });
}

function openProcedure(id) {
    const proc = procedures.find(p => p.id === id);
    if (!proc) return;

    modalBody.innerHTML = `
        <div style="margin-bottom: 32px;">
            <p style="color: var(--primary); font-weight: 600; margin-bottom: 8px;">${proc.category}</p>
            <h2 style="font-size: 2rem; margin-bottom: 16px;">${proc.name}</h2>
            <p style="color: var(--text-muted); font-size: 1.125rem;">${proc.description}</p>
        </div>

        <div class="roadmap">
            ${proc.steps.map((step, idx) => `
                <div class="step ${idx < proc.currentStep ? 'completed' : (idx === proc.currentStep ? 'active' : '')}">
                    <div class="step-circle">${idx < proc.currentStep ? '<i data-lucide="check" style="width: 16px;"></i>' : idx + 1}</div>
                    <span class="step-label">${step}</span>
                </div>
            `).join('')}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 300px; gap: 40px;">
            <div>
                <h3 style="margin-bottom: 20px;">Lista de Requisitos</h3>
                <div class="requirements-list">
                    ${proc.requirements.map(req => `
                        <div class="requirement-item ${req.validated ? 'validated' : ''}">
                            <div class="req-status ${req.validated ? 'validated' : 'pending'}">
                                <i data-lucide="${req.validated ? 'shield-check' : 'circle'}"></i>
                            </div>
                            <div style="flex: 1;">
                                <p style="font-weight: 600;">${req.name}</p>
                                <p style="font-size: 0.75rem; color: var(--text-muted);">${req.validated ? translations[currentLang]['req-validated'] : translations[currentLang]['req-pending']}</p>
                            </div>
                            ${!req.validated ? '<button class="tag" style="margin: 0;">Subir</button>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            <div style="background: var(--bg-secondary); padding: 24px; border-radius: var(--radius);">
                <h3 style="margin-bottom: 16px;">Resumen</h3>
                <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.9375rem;">
                    <div style="display: flex; justify-content: space-between;">
                        <span class="text-muted">${translations[currentLang]['cost-label']}</span>
                        <strong>${proc.cost}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span class="text-muted">${translations[currentLang]['estimated-time']}</span>
                        <strong>${proc.time}</strong>
                    </div>
                    <hr style="border: none; border-top: 1px solid var(--border-color); margin: 8px 0;">
                    <button class="btn-primary" style="width: 100%;">${translations[currentLang]['continue-btn']}</button>
                </div>
            </div>
        </div>
    `;

    procedureModal.style.display = 'flex';
    lucide.createIcons();

    // Trigger AI Agent to react to the new context
    if (id === 2) { // License
        setTimeout(() => {
            addAiMessage("He notado que estás en el trámite de Licencia de Conducir. ¿Deseas que agende tu examen médico en el centro más cercano a tu ubicación?");
            chatPanel.style.display = 'flex';
        }, 1500);
    }
}

function handleChat() {
    const text = chatInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    chatInput.value = '';

    // Simple AI simulation
    setTimeout(() => {
        let response = "Entendido. Estoy procesando tu solicitud sobre '" + text + "'. ¿Deseas que te muestre los requisitos detallados?";
        
        if (text.toLowerCase().includes("hola")) response = translations[currentLang]['welcome-msg'];
        if (text.toLowerCase().includes("costo")) response = "El costo varía según el trámite, pero la mayoría de las validaciones de documentos estatales son gratuitas.";
        if (text.toLowerCase().includes("carnet") || text.toLowerCase().includes("id")) response = "Para trámites de identidad, necesitas tu certificado de nacimiento. He cargado la información en tu panel.";

        addAiMessage(response);
    }, 1000);
}

function addUserMessage(msg) {
    const div = document.createElement('div');
    div.className = 'message message-user';
    div.innerText = msg;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addAiMessage(msg) {
    const div = document.createElement('div');
    div.className = 'message message-ai';
    div.innerText = msg;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Start app
init();
