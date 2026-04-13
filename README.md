[Lire en français](README.fr.md)

# Brice Doublet — Portfolio

A modern, immersive, and interactive portfolio website showcasing the technical expertise of Brice Doublet, DevOps Engineer. Built from scratch with pure HTML, CSS, and JavaScript — no frameworks, maximum performance. Hosted on GitHub Pages at [briced.fr](https://briced.fr).

## Key Features

### Home Page
- **Animated Hero Section**: Professional introduction with profile photo, animated particle canvas background, and scroll indicators.
- **Career Timeline**: Interactive vertical timeline presenting professional experience across multiple international positions (France, New Zealand, Turkey).
- **Skills Showcase**: Categorized competency cards with a technology tags cloud covering Linux, DevSecOps, Grafana, IoT, Machine Learning, and more.
- **Contact & Business Info**: Direct LinkedIn integration and micro-enterprise (Formation Brice Info) legal details.

### Ansible Showcase
- **Interactive 3D Logo**: Real-time Three.js rendering of the Ansible logo with orbit controls and dynamic lighting.
- **Live Playbook Editor**: Syntax-highlighted YAML playbook with animated terminal output simulating a real deployment.
- **Orchestration Diagram**: Canvas-based interactive visualization showing agentless control node-to-host configuration propagation.
- **Expertise Grid**: Six skill cards covering Playbooks, Roles & Collections, Ansible Vault, Dynamic Inventory, CI/CD Integration, and Ansible Galaxy.
- **Workflow Steps**: Four-stage visual pipeline — Inventory → Playbook → Test → Deploy.

### Terraform Showcase
- **Interactive 3D Logo**: Three.js animated Terraform logo with particle effects and responsive canvas sizing.
- **Live HCL Code Editor**: Typing animation revealing Terraform HCL code with syntax highlighting and a simulated terminal running `terraform plan` and `apply`.
- **Infrastructure Diagram**: Real-time canvas rendering of cloud architecture (VPCs, subnets, instances, security groups).
- **Expertise Grid**: Six skill cards — Modules, Multi-Cloud, State Management, CI/CD Integration, Policy as Code, Workspaces.
- **Workflow Steps**: Four-stage cycle — Init → Plan → Apply → Destroy.

### Full-Stack Development Showcase
- **Interactive 3D Animation**: Particle-based Three.js background with a transparent glassmorphic web-page mockup overlay.
- **Architecture Diagram**: Animated canvas visualization of a cloud-native full-stack architecture (GitHub Pages ↔ Supabase ↔ PostgreSQL).
- **Lily Nails Studio Case Study**: A detailed, interactive demo of a real client project — a Progressive Web App loyalty platform for a nail salon, featuring:
  - Realistic laptop and phone device mockups with miniaturized UI replicas.
  - Feature grid showcasing PWA, QR codes, real-time database, and authentication.
  - Performance statistics and client review cards.

## Tech Stack

- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript (ES6+). Zero client-side frameworks — keeping bundle size minimal and performance maximal.
- **Design System**: Custom CSS Variables (`var(--bg-primary)`, `var(--accent-main)`, etc.), Flexbox/Grid layout, and modern Glassmorphism elements. Fully responsive across mobile, tablet, and desktop devices.
- **Typography**: Google Fonts — Outfit for headings, Inter for body text, JetBrains Mono for code editors.
- **3D & Animation**:
  - [Three.js](https://threejs.org/) for real-time WebGL 3D scenes (logos, particle systems, architecture diagrams).
  - [GSAP + ScrollTrigger](https://greensock.com/gsap/) for scroll-driven animations and entrance effects.
- **Canvas Rendering**: Custom 2D Canvas API code for interactive infrastructure diagrams and animated backgrounds.
- **Hosting**: [GitHub Pages](https://pages.github.com/) with custom domain via CNAME (`briced.fr`).
- **Code Quality**: ESLint, Stylelint, and Prettier for consistent formatting and linting.

## Project Architecture

```
/
├── docs/                         # Application source (GitHub Pages root)
│   ├── assets/
│   │   ├── style.css             # Global design system & responsive styles
│   │   ├── script.js             # Shared logic (nav, scroll, canvas, animations)
│   │   ├── ansible.js            # Ansible page 3D scene, editor & diagram
│   │   ├── terraform.js          # Terraform page 3D scene, editor & diagram
│   │   ├── fullstack.js          # Full-Stack page 3D scene & architecture
│   │   ├── favicon.svg           # Site icon
│   │   └── CV_Brice_DOUBLET.pdf  # Downloadable CV
│   ├── images/                   # Profile photo & project assets
│   ├── index.html                # Redirect to home.html (GitHub Pages entry)
│   ├── home.html                 # Main landing page (hero, timeline, skills, contact)
│   ├── ansible.html              # Ansible expertise showcase
│   ├── terraform.html            # Terraform expertise showcase
│   ├── fullstack.html            # Full-Stack development showcase
│   └── CNAME                     # Custom domain configuration
├── README.md                     # Project documentation (English)
└── README.fr.md                  # Project documentation (French)
```

## Design Highlights

- **Dark Theme**: A sleek, professional dark UI (`#0a0a0f` background) with carefully balanced contrast ratios for readability and aesthetics.
- **Page-Specific Accent Colors**: Each showcase page has its own color identity — Ansible (Red `#EE0000`), Terraform (Gold `#E3B04B`), Full-Stack (Cyan `#00C9A7`).
- **Particle Canvas Background**: Every page features a shared interactive particle system rendered on a fixed `<canvas>`, creating depth without heavy library dependencies.
- **Scroll-Driven Animations**: Elements gracefully fade and slide into view via `IntersectionObserver`, with staggered delays for a polished reveal.
- **Hardware-Accelerated CSS**: All animations use `transform` and `opacity` exclusively for smooth 60fps performance on all devices.
- **Glassmorphism Accents**: Translucent panels with `backdrop-filter: blur()` for a modern, layered visual depth.
- **Fully Responsive**: Mobile-first CSS with breakpoints at 768px and 992px. Hamburger navigation, grid reflow, and responsive typography across all pages.

## Performance

- Zero runtime dependencies — all JavaScript is vanilla ES6+.
- Images optimized in SVG and WEBP formats where applicable.
- Modular script loading — each page only loads the JavaScript it needs.
- DOM updates are batched to minimize layout thrashing.
- Canvas animations use `requestAnimationFrame` for efficient rendering.

## Author

**Brice Doublet** — DevOps Engineer & Technical Instructor  
[LinkedIn](https://www.linkedin.com/in/brice-doublet/) · [briced.fr](https://briced.fr)

Formation Brice Info — Micro-Entreprise (SIREN: 101612950)
