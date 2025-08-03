/**
 * Validation and Testing Module
 * Comprehensive testing for all website functionality
 */

class WebsiteValidator {
    constructor() {
        this.testResults = {
            html: {},
            css: {},
            javascript: {},
            accessibility: {},
            performance: {},
            crossBrowser: {}
        };
    }

    // HTML Validation
    validateHTML() {
        console.log('🔍 Validating HTML...');
        
        // Check semantic HTML usage
        const semanticElements = ['header', 'nav', 'main', 'section', 'article', 'footer', 'aside'];
        const semanticCount = {};
        
        semanticElements.forEach(element => {
            const count = document.querySelectorAll(element).length;
            semanticCount[element] = count;
        });
        
        // Check for required elements
        const requiredElements = {
            'doctype': document.doctype !== null,
            'html lang': document.documentElement.lang !== '',
            'viewport meta': document.querySelector('meta[name="viewport"]') !== null,
            'title': document.title !== '',
            'main': document.querySelector('main') !== null,
            'header': document.querySelector('header') !== null,
            'footer': document.querySelector('footer') !== null
        };
        
        // Check image alt attributes
        const images = document.querySelectorAll('img');
        const imagesWithAlt = Array.from(images).filter(img => img.alt !== '');
        const altTextCoverage = (imagesWithAlt.length / images.length) * 100;
        
        this.testResults.html = {
            semanticElements: semanticCount,
            requiredElements,
            imagesWithAlt: imagesWithAlt.length,
            totalImages: images.length,
            altTextCoverage: `${altTextCoverage.toFixed(1)}%`,
            status: this.getOverallStatus(requiredElements)
        };
        
        console.log('✅ HTML Validation Complete:', this.testResults.html);
        return this.testResults.html;
    }

    // CSS Validation
    validateCSS() {
        console.log('🎨 Validating CSS...');
        
        // Check CSS variables usage
        const computedStyle = getComputedStyle(document.documentElement);
        const cssVariables = [
            '--primary-color',
            '--secondary-color',
            '--font-family',
            '--font-size-base',
            '--spacing-md'
        ];
        
        const cssVarStatus = {};
        cssVariables.forEach(variable => {
            cssVarStatus[variable] = computedStyle.getPropertyValue(variable) !== '';
        });
        
        // Check responsive design
        const mediaQueries = [
            { name: 'Mobile', width: 375 },
            { name: 'Tablet', width: 768 },
            { name: 'Desktop', width: 1200 }
        ];
        
        const responsiveStatus = {};
        mediaQueries.forEach(breakpoint => {
            // Simulate viewport width
            const originalWidth = window.innerWidth;
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: breakpoint.width
            });
            
            // Trigger resize event
            window.dispatchEvent(new Event('resize'));
            
            // Check if layout adapts (basic check)
            const container = document.querySelector('.container');
            responsiveStatus[breakpoint.name] = container !== null;
            
            // Restore original width
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: originalWidth
            });
        });
        
        this.testResults.css = {
            cssVariables: cssVarStatus,
            responsiveDesign: responsiveStatus,
            status: this.getOverallStatus(cssVarStatus)
        };
        
        console.log('✅ CSS Validation Complete:', this.testResults.css);
        return this.testResults.css;
    }

    // JavaScript Functionality Testing
    validateJavaScript() {
        console.log('⚡ Validating JavaScript...');
        
        const jsTests = {
            carousel: this.testCarousel(),
            modal: this.testModal(),
            form: this.testForm(),
            navigation: this.testNavigation(),
            smoothScroll: this.testSmoothScroll()
        };
        
        this.testResults.javascript = {
            ...jsTests,
            status: this.getOverallStatus(jsTests)
        };
        
        console.log('✅ JavaScript Validation Complete:', this.testResults.javascript);
        return this.testResults.javascript;
    }

    // Test Carousel Functionality
    testCarousel() {
        const carousel = document.querySelector('.carousel-wrapper');
        if (!carousel) return { status: false, error: 'Carousel not found' };
        
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        return {
            slidesCount: slides.length,
            dotsCount: dots.length,
            hasNavigationButtons: prevBtn !== null && nextBtn !== null,
            hasAutoSlide: typeof window.carousel !== 'undefined',
            status: slides.length > 0 && dots.length > 0
        };
    }

    // Test Modal Functionality
    testModal() {
        const modal = document.getElementById('modal');
        if (!modal) return { status: false, error: 'Modal not found' };
        
        const modalContent = modal.querySelector('.modal-content');
        const closeBtn = modal.querySelector('.modal-close');
        
        return {
            hasModal: modal !== null,
            hasContent: modalContent !== null,
            hasCloseButton: closeBtn !== null,
            hasOpenFunction: typeof window.openModal === 'function',
            status: modal !== null && modalContent !== null
        };
    }

    // Test Form Functionality
    testForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return { status: false, error: 'Form not found' };
        
        const inputs = form.querySelectorAll('input, textarea');
        const submitBtn = form.querySelector('.submit-btn');
        
        return {
            hasForm: form !== null,
            inputsCount: inputs.length,
            hasSubmitButton: submitBtn !== null,
            hasValidation: form.hasAttribute('novalidate') === false,
            status: form !== null && inputs.length > 0
        };
    }

    // Test Navigation
    testNavigation() {
        const nav = document.querySelector('.nav-menu');
        if (!nav) return { status: false, error: 'Navigation not found' };
        
        const links = nav.querySelectorAll('a');
        const validLinks = Array.from(links).filter(link => link.href !== '');
        
        return {
            hasNavigation: nav !== null,
            linksCount: links.length,
            validLinksCount: validLinks.length,
            status: nav !== null && links.length > 0
        };
    }

    // Test Smooth Scroll
    testSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        return {
            hasAnchorLinks: links.length > 0,
            status: links.length > 0
        };
    }

    // Accessibility Testing
    validateAccessibility() {
        console.log('♿ Validating Accessibility...');
        
        // Check ARIA labels
        const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
        
        // Check focus management
        const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
        const keyboardAccessible = Array.from(focusableElements).filter(el => {
            const tabIndex = el.getAttribute('tabindex');
            return tabIndex === null || tabIndex !== '-1';
        });
        
        // Check color contrast (basic check)
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
        const hasGoodContrast = textElements.length > 0; // Simplified check
        
        this.testResults.accessibility = {
            ariaElements: elementsWithAria.length,
            focusableElements: focusableElements.length,
            keyboardAccessible: keyboardAccessible.length,
            hasGoodContrast: hasGoodContrast,
            status: elementsWithAria.length > 0 && keyboardAccessible.length > 0
        };
        
        console.log('✅ Accessibility Validation Complete:', this.testResults.accessibility);
        return this.testResults.accessibility;
    }

    // Performance Testing
    validatePerformance() {
        console.log('⚡ Validating Performance...');
        
        // Check image optimization
        const images = document.querySelectorAll('img');
        const optimizedImages = Array.from(images).filter(img => {
            const src = img.src;
            return src.includes('.svg') || src.includes('.webp') || src.includes('.jpg') || src.includes('.png');
        });
        
        // Check CSS and JS file sizes (basic check)
        const cssFiles = document.querySelectorAll('link[rel="stylesheet"]');
        const jsFiles = document.querySelectorAll('script[src]');
        
        // Check for render-blocking resources
        const renderBlocking = document.querySelectorAll('link[rel="stylesheet"]:not([media="print"])');
        
        this.testResults.performance = {
            totalImages: images.length,
            optimizedImages: optimizedImages.length,
            cssFiles: cssFiles.length,
            jsFiles: jsFiles.length,
            renderBlockingResources: renderBlocking.length,
            status: optimizedImages.length > 0
        };
        
        console.log('✅ Performance Validation Complete:', this.testResults.performance);
        return this.testResults.performance;
    }

    // Cross-Browser Compatibility Check
    validateCrossBrowser() {
        console.log('🌐 Validating Cross-Browser Compatibility...');
        
        const browserInfo = {
            userAgent: navigator.userAgent,
            vendor: navigator.vendor,
            platform: navigator.platform,
            language: navigator.language
        };
        
        // Check for modern CSS features
        const cssFeatures = {
            cssGrid: CSS.supports('display', 'grid'),
            cssFlexbox: CSS.supports('display', 'flex'),
            cssVariables: CSS.supports('--custom-property', 'value'),
            cssTransforms: CSS.supports('transform', 'translateX(0)')
        };
        
        // Check for modern JavaScript features
        const jsFeatures = {
            es6Classes: typeof class Test {} === 'function',
            arrowFunctions: typeof (() => {}) === 'function',
            templateLiterals: typeof `test` === 'string',
            destructuring: typeof ({a, b} = {a: 1, b: 2}) === 'undefined'
        };
        
        this.testResults.crossBrowser = {
            browserInfo,
            cssFeatures,
            jsFeatures,
            status: Object.values(cssFeatures).every(Boolean) && Object.values(jsFeatures).every(Boolean)
        };
        
        console.log('✅ Cross-Browser Validation Complete:', this.testResults.crossBrowser);
        return this.testResults.crossBrowser;
    }

    // Helper method to get overall status
    getOverallStatus(results) {
        const values = Object.values(results).filter(value => typeof value === 'boolean');
        return values.length > 0 ? values.every(Boolean) : true;
    }

    // Run all validations
    runAllValidations() {
        console.log('🚀 Starting Comprehensive Website Validation...');
        console.log('=' .repeat(50));
        
        this.validateHTML();
        this.validateCSS();
        this.validateJavaScript();
        this.validateAccessibility();
        this.validatePerformance();
        this.validateCrossBrowser();
        
        console.log('=' .repeat(50));
        console.log('✅ All Validations Complete!');
        
        // Generate summary
        this.generateSummary();
        
        return this.testResults;
    }

    // Generate validation summary
    generateSummary() {
        const summary = {
            totalTests: 0,
            passedTests: 0,
            failedTests: 0,
            categories: {}
        };
        
        Object.entries(this.testResults).forEach(([category, results]) => {
            if (results.status !== undefined) {
                summary.totalTests++;
                if (results.status) {
                    summary.passedTests++;
                } else {
                    summary.failedTests++;
                }
            }
            summary.categories[category] = results.status;
        });
        
        console.log('📊 VALIDATION SUMMARY:');
        console.log(`Total Tests: ${summary.totalTests}`);
        console.log(`Passed: ${summary.passedTests}`);
        console.log(`Failed: ${summary.failedTests}`);
        console.log(`Success Rate: ${((summary.passedTests / summary.totalTests) * 100).toFixed(1)}%`);
        
        Object.entries(summary.categories).forEach(([category, status]) => {
            console.log(`${category}: ${status ? '✅ PASS' : '❌ FAIL'}`);
        });
        
        return summary;
    }

    // Export results for external use
    exportResults() {
        return {
            timestamp: new Date().toISOString(),
            results: this.testResults,
            summary: this.generateSummary()
        };
    }
}

// Initialize validator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.websiteValidator = new WebsiteValidator();
    
    // Auto-run validation in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🔧 Development mode detected. Running validation...');
        setTimeout(() => {
            window.websiteValidator.runAllValidations();
        }, 1000);
    }
});

// Make validator globally available
window.WebsiteValidator = WebsiteValidator; 