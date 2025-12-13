import React, { useState } from 'react';
import { X, Send, User, Phone, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeadModal } from '../context/LeadModalContext';
import { PHONE_NUMBER } from '../constants';

const LeadCaptureModal = () => {
    const { isModalOpen, closeModal } = useLeadModal();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [interest, setInterest] = useState('Direito Trabalhista');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Format message
        const message = `Olá, me chamo *${name}*.%0A` +
            `Meu telefone é *${phone}*.%0A` +
            `Tenho interesse em *${interest}*.%0A` +
            `Gostaria de agendar uma consulta.%0A` +
            `_(Vim pelo site)_`;

        const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${message}`;

        window.open(whatsappUrl, '_blank');
        closeModal();

        // Optional: Reset form
        setName('');
        setPhone('');
        setInterest('Direito Trabalhista');
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-neutral-deepBlack border border-gold-medium/30 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden"
                    >
                        {/* Decorative Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-medium/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Header */}
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-medium mb-2">
                                Fale com um Especialista
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Preencha seus dados para receber um atendimento personalizado no WhatsApp.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name Input */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1 block">
                                    Seu Nome
                                </label>
                                <div className="relative">
                                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-medium" />
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Digite seu nome completo"
                                        className="w-full bg-neutral-darkGray border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-medium focus:ring-1 focus:ring-gold-medium transition-all"
                                    />
                                </div>
                            </div>

                            {/* Phone Input */}
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-300 ml-1 block">
                                    Seu Telefone
                                </label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-medium" />
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="(00) 00000-0000"
                                        className="w-full bg-neutral-darkGray border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-medium focus:ring-1 focus:ring-gold-medium transition-all"
                                    />
                                </div>
                            </div>

                            {/* Interest Select */}
                            <div className="space-y-2">
                                <label htmlFor="interest" className="text-sm font-medium text-gray-300 ml-1 block">
                                    Área de Interesse
                                </label>
                                <div className="relative">
                                    <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-medium" />
                                    <select
                                        id="interest"
                                        value={interest}
                                        onChange={(e) => setInterest(e.target.value)}
                                        className="w-full bg-neutral-darkGray border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gold-medium focus:ring-1 focus:ring-gold-medium transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Direito Trabalhista">Direito Trabalhista</option>
                                        <option value="Direito Previdenciário (INSS)">Direito Previdenciário (INSS)</option>
                                        <option value="Direito do Consumidor">Direito do Consumidor</option>
                                        <option value="Direito Cível">Direito Cível</option>
                                        <option value="Outros Assuntos">Outros Assuntos</option>
                                    </select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gold-medium hover:bg-gold-light text-neutral-deepBlack font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-gold-medium/20 mt-4"
                            >
                                <span>Iniciar Atendimento</span>
                                <Send size={18} />
                            </button>

                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LeadCaptureModal;
