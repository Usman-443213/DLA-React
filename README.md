# Dealer Licensing Authority (DLA) — React Website

This repository contains the rebuilt single-page website for the **Dealer Licensing Authority (DLA)**, successfully migrated from raw HTML/CSS/JS to a modern, high-performance **React + Vite** framework.

---

## 🚀 Key Improvements & Technical Enhancements

1. **Massive Performance Boost (94% Asset Compression)**:
   * Compressed heavy raw background images (`1.png` to `4.png`, total **~24 MB**) into highly optimized modern `.webp` graphics.
   * Total slideshow asset weight was reduced from **24.23 MB** to just **1.46 MB**, yielding an **instant page load** and exceptionally fast visual speeds.
2. **Local 3D Interactive Globe**:
   * Bundled the world geometry dataset (`countries-110m.json`) directly inside `/public/`, allowing the 3D D3.js canvas-rendered globe to render offline and run instantly without slow external CDN dependencies.
3. **Local Video Player (`intro.mp4`)**:
   * Replaced third-party YouTube scripts in the Overview Section with a locally hosted, high-performance HTML5 `<video>` tag playing `/public/intro.mp4`.
   * Displays a stunning dark-tinted background thumbnail (`coverimage.webp`) under the initial click-to-play state.
4. **Scrambled Partners Logo Mismatch Resolved**:
   * Fixed the client's original HTML bugs by mapping all 8 physical logo images (`a.png` to `h.png`) correctly to their actual name, URL, and hover descriptions (e.g. hovering on the Copart logo correctly displays Copart instead of SBA).
5. **Centralized Scroll Reveals**:
   * Designed a lightweight React `IntersectionObserver` that dynamically attaches `.reveal.visible` visual transitions on scroll.

---

## 🛠️ Getting Started

### Prerequisites
Make sure you have Node.js and npm installed:
* Node.js (version 18+)
* npm (version 10+)

### Installation
1. Install all dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```
   *The server will boot up instantly at `http://localhost:3000` (or `http://localhost:5173` depending on port availability).*

### Building for Production
To build the project into highly-optimized static CSS, JavaScript, and HTML assets:
```bash
npm run build
```
*Build outputs will compile inside the `/dist/` folder.*
