// Modal functionality for portfolio website

class Modal {
    constructor() {
        this.modals = document.querySelectorAll('.modal');
        this.activeModal = null;
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
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal(this.activeModal);
            }
        });
        
        // Prevent modal content clicks from closing modal
        this.modals.forEach(modal => {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
        });
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            // Close any existing modal
            if (this.activeModal) {
                this.closeModal(this.activeModal);
            }
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            this.activeModal = modal;
            
            // Focus management
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.focus();
            }
            
            // Animate skill bars if it's the skills modal
            if (modalId === 'skillsModal') {
                this.animateSkillBars(modal);
            }
        }
    }
    
    closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        this.activeModal = null;
    }
    
    closeAllModals() {
        this.modals.forEach(modal => {
            this.closeModal(modal);
        });
    }
    
    animateSkillBars(modal) {
        const skillBars = modal.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
    }
}

// Initialize modals when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.modalInstance = new Modal();
});

// Global functions for opening and closing modals
window.openModal = function(modalId) {
    if (window.modalInstance) {
        window.modalInstance.openModal(modalId);
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal && window.modalInstance) {
        window.modalInstance.closeModal(modal);
    }
}; 