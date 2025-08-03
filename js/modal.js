// Modal functionality
class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.modalContent = this.modal.querySelector('.modal-content');
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.isOpen = false;
        this.previousActiveElement = null;
        
        this.init();
    }
    
    init() {
        // Close button event
        this.closeBtn.addEventListener('click', () => this.close());
        
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
        this.modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    open(content = null) {
        this.isOpen = true;
        this.modal.style.display = 'flex';
        
        // Store the currently focused element
        this.previousActiveElement = document.activeElement;
        
        // Update content if provided
        if (content) {
            this.updateContent(content);
        }
        
        // Focus the close button for accessibility
        this.closeBtn.focus();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        this.modal.classList.add('modal-open');
        
        // Announce to screen readers
        this.announceToScreenReader('Modal opened');
    }
    
    close() {
        this.isOpen = false;
        this.modal.style.display = 'none';
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Remove animation class
        this.modal.classList.remove('modal-open');
        
        // Return focus to previous element
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }
        
        // Announce to screen readers
        this.announceToScreenReader('Modal closed');
    }
    
    updateContent(content) {
        if (typeof content === 'string') {
            this.modalContent.innerHTML = content;
        } else if (content.title && content.body) {
            const title = this.modalContent.querySelector('.modal-title');
            const body = this.modalContent.querySelector('.modal-body');
            
            if (title) title.textContent = content.title;
            if (body) body.innerHTML = content.body;
        }
    }
    
    announceToScreenReader(message) {
        // Create a temporary element for screen reader announcements
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after a short delay
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Initialize modal
const modal = new Modal();

// Example usage functions
function openContactModal() {
    const content = {
        title: 'Contact Information',
        body: `
            <div class="contact-info">
                <h3>Get in Touch</h3>
                <p><strong>Email:</strong> info@jtg.com</p>
                <p><strong>Phone:</strong> +1 234 567 890</p>
                <p><strong>Address:</strong> 123 Business Street, City, State 12345</p>
                <div class="social-links">
                    <h4>Follow Us</h4>
                    <a href="#" aria-label="Facebook">Facebook</a>
                    <a href="#" aria-label="Twitter">Twitter</a>
                    <a href="#" aria-label="LinkedIn">LinkedIn</a>
                </div>
            </div>
        `
    };
    modal.open(content);
}

function openServiceModal(serviceName) {
    const content = {
        title: `${serviceName} Details`,
        body: `
            <div class="service-details">
                <h3>${serviceName}</h3>
                <p>Detailed information about our ${serviceName.toLowerCase()} services.</p>
                <ul>
                    <li>Custom solutions tailored to your needs</li>
                    <li>Expert team with years of experience</li>
                    <li>Ongoing support and maintenance</li>
                    <li>Competitive pricing and transparent quotes</li>
                </ul>
                <button class="cta-button" onclick="openContactModal()">Get a Quote</button>
            </div>
        `
    };
    modal.open(content);
}

// Make functions globally available
window.openContactModal = openContactModal;
window.openServiceModal = openServiceModal; 