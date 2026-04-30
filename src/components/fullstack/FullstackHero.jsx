import { useEffect, useRef } from 'react';
import { 
  WebGLRenderer, 
  Scene, 
  PerspectiveCamera, 
  Group, 
  SphereGeometry, 
  MeshBasicMaterial, 
  Mesh 
} from 'three';
import styles from './fullstack.module.css';

export default function FullstackHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 120;

    const group = new Group();
    scene.add(group);

    const nodeCount = 60;
    const nodeGeometry = new SphereGeometry(0.8, 8, 8);
    const nodeMaterial = new MeshBasicMaterial({ color: 0x00C9A7 });
    
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new Mesh(nodeGeometry, nodeMaterial);
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 50;

      mesh.position.set(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      group.add(mesh);
    }

    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);
      group.rotation.y += 0.002;
      group.rotation.x += 0.001;
      renderer.render(scene, camera);
    }

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      scene.clear();
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className="reveal">
            <h1 className={styles.title}>FullStack<span>.</span></h1>
            <p className={styles.subtitle}>Architecte de solutions numériques agiles.</p>
            <p className={styles.desc}>
              Intégration transparente entre interface utilisateur et services Cloud.
            </p>
          </div>
          <div className={`${styles.visual} reveal`}>
            <canvas ref={canvasRef} className={styles.canvas3d} />
          </div>
        </div>
      </div>
    </section>
  );
}
