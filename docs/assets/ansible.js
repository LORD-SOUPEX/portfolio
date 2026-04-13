'use strict';

/**
 * ansible.js
 * Interactive features for the Ansible page.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize GSAP Plugins ---
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. Three.js: 3D Ansible Logo ---
    const init3DLogo = () => {
        const canvas = document.getElementById('ans-canvas-3d');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const redLight = new THREE.PointLight(0xEE0000, 2, 100);
        redLight.position.set(10, 10, 10);
        scene.add(redLight);

        // Ansible "A" Logo model (Stylized Compass)
        const group = new THREE.Group();
        const material = new THREE.MeshPhongMaterial({
            color: 0xEE0000,
            shininess: 100,
            transparent: true,
            opacity: 0.95
        });

        // Circle base
        const ringGeom = new THREE.TorusGeometry(2, 0.15, 16, 100);
        const ring = new THREE.Mesh(ringGeom, material);
        group.add(ring);

        // Ansible "A" shape (compass / needle style)
        const aShape = new THREE.Shape();
        // Top point of the A
        aShape.moveTo(0, 1.5);
        // Right side down
        aShape.lineTo(0.9, -1.4);
        // Crossbar notch right
        aShape.lineTo(0.35, -0.5);
        // Crossbar left to connect back
        aShape.lineTo(-0.5, -1.0);
        // Left bottom
        aShape.lineTo(-0.9, -1.4);
        // Back to top
        aShape.lineTo(0, 1.5);

        const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 3 };
        const aGeom = new THREE.ExtrudeGeometry(aShape, extrudeSettings);
        aGeom.center();
        const aMesh = new THREE.Mesh(aGeom, material);
        group.add(aMesh);

        scene.add(group);
        camera.position.z = 6;

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            if (!controls.active) {
                group.rotation.y += 0.005;
            }
            group.position.y = Math.sin(Date.now() * 0.001) * 0.1;
            renderer.render(scene, camera);
        };

        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });

        animate();
        gsap.from(group.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: "back.out(1.7)" });
    };

    // --- 2. Playbook Editor Logic ---
    const initPlaybookEditor = () => {
        const body = document.getElementById('playbookBody');
        const term = document.getElementById('ansTerminal');
        if (!body) return;

        const lines = [
            { t: '- name: Setup Nginx Web Server', c: '#keyword' },
            { t: '  hosts: webservers', c: '#keyword' },
            { t: '  become: yes', c: '#keyword' },
            { t: '  tasks:', c: '#keyword' },
            { t: '    - name: Ensure Nginx is installed', c: '#comment' },
            { t: '      apt:', c: '#prop' },
            { t: '        name: nginx', c: '#string' },
            { t: '        state: present', c: '#string' },
            { t: '    - name: Start Nginx service', c: '#comment' },
            { t: '      service:', c: '#prop' },
            { t: '        name: nginx', c: '#string' },
            { t: '        state: started', c: '#string' }
        ];

        let lineIdx = 0;
        const typePlaybook = () => {
            if (lineIdx >= lines.length) {
                setTimeout(runAnsible, 1000);
                return;
            }
            const line = lines[lineIdx];
            const div = document.createElement('div');
            div.className = 'ans-pb-line';

            // Use data attribute for color class instead of inline style
            const colorMap = {
                '#keyword': 'ans-c-keyword',
                '#prop': 'ans-c-prop',
                '#string': 'ans-c-string',
                '#comment': 'ans-c-comment'
            };
            div.classList.add(colorMap[line.c] || 'ans-c-string');

            div.textContent = line.t;
            body.appendChild(div);
            lineIdx++;
            setTimeout(typePlaybook, 200);
        };

        const runAnsible = () => {
            const logs = [
                { t: '$ ansible-playbook setup_webserver.yml', c: '#8b949e' },
                { t: 'PLAY [Setup Nginx Web Server] ************************************', c: '#fff' },
                { t: 'TASK [Gathering Facts] *******************************************', c: '#fff' },
                { t: 'ok: [web1.brice.fr]', c: '#06b6d4' },
                { t: 'TASK [Ensure Nginx is installed] *********************************', c: '#fff' },
                { t: 'changed: [web1.brice.fr]', c: '#eab308' },
                { t: 'TASK [Start Nginx service] ***************************************', c: '#fff' },
                { t: 'ok: [web1.brice.fr]', c: '#06b6d4' },
                { t: 'PLAY RECAP *******************************************************', c: '#fff' },
                { t: 'web1.brice.fr : ok=3 changed=1 unreachable=0 failed=0', c: '#22c55e' }
            ];

            let logIdx = 0;
            const typeLog = () => {
                if (logIdx >= logs.length) return;
                const log = logs[logIdx];
                const div = document.createElement('div');
                div.className = 'ans-term-line';
                div.style.color = log.c;
                div.textContent = log.t;
                if (term) {
                    term.appendChild(div);
                }
                logIdx++;
                setTimeout(typeLog, 400);
            };
            typeLog();
        };

        ScrollTrigger.create({
            trigger: "#ans-editor",
            start: "top 70%",
            onEnter: () => typePlaybook()
        });
    };

    // --- 3. Orchestration Diagram (Canvas) ---
    const initOrchestration = () => {
        const canvas = document.getElementById('ans-infra-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h;

        const resize = () => {
            w = canvas.width = canvas.clientWidth;
            h = canvas.height = canvas.clientHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const nodes = [
            { x: 0.15, y: 0.5, label: "Control Node", type: "master", size: 45, desc: "Point central d'orchestration Ansible." },
            { x: 0.5, y: 0.2, label: "Web Srv A", type: "node", size: 30, desc: "Serveur Nginx configuré par Ansible." },
            { x: 0.5, y: 0.5, label: "App Srv B", type: "node", size: 30, desc: "Backend Python/Node orchestré." },
            { x: 0.5, y: 0.8, label: "DB Srv C", type: "node", size: 30, desc: "Database hautement disponible." },
            { x: 0.85, y: 0.35, label: "Cloud AWS", type: "cloud", size: 35, desc: "Infrastructure cloud managée." },
            { x: 0.85, y: 0.65, label: "Private DC", type: "cloud", size: 35, desc: "Data Center on-premise sécurisé." },
        ];

        const connections = [[0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [3, 5]];
        let hovered = null;
        let mouse = { x: 0, y: 0 };

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            hovered = nodes.find(n => Math.hypot(n.x * w - mouse.x, n.y * h - mouse.y) < n.size);
        });

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            // Connections
            ctx.lineWidth = 1.5;
            connections.forEach(([i, j]) => {
                ctx.strokeStyle = "rgba(238, 0, 0, 0.2)";
                ctx.beginPath();
                ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
                ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
                ctx.stroke();
            });

            // Nodes
            nodes.forEach((n, idx) => {
                const x = n.x * w, y = n.y * h;
                const isH = hovered === n;
                const pulse = isH ? Math.sin(Date.now() * 0.01) * 10 : Math.sin(Date.now() * 0.002 + idx) * 5;

                ctx.fillStyle = isH ? "rgba(238, 0, 0, 0.2)" : "rgba(238, 0, 0, 0.05)";
                ctx.beginPath(); ctx.arc(x, y, n.size + 15 + pulse, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = isH ? "#222" : "#111";
                ctx.strokeStyle = isH ? "#EE0000" : "rgba(238, 0, 0, 0.6)";
                ctx.lineWidth = isH ? 3 : 2;
                ctx.beginPath(); ctx.arc(x, y, n.size, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

                ctx.fillStyle = isH ? "#EE0000" : "#fff";
                ctx.font = "bold 13px Inter"; ctx.textAlign = "center";
                ctx.fillText(n.label, x, y + n.size + 25);
            });

            // Tooltip
            if (hovered) {
                ctx.fillStyle = "rgba(0,0,0,0.9)";
                ctx.strokeStyle = "#EE0000";
                const tw = ctx.measureText(hovered.desc).width + 30;
                ctx.beginPath(); ctx.roundRect(mouse.x + 10, mouse.y - 40, tw, 30, 5); ctx.fill(); ctx.stroke();
                ctx.fillStyle = "#fff"; ctx.textAlign = "left";
                ctx.fillText(hovered.desc, mouse.x + 25, mouse.y - 20);
            }
            requestAnimationFrame(draw);
        };
        draw();
    };

    // --- Start ---
    init3DLogo();
    initPlaybookEditor();
    initOrchestration();
});
