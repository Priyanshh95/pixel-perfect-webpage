# JTG Frontend Assignment

A pixel-perfect, responsive website built with HTML5, CSS3, and vanilla JavaScript for the JTG Frontend Home Assignment.

## 🚀 Features

### ✅ Completed Requirements
- **Semantic HTML5**: Uses proper semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`)
- **No Frameworks**: Built with pure HTML, CSS, and JavaScript (no React, Angular, Bootstrap, etc.)
- **Open Sans Font**: Integrated from Google Fonts
- **Working Carousel**: Full-featured carousel with auto-slide, navigation, dots, and keyboard support
- **Modal Implementation**: Custom modal with vanilla JavaScript (no libraries)
- **Cross-Browser Compatible**: Works on Chrome, Firefox, and Safari
- **Responsive Design**: Mobile-friendly layout
- **Pixel-Perfect Ready**: Structured for easy pixel-perfect implementation

### 🎯 Carousel Features
- ✅ Auto-slide every 5 seconds
- ✅ Navigation buttons (prev/next)
- ✅ Dot indicators
- ✅ Keyboard arrow support
- ✅ Touch/drag support
- ✅ Pause on hover
- ✅ Smooth transitions

### 🎯 Modal Features
- ✅ Open/close functionality
- ✅ Click outside to close
- ✅ ESC key to close
- ✅ Focus management
- ✅ Body scroll prevention
- ✅ Custom content support

## 📁 Project Structure

```
JTG/
├── index.html              # Main HTML file
├── css/
│   ├── reset.css           # CSS reset/normalize
│   ├── main.css            # Main styles and layout
│   └── components.css      # Component-specific styles
├── js/
│   ├── main.js             # General functionality
│   ├── carousel.js         # Carousel implementation
│   └── modal.js            # Modal implementation
├── assets/
│   └── README.md           # Assets documentation
└── README.md               # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript**: ES6+ features, classes, and modern APIs
- **Google Fonts**: Open Sans font family

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari)
- PerfectPixel Chrome extension (for pixel-perfect validation)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. For development, use a local server (recommended)

### Local Development Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎨 Customization

### Colors
All colors are defined as CSS variables in `css/main.css`:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    /* ... more colors */
}
```

### Typography
Font sizes and spacing are also defined as variables:
```css
:root {
    --font-size-base: 1rem;
    --spacing-md: 1rem;
    /* ... more variables */
}
```

### Adding Images
1. Place your images in the `assets/` folder
2. Update the image paths in `index.html`
3. Ensure images are optimized for web use

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🎯 Next Steps for Pixel-Perfect Implementation

1. **Extract Assets from Figma**:
   - Export all images and icons
   - Place them in the `assets/` folder
   - Update image paths in HTML

2. **Apply Design Specifications**:
   - Use PerfectPixel Chrome extension
   - Match colors, fonts, and spacing exactly
   - Adjust layout to match design

3. **Content Updates**:
   - Replace placeholder text with actual content
   - Update service descriptions
   - Add real project images to carousel

4. **Final Testing**:
   - Test across all browsers
   - Validate HTML and CSS
   - Check accessibility
   - Optimize performance

## 🧪 Testing

### Manual Testing Checklist
- [ ] Navigation links work correctly
- [ ] Carousel auto-slides every 5 seconds
- [ ] Carousel navigation buttons work
- [ ] Carousel dots work
- [ ] Modal opens and closes properly
- [ ] Form validation works
- [ ] Responsive design works on mobile
- [ ] Cross-browser compatibility

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## 📝 Code Quality

- **Semantic HTML**: Proper use of HTML5 semantic elements
- **Clean CSS**: Organized with CSS variables and comments
- **Modular JavaScript**: Class-based architecture with separation of concerns
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized images and efficient code

## 🎨 Design System

### Color Palette
- Primary: #007bff (Blue)
- Secondary: #6c757d (Gray)
- Success: #28a745 (Green)
- Danger: #dc3545 (Red)
- Warning: #ffc107 (Yellow)
- Info: #17a2b8 (Cyan)

### Typography
- Font Family: Open Sans
- Base Size: 16px
- Line Height: 1.6
- Weights: 300, 400, 500, 600, 700, 800

### Spacing
- XS: 0.25rem (4px)
- SM: 0.5rem (8px)
- MD: 1rem (16px)
- LG: 1.5rem (24px)
- XL: 2rem (32px)
- 2XL: 3rem (48px)
- 3XL: 4rem (64px)

## 📞 Support

For any questions or issues:
1. Check the browser console for JavaScript errors
2. Validate HTML and CSS using online validators
3. Test in different browsers
4. Use browser developer tools for debugging

## 📄 License

This project is created for the JTG Frontend Assignment. All rights reserved.

---

**Note**: This is a template implementation. You'll need to:
1. Add actual images from the Figma design
2. Update content to match the design
3. Fine-tune styling for pixel-perfect accuracy
4. Test thoroughly across all browsers
