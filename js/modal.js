/**
 * Enhanced Modal Implementation
 * Advanced modal functionality with multiple types and improved UX
 */

class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.modalContent = this.modal.querySelector('.modal-content');
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.modalTitle = this.modal.querySelector('.modal-title');
        this.modalBody = this.modal.querySelector('.modal-body');
        
        this.isOpen = false;
        this.previousFocus = null;
        this.focusableElements = [];
        
        this.init();
    }

    init() {
        // Event listeners
        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Focus management
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabKey(e);
            }
        });
    }

    // Open modal with custom content
    open(title = 'Modal Title', content = 'Modal content', type = 'default') {
        this.modalTitle.textContent = title;
        this.modalBody.innerHTML = content;
        
        // Add type-specific styling
        this.modal.className = `modal modal-${type}`;
        
        // Show modal
        this.modal.style.display = 'flex';
        this.modal.classList.add('modal-open');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management
        this.previousFocus = document.activeElement;
        this.focusableElements = this.getFocusableElements();
        
        // Focus first focusable element
        if (this.focusableElements.length > 0) {
            this.focusableElements[0].focus();
        }
        
        this.isOpen = true;
        
        // Trigger animation
        setTimeout(() => {
            this.modalContent.classList.add('modal-content-visible');
        }, 10);
    }

    // Close modal
    close() {
        this.modalContent.classList.remove('modal-content-visible');
        
        setTimeout(() => {
            this.modal.style.display = 'none';
            this.modal.classList.remove('modal-open');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Restore focus
            if (this.previousFocus) {
                this.previousFocus.focus();
            }
            
            this.isOpen = false;
        }, 300);
    }

    // Get focusable elements within modal
    getFocusableElements() {
        return Array.from(this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ));
    }

    // Handle tab key for focus trapping
    handleTabKey(e) {
        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    // Open contact form modal
    openContactModal() {
        const contactContent = `
            <form class="modal-contact-form">
                <div class="form-group">
                    <label for="modal-name">Name</label>
                    <input type="text" id="modal-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="modal-email">Email</label>
                    <input type="email" id="modal-email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="modal-phone">Phone</label>
                    <input type="tel" id="modal-phone" name="phone">
                </div>
                <div class="form-group">
                    <label for="modal-message">Message</label>
                    <textarea id="modal-message" name="message" rows="4" required></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="modal.close()">Cancel</button>
                    <button type="submit" class="btn-primary">Send Message</button>
                </div>
            </form>
        `;
        
        this.open('Contact Us', contactContent, 'contact');
        
        // Add form submission handler
        const form = this.modal.querySelector('.modal-contact-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmit(form);
        });
    }

    // Open service details modal
    openServiceModal(serviceName, serviceDescription, serviceFeatures) {
        const featuresList = serviceFeatures.map(feature => `<li>${feature}</li>`).join('');
        
        const serviceContent = `
            <div class="service-modal-content">
                <div class="service-info">
                    <h3>${serviceName}</h3>
                    <p>${serviceDescription}</p>
                </div>
                <div class="service-features">
                    <h4>Key Features:</h4>
                    <ul>${featuresList}</ul>
                </div>
                <div class="service-cta">
                    <button class="btn-primary" onclick="modal.openContactModal()">Get Quote</button>
                    <button class="btn-secondary" onclick="modal.close()">Close</button>
                </div>
            </div>
        `;
        
        this.open(serviceName, serviceContent, 'service');
    }

    // Handle contact form submission
    handleContactSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.showSuccessMessage('Thank you! Your message has been sent successfully.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Show success message
    showSuccessMessage(message) {
        const successContent = `
            <div class="success-message">
                <div class="success-icon">✓</div>
                <h3>Success!</h3>
                <p>${message}</p>
                <button class="btn-primary" onclick="modal.close()">Close</button>
            </div>
        `;
        
        this.open('Success', successContent, 'success');
    }

    // Open image gallery modal
    openImageModal(imageSrc, imageAlt, imageTitle) {
        const imageContent = `
            <div class="image-modal-content">
                <img src="${imageSrc}" alt="${imageAlt}" class="modal-image">
                <div class="image-caption">
                    <h3>${imageTitle}</h3>
                    <p>${imageAlt}</p>
                </div>
            </div>
        `;
        
        this.open(imageTitle, imageContent, 'image');
    }

    // Open confirmation modal
    openConfirmModal(title, message, onConfirm, onCancel) {
        const confirmContent = `
            <div class="confirm-modal-content">
                <p>${message}</p>
                <div class="confirm-actions">
                    <button class="btn-secondary" onclick="modal.handleConfirmCancel()">Cancel</button>
                    <button class="btn-danger" onclick="modal.handleConfirmAction()">Confirm</button>
                </div>
            </div>
        `;
        
        this.open(title, confirmContent, 'confirm');
        
        // Store callbacks
        this.confirmCallback = onConfirm;
        this.cancelCallback = onCancel;
    }

    // Handle confirmation action
    handleConfirmAction() {
        if (this.confirmCallback) {
            this.confirmCallback();
        }
        this.close();
    }

    // Handle confirmation cancel
    handleConfirmCancel() {
        if (this.cancelCallback) {
            this.cancelCallback();
        }
        this.close();
    }
}

// Initialize modal when DOM is loaded
let modal;
document.addEventListener('DOMContentLoaded', () => {
    modal = new Modal();
});

// Global functions for easy access
window.openContactModal = () => modal.openContactModal();
window.openServiceModal = (name, desc, features) => modal.openServiceModal(name, desc, features);
window.openImageModal = (src, alt, title) => modal.openImageModal(src, alt, title);
window.openConfirmModal = (title, message, onConfirm, onCancel) => modal.openConfirmModal(title, message, onConfirm, onCancel); 