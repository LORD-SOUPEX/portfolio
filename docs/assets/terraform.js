/**
 * terraform.js
 * Interactive features for the Terraform page.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize GSAP Plugins ---
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. Three.js: 3D "T" Shape Logo ---
    const init3DLogo = () => {
        const canvas = document.getElementById('tf-canvas-3d');
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xE3B04B, 2, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const blueLight = new THREE.PointLight(0x5C4EE5, 1, 100);
        blueLight.position.set(-10, -5, 5);
        scene.add(blueLight);

        // "T" Shape Geometry
        const group = new THREE.Group();
        const material = new THREE.MeshPhongMaterial({
            color: 0xE3B04B,
            shininess: 150,
            transparent: true,
            opacity: 0.9,
            flatShading: false
        });

        // Top bar of T
        const topBarGeom = new THREE.BoxGeometry(2.5, 0.6, 0.6);
        const topBar = new THREE.Mesh(topBarGeom, material);
        topBar.position.y = 1;

        // Vertical stem of T
        const stemGeom = new THREE.BoxGeometry(0.7, 2.5, 0.6);
        const stem = new THREE.Mesh(stemGeom, material);
        stem.position.y = -0.4;

        group.add(topBar);
        group.add(stem);

        scene.add(group);
        camera.position.z = 5;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();

            // Auto rotation if no interaction
            if (!controls.active) {
                group.rotation.y += 0.005;
            }

            // Subtle floating effect
            group.position.y = Math.sin(Date.now() * 0.001) * 0.1;

            renderer.render(scene, camera);
        };

        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });

        animate();

        // Reveal animation with GSAP
        gsap.from(group.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" });
    };

    // --- 2. Code Editor Typing Effect ---
    const initCodeEditor = () => {
        const codeBody = document.getElementById('codeBody');
        const terminalBody = document.getElementById('terminalBody');
        if (!codeBody) return;

        const codeLines = [
            { content: '<span class="c-keyword">resource</span> <span class="c-type">"aws_instance"</span> <span class="c-string">"web"</span> <span class="c-bracket">{</span>', delay: 500 },
            { content: '  <span class="c-prop">ami</span>           = <span class="c-string">"ami-0c55b159cbfafe1f0"</span>', delay: 200 },
            { content: '  <span class="c-prop">instance_type</span> = <span class="c-string">"t2.micro"</span>', delay: 200 },
            { content: '', delay: 100 },
            { content: '  <span class="c-prop">tags</span> = <span class="c-bracket">{</span>', delay: 200 },
            { content: '    <span class="c-prop">Name</span> = <span class="c-string">"Terraform-Demo"</span>', delay: 200 },
            { content: '  <span class="c-bracket">}</span>', delay: 200 },
            { content: '<span class="c-bracket">}</span>', delay: 200 },
            { content: '', delay: 500 },
            { content: '<span class="c-comment"># Provisioning a secure VPC</span>', delay: 300 },
            { content: '<span class="c-keyword">module</span> <span class="c-type">"vpc"</span> <span class="c-bracket">{</span>', delay: 200 },
            { content: '  <span class="c-prop">source</span>  = <span class="c-string">"terraform-aws-modules/vpc/aws"</span>', delay: 200 },
            { content: '  <span class="c-prop">version</span> = <span class="c-string">"5.0.0"</span>', delay: 200 },
            { content: '<span class="c-bracket">}</span>', delay: 200 }
        ];

        let currentLine = 0;

        const typeLine = () => {
            if (currentLine >= codeLines.length) {
                setTimeout(runTerraform, 1000);
                return;
            }

            const lineData = codeLines[currentLine];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'tf-code-line';
            lineDiv.innerHTML = `
                <span class="tf-line-num">${currentLine + 1}</span>
                <span class="tf-line-content">${lineData.content}</span>
            `;
            codeBody.appendChild(lineDiv);

            // Trigger visibility
            requestAnimationFrame(() => lineDiv.classList.add('visible'));

            codeBody.scrollTop = codeBody.scrollHeight;
            currentLine++;
            setTimeout(typeLine, lineData.delay || 300);
        };

        const runTerraform = () => {
            const logs = [
                { text: '<span class="tf-term-prompt">$</span> terraform plan', delay: 500 },
                { text: '<span class="tf-term-info">Plan:</span> 2 to add, 0 to change, 0 to destroy.', delay: 1000 },
                { text: '<span class="tf-term-prompt">$</span> terraform apply -auto-approve', delay: 800 },
                { text: 'aws_instance.web: Creating...', delay: 1200 },
                { text: 'module.vpc: Creating...', delay: 500 },
                { text: 'aws_instance.web: <span class="tf-term-success">Creation complete after 10s</span>', delay: 1500 },
                { text: 'module.vpc: <span class="tf-term-success">Creation complete after 15s</span>', delay: 1000 },
                { text: '<span class="tf-term-success">Apply complete! Resources: 2 added, 0 changed, 0 destroyed.</span>', delay: 500 }
            ];

            let logIdx = 0;
            const typeLog = () => {
                if (logIdx >= logs.length) return;

                const logData = logs[logIdx];
                const logDiv = document.createElement('div');
                logDiv.className = 'tf-term-line';
                logDiv.innerHTML = logData.text;
                terminalBody.appendChild(logDiv);

                requestAnimationFrame(() => logDiv.classList.add('visible'));
                terminalBody.scrollTop = terminalBody.scrollHeight;

                logIdx++;
                setTimeout(typeLog, logData.delay);
            };
            typeLog();
        };

        // Start typing when section is in view
        ScrollTrigger.create({
            trigger: "#tf-editor",
            start: "top 70%",
            onEnter: () => {
                if (codeBody.children.length === 0) {
                    codeBody.innerHTML = '<span class="tf-cursor-blink"></span>';
                    setTimeout(() => {
                        codeBody.innerHTML = '';
                        typeLine();
                    }, 1000);
                }
            }
        });
    };

    // --- 3. Infrastructure Diagram (Canvas with Tooltips) ---
    const initInfraDiagram = () => {
        const canvas = document.getElementById('tf-infra-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;

        const resize = () => {
            width = canvas.width = canvas.clientWidth;
            height = canvas.height = canvas.clientHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const nodes = [
            { id: 0, x: 0.1, y: 0.5, label: "Internet", type: "base", size: 30, desc: "Internet Gateway : Point d'entrée du trafic public." },
            { id: 1, x: 0.25, y: 0.5, label: "VPC", type: "base", size: 45, desc: "Virtual Private Cloud : Réseau isolé et segmenté." },
            { id: 2, x: 0.45, y: 0.5, label: "ALB", type: "compute", size: 35, desc: "Application Load Balancer : Distribution intelligente du trafic." },
            { id: 3, x: 0.65, y: 0.35, label: "Web Srv 1", type: "compute", size: 28, desc: "EC2 Instance : Serveur web en zone de disponibilité A." },
            { id: 4, x: 0.65, y: 0.65, label: "Web Srv 2", type: "compute", size: 28, desc: "EC2 Instance : Serveur web en zone de disponibilité B." },
            { id: 5, x: 0.85, y: 0.5, label: "RDS Cluster", type: "data", size: 38, desc: "Multi-AZ DB Cluster : Base de données hautement disponible." },
            { id: 6, x: 0.45, y: 0.2, label: "NAT GW", type: "base", size: 25, desc: "NAT Gateway : Sortie sécurisée pour les sous-réseaux privés." },
            { id: 7, x: 0.45, y: 0.8, label: "S3", type: "storage", size: 25, desc: "S3 Bucket : Stockage objet pour les assets statiques." },
        ];

        const connections = [
            [0, 1], [1, 2], [1, 6], [2, 3], [2, 4], [3, 5], [4, 5], [3, 7], [4, 7], [6, 3]
        ];

        let hoveredNode = null;
        const mouse = { x: 0, y: 0 };

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;

            hoveredNode = nodes.find(n => {
                const distance = Math.hypot(n.x * width - mouse.x, n.y * height - mouse.y);
                return distance < n.size;
            });
        });

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connections
            ctx.lineWidth = 2;
            connections.forEach(([i, j]) => {
                const n1 = nodes[i];
                const n2 = nodes[j];
                ctx.strokeStyle = "rgba(227,176,75,0.2)";
                ctx.beginPath();
                ctx.moveTo(n1.x * width, n1.y * height);
                ctx.lineTo(n2.x * width, n2.y * height);
                ctx.stroke();
            });

            // Draw nodes
            nodes.forEach((node, idx) => {
                const x = node.x * width;
                const y = node.y * height;
                const isHovered = hoveredNode === node;
                const pulse = isHovered ? Math.sin(Date.now() * 0.01) * 8 : Math.sin(Date.now() * 0.002 + idx) * 5;

                // Glow
                const gradSize = isHovered ? node.size + 40 : node.size + 20;
                const shadowGrad = ctx.createRadialGradient(x, y, 0, x, y, gradSize);
                shadowGrad.addColorStop(0, isHovered ? "rgba(227,176,75,0.3)" : "rgba(227,176,75,0.15)");
                shadowGrad.addColorStop(1, "transparent");
                ctx.fillStyle = shadowGrad;
                ctx.beginPath();
                ctx.arc(x, y, gradSize + pulse, 0, Math.PI * 2);
                ctx.fill();

                // Circle
                ctx.fillStyle = isHovered ? "#22223b" : "#1a1a2e";
                ctx.strokeStyle = isHovered ? "rgba(227,176,75,1)" : "rgba(227,176,75,0.8)";
                ctx.lineWidth = isHovered ? 3 : 2;
                ctx.beginPath();
                ctx.arc(x, y, node.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Label
                ctx.fillStyle = isHovered ? "#E3B04B" : "#fff";
                ctx.font = isHovered ? "bold 13px 'Inter', sans-serif" : "bold 12px 'Inter', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(node.label, x, y + node.size + 20);
            });

            // Tooltip
            if (hoveredNode) {
                const padding = 15;
                const fontHeight = 14;
                ctx.font = "12px 'Inter', sans-serif";
                const textWidth = ctx.measureText(hoveredNode.desc).width;
                const boxW = textWidth + padding * 2;
                const boxH = fontHeight + padding * 2;

                let tx = mouse.x + 10;
                let ty = mouse.y - boxH - 10;

                // Keep in bounds
                if (tx + boxW > width) tx = mouse.x - boxW - 10;
                if (ty < 0) ty = mouse.y + 20;

                ctx.fillStyle = "rgba(18, 18, 18, 0.95)";
                ctx.strokeStyle = "rgba(227, 176, 75, 0.5)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(tx, ty, boxW, boxH, 8);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = "#fff";
                ctx.textAlign = "left";
                ctx.fillText(hoveredNode.desc, tx + padding, ty + padding + fontHeight / 2 + 2);
            }

            requestAnimationFrame(draw);
        };

        ScrollTrigger.create({
            trigger: canvas,
            start: "top 80%",
            onEnter: () => draw()
        });
    };

    // --- Start All ---
    init3DLogo();
    initCodeEditor();
    initInfraDiagram();
});
