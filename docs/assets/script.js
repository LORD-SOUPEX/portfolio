'use strict';

/**
 * script.js
 * Interactivity and animations for the portfolio website.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Set current year in footer ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Clean URLs for GitHub Pages ---
    // If the URL contains .html, remove it from the address bar seamlessly
    if (window.location.pathname.endsWith('.html') && window.location.protocol !== 'file:') {
        const cleanPath = window.location.pathname.replace(/\.html$/, '');
        const newUrl = cleanPath + window.location.search + window.location.hash;
        window.history.replaceState(null, '', newUrl);
    }

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link, .nav-links .btn');

    if (mobileBtn && navLinks) {
        mobileBtn.setAttribute('aria-expanded', 'false');

        mobileBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileBtn.classList.toggle('active');
            mobileBtn.setAttribute('aria-expanded', String(isOpen));

            // Prevent scrolling when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Navbar Scroll Effect & Scroll Progress Bar ---
    const navbar = document.querySelector('.navbar');
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        // Toggle navbar background on scroll
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Calculate scroll progress
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollValue = `${(totalScroll / windowHeight) * 100}%`;

        if (progressBar) {
            progressBar.style.width = scrollValue;
        }
    });

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ignore if href is exactly "#"
            if (this.getAttribute('href') === '#') return;

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Determine offset based on navbar height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Interactive Canvas Background ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        canvas.setAttribute('aria-label', 'Arrière-plan interactif animé');
        canvas.setAttribute('role', 'img');
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const mouse = { x: null, y: null, radius: 150 };

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        }

        window.addEventListener('resize', resize);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
            }

            draw() {
                ctx.fillStyle = 'rgba(227, 176, 75, 0.4)'; // var(--accent-main) slightly transparent
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x > width + 50) this.x = -50;
                else if (this.x < -50) this.x = width + 50;

                if (this.y > height + 50) this.y = -50;
                else if (this.y < -50) this.y = height + 50;

                this.draw();
            }
        }

        function initParticles() {
            particles = [];
            // Optimize for performance: fewer particles on mobile/smaller screens
            let numberOfParticles = Math.floor((width * height) / 18000);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }

            connect();

            // Draw subtle glow at mouse position
            if (mouse.x !== null && mouse.y !== null) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
                gradient.addColorStop(0, 'rgba(227, 176, 75, 0.06)');
                gradient.addColorStop(1, 'rgba(227, 176, 75, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(animate);
        }

        function connect() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distanceSq = dx * dx + dy * dy;

                    if (distanceSq < 15000) {
                        let opacityValue = 1 - (distanceSq / 15000);
                        ctx.strokeStyle = `rgba(227, 176, 75, ${opacityValue * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }

                if (mouse.x !== null && mouse.y !== null) {
                    let mdx = particles[a].x - mouse.x;
                    let mdy = particles[a].y - mouse.y;
                    let mDistanceSq = mdx * mdx + mdy * mdy;

                    if (mDistanceSq < 25000) {
                        let mOpacityValue = 1 - (mDistanceSq / 25000);
                        ctx.strokeStyle = `rgba(227, 176, 75, ${mOpacityValue * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();

                        let force = (25000 - mDistanceSq) / 3000000;
                        particles[a].x += mdx * force; // Move towards mouse very gently
                        particles[a].y += mdy * force;
                    }
                }
            }
        }

        resize();
        animate();
    }

});
