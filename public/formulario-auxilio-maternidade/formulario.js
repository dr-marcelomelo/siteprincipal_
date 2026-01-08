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
    hasChild: '',
    inssContribution: '',
    workSituation: '',
    birthDate: '',
    previousAttempt: '',
    wantsContact: '',
    name: '',
    whatsapp: '',
    email: '',
    utm: getUTMParameters()
};

const steps = {
    1: {
        question: "Você já teve filho(a) ou está grávida atualmente?",
        subtitle: "Esta informação é essencial para verificar sua elegibilidade",
        field: "hasChild",
        options: [
            { value: 'teve', label: 'Já tive filho(a)' },
            { value: 'gravida', label: 'Estou grávida' },
            { value: 'nao', label: 'Não' }
        ]
    },
    2: {
        question: "Você contribuiu ou contribui para o INSS?",
        subtitle: "Qualificação jurídica do seu caso",
        field: "inssContribution",
        options: [
            { value: 'sim_atual', label: 'Sim, contribuo atualmente' },
            { value: 'sim_passado', label: 'Já contribuí no passado' },
            { value: 'segurado_especial', label: 'Sou segurado especial (Agricultor/Pescador)' },
            { value: 'nunca', label: 'Nunca contribuí' },
            { value: 'nao_sei', label: 'Não sei informar' }
        ]
    },
    3: {
        question: "Qual era sua situação de trabalho antes da gravidez ou parto?",
        subtitle: "Essencial para o advogado avaliar seu caso",
        field: "workSituation",
        options: [
            { value: 'clt', label: 'Carteira assinada (CLT)' },
            { value: 'mei', label: 'MEI / Autônoma' },
            { value: 'desempregada', label: 'Desempregada' },
            { value: 'rural', label: 'Trabalhadora rural' },
            { value: 'domestica', label: 'Empregada doméstica' }
        ]
    },
    4: {
        question: "Quando foi o parto ou qual a data prevista?",
        subtitle: "Quanto mais recente, maior a urgência do seu caso",
        field: "birthDate",
        type: "date"
    },
    5: {
        question: "Você já tentou solicitar o auxílio-maternidade no INSS?",
        subtitle: "Pedidos negados normalmente têm maior chance de sucesso com advogado",
        field: "previousAttempt",
        options: [
            { value: 'aprovado', label: 'Sim, foi aprovado' },
            { value: 'negado', label: 'Sim, foi negado' },
            { value: 'nao', label: 'Ainda não solicitei' }
        ]
    },
    6: {
        question: "Você deseja falar com um advogado especialista para analisar seu caso agora?",
        subtitle: "Última etapa de qualificação",
        field: "wantsContact",
        options: [
            { value: 'sim', label: 'Sim, quero falar no WhatsApp' },
            { value: 'nao', label: 'Não, só queria informações' }
        ]
    },
    7: {
        question: "Últimos dados para contato",
        subtitle: "Você está quase lá! Preencha seus dados para falarmos com você",
        type: "form"
    }
};

function updateProgress() {
    const percent = Math.round((currentStep / 7) * 100);
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

    if (step.type === "date") {
        const selectedDate = formData.birthDate ? new Date(formData.birthDate) : null;
        const displayDate = selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'Selecione uma data';

        html += `
            <div class="relative">
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gold-medium z-10 pointer-events-none" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <button type="button" id="datePickerButton" onclick="toggleCalendar()" 
                    class="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-800 bg-neutral-deepBlack text-white focus:border-gold-medium focus:outline-none transition-all text-left ${!selectedDate ? 'text-gray-500' : ''}">
                    ${displayDate}
                </button>
                <div id="calendarDropdown" class="hidden absolute top-full left-0 right-0 mt-2 bg-neutral-darkGray border-2 border-neutral-800 rounded-xl p-4 z-20 shadow-2xl">
                    <div class="flex items-center justify-between mb-4">
                        <button type="button" onclick="changeMonth(-1)" class="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <span id="calendarMonthYear" class="font-serif text-lg font-bold text-white"></span>
                        <button type="button" onclick="changeMonth(1)" class="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="calendar-grid text-center text-xs mb-2">
                        <div class="text-gray-400 font-bold">Dom</div>
                        <div class="text-gray-400 font-bold">Seg</div>
                        <div class="text-gray-400 font-bold">Ter</div>
                        <div class="text-gray-400 font-bold">Qua</div>
                        <div class="text-gray-400 font-bold">Qui</div>
                        <div class="text-gray-400 font-bold">Sex</div>
                        <div class="text-gray-400 font-bold">Sáb</div>
                    </div>
                    <div id="calendarDays" class="calendar-grid text-sm"></div>
                </div>
            </div>
        `;
    } else if (step.type === "form") {
        html += `
            <div class="space-y-4">
                <div class="relative">
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gold-medium" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <input type="text" id="nameInput" placeholder="Nome completo" value="${formData.name}"
                        oninput="renderNavigation()"
                        class="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-800 bg-neutral-deepBlack text-white placeholder-gray-500 focus:border-gold-medium focus:outline-none transition-all">
                </div>
                <div class="relative">
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gold-medium" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <input type="tel" id="whatsappInput" placeholder="WhatsApp (com DDD)" value="${formData.whatsapp}"
                        oninput="renderNavigation()"
                        class="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-800 bg-neutral-deepBlack text-white placeholder-gray-500 focus:border-gold-medium focus:outline-none transition-all">
                </div>
                <div class="relative">
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gold-medium" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <input type="email" id="emailInput" placeholder="E-mail (opcional)" value="${formData.email}"
                        class="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-800 bg-neutral-deepBlack text-white placeholder-gray-500 focus:border-gold-medium focus:outline-none transition-all">
                </div>
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
                            ${option.badge ? `<span class="text-xs bg-gold-medium text-neutral-deepBlack px-2 py-1 rounded-full font-bold">${option.badge}</span>` : ''}
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
    html += `
        <button onclick="nextStep()" ${!isValid ? 'disabled' : ''} 
            class="flex-1 inline-flex items-center justify-center px-8 py-3 text-lg font-medium transition-all duration-300 rounded-full ${isValid ? 'bg-gold-medium hover:bg-gold-dark text-white shadow-lg hover:shadow-xl' : 'bg-neutral-800 text-gray-500 cursor-not-allowed'}">
            ${currentStep === 7 ? 'Enviar' : 'Continuar'}
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
    if (step.type === "date") {
        return formData.birthDate !== '';
    } else if (step.type === "form") {
        const nameInput = document.getElementById('nameInput');
        const whatsappInput = document.getElementById('whatsappInput');

        if (!nameInput || !whatsappInput) return false;

        const name = nameInput.value.trim();
        const whatsapp = whatsappInput.value.trim();

        return name !== '' && whatsapp !== '';
    } else {
        return formData[step.field] !== '';
    }
}

function nextStep() {
    // Save form data if on step 7
    if (currentStep === 7) {
        formData.name = document.getElementById('nameInput').value;
        formData.whatsapp = document.getElementById('whatsappInput').value;
        formData.email = document.getElementById('emailInput')?.value || '';
    }

    // Step 1: Disqualify if "Não"
    if (currentStep === 1 && formData.hasChild === 'nao') {
        showDisqualification('No momento, o auxílio-maternidade é destinado apenas para quem está grávida ou já teve filho(a).');
        return;
    }

    // Step 2: Disqualify if never contributed to INSS
    if (currentStep === 2 && formData.inssContribution === 'nunca') {
        showDisqualification('Para ter direito ao auxílio-maternidade, é necessário ter contribuído para o INSS em algum momento. Entre em contato se tiver dúvidas sobre sua situação previdenciária.');
        return;
    }

    // Step 4: Disqualify if birth date is more than 5 years ago
    if (currentStep === 4 && formData.birthDate) {
        const birthDate = new Date(formData.birthDate);
        const today = new Date();
        const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());

        if (birthDate < fiveYearsAgo) {
            showDisqualification('Infelizmente, o prazo legal para solicitar o auxílio-maternidade é de até 5 anos após o parto. Seu caso ultrapassou esse período.');
            return;
        }
    }

    // Step 5: Disqualify if benefit was already approved
    if (currentStep === 5 && formData.previousAttempt === 'aprovado') {
        showDisqualification('Que ótimo que você já conseguiu seu auxílio-maternidade! Se precisar de ajuda com outros assuntos jurídicos, estaremos à disposição.');
        return;
    }

    // Step 6: Disqualify if "Não"
    if (currentStep === 6 && formData.wantsContact === 'nao') {
        showDisqualification('Quando quiser uma análise profissional, estaremos à disposição.');
        return;
    }

    // Step 7: Submit
    if (currentStep === 7) {
        submitForm();
        return;
    }

    currentStep++;
    markFormStarted(); // Track form start
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
    // Send disqualified lead data to webhook
    sendToWebhook('disqualified', message);

    // Fire Meta Pixel event for disqualified lead
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

function restartForm() {
    currentStep = 1;
    for (let key in formData) {
        formData[key] = '';
    }
    document.getElementById('formContainer').classList.remove('hidden');
    document.getElementById('disqualificationMessage').classList.add('hidden');
    updateProgress();
    renderStep();
}

function submitForm() {
    // Calculate lead quality
    let leadQuality = 'Médio';
    if (formData.previousAttempt === 'negado') {
        leadQuality = 'Premium';
    } else if (formData.workSituation === 'clt') {
        leadQuality = 'Alto';
    }

    // Calculate urgency
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const urgency = diffDays <= 120 ? 'Alta' : 'Média';

    // Labels
    const labels = {
        hasChild: { 'teve': 'Já teve filho(a)', 'gravida': 'Está grávida' },
        inssContribution: {
            'sim_atual': 'Sim, contribuo atualmente',
            'sim_passado': 'Já contribuí no passado',
            'segurado_especial': 'Segurado especial (Agricultor/Pescador)',
            'nunca': 'Nunca contribuí',
            'nao_sei': 'Não sei informar'
        },
        workSituation: {
            'clt': 'Carteira assinada (CLT)',
            'mei': 'MEI / Autônoma',
            'desempregada': 'Desempregada',
            'rural': 'Trabalhadora rural',
            'domestica': 'Empregada doméstica'
        },
        previousAttempt: {
            'aprovado': 'Sim, foi aprovado',
            'negado': 'Sim, foi negado',
            'nao': 'Ainda não solicitei'
        }
    };

    // Build UTM section if any UTM parameters exist
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

    const message = `*LEAD - AUXÍLIO MATERNIDADE*

📋 *Dados do Lead:*
Nome: ${formData.name}
WhatsApp: ${formData.whatsapp}${formData.email ? `\nE-mail: ${formData.email}` : ''}

📝 *Informações:*
Situação: ${labels.hasChild[formData.hasChild]}
Contribuição INSS: ${labels.inssContribution[formData.inssContribution]}
Trabalho: ${labels.workSituation[formData.workSituation]}
Data do parto: ${new Date(formData.birthDate).toLocaleDateString('pt-BR')}
Tentativa anterior: ${labels.previousAttempt[formData.previousAttempt]}${utmSection}`;

    const encodedMessage = encodeURIComponent(message);

    // Send qualified lead data to webhook
    sendToWebhook('qualified', null);

    // Fire Meta Pixel event for qualified lead with all data
    if (typeof fbq !== 'undefined') {
        // Preparar dados avançados para correspondência (Advanced Matching)
        const firstName = formData.name.split(' ')[0].toLowerCase().trim();
        const lastName = formData.name.split(' ').slice(1).join(' ').toLowerCase().trim();
        const phone = "55" + formData.whatsapp.replace(/\D/g, ''); // Adiciona DDI 55 e remove não-números
        const email = formData.email ? formData.email.toLowerCase().trim() : undefined;

        // Gerar ou recuperar ID externo único para desduplicação
        let externalId = localStorage.getItem('lead_external_id');
        if (!externalId) {
            externalId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('lead_external_id', externalId);
        }

        const userData = {
            fn: firstName,
            ln: lastName,
            ph: phone,
            em: email,
            external_id: externalId,
            country: 'br'
        };

        // 1. Disparar evento CUSTOMIZADO (mantendo histórico antigo)
        fbq('trackCustom', 'lead_qualificado', {
            content_name: 'Auxílio Maternidade',
            lead_quality: leadQuality,
            urgency: urgency,
            // Dados originais legíveis
            name: formData.name,
            phone: formData.whatsapp,
            email: formData.email || '',
            has_child: formData.hasChild,
            inss_contribution: formData.inssContribution,
            work_situation: formData.workSituation,
            birth_date: formData.birthDate,
            previous_attempt: formData.previousAttempt,
            // Dados de matching também no custom
            external_id: externalId
        });

        // 2. Disparar evento PADRÃO 'Lead' (Melhor otimização do algoritmo)
        // Usamos os dados de usuário formatados para maximizar o Match Quality
        fbq('track', 'Lead', {
            content_name: 'Auxílio Maternidade',
            value: leadQuality === 'Premium' ? 10 : 1, // Valor estimado para o algoritmo priorizar leads melhores
            currency: 'BRL',
            lead_quality: leadQuality,
            external_id: externalId
        }, userData); // Passa userData como parâmetro explícito para matching
    }

    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
}

// Webhook function to send data to n8n
function sendToWebhook(status, disqualificationReason) {
    const webhookUrl = 'https://dev-manager-01-n8n.ekupxt.easypanel.host/webhook/auxiliomaternidade';

    // Calculate lead quality and urgency if qualified
    let leadQuality = 'Não qualificado';
    let urgency = 'N/A';

    if (status === 'qualified') {
        if (formData.previousAttempt === 'negado') {
            leadQuality = 'Premium';
        } else if (formData.workSituation === 'clt') {
            leadQuality = 'Alto';
        } else {
            leadQuality = 'Médio';
        }

        if (formData.birthDate) {
            const birthDate = new Date(formData.birthDate);
            const today = new Date();
            const diffTime = Math.abs(today.getTime() - birthDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            urgency = diffDays <= 120 ? 'Alta' : 'Média';
        }
    }

    const payload = {
        status: status,
        timestamp: new Date().toISOString(),
        leadQuality: leadQuality,
        urgency: urgency,
        disqualificationReason: disqualificationReason || null,
        disqualificationStep: status === 'disqualified' ? currentStep : null,
        externalId: localStorage.getItem('lead_external_id'), // Envia ID único para o n8n (útil para API de Conversões)
        formData: {
            hasChild: formData.hasChild,
            inssContribution: formData.inssContribution,
            workSituation: formData.workSituation,
            birthDate: formData.birthDate,
            previousAttempt: formData.previousAttempt,
            wantsContact: formData.wantsContact,
            name: formData.name || '',
            whatsapp: formData.whatsapp || '',
            email: formData.email || '',
            utm: formData.utm
        }
    };

    // Send to webhook
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }).catch(error => {
        console.error('Error sending to webhook:', error);
    });
}

// Calendar functionality
let currentCalendarDate = new Date();
let isCalendarOpen = false;

function toggleCalendar() {
    isCalendarOpen = !isCalendarOpen;
    const dropdown = document.getElementById('calendarDropdown');
    if (isCalendarOpen) {
        dropdown.classList.remove('hidden');
        renderCalendar();
    } else {
        dropdown.classList.add('hidden');
    }
}

function changeMonth(delta) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
    renderCalendar();
}

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    // Update month/year display
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    document.getElementById('calendarMonthYear').textContent = `${monthNames[month]} ${year}`;

    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get today for highlighting
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

    // Get selected date
    const selectedDate = formData.birthDate ? new Date(formData.birthDate) : null;

    // Build calendar grid
    let html = '';

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day disabled"></div>';
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        const isToday = isCurrentMonth && day === today.getDate();
        const isSelected = selectedDate && dateStr === formData.birthDate;

        let classes = 'calendar-day text-white';
        if (isToday) classes += ' today';
        if (isSelected) classes += ' selected';

        html += `<div class="${classes}" onclick="selectDate('${dateStr}')">${day}</div>`;
    }

    document.getElementById('calendarDays').innerHTML = html;
}

function selectDate(dateStr) {
    formData.birthDate = dateStr;
    toggleCalendar();
    renderStep();
}

// Close calendar when clicking outside
document.addEventListener('click', function (event) {
    const calendar = document.getElementById('calendarDropdown');
    const button = document.getElementById('datePickerButton');
    if (calendar && button && isCalendarOpen &&
        !calendar.contains(event.target) &&
        !button.contains(event.target)) {
        toggleCalendar();
    }
});

// Form abandonment tracking
let formStarted = false;
let formCompleted = false;

// Mark form as started when user interacts
function markFormStarted() {
    if (!formStarted && currentStep > 1) {
        formStarted = true;
    }
}

// Track when user leaves page without completing
window.addEventListener('beforeunload', function (e) {
    if (formStarted && !formCompleted) {
        // Fire Meta Pixel event
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', 'n_enviou_form', {
                last_step: currentStep,
                formData: formData
            });
        }

        // Send to webhook
        const webhookUrl = 'https://dev-manager-01-n8n.ekupxt.easypanel.host/webhook/auxiliomaternidade';
        const payload = {
            status: 'abandoned',
            timestamp: new Date().toISOString(),
            lastStep: currentStep,
            formData: formData
        };

        // Use sendBeacon for reliable tracking on page unload
        if (navigator.sendBeacon) {
            navigator.sendBeacon(webhookUrl, JSON.stringify(payload));
        }
    }
});

// Initialize
renderStep();
