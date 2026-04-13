'use strict';

/**
 * Full-Stack Page Animations & Interactions
 */

// Register GSAP Plugins
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', () => {
    initHero3D();
    initArchDiagram();
    initMockupCursor();
    
    if (typeof gsap !== 'undefined') {
        // Animate stats numbers if visible
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const originalText = stat.innerText;
            const numericValue = parseFloat(originalText);
            const suffix = originalText.replace(/[0-9.]/g, ''); // Extract %, +, etc.

            if (!isNaN(numericValue)) {
                const target = { val: 0 };
                gsap.to(target, {
                    val: numericValue,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    onUpdate: () => {
                        stat.innerText = target.val.toFixed(numericValue % 1 === 0 ? 0 : 1) + suffix;
                    }
                });
            }
        });

        // Scroll reveal for all sections (Using unique class fs-reveal)
        gsap.utils.toArray('.fs-reveal').forEach(elem => {
            gsap.from(elem, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });
    }
});

/**
 * Animate the mockup cursor in the hero section
 */
function initMockupCursor() {
    const cursor = document.getElementById('mock-cursor');
    if (!cursor || typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ repeat: -1, delay: 1 });
    
    tl.to(cursor, { x: 50, y: 80, duration: 1.5, ease: "power2.inOut" })
      .to(cursor, { scale: 0.8, duration: 0.2, yoyo: true, repeat: 1 }) // Click effect
      .to(cursor, { x: -30, y: 150, duration: 2, ease: "power2.inOut" })
      .to(cursor, { scale: 0.8, duration: 0.2, yoyo: true, repeat: 1 })
      .to(cursor, { x: 0, y: 0, duration: 1.5, ease: "power2.inOut" });
}

/**
 * Hero 3D Animation: Interconnected Nodes using Three.js (Optimized)
 */
function initHero3D() {
    const canvas = document.getElementById('fs-canvas-3d');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 120;

    const group = new THREE.Group();
    scene.add(group);

    // Create a sphere of nodes
    const nodeCount = 60;
    const nodeGeometry = new THREE.SphereGeometry(0.8, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00C9A7 });
    
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
        const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;
        const radius = 50;

        mesh.position.set(
            radius * Math.cos(theta) * Math.sin(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(phi)
        );
        group.add(mesh);
        nodes.push(mesh);
    }

    function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.002;
        group.rotation.x += 0.001;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        if (!canvas.parentElement) return;
        const w = canvas.parentElement.clientWidth;
        const h = canvas.parentElement.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
}

/**
 * Architecture Diagram Animation: Interactive Browser Windows
 */
function initArchDiagram() {
    const canvas = document.getElementById('fs-arch-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    const resize = () => {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = width;
        canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const windows = [
        { 
            id: 'db', title: 'PostgreSQL / Supabase', 
            x: 0.6, y: 0.55, w: 300, h: 220, 
            color: '#3ecf8e', 
            content: [
                ' { "table": "clients",',
                '   "data": [',
                '     { "id": 1, "points": 6 },',
                '     { "id": 2, "points": 12 }',
                '   ]',
                ' }'
            ]
        },
        { 
            id: 'auth', title: 'Supabase Auth', 
            x: 0.35, y: 0.35, w: 280, h: 200, 
            color: '#00C9A7',
            content: [
                ' [ Authentication ]',
                ' > Email: contact@brice.info',
                ' > Password: ••••••••••',
                ' [ Login Success ✓ ]'
            ]
        },
        { 
            id: 'ui', title: 'Frontend / PWA', 
            x: 0.1, y: 0.15, w: 320, h: 240, 
            color: '#fff',
            content: [
                ' <h1>Lily Nails</h1>',
                ' <button>Réserver</button>',
                ' <div class="qr-code"></div>',
                ' <!-- 100% Haute Dispo -->'
            ]
        }
    ];

    let time = 0;

    function drawWindow(win, index) {
        // Responsive scaling
        const scale = width < 600 ? 0.7 : 1;
        const w = win.w * scale;
        const h = win.h * scale;
        const x = win.x * width + Math.sin(time + index) * 10;
        const y = win.y * height + Math.cos(time * 0.7 + index) * 8;
        
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 30;
        
        ctx.fillStyle = '#1e1e1e';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(x, y, w, h, 12);
        } else {
            ctx.rect(x, y, w, h);
        }
        ctx.fill();
        ctx.strokeStyle = win.color + '44';
        ctx.stroke();
        
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#2a2a2a';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(x, y, w, 35 * scale, {tl: 12, tr: 12, bl: 0, br: 0});
        } else {
            ctx.rect(x, y, w, 35 * scale);
        }
        ctx.fill();

        ctx.fillStyle = '#a0a0a0';
        ctx.font = `600 ${12 * scale}px Inter`;
        ctx.textAlign = 'center';
        ctx.fillText(win.title, x + w / 2, y + 21 * scale);

        ctx.fillStyle = '#121212';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(x + 10, y + 45 * scale, w - 20, h - (55 * scale), 6);
        } else {
            ctx.rect(x + 10, y + 45 * scale, w - 20, h - (55 * scale));
        }
        ctx.fill();

        ctx.fillStyle = win.color;
        ctx.font = `${11 * scale}px "JetBrains Mono"`;
        ctx.textAlign = 'left';
        win.content.forEach((line, i) => {
            const lineOpacity = Math.min(1, Math.max(0, (Math.sin(time * 2 - i * 0.5) + 1)));
            ctx.globalAlpha = 0.7 + lineOpacity * 0.3;
            ctx.fillText(line, x + 20, y + (70 * scale) + (i * 20 * scale));
        });
        ctx.globalAlpha = 1;
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        time += 0.015;

        windows.forEach((win, index) => {
            drawWindow(win, index);
        });

        requestAnimationFrame(draw);
    }

    draw();
}
