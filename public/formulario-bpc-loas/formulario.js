const PHONE_NUMBER = "5592984812939";
let currentStep = 1;

// Extract UTM parameters from URL
function getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_term: urlParams.get('utm_term') || '',
        utm_content: urlParams.get('utm_content') || ''
    };
}

const formData = {
    beneficiary: '',       // Step 1
    bpcType: '',           // Step 2
    age: '',               // Step 3
    income: '',            // Step 4
    name: '',              // Step 5 (Combined)
    whatsapp: '',          // Step 5 (Combined)
    state: '',             // Step 6 (Split)
    city: '',              // Step 6 (Split)
    authorization: '',     // Step 7
    utm: getUTMParameters()
};

const steps = {
    1: {
        question: "O benefício é para quem?",
        subtitle: "Para iniciarmos, precisamos saber quem será o beneficiário",
        field: "beneficiary",
        options: [
            { value: 'mim', label: 'Para mim' },
            { value: 'familiar', label: 'Para um familiar' }
        ]
    },
    2: {
        question: "Qual dessas opções melhor descreve o seu caso?",
        subtitle: "Isso nos ajuda a direcionar para o especialista correto",
        field: "bpcType",
        options: [
            { value: 'idoso', label: 'BPC para Idoso (65 anos ou mais)' },
            { value: 'deficiencia', label: 'BPC para Pessoa com Deficiência' },
            { value: 'nao_sei', label: 'Não tenho certeza' }
        ]
    },
    3: {
        question: "Qual a idade do beneficiário?",
        subtitle: "A idade é um critério importante para a concessão",
        field: "age",
        options: [
            { value: 'menos_18', label: 'Menos de 18' },
            { value: '18_64', label: '18 a 64' },
            { value: '65_mais', label: '65 ou mais' }
        ]
    },
    4: {
        question: "Somando a renda de todos da casa, qual é o valor aproximado por mês?",
        subtitle: "O BPC avalia a condição socioeconômica da família",
        field: "income",
        options: [
            { value: 'sem_renda', label: 'Não possui renda' },
            { value: 'ate_1_sm', label: 'Até 1 salário mínimo' },
            { value: 'entre_1_2_sm', label: 'Entre 1 e 2 salários mínimos' },
            { value: 'acima_2_sm', label: 'Acima de 2 salários mínimos' }
        ]
    },
    5: {
        question: "Para que o Dr. Marcelo possa analisar seu caso, informe:",
        subtitle: "Seus dados estão seguros conosco",
        type: "mixed_contact",
    },
    6: {
        question: "Em qual cidade e estado você mora?",
        subtitle: "Selecione seu estado e cidade",
        type: "location_select"
    },
    7: {
        question: "Podemos entrar em contato pelo WhatsApp para analisar seu caso?",
        subtitle: "Autorização necessária para atendimento",
        field: "authorization",
        options: [
            { value: 'sim', label: 'Sim, autorizo o contato' }
        ]
    }
};

// --- IBGE API & Location Logic ---
let statesList = [];
let citiesCache = {};

async function loadStates() {
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        statesList = await response.json();
        // If current step is 6, re-render to populate dropdown
        if (currentStep === 6) renderStep();
    } catch (error) {
        console.error("Erro ao carregar estados:", error);
    }
}

async function loadCities(uf) {
    if (citiesCache[uf]) return citiesCache[uf];

    // Disable city select while loading
    const citySelect = document.getElementById('citySelect');
    if (citySelect) {
        citySelect.innerHTML = '<option value="">Carregando...</option>';
        citySelect.disabled = true;
    }

    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        const cities = await response.json();
        citiesCache[uf] = cities;
        populateCities(cities);
    } catch (error) {
        console.error("Erro ao carregar cidades:", error);
    }
}

function populateCities(cities) {
    const citySelect = document.getElementById('citySelect');
    if (!citySelect) return;

    let html = '<option value="">Selecione a cidade</option>';
    cities.forEach(city => {
        const isSelected = formData.city === city.nome;
        html += `<option value="${city.nome}" ${isSelected ? 'selected' : ''}>${city.nome}</option>`;
    });

    citySelect.innerHTML = html;
    citySelect.disabled = false;
}

function handleStateChange(e) {
    const uf = e.target.value;
    formData.state = uf;
    formData.city = ''; // Reset city when state changes
    renderNavigation(); // Update button state

    if (uf) {
        loadCities(uf);
    } else {
        const citySelect = document.getElementById('citySelect');
        if (citySelect) {
            citySelect.innerHTML = '<option value="">Selecione o estado primeiro</option>';
            citySelect.disabled = true;
        }
    }
}

function handleCityChange(e) {
    formData.city = e.target.value;
    renderNavigation();
}

// --------------------------------

function updateProgress() {
    const percent = Math.round((currentStep / 7) * 100);
    document.getElementById('currentStep').textContent = currentStep;
    // Forçar a atualização do total de etapas caso o HTML estivesse cacheado ou diferente
    const stepText = document.querySelector('#currentStep').parentElement;
    if (stepText) {
        stepText.innerHTML = `Etapa <span id="currentStep">${currentStep}</span> de 7`;
    }
    document.getElementById('progress').textContent = percent;
    document.getElementById('progressBar').style.width = percent + '%';
}

function renderStep() {
    const step = steps[currentStep];
    const container = document.getElementById('stepContent');

    let html = `
        <div class="space-y-6 animate-fadeIn">
            <div>
                <h3 class="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
                    ${step.question}
                </h3>
                <p class="text-gray-400 text-sm">${step.subtitle}</p>
            </div>
    `;

    if (step.type === "mixed_contact") {
        html += `
            <div class="space-y-4">
                <div class="relative">
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gold-medium" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <input type="text" id="nameInput" placeholder="Nome completo" value="${formData.name}"
                        oninput="handleInput('name')"
                        class="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-800 bg-neutral-deepBlack text-white placeholder-gray-500 focus:border-gold-medium focus:outline-none transition-all">
                </div>
                <div class="relative">
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gold-medium" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <input type="tel" id="whatsappInput" placeholder="WhatsApp (com DDD)" value="${formData.whatsapp}"
                        oninput="handleInput('whatsapp')"
                        class="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-800 bg-neutral-deepBlack text-white placeholder-gray-500 focus:border-gold-medium focus:outline-none transition-all">
                </div>
            </div>
        `;
    }
    else if (step.type === "location_select") {
        // State Options
        let stateOptions = '<option value="">Selecione o estado</option>';
        if (statesList.length > 0) {
            statesList.forEach(st => {
                const isSelected = formData.state === st.sigla;
                stateOptions += `<option value="${st.sigla}" ${isSelected ? 'selected' : ''}>${st.nome}</option>`;
            });
        } else {
            stateOptions += '<option value="">Carregando estados...</option>';
        }

        html += `
            <div class="space-y-4">
                <div class="relative">
                    <label class="block text-sm text-gray-400 mb-1 ml-1">Estado</label>
                    <div class="relative">
                        <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gold-medium pointer-events-none" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path>
                        </svg>
                        <select id="stateSelect" onchange="handleStateChange(event)"
                            class="w-full pl-12 pr-8 py-4 rounded-xl border-2 border-neutral-800 bg-neutral-deepBlack text-white focus:border-gold-medium focus:outline-none transition-all appearance-none cursor-pointer">
                            ${stateOptions}
                        </select>
                        <svg class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>

                <div class="relative">
                     <label class="block text-sm text-gray-400 mb-1 ml-1">Cidade</label>
                     <div class="relative">
                        <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gold-medium pointer-events-none" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <select id="citySelect" onchange="handleCityChange(event)" disabled
                            class="w-full pl-12 pr-8 py-4 rounded-xl border-2 border-neutral-800 bg-neutral-deepBlack text-white focus:border-gold-medium focus:outline-none transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            <option value="">Selecione o estado primeiro</option>
                        </select>
                         <svg class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>
        `;

        // If validation logic was already running, we might need to populate cities on re-render
        if (formData.state && citiesCache[formData.state]) {
            setTimeout(() => {
                populateCities(citiesCache[formData.state]);
            }, 0);
        } else if (formData.state) {
            loadCities(formData.state);
        }
    }
    else if (step.type === "text") {
        const value = formData[step.field] || '';
        html += `
            <div class="relative">
                <input type="text" id="${step.field}Input" placeholder="${step.placeholder}" value="${value}"
                    oninput="handleInput('${step.field}')"
                    class="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-800 bg-neutral-deepBlack text-white placeholder-gray-500 focus:border-gold-medium focus:outline-none transition-all">
            </div>
        `;
    } else {
        html += '<div class="space-y-3">';
        step.options.forEach(option => {
            const isSelected = formData[step.field] === option.value;
            html += `
                <button onclick="selectOption('${step.field}', '${option.value}')" 
                    class="w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${isSelected ? 'border-gold-medium bg-gold-medium/10 text-white' : 'border-neutral-800 bg-neutral-deepBlack text-gray-300 hover:border-gold-medium/50'}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <span class="font-medium">${option.label}</span>
                        </div>
                        ${isSelected ? '<svg class="text-gold-medium" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : ''}
                    </div>
                </button>
            `;
        });
        html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
    renderNavigation();
}

function handleInput(field) {
    const input = document.getElementById(`${field}Input`);
    if (input) {
        formData[field] = input.value;
        renderNavigation();
    }
}

function renderNavigation() {
    const nav = document.getElementById('navigationButtons');
    let html = '';

    if (currentStep > 1) {
        html += `
            <button onclick="previousStep()" class="flex-1 inline-flex items-center justify-center px-8 py-3 text-lg font-medium transition-all duration-300 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white border-2 border-neutral-700 hover:border-neutral-600">
                <svg class="mr-2" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Voltar
            </button>
        `;
    }

    const isValid = isStepValid();
    const isFinalStep = currentStep === 7;

    html += `
        <button onclick="nextStep()" ${!isValid ? 'disabled' : ''} 
            class="flex-1 inline-flex items-center justify-center px-8 py-3 text-lg font-medium transition-all duration-300 rounded-full ${isValid ? 'bg-gold-medium hover:bg-gold-dark text-white shadow-lg hover:shadow-xl' : 'bg-neutral-800 text-gray-500 cursor-not-allowed'}">
            ${isFinalStep ? 'Enviar Análise' : 'Continuar'}
            <svg class="ml-2" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>
    `;

    nav.innerHTML = html;
}

function selectOption(field, value) {
    formData[field] = value;
    renderStep();
}

function isStepValid() {
    const step = steps[currentStep];

    if (step.type === "mixed_contact") {
        const name = formData.name || '';
        const whatsapp = formData.whatsapp || '';
        const nameValid = name.trim().length >= 3;
        const phoneValid = whatsapp.replace(/\D/g, '').length >= 10;
        return nameValid && phoneValid;
    }
    else if (step.type === "location_select") {
        return formData.state !== '' && formData.city !== '';
    }
    else if (step.type === "text") {
        const val = formData[step.field] || '';
        return val.trim() !== '';
    }
    else {
        return formData[step.field] !== '';
    }
}

function nextStep() {
    // Check Disqualifications

    // Step 4: Income > 2 SM
    if (currentStep === 4 && formData.income === 'acima_2_sm') {
        showDisqualification('Com base na renda informada, seu perfil pode não se enquadrar nos critérios essenciais do BPC/LOAS, que exige renda familiar per capita reduzida.');
        return;
    }

    // Submit if we are at final step
    if (currentStep === 7) {
        submitForm();
        return;
    }

    currentStep++;
    markFormStarted();
    updateProgress();
    renderStep();
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgress();
        renderStep();
    }
}

function showDisqualification(message) {
    sendToWebhook('disqualified', message);

    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', 'bpc_desqualificado', {
            reason: message,
            step: currentStep,
            formData: formData
        });
    }

    document.getElementById('formContainer').classList.add('hidden');
    document.getElementById('disqualificationMessage').classList.remove('hidden');
    document.getElementById('disqualificationText').textContent = message;
}

function submitForm() {
    // Calculate scoring / tags
    let leadQuality = 'Normal';
    let tags = [];

    // Lead Scoring Logic

    // Age
    if (formData.age === '65_mais') {
        tags.push('Idoso Quente');
        leadQuality = 'Alto';
    } else if (formData.age === 'menos_18') {
        leadQuality = 'Morno';
    }

    // Income
    if (formData.income === 'entre_1_2_sm') {
        leadQuality = 'Morno';
    } else if (formData.income === 'sem_renda' || formData.income === 'ate_1_sm') {
        if (leadQuality === 'Alto') leadQuality = 'Muito Alto';
    }

    // Type
    if (formData.bpcType === 'deficiencia') {
        tags.push('PDC');
    }

    // Build UTM section
    const hasUTM = Object.values(formData.utm).some(value => value !== '');
    let utmSection = '';
    if (hasUTM) {
        utmSection = '\n\n🔗 *Origem do Contato:*';
        if (formData.utm.utm_source) utmSection += `\nFonte: ${formData.utm.utm_source}`;
        if (formData.utm.utm_medium) utmSection += `\nMídia: ${formData.utm.utm_medium}`;
        if (formData.utm.utm_campaign) utmSection += `\nCampanha: ${formData.utm.utm_campaign}`;
        if (formData.utm.utm_term) utmSection += `\nTermo: ${formData.utm.utm_term}`;
        if (formData.utm.utm_content) utmSection += `\nConteúdo: ${formData.utm.utm_content}`;
    }

    // Labels for message
    const labels = {
        beneficiary: { 'mim': 'Para mim', 'familiar': 'Para um familiar' },
        bpcType: { 'idoso': 'Idoso (65+)', 'deficiencia': 'Pessoa com Deficiência', 'nao_sei': 'Não tem certeza' },
        age: { 'menos_18': 'Menos de 18', '18_64': '18 a 64', '65_mais': '65 ou mais' },
        income: { 'sem_renda': 'Não possui renda', 'ate_1_sm': 'Até 1 SM', 'entre_1_2_sm': 'Entre 1 e 2 SM', 'acima_2_sm': 'Acima de 2 SM' },
        authorization: { 'sim': 'Sim, autorizo o contato' }
    };

    const message = `*Contato - BPC / LOAS*

📋 *Dados do Contato:*
Nome: ${formData.name}
WhatsApp: ${formData.whatsapp}
Cidade: ${formData.city} / ${formData.state}

📝 *Respostas:*
Beneficiário: ${labels.beneficiary[formData.beneficiary]}
Tipo: ${labels.bpcType[formData.bpcType]}
Idade: ${labels.age[formData.age]}
Renda Familiar: ${labels.income[formData.income]}

✅ *Autorização:* ${labels.authorization[formData.authorization]}${utmSection}`;

    const encodedMessage = encodeURIComponent(message);

    // Send qualified lead data to webhook
    // Includes externalId for CAPI
    let externalId = localStorage.getItem('lead_external_id_bpc');
    if (!externalId) {
        externalId = 'lead_bpc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('lead_external_id_bpc', externalId);
    }

    sendToWebhook('qualified', null, {
        leadQuality,
        tags,
        message,
        externalId
    });

    // Fire Meta Pixel
    if (typeof fbq !== 'undefined') {
        const firstName = formData.name.split(' ')[0].toLowerCase().trim();
        const lastName = formData.name.split(' ').slice(1).join(' ').toLowerCase().trim();
        const phone = "55" + formData.whatsapp.replace(/\D/g, '');

        const userData = {
            fn: firstName,
            ln: lastName,
            ph: phone,
            external_id: externalId,
            ct: formData.city.toLowerCase(),
            st: formData.state.toLowerCase(),
            country: 'br'
        };

        // Atualizar dados do usuário para Advanced Matching
        fbq('init', '1385665022550986', userData);

        fbq('trackCustom', 'bpc_qualificado', {
            content_name: 'BPC LOAS',
            lead_quality: leadQuality,
            tags: tags.join(','),
            external_id: externalId
        }, { eventID: externalId });

        fbq('track', 'Lead', {
            content_name: 'BPC LOAS',
            value: leadQuality === 'Muito Alto' ? 50 : (leadQuality === 'Alto' ? 20 : 5),
            currency: 'BRL',
            lead_quality: leadQuality,
            external_id: externalId
        }, { eventID: externalId });
    }

    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
}

// Webhook function
function sendToWebhook(status, disqualificationReason, extraData = {}) {
    const webhookUrl = 'https://dev-manager-01-n8n.ekupxt.easypanel.host/webhook/bpcloas';

    const payload = {
        status: status,
        timestamp: new Date().toISOString(),
        formType: 'BPC-LOAS',
        ...extraData,
        disqualificationReason: disqualificationReason || null,
        formData: formData
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).catch(console.error);
}

// Form abandonment tracking
let formStarted = false;
let formCompleted = false;

function markFormStarted() {
    if (!formStarted && currentStep > 1) {
        formStarted = true;
    }
}

window.addEventListener('beforeunload', function (e) {
    if (formStarted && !formCompleted) {
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', 'bpc_n_enviou_form', {
                last_step: currentStep,
                formData: formData
            });
        }

        const webhookUrl = 'https://dev-manager-01-n8n.ekupxt.easypanel.host/webhook/bpcloas';
        const payload = {
            status: 'abandoned',
            formType: 'BPC-LOAS',
            timestamp: new Date().toISOString(),
            lastStep: currentStep,
            formData: formData
        };

        if (navigator.sendBeacon) {
            navigator.sendBeacon(webhookUrl, JSON.stringify(payload));
        }
    }
});

// Init
loadStates();
renderStep();
updateProgress();
