// Modal JavaScript - Full functionality

class Modal {
    constructor(modalElement) {
        this.modal = modalElement;
        this.closeBtn = modalElement.querySelector('.modal-close');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        // Click outside modal to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        // Prevent modal content clicks from closing modal
        const modalContent = this.modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    open(content = null) {
        if (this.isOpen) return;
        
        // Set content if provided
        if (content) {
            this.setContent(content);
        }
        
        // Show modal
        this.modal.classList.add('show');
        this.isOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management
        this.focusTrap();
        
        // Trigger custom event
        this.modal.dispatchEvent(new CustomEvent('modalOpen'));
        
        // Auto focus first focusable element
        setTimeout(() => {
            const firstFocusable = this.modal.querySelector('button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 100);
    }
    
    close() {
        if (!this.isOpen) return;
        
        // Hide modal
        this.modal.classList.remove('show');
        this.isOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Trigger custom event
        this.modal.dispatchEvent(new CustomEvent('modalClose'));
    }
    
    setContent(content) {
        if (typeof content === 'string') {
            // If content is a string, set it as HTML
            const modalBody = this.modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.innerHTML = content;
            }
        } else if (typeof content === 'object') {
            // If content is an object, set title and body
            const modalTitle = this.modal.querySelector('.modal-title');
            const modalBody = this.modal.querySelector('.modal-body');
            
            if (content.title && modalTitle) {
                modalTitle.textContent = content.title;
            }
            
            if (content.body && modalBody) {
                if (typeof content.body === 'string') {
                    modalBody.innerHTML = content.body;
                } else {
                    modalBody.appendChild(content.body);
                }
            }
        }
    }
    
    focusTrap() {
        const focusableElements = this.modal.querySelectorAll(
            'button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Handle tab key
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
    
    destroy() {
        // Remove event listeners if needed
        this.close();
    }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const modalElement = document.getElementById('modal');
    
    if (modalElement) {
        const modal = new Modal(modalElement);
        
        // Make modal globally accessible
        window.modal = modal;
        
        // Example: Open modal with button click
        const openModalBtn = document.querySelector('.hero-cta');
        if (openModalBtn) {
            openModalBtn.addEventListener('click', () => {
                modal.open({
                    title: 'Welcome to JTG!',
                    body: `
                        <p>Thank you for your interest in our services. We're excited to work with you!</p>
                        <p>Our team of experts is ready to help you achieve your digital goals.</p>
                        <div style="margin-top: 20px;">
                            <button class="btn btn-primary" onclick="modal.close()">Get Started</button>
                        </div>
                    `
                });
            });
        }
        
        // Example: Open modal with custom content
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const serviceTitles = ['Web Development', 'Mobile Apps', 'UI/UX Design'];
                const serviceDescriptions = [
                    'We create custom web solutions tailored to your specific needs. From simple landing pages to complex web applications, we deliver high-quality, scalable solutions.',
                    'Native and cross-platform mobile applications that provide exceptional user experiences across all devices and platforms.',
                    'Beautiful and intuitive user experiences that engage your users and drive conversions.'
                ];
                
                modal.open({
                    title: serviceTitles[index],
                    body: `
                        <p>${serviceDescriptions[index]}</p>
                        <h4>What we offer:</h4>
                        <ul>
                            <li>Custom development solutions</li>
                            <li>Responsive design</li>
                            <li>Performance optimization</li>
                            <li>Ongoing support and maintenance</li>
                        </ul>
                        <div style="margin-top: 20px;">
                            <button class="btn btn-primary" onclick="modal.close()">Learn More</button>
                        </div>
                    `
                });
            });
        });
    }
});

// Utility function to create modal from any element
function createModal(modalSelector) {
    const modalElement = document.querySelector(modalSelector);
    if (modalElement) {
        return new Modal(modalElement);
    }
    return null;
}

// Global function to open modal with content
function openModal(content) {
    if (window.modal) {
        window.modal.open(content);
    }
}

// Global function to close modal
function closeModal() {
    if (window.modal) {
        window.modal.close();
    }
} 