// Carousel JavaScript - Full functionality

class Carousel {
    constructor(container) {
        this.container = container;
        this.wrapper = container.querySelector('.carousel-wrapper');
        this.slides = container.querySelectorAll('.carousel-slide');
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');
        this.dots = container.querySelectorAll('.dot');
        
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.autoSlideInterval = null;
        this.autoSlideDelay = 5000; // 5 seconds as per requirements
        
        this.init();
    }
    
    init() {
        if (this.slideCount === 0) return;
        
        this.setupEventListeners();
        this.updateCarousel();
        this.startAutoSlide();
        this.setupKeyboardSupport();
        this.setupTouchSupport();
    }
    
    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause auto-slide on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
        
        // Pause auto-slide when user interacts
        this.container.addEventListener('touchstart', () => this.pauseAutoSlide());
        this.container.addEventListener('mousedown', () => this.pauseAutoSlide());
    }
    
    setupKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (this.container.contains(document.activeElement) || 
                this.container.matches(':hover')) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prevSlide();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextSlide();
                        break;
                }
            }
        });
    }
    
    setupTouchSupport() {
        let startX = 0;
        let endX = 0;
        let isDragging = false;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        this.container.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            endX = e.changedTouches[0].clientX;
            isDragging = false;
            
            const diffX = startX - endX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
        
        // Mouse drag support
        this.container.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            this.container.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            endX = e.clientX;
            isDragging = false;
            this.container.style.cursor = 'grab';
            
            const diffX = startX - endX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slideCount;
        this.updateCarousel();
        this.restartAutoSlide();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.updateCarousel();
        this.restartAutoSlide();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.slideCount) {
            this.currentSlide = index;
            this.updateCarousel();
            this.restartAutoSlide();
        }
    }
    
    updateCarousel() {
        // Update slide position
        const translateX = -this.currentSlide * 100;
        this.wrapper.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update navigation buttons state
        if (this.prevBtn) {
            this.prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
            this.prevBtn.disabled = this.currentSlide === 0;
        }
        
        if (this.nextBtn) {
            this.nextBtn.style.opacity = this.currentSlide === this.slideCount - 1 ? '0.5' : '1';
            this.nextBtn.disabled = this.currentSlide === this.slideCount - 1;
        }
        
        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('slideChange', {
            detail: { currentSlide: this.currentSlide, totalSlides: this.slideCount }
        }));
    }
    
    startAutoSlide() {
        if (this.autoSlideInterval) return;
        
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    }
    
    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    restartAutoSlide() {
        this.pauseAutoSlide();
        this.startAutoSlide();
    }
    
    destroy() {
        this.pauseAutoSlide();
        // Remove event listeners if needed
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        const carousel = new Carousel(carouselContainer);
        
        // Make carousel globally accessible for debugging
        window.carousel = carousel;
        
        // Add some example event listeners
        carouselContainer.addEventListener('slideChange', (e) => {
            console.log(`Slide changed to ${e.detail.currentSlide + 1} of ${e.detail.totalSlides}`);
        });
    }
});

// Utility function to create carousel from any container
function createCarousel(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (container) {
        return new Carousel(container);
    }
    return null;
} 