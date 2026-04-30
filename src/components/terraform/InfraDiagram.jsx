import { useEffect, useRef, useCallback } from 'react';
import styles from './terraform.module.css';

const nodes = [
  { id: 0, x: 0.1, y: 0.5, label: "Internet", type: "base", size: 30, desc: "Internet Gateway : Point d'entrée du trafic public." },
  { id: 1, x: 0.25, y: 0.5, label: "VPC", type: "base", size: 45, desc: "Virtual Private Cloud : Réseau isolé et segmenté." },
  { id: 2, x: 0.45, y: 0.5, label: "ALB", type: "compute", size: 35, desc: "Application Load Balancer : Distribution intelligente du trafic." },
  { id: 3, x: 0.65, y: 0.35, label: "Web Srv 1", type: "compute", size: 28, desc: "EC2 Instance : Serveur web en zone de disponibilité A." },
  { id: 4, x: 0.65, y: 0.65, label: "Web Srv 2", type: "compute", size: 28, desc: "EC2 Instance : Serveur web en zone de disponibilité B." },
  { id: 5, x: 0.85, y: 0.5, label: "RDS Cluster", type: "data", size: 38, desc: "Multi-AZ DB Cluster : Base de données hautement disponible." },
  { id: 6, x: 0.45, y: 0.2, label: "NAT GW", type: "base", size: 25, desc: "NAT Gateway : Sortie sécurisée pour les sous-réseaux privés." },
];

const connections = [[0, 1], [1, 2], [1, 6], [2, 3], [2, 4], [3, 5], [4, 5], [6, 3]];

export default function InfraDiagram() {
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);
  const hoveredRef = useRef(null);

  const updateTooltip = useCallback((node) => {
    if (tooltipRef.current) {
      if (node) {
        tooltipRef.current.textContent = node.desc;
        tooltipRef.current.style.display = 'block';
      } else {
        tooltipRef.current.style.display = 'none';
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const hovered = nodes.find(n => Math.hypot(n.x * width - mx, n.y * height - my) < n.size);
      hoveredRef.current = hovered || null;
      updateTooltip(hoveredRef.current);
    };

    const handleMouseLeave = () => {
      hoveredRef.current = null;
      updateTooltip(null);
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    resize();

    let animationId;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const hoveredNode = hoveredRef.current;

      // Connections
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(227,176,75,0.2)";
      connections.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x * width, nodes[i].y * height);
        ctx.lineTo(nodes[j].x * width, nodes[j].y * height);
        ctx.stroke();
      });

      // Nodes
      nodes.forEach((node, idx) => {
        const x = node.x * width;
        const y = node.y * height;
        const isHovered = hoveredNode && hoveredNode.id === node.id;
        const pulse = isHovered ? Math.sin(Date.now() * 0.01) * 8 : Math.sin(Date.now() * 0.002 + idx) * 5;

        // Glow
        const gradSize = isHovered ? node.size + 40 : node.size + 20;
        const shadowGrad = ctx.createRadialGradient(x, y, 0, x, y, gradSize);
        shadowGrad.addColorStop(0, isHovered ? "rgba(227,176,75,0.3)" : "rgba(227,176,75,0.15)");
        shadowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = shadowGrad;
        ctx.beginPath(); ctx.arc(x, y, gradSize + pulse, 0, Math.PI * 2); ctx.fill();

        // Circle
        ctx.fillStyle = isHovered ? "#22223b" : "#1a1a2e";
        ctx.strokeStyle = isHovered ? "rgba(227,176,75,1)" : "rgba(227,176,75,0.8)";
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.beginPath(); ctx.arc(x, y, node.size, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

        // Label
        ctx.fillStyle = isHovered ? "#E3B04B" : "#fff";
        ctx.font = isHovered ? "bold 13px Inter" : "bold 12px Inter";
        ctx.textAlign = "center";
        ctx.fillText(node.label, x, y + node.size + 20);
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [updateTooltip]);

  return (
    <section className="section alt-bg">
      <div className="container">
        <h2 className={styles.diagramTitle}>Visualisation d'Infrastructure</h2>
        <p style={{ textAlign: 'center', marginBottom: '48px', color: 'var(--text-muted)' }}>
          Un aperçu interactif de l'architecture cloud provisionnée avec Terraform.
        </p>
        <div className={styles.canvasWrapper}>
          <canvas ref={canvasRef} className={styles.infraCanvas} />
          <div ref={tooltipRef} className={styles.tooltip} style={{ display: 'none' }}></div>
        </div>
      </div>
    </section>
  );
}
