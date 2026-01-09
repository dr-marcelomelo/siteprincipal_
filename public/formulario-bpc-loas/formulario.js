const PHONE_NUMBER = "5592984812939"; // Mantendo o mesmo número do formulário original
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
    familySize: '',        // Step 5
    history: '',           // Step 6
    deficiencyType: '',    // Step 7 (Conditional)
    cadUnico: '',          // Step 8
    name: '',              // Step 9
    whatsapp: '',          // Step 10
    cityState: '',         // Step 11
    authorization: '',     // Step 12
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
        question: "Somando a renda de todas as pessoas da casa, qual é o valor aproximado por mês?",
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
        question: "Quantas pessoas moram na mesma residência?",
        subtitle: "Incluindo você e o beneficiário",
        field: "familySize",
        options: [
            { value: 'sozinho', label: 'Moro sozinho' },
            { value: '2_pessoas', label: '2 pessoas' },
            { value: '3_pessoas', label: '3 pessoas' },
            { value: '4_mais', label: '4 ou mais' }
        ]
    },
    6: {
        question: "Você já solicitou o BPC alguma vez?",
        subtitle: "Seu histórico com o INSS é importante",
        field: "history",
        options: [
            { value: 'nunca', label: 'Nunca solicitei' },
            { value: 'negado', label: 'Já solicitei e foi negado' },
            { value: 'analise', label: 'Está em análise' },
            { value: 'nao_sei', label: 'Não sei informar' }
        ]
    },
    7: {
        question: "A deficiência é de qual tipo?",
        subtitle: "Informe o tipo principal de deficiência",
        field: "deficiencyType",
        options: [
            { value: 'fisica', label: 'Física' },
            { value: 'mental', label: 'Mental / Intelectual' },
            { value: 'autismo', label: 'Autismo' },
            { value: 'doenca_grave', label: 'Doença grave' },
            { value: 'nao_sei', label: 'Não sei informar' }
        ]
    },
    8: {
        question: "Você ou o beneficiário já possuem cadastro no CadÚnico?",
        subtitle: "O Cadastro Único é utilizado para programas sociais",
        field: "cadUnico",
        options: [
            { value: 'sim', label: 'Sim' },
            { value: 'nao', label: 'Não' },
            { value: 'nao_sei', label: 'Não sei' }
        ]
    },
    9: {
        question: "Para que o Dr. Marcelo possa falar com você, qual é o seu nome?",
        subtitle: "Informe seu nome completo",
        field: "name",
        type: "text",
        placeholder: "Nome completo"
    },
    10: {
        question: "Qual é o seu WhatsApp com DDD?",
        subtitle: "Enviaremos a análise do seu caso por lá",
        field: "whatsapp",
        type: "tel",
        placeholder: "WhatsApp (com DDD)"
    },
    11: {
        question: "Em qual cidade e estado você mora?",
        subtitle: "Para verificarmos o atendimento em sua região",
        field: "cityState",
        type: "text",
        placeholder: "Cidade e Estado (Ex: Manaus/AM)"
    },
    12: {
        question: "Podemos entrar em contato pelo WhatsApp para analisar seu caso?",
        subtitle: "Autorização necessária para atendimento",
        field: "authorization",
        options: [
            { value: 'sim', label: 'Sim, autorizo o contato' }
        ]
    }
};

function updateProgress() {
    // Total steps effectively might be 11 or 12 depending on skip, but keeping it simple based on currentStep index relative to max
    // Since we skip step 7 visually, we can just map current step to progress
    // Max steps is 12.
    const percent = Math.round((currentStep / 12) * 100);
    document.getElementById('currentStep').textContent = currentStep;
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

    if (step.type === "text" || step.type === "tel") {
        const value = formData[step.field] || '';
        const inputType = step.type === 'tel' ? 'tel' : 'text';
        
        // Icon selection based on field
        let iconPath = '';
        if (step.field === 'name') {
            iconPath = 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z';
        } else if (step.field === 'whatsapp') {
            iconPath = 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z';
        } else if (step.field === 'cityState') {
            iconPath = 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z';
        }

        html += `
            <div class="relative">
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gold-medium" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path>
                </svg>
                <input type="${inputType}" id="${step.field}Input" placeholder="${step.placeholder}" value="${value}"
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
    const isFinalStep = currentStep === 12;
    
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
    
    // Auto advance for option steps (except maybe multiselect if we had any, but we don't)
    // Actually the maternity form waited for "Continuar" usually?
    // Looking at the original code: `selectOption` calls `renderStep`. `nextStep` is called by the button.
    // So user selects option, it highlights, then user clicks "Continuar".
    // I will stick to this pattern to allow changing mind before next.
    renderStep();
}

function isStepValid() {
    const step = steps[currentStep];
    if (step.type === "text" || step.type === "tel") {
        const val = formData[step.field] || '';
        if (step.field === 'whatsapp') {
            // Basic validation for whatsapp (at least 10 digits)
            return val.replace(/\D/g, '').length >= 10;
        }
        return val.trim() !== '';
    } else {
        return formData[step.field] !== '';
    }
}

function nextStep() {
    // Determine next step index
    let nextStepIndex = currentStep + 1;

    // Skip Step 7 if not "deficiencia" in Step 2
    if (currentStep < 7 && nextStepIndex === 7) {
        if (formData.bpcType !== 'deficiencia') {
            nextStepIndex = 8;
        }
    }

    // Submit if we are at step 12
    if (currentStep === 12) {
        submitForm();
        return;
    }

    currentStep = nextStepIndex;
    markFormStarted(); // Track form start
    updateProgress();
    renderStep();
}

function previousStep() {
    let prevStepIndex = currentStep - 1;

    // Skip Step 7 backwards if we skipped it forwards
    if (currentStep > 7 && prevStepIndex === 7) {
        if (formData.bpcType !== 'deficiencia') {
            prevStepIndex = 6;
        }
    }

    if (prevStepIndex >= 1) {
        currentStep = prevStepIndex;
        updateProgress();
        renderStep();
    }
}

function showDisqualification(message) {
    // This form doesn't really disqualify, but keeping function just in case
    sendToWebhook('disqualified', message);
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', 'lead_desqualificado', {
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
    let leadQuality = 'Normal'; // Default
    let tags = [];

    // Lead Scoring Logic
    // Step 3: Grade de idade
    if (formData.age === '65_mais') {
        tags.push('Idoso Quente');
        leadQuality = 'Alto';
    } else if (formData.age === 'menos_18') {
        tags.push('Menor de idade (Avaliar Deficiência)');
        leadQuality = 'Morno';
    }

    // Step 4: Renda
    if (formData.income === 'acima_2_sm') {
        tags.push('Renda Alta (Risco)');
        leadQuality = 'Baixo'; // Ponto de corte (não priorizar)
    } else if (formData.income === 'entre_1_2_sm') {
        leadQuality = 'Morno';
    }

    // Step 5: Composição Familiar
    if (formData.familySize === 'sozinho' && formData.income !== 'sem_renda' && formData.income !== 'ate_1_sm') {
         tags.push('Mora sozinho c/ renda (Alerta)');
    }

    // Step 6: Histórico
    if (formData.history === 'negado') {
        tags.push('Negado anteriormente (Ouro)');
        leadQuality = 'Muito Alto';
    } else if (formData.history === 'nunca') {
        // Normal
    }

    // Step 8: CadUnico
    if (formData.cadUnico === 'nao' || formData.cadUnico === 'nao_sei') {
        tags.push('Sem CadÚnico (Alinhar)');
    }

    // Build UTM section
    const hasUTM = Object.values(formData.utm).some(value => value !== '');
    let utmSection = '';
    if (hasUTM) {
        utmSection = '\n\n🔗 *Origem do Lead:*';
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
        familySize: { 'sozinho': 'Mora sozinho', '2_pessoas': '2 pessoas', '3_pessoas': '3 pessoas', '4_mais': '4 ou mais' },
        history: { 'nunca': 'Nunca solicitou', 'negado': 'Já foi negado', 'analise': 'Em análise', 'nao_sei': 'Não sabe' },
        deficiencyType: { 'fisica': 'Física', 'mental': 'Mental/Intelectual', 'autismo': 'Autismo', 'doenca_grave': 'Doença grave', 'nao_sei': 'Não sabe' },
        cadUnico: { 'sim': 'Sim', 'nao': 'Não', 'nao_sei': 'Não sabe' },
        authorization: { 'sim': 'Sim, autorizo o contato' }
    };

    const deficiencyLine = formData.bpcType === 'deficiencia' ? `\nDeficiência: ${labels.deficiencyType[formData.deficiencyType] || 'N/A'}` : '';

    const message = `*LEAD - BPC / LOAS*
⭐ *Qualidade:* ${leadQuality}
🏷️ *Tags:* ${tags.join(', ') || 'Nenhuma'}

📋 *Dados do Lead:*
Nome: ${formData.name}
WhatsApp: ${formData.whatsapp}
Cidade/UF: ${formData.cityState}

📝 *Respostas:*
Beneficiário: ${labels.beneficiary[formData.beneficiary]}
Tipo: ${labels.bpcType[formData.bpcType]}
Idade: ${labels.age[formData.age]}
Renda Familiar: ${labels.income[formData.income]}
Pessoas na casa: ${labels.familySize[formData.familySize]}
Histórico INSS: ${labels.history[formData.history]}${deficiencyLine}
Tem CadÚnico?: ${labels.cadUnico[formData.cadUnico]}

✅ *Autorização:* ${labels.authorization[formData.authorization]}${utmSection}`;

    const encodedMessage = encodeURIComponent(message);

    // Send qualified lead data to webhook
    sendToWebhook('qualified', null, { leadQuality, tags, message });

    // Fire Meta Pixel
    if (typeof fbq !== 'undefined') {
        const firstName = formData.name.split(' ')[0].toLowerCase().trim();
        const lastName = formData.name.split(' ').slice(1).join(' ').toLowerCase().trim();
        const phone = "55" + formData.whatsapp.replace(/\D/g, '');
        
        let externalId = localStorage.getItem('lead_external_id_bpc');
        if (!externalId) {
            externalId = 'lead_bpc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('lead_external_id_bpc', externalId);
        }

        const userData = {
            fn: firstName,
            ln: lastName,
            ph: phone,
            external_id: externalId,
            country: 'br'
        };

        fbq('trackCustom', 'lead_qualificado_bpc', {
            content_name: 'BPC LOAS',
            lead_quality: leadQuality,
            tags: tags.join(','),
            external_id: externalId
        });

        fbq('track', 'Lead', {
            content_name: 'BPC LOAS',
            value: leadQuality === 'Muito Alto' ? 50 : (leadQuality === 'Alto' ? 20 : 5),
            currency: 'BRL',
            lead_quality: leadQuality,
            external_id: externalId
        }, userData);
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
            fbq('trackCustom', 'n_enviou_form_bpc', { 
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

renderStep();
updateProgress();
