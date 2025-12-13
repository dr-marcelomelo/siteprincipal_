import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LeadModalContextType {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export const LeadModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <LeadModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </LeadModalContext.Provider>
    );
};

export const useLeadModal = () => {
    const context = useContext(LeadModalContext);
    if (context === undefined) {
        throw new Error('useLeadModal must be used within a LeadModalProvider');
    }
    return context;
};
