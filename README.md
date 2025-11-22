# 🔥 Image Optimizer 

Advanced image optimizer for GitHub Actions.  
Supports WebP, AVIF, Resize, EXIF Removal, and high-performance batch processing.

## Features
- Convert to **WebP** & **AVIF**
- **Resize** (width/height)
- **Remove EXIF/GPS metadata**
- **Batch parallel processing**
- PNG/JPG/JPEG/WebP input support

## Usage
```yaml
- name: Optimize Images (Premium)
  uses: yourname/image-optimizer
  with:
    path: "./images"
    output_webp: true
    output_avif: true
    resize_width: 1920
    remove_exif: true
