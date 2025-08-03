/**
 * Enhanced Carousel Implementation
 * Advanced carousel with touch support, keyboard navigation, and smooth animations
 */

class Carousel {
    constructor() {
        this.wrapper = document.querySelector('.carousel-wrapper');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        this.isTransitioning = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }

    init() {
        if (!this.wrapper || this.totalSlides === 0) {
            console.warn('Carousel elements not found');
            return;
        }

        // Set initial state
        this.updateSlides();
        this.updateDots();
        this.startAutoPlay();

        // Event listeners
        this.addEventListeners();
        
        // Set up keyboard navigation
        this.setupKeyboardNavigation();
        
        // Set up touch support
        this.setupTouchSupport();
    }

    addEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto-play controls
        this.wrapper.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.wrapper.addEventListener('mouseleave', () => this.resumeAutoPlay());
        
        // Pause on focus for accessibility
        this.wrapper.addEventListener('focusin', () => this.pauseAutoPlay());
        this.wrapper.addEventListener('focusout', () => this.resumeAutoPlay());
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Only handle if carousel is in view
            if (!this.isInViewport()) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.next();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleAutoPlay();
                    break;
            }
        });
    }

    setupTouchSupport() {
        this.wrapper.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.wrapper.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.next();
            } else {
                // Swipe right - previous slide
                this.prev();
            }
        }
    }

    isInViewport() {
        const rect = this.wrapper.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    next() {
        if (this.isTransitioning) return;
        
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    prev() {
        if (this.isTransitioning) return;
        
        this.currentSlide = this.currentSlide === 0 
            ? this.totalSlides - 1 
            : this.currentSlide - 1;
        this.updateCarousel();
    }

    goToSlide(index) {
        if (this.isTransitioning || index < 0 || index >= this.totalSlides) return;
        
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        this.isTransitioning = true;
        
        // Update slides
        this.updateSlides();
        
        // Update dots
        this.updateDots();
        
        // Update navigation buttons state
        this.updateNavigationButtons();
        
        // Announce to screen readers
        this.announceSlideChange();
        
        // Reset transition flag after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(index - this.currentSlide) * 100}%)`;
            slide.setAttribute('aria-hidden', index !== this.currentSlide);
            
            // Update slide content for accessibility
            const slideContent = slide.querySelector('.slide-content');
            if (slideContent) {
                slideContent.setAttribute('aria-live', index === this.currentSlide ? 'polite' : 'off');
            }
        });
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.setAttribute('aria-current', 'false');
            }
        });
    }

    updateNavigationButtons() {
        if (this.prevBtn) {
            this.prevBtn.setAttribute('aria-label', `Go to previous slide (${this.currentSlide === 0 ? this.totalSlides : this.currentSlide} of ${this.totalSlides})`);
        }
        
        if (this.nextBtn) {
            this.nextBtn.setAttribute('aria-label', `Go to next slide (${this.currentSlide + 2 > this.totalSlides ? 1 : this.currentSlide + 2} of ${this.totalSlides})`);
        }
    }

    announceSlideChange() {
        const currentSlide = this.slides[this.currentSlide];
        const slideTitle = currentSlide.querySelector('h3')?.textContent || `Slide ${this.currentSlide + 1}`;
        
        // Create announcement for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Now showing: ${slideTitle}`;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    startAutoPlay() {
        if (!this.isAutoPlaying) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    pauseAutoPlay() {
        this.stopAutoPlay();
    }

    resumeAutoPlay() {
        if (this.isAutoPlaying) {
            this.startAutoPlay();
        }
    }

    toggleAutoPlay() {
        this.isAutoPlaying = !this.isAutoPlaying;
        
        if (this.isAutoPlaying) {
            this.startAutoPlay();
            this.announceAutoPlayState('Auto-play resumed');
        } else {
            this.stopAutoPlay();
            this.announceAutoPlayState('Auto-play paused');
        }
    }

    announceAutoPlayState(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Public methods for external control
    play() {
        this.isAutoPlaying = true;
        this.startAutoPlay();
    }

    pause() {
        this.isAutoPlaying = false;
        this.stopAutoPlay();
    }

    setAutoPlayDelay(delay) {
        this.autoPlayDelay = delay;
        if (this.isAutoPlaying) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }

    // Get current slide info
    getCurrentSlide() {
        return {
            index: this.currentSlide,
            total: this.totalSlides,
            isAutoPlaying: this.isAutoPlaying
        };
    }

    // Destroy carousel (cleanup)
    destroy() {
        this.stopAutoPlay();
        this.removeEventListeners();
    }

    removeEventListeners() {
        // Remove all event listeners
        if (this.prevBtn) {
            this.prevBtn.removeEventListener('click', this.prev);
        }
        
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', this.next);
        }
        
        this.dots.forEach(dot => {
            dot.removeEventListener('click', this.goToSlide);
        });
        
        this.wrapper.removeEventListener('mouseenter', this.pauseAutoPlay);
        this.wrapper.removeEventListener('mouseleave', this.resumeAutoPlay);
        this.wrapper.removeEventListener('focusin', this.pauseAutoPlay);
        this.wrapper.removeEventListener('focusout', this.resumeAutoPlay);
    }
}

// Initialize carousel when DOM is loaded
let carousel;
document.addEventListener('DOMContentLoaded', () => {
    carousel = new Carousel();
});

// Make carousel globally available
window.Carousel = Carousel; 