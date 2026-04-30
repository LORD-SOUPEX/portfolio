import { useEffect, useRef, useCallback } from 'react';
import styles from './ansible.module.css';

const nodes = [
  { x: 0.15, y: 0.5, label: "Control Node", type: "master", size: 45, desc: "Point central d'orchestration Ansible." },
  { x: 0.5, y: 0.2, label: "Web Srv A", type: "node", size: 30, desc: "Serveur Nginx configuré par Ansible." },
  { x: 0.5, y: 0.5, label: "App Srv B", type: "node", size: 30, desc: "Backend Python/Node orchestré." },
  { x: 0.5, y: 0.8, label: "DB Srv C", type: "node", size: 30, desc: "Database hautement disponible." },
  { x: 0.85, y: 0.35, label: "Cloud AWS", type: "cloud", size: 35, desc: "Infrastructure cloud managée." },
  { x: 0.85, y: 0.65, label: "Private DC", type: "cloud", size: 35, desc: "Data Center on-premise sécurisé." },
];

const connections = [[0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [3, 5]];

export default function OrchestrationDiagram() {
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
    let w, h;

    const resize = () => {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const hovered = nodes.find(n => Math.hypot(n.x * w - mx, n.y * h - my) < n.size);
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
      ctx.clearRect(0, 0, w, h);
      const hNode = hoveredRef.current;

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
        const isH = hNode && hNode.label === n.label;
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
        <h2 className={styles.diagramTitle}>Contrôle Centralisé</h2>
        <p style={{ textAlign: 'center', marginBottom: '48px', color: 'var(--text-muted)' }}>
          Visualisez comment Ansible propage les configurations de façon agentless et sécurisée.
        </p>
        <div className={styles.canvasWrapper}>
          <canvas ref={canvasRef} className={styles.infraCanvas} />
          <div ref={tooltipRef} className={styles.tooltip} style={{ left: '50%', transform: 'translateX(-50%)', display: 'none' }}></div>
        </div>
      </div>
    </section>
  );
}
