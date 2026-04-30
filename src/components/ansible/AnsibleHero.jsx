import { useEffect, useRef } from 'react';
import { 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  AmbientLight, 
  PointLight, 
  Group, 
  MeshPhongMaterial, 
  TorusGeometry, 
  Mesh, 
  Shape, 
  ExtrudeGeometry 
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import styles from './ansible.module.css';

export default function AnsibleHero() {
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    const ambientLight = new AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const redLight = new PointLight(0xEE0000, 2, 100);
    redLight.position.set(10, 10, 10);
    scene.add(redLight);

    const group = new Group();
    const material = new MeshPhongMaterial({
      color: 0xEE0000,
      shininess: 100,
      transparent: true,
      opacity: 0.95
    });

    // Circle base
    const ringGeom = new TorusGeometry(2, 0.15, 16, 100);
    const ring = new Mesh(ringGeom, material);
    group.add(ring);

    // Ansible "A" shape
    const aShape = new Shape();
    aShape.moveTo(0, 1.5);
    aShape.lineTo(0.9, -1.4);
    aShape.lineTo(0.35, -0.5);
    aShape.lineTo(-0.5, -1.0);
    aShape.lineTo(-0.9, -1.4);
    aShape.lineTo(0, 1.5);

    const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 3 };
    const aGeom = new ExtrudeGeometry(aShape, extrudeSettings);
    aGeom.center();
    const aMesh = new Mesh(aGeom, material);
    group.add(aMesh);

    scene.add(group);
    camera.position.z = 6;

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      group.rotation.y += 0.005;
      group.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    animate();
    gsap.from(group.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: "back.out(1.7)" });

    cleanupRef.current = () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();

      aGeom.dispose();
      ringGeom.dispose();
      material.dispose();
      scene.clear();
    };

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className="reveal">
            <h1 className={styles.title}>Ansible<span>.</span></h1>
            <p className={styles.subtitle}>Automatisation radicale de vos déploiements et de la configuration de votre parc serveur.</p>
            <p className={styles.desc}>
              Automatisation radicale de vos déploiements et de la configuration de votre parc serveur.
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
