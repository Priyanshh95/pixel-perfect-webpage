# Image Assets Organization

## 📁 Folder Structure
```
assets/
├── images/
│   ├── logo/
│   │   ├── logo.png
│   │   └── logo-white.png
│   ├── hero/
│   │   └── hero-bg.jpg
│   ├── about/
│   │   └── about-image.jpg
│   ├── services/
│   │   ├── service-1-icon.svg
│   │   ├── service-2-icon.svg
│   │   └── service-3-icon.svg
│   ├── carousel/
│   │   ├── slide-1.jpg
│   │   ├── slide-2.jpg
│   │   └── slide-3.jpg
│   └── footer/
│       └── footer-logo.png
└── icons/
    └── (SVG icons if needed)
```

## 🖼️ Image Specifications

### Logo
- **Format**: PNG (with transparency)
- **Dimensions**: [To be specified from Figma]
- **File Size**: < 100KB
- **Variants**: Regular and white versions

### Hero Background
- **Format**: JPG/PNG
- **Dimensions**: [To be specified from Figma]
- **File Size**: < 500KB
- **Optimization**: Web-optimized

### Service Icons
- **Format**: SVG (preferred) or PNG
- **Dimensions**: [To be specified from Figma]
- **File Size**: < 50KB each
- **Style**: Consistent design language

### Carousel Images
- **Format**: JPG
- **Dimensions**: [To be specified from Figma]
- **File Size**: < 300KB each
- **Aspect Ratio**: [To be specified]

### About Section Image
- **Format**: JPG/PNG
- **Dimensions**: [To be specified from Figma]
- **File Size**: < 400KB

## 📋 Image Extraction Checklist

### From Figma:
1. **Logo**: Export as PNG with transparency
2. **Hero Background**: Export as JPG/PNG
3. **Service Icons**: Export as SVG or PNG
4. **Carousel Images**: Export as JPG
5. **About Image**: Export as JPG/PNG
6. **Footer Logo**: Export as PNG

### Optimization Steps:
1. **Resize**: Ensure correct dimensions
2. **Compress**: Use tools like TinyPNG
3. **Format**: Choose appropriate format
4. **Quality**: Balance quality vs file size

## 🔧 Image Optimization Tools

### Online Tools:
- **TinyPNG**: PNG/JPG compression
- **Squoosh**: Google's image optimization
- **ImageOptim**: Mac app for optimization

### Browser Extensions:
- **PerfectPixel**: For pixel-perfect comparison
- **ColorZilla**: For color extraction

## 📐 Responsive Images

### Desktop (1440px+)
- Use full-size images
- Optimize for quality

### Tablet (768px - 1199px)
- Consider smaller versions
- Maintain aspect ratios

### Mobile (< 768px)
- Use optimized mobile versions
- Reduce file sizes

## 🎯 Implementation Notes

1. **Placeholder Images**: Use placeholder.com for development
2. **Lazy Loading**: Implement for carousel images
3. **Alt Text**: Always include descriptive alt text
4. **Loading**: Consider loading="lazy" for images below fold

## 📝 Next Steps

1. Extract images from Figma design
2. Optimize all images for web
3. Place in appropriate folders
4. Update HTML with correct paths
5. Test loading and display 