[Read in English](README.md)

# Brice Doublet — Portfolio

Un site portfolio moderne, immersif et interactif présentant l'expertise technique de Brice Doublet, Ingénieur DevOps. Développé entièrement en HTML, CSS et JavaScript pur — aucun framework, performance maximale. Hébergé sur GitHub Pages à l'adresse [briced.fr](https://briced.fr).

## Fonctionnalités Principales

### Page d'Accueil
- **Section Hero Animée** : Présentation professionnelle avec photo de profil, arrière-plan canvas à particules animées et indicateur de défilement.
- **Timeline de Carrière** : Frise chronologique verticale et interactive présentant les expériences professionnelles à l'international (France, Nouvelle-Zélande, Turquie).
- **Vitrine des Compétences** : Cartes de compétences catégorisées avec un nuage de tags technologiques couvrant Linux, DevSecOps, Grafana, IoT, Machine Learning, et plus encore.
- **Contact & Informations Entreprise** : Intégration LinkedIn directe et informations légales de la micro-entreprise (Formation Brice Info).

### Vitrine Ansible
- **Logo 3D Interactif** : Rendu Three.js en temps réel du logo Ansible avec contrôles orbitaux et éclairage dynamique.
- **Éditeur de Playbook en Direct** : Playbook YAML avec coloration syntaxique et terminal animé simulant un déploiement réel.
- **Schéma d'Orchestration** : Visualisation interactive sur canvas montrant la propagation agentless des configurations du nœud de contrôle vers les hôtes.
- **Grille d'Expertise** : Six cartes de compétences couvrant Playbooks, Roles & Collections, Ansible Vault, Dynamic Inventory, Intégration CI/CD et Ansible Galaxy.
- **Étapes du Workflow** : Pipeline visuel en quatre étapes — Inventory → Playbook → Test → Deploy.

### Vitrine Terraform
- **Logo 3D Interactif** : Logo Terraform animé en Three.js avec effets de particules et redimensionnement responsive du canvas.
- **Éditeur de Code HCL en Direct** : Animation de frappe révélant du code HCL Terraform avec coloration syntaxique et terminal simulant `terraform plan` et `apply`.
- **Schéma d'Infrastructure** : Rendu en temps réel sur canvas de l'architecture cloud (VPCs, sous-réseaux, instances, security groups).
- **Grille d'Expertise** : Six cartes — Modules, Multi-Cloud, State Management, Intégration CI/CD, Policy as Code, Workspaces.
- **Étapes du Workflow** : Cycle en quatre étapes — Init → Plan → Apply → Destroy.

### Vitrine Full-Stack
- **Animation 3D Interactive** : Arrière-plan Three.js avec particules et overlay glassmorphique transparent simulant une maquette de page web.
- **Schéma d'Architecture** : Visualisation animée sur canvas d'une architecture full-stack cloud-native (GitHub Pages ↔ Supabase ↔ PostgreSQL).
- **Étude de Cas Lily Nails Studio** : Démo interactive détaillée d'un projet client réel — une Progressive Web App de fidélité pour un salon de manucure, incluant :
  - Maquettes réalistes d'ordinateur portable et de téléphone avec répliques miniatures de l'interface.
  - Grille de fonctionnalités présentant la PWA, les codes QR, la base de données temps réel et l'authentification.
  - Statistiques de performance et cartes d'avis clients.

## Stack Technique

- **Frontend** : HTML5 pur, CSS3 et JavaScript Vanilla (ES6+). Aucun framework côté client — un bundle minimal pour des performances maximales.
- **Design System** : Variables CSS personnalisées (`var(--bg-primary)`, `var(--accent-main)`, etc.), mise en page Flexbox/Grid et éléments Glassmorphism modernes. Entièrement responsive sur mobile, tablette et bureau.
- **Typographie** : Google Fonts — Outfit pour les titres, Inter pour le corps de texte, JetBrains Mono pour les éditeurs de code.
- **3D & Animation** :
  - [Three.js](https://threejs.org/) pour les scènes WebGL 3D en temps réel (logos, systèmes de particules, schémas d'architecture).
  - [GSAP + ScrollTrigger](https://greensock.com/gsap/) pour les animations au défilement et les effets d'apparition.
- **Rendu Canvas** : Code personnalisé utilisant l'API Canvas 2D pour les schémas d'infrastructure interactifs et les arrière-plans animés.
- **Hébergement** : [GitHub Pages](https://pages.github.com/) avec domaine personnalisé via CNAME (`briced.fr`).
- **Qualité du Code** : ESLint, Stylelint et Prettier pour un formatage et un linting cohérents.

## Architecture du Projet

```
/
├── docs/                         # Sources de l'application (racine GitHub Pages)
│   ├── assets/
│   │   ├── style.css             # Design system global & styles responsive
│   │   ├── script.js             # Logique partagée (nav, scroll, canvas, animations)
│   │   ├── ansible.js            # Scène 3D, éditeur & schéma — page Ansible
│   │   ├── terraform.js          # Scène 3D, éditeur & schéma — page Terraform
│   │   ├── fullstack.js          # Scène 3D & architecture — page Full-Stack
│   │   ├── favicon.svg           # Icône du site
│   │   └── CV_Brice_DOUBLET.pdf  # CV téléchargeable
│   ├── images/                   # Photo de profil & assets des projets
│   ├── index.html                # Redirection vers home.html (entrée GitHub Pages)
│   ├── home.html                 # Page d'accueil (hero, timeline, compétences, contact)
│   ├── ansible.html              # Vitrine d'expertise Ansible
│   ├── terraform.html            # Vitrine d'expertise Terraform
│   ├── fullstack.html            # Vitrine développement Full-Stack
│   └── CNAME                     # Configuration du domaine personnalisé
├── README.md                     # Documentation du projet (en anglais)
└── README.fr.md                  # Documentation du projet (en français)
```

## Points Forts du Design

- **Thème Sombre** : Un UI professionnel et épuré (fond `#0a0a0f`) avec des ratios de contraste soigneusement calibrés pour la lisibilité et l'esthétique.
- **Couleurs d'Accentuation par Page** : Chaque vitrine possède sa propre identité colorimétrique — Ansible (Rouge `#EE0000`), Terraform (Doré `#E3B04B`), Full-Stack (Cyan `#00C9A7`).
- **Arrière-plan Canvas à Particules** : Chaque page intègre un système de particules interactif rendu sur un `<canvas>` fixe, créant de la profondeur sans dépendance à des librairies lourdes.
- **Animations au Défilement** : Les éléments apparaissent en fondu et glissement via `IntersectionObserver`, avec des délais échelonnés pour un effet progressif soigné.
- **CSS Accéléré Matériellement** : Toutes les animations utilisent exclusivement `transform` et `opacity` pour des performances fluides à 60fps sur tous les appareils.
- **Accents Glassmorphism** : Panneaux translucides avec `backdrop-filter: blur()` pour une profondeur visuelle moderne et élégante.
- **Entièrement Responsive** : CSS mobile-first avec points de rupture à 768px et 992px. Navigation hamburger, réagencement de grilles et typographie responsive sur toutes les pages.

## Performance

- Aucune dépendance d'exécution — tout le JavaScript est du vanilla ES6+.
- Images optimisées aux formats SVG et WEBP lorsqu'applicable.
- Chargement modulaire des scripts — chaque page ne charge que le JavaScript dont elle a besoin.
- Les mises à jour du DOM sont regroupées pour minimiser les recalculs de layout.
- Les animations canvas utilisent `requestAnimationFrame` pour un rendu efficace.

## Auteur

**Brice Doublet** — Ingénieur DevOps & Intervenant Technique  
[LinkedIn](https://www.linkedin.com/in/brice-doublet/) · [briced.fr](https://briced.fr)

Formation Brice Info — Micro-Entreprise (SIREN : 101612950)
