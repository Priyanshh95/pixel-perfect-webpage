// Modal functionality (simplified for portfolio website)

class Modal {
    constructor() {
        this.modals = document.querySelectorAll('.modal');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Close modal when clicking outside
        this.modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
            
            // Close button
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeModal(modal);
                });
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Focus management
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    }
    
    closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    closeAllModals() {
        this.modals.forEach(modal => {
            this.closeModal(modal);
        });
    }
}

// Initialize modals when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new Modal();
});

// Global functions for opening modals (if needed)
window.openModal = function(modalId) {
    const modalInstance = new Modal();
    modalInstance.openModal(modalId);
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const modalInstance = new Modal();
        modalInstance.closeModal(modal);
    }
}; 