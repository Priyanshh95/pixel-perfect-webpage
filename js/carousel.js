// Carousel functionality for Recommendations section

class RecommendationsCarousel {
    constructor() {
        this.carousel = document.querySelector('.recommendations-carousel');
        this.track = document.querySelector('.carousel-track');
        this.dots = document.querySelectorAll('.carousel-dots .dot');
        this.cards = document.querySelectorAll('.testimonial-card');
        
        if (!this.carousel || !this.track || this.dots.length === 0) {
            return;
        }
        
        this.currentSlide = 0;
        this.cardWidth = 350; // Width of each testimonial card
        this.gap = 24; // Gap between cards
        this.slideWidth = this.cardWidth + this.gap;
        this.autoPlayInterval = null;
        this.isAutoPlaying = true;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        // Removed auto-play - carousel is now static until manually interacted with
        this.updateDots();
    }
    
    setupEventListeners() {
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                // Removed auto-play restart - carousel stays static
            });
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
        
        // Mouse drag support
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        
        this.track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startPos = e.clientX;
            this.track.style.cursor = 'grabbing';
            // Removed auto-play stop - no auto-play to stop
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const currentPos = e.clientX;
            const diff = currentPos - startPos;
            const translate = prevTranslate + diff;
            
            // Limit the drag range
            const maxTranslate = 0;
            const minTranslate = -(this.dots.length - 1) * this.slideWidth;
            
            if (translate > maxTranslate || translate < minTranslate) {
                return;
            }
            
            currentTranslate = translate;
            this.track.style.transform = `translateX(${translate}px)`;
        });
        
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            
            isDragging = false;
            this.track.style.cursor = 'grab';
            
            // Snap to nearest slide
            const slideIndex = Math.round(Math.abs(currentTranslate) / this.slideWidth);
            this.goToSlide(slideIndex);
            // Removed auto-play restart - carousel stays static
        });
        
        // Removed hover auto-play controls - no auto-play to control
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.nextSlide();
            } else {
                // Swipe right - previous slide
                this.prevSlide();
            }
        }
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.dots.length) return;
        
        this.currentSlide = index;
        const translateX = -index * this.slideWidth;
        
        this.track.style.transition = 'transform 0.3s ease';
        this.track.style.transform = `translateX(${translateX}px)`;
        
        this.updateDots();
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.dots.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = this.currentSlide === 0 ? this.dots.length - 1 : this.currentSlide - 1;
        this.goToSlide(prevIndex);
    }
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.autoPlayInterval = setInterval(() => {
            if (this.isAutoPlaying) {
                this.nextSlide();
            }
        }, 5000); // Change slide every 5 seconds
    }
    
    stopAutoPlay() {
        this.isAutoPlaying = false;
    }
    
    restartAutoPlay() {
        this.isAutoPlaying = true;
    }
    
    destroy() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new RecommendationsCarousel();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecommendationsCarousel;
} 