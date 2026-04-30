import { useEffect, useRef } from 'react';
import styles from './fullstack.module.css';

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
      ' > Email: admin@system.local',
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

export default function ArchDiagram() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;

    const resize = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    function drawWindow(win, index) {
      const scale = width < 600 ? 0.7 : 1;
      const w = win.w * scale;
      const h = win.h * scale;
      const x = win.x * width + Math.sin(time + index) * 10;
      const y = win.y * height + Math.cos(time * 0.7 + index) * 8;
      
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 30;
      
      ctx.fillStyle = '#1e1e1e';
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 12);
      ctx.fill();
      ctx.strokeStyle = win.color + '44';
      ctx.stroke();
      
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#2a2a2a';
      ctx.beginPath();
      ctx.roundRect(x, y, w, 35 * scale, {tl: 12, tr: 12, bl: 0, br: 0});
      ctx.fill();

      ctx.fillStyle = '#a0a0a0';
      ctx.font = `600 ${12 * scale}px Inter`;
      ctx.textAlign = 'center';
      ctx.fillText(win.title, x + w / 2, y + 21 * scale);

      ctx.fillStyle = '#121212';
      ctx.beginPath();
      ctx.roundRect(x + 10, y + 45 * scale, w - 20, h - (55 * scale), 6);
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

    let animationId;
    function draw() {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;
      windows.forEach((win, index) => drawWindow(win, index));
      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 className={styles.diagramTitle}>Architecture Cloud Moderne</h2>
        <div className={styles.canvasWrapper}>
          <canvas ref={canvasRef} className={styles.archCanvas} />
        </div>
      </div>
    </section>
  );
}
