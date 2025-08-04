/**
 * Enhanced Form Validation and Testing Module
 * Comprehensive form validation and testing for all website functionality
 */

// Form validation for contact form

class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.fields = {};
        this.errors = {};
        
        if (!this.form) {
            console.warn('Form not found:', formSelector);
            return;
        }
        
        this.init();
    }
    
    init() {
        this.setupFields();
        this.setupEventListeners();
        this.setupRealTimeValidation();
    }
    
    setupFields() {
        // Get all form fields
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            const fieldName = input.name;
            this.fields[fieldName] = input;
            
            // Create error container if it doesn't exist
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('field-error')) {
                const errorContainer = document.createElement('div');
                errorContainer.className = 'field-error';
                errorContainer.style.cssText = `
                    color: #dc3545;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                    display: none;
                `;
                input.parentNode.insertBefore(errorContainer, input.nextSibling);
            }
        });
    }
    
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateForm();
        });
        
        // Add blur event listeners for immediate feedback
        Object.values(this.fields).forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field.name);
            });
            
            field.addEventListener('input', () => {
                this.clearFieldError(field.name);
            });
        });
    }
    
    setupRealTimeValidation() {
        // Real-time validation for specific fields
        const emailField = this.fields['email'];
        if (emailField) {
            emailField.addEventListener('input', () => {
                if (emailField.value && !this.isValidEmail(emailField.value)) {
                    this.showFieldError('email', 'Please enter a valid email address');
                } else {
                    this.clearFieldError('email');
                }
            });
        }
        
        const nameField = this.fields['fullName'];
        if (nameField) {
            nameField.addEventListener('input', () => {
                if (nameField.value && nameField.value.length < 2) {
                    this.showFieldError('fullName', 'Name must be at least 2 characters long');
                } else {
                    this.clearFieldError('fullName');
                }
            });
        }
    }
    
    validateForm() {
        this.errors = {};
        
        // Validate required fields
        Object.entries(this.fields).forEach(([fieldName, field]) => {
            if (field.hasAttribute('required') && !field.value.trim()) {
                this.errors[fieldName] = 'This field is required';
            }
        });
        
        // Validate email
        const email = this.fields['email']?.value;
        if (email && !this.isValidEmail(email)) {
            this.errors['email'] = 'Please enter a valid email address';
        }
        
        // Validate name length
        const name = this.fields['fullName']?.value;
        if (name && name.length < 2) {
            this.errors['fullName'] = 'Name must be at least 2 characters long';
        }
        
        // Validate message length
        const message = this.fields['message']?.value;
        if (message && message.length < 10) {
            this.errors['message'] = 'Message must be at least 10 characters long';
        }
        
        // Display errors or submit form
        if (Object.keys(this.errors).length > 0) {
            this.displayErrors();
            return false;
        } else {
            this.submitForm();
            return true;
        }
    }
    
    validateField(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return;
        
        const value = field.value.trim();
        
        // Clear previous error
        this.clearFieldError(fieldName);
        
        // Check required fields
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(fieldName, 'This field is required');
            return false;
        }
        
        // Field-specific validation
        switch (fieldName) {
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    this.showFieldError(fieldName, 'Please enter a valid email address');
                    return false;
                }
                break;
                
            case 'fullName':
                if (value && value.length < 2) {
                    this.showFieldError(fieldName, 'Name must be at least 2 characters long');
                    return false;
                }
                break;
                
            case 'message':
                if (value && value.length < 10) {
                    this.showFieldError(fieldName, 'Message must be at least 10 characters long');
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    showFieldError(fieldName, message) {
        const field = this.fields[fieldName];
        if (!field) return;
        
        const errorContainer = field.nextElementSibling;
        if (errorContainer && errorContainer.classList.contains('field-error')) {
            errorContainer.textContent = message;
            errorContainer.style.display = 'block';
            
            // Add error styling to field
            field.style.borderColor = '#dc3545';
            field.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
        }
    }
    
    clearFieldError(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return;
        
        const errorContainer = field.nextElementSibling;
        if (errorContainer && errorContainer.classList.contains('field-error')) {
            errorContainer.style.display = 'none';
            
            // Remove error styling from field
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }
    }
    
    displayErrors() {
        Object.entries(this.errors).forEach(([fieldName, message]) => {
            this.showFieldError(fieldName, message);
        });
        
        // Show general error message
        this.showNotification('Please correct the errors above.', 'error');
        
        // Focus on first error field
        const firstErrorField = Object.keys(this.errors)[0];
        if (firstErrorField && this.fields[firstErrorField]) {
            this.fields[firstErrorField].focus();
        }
    }
    
    submitForm() {
        // Show success message
        this.showNotification('Form submitted successfully!', 'success');
        
        // Reset form
        this.form.reset();
        
        // Clear all field errors
        Object.keys(this.fields).forEach(fieldName => {
            this.clearFieldError(fieldName);
        });
        
        // Simulate form submission (replace with actual submission logic)
        console.log('Form data:', this.getFormData());
    }
    
    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#28a745';
                break;
            case 'error':
                notification.style.backgroundColor = '#dc3545';
                break;
            default:
                notification.style.backgroundColor = '#17a2b8';
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new FormValidator('.contact-form');
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
} 