# Zhuoyan Sun — Portfolio

A minimalist, dreamcore-inspired personal portfolio for a **Data Scientist / ML & AI Engineer**.
Built with React + Vite, featuring a soft light-green theme, a scroll-reactive background,
a hand-drawn botanical wreath around the profile photo, and a glowing butterfly that drifts around it.

### 🔗 Live site
**https://jennifersun09b.github.io/portfolio/**

> Health Data Science MSc at UCL with a biology foundation from Imperial — building clinical NLP
> pipelines, causal ML models, and AI agents that turn complex data into decisions.

---

## ✨ Features

- **Dreamcore light-green theme** with a background that shifts gradually as you scroll.
- **Animated hero** — a circular profile photo framed by a hand-drawn botanical wreath, with a
  small glowing butterfly that lingers and drifts around it.
- **Light / dark mode** toggle (persists across visits).
- **Smooth scrolling** (Lenis) and gentle fade-in section reveals.
- **Timeline layout** for internship experience and education.
- **Responsive** across mobile and desktop, with full `prefers-reduced-motion` support.
- **One-click résumé** download.

## 🧩 Sections

Profile · Skills · Internship Experience · Project Experience · Education · Contact

## 🛠️ Tech stack

- [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- Hand-built SVG illustrations (wreath + butterfly), CSS animations
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling
- GitHub Actions → GitHub Pages for continuous deployment

## 🚀 Local development

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

All editable content (profile, skills, projects, experience, education) lives in
[`src/data.js`](src/data.js).

## 📦 Deployment

Pushing to `main` triggers the [GitHub Actions workflow](.github/workflows/deploy.yml),
which builds the site and publishes it to GitHub Pages automatically.

## 📫 Contact

- **Email:** zhuoyansun41@gmail.com
- **LinkedIn:** [linkedin.com/in/zhuoyansun](https://linkedin.com/in/zhuoyansun)
- **Location:** London, UK

---

<sub>Designed & built with React. © 2026 Zhuoyan Sun.</sub>
