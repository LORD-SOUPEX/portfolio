import { useEffect, useRef } from 'react';
import { 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  AmbientLight, 
  PointLight, 
  Group, 
  MeshPhongMaterial, 
  BoxGeometry, 
  Mesh 
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import styles from './terraform.module.css';

export default function TerraformHero() {
  const canvasRef = useRef(null);

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

    const ambientLight = new AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xE3B04B, 2, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const group = new Group();
    const material = new MeshPhongMaterial({
      color: 0xE3B04B,
      shininess: 150,
      transparent: true,
      opacity: 0.9,
    });

    // Top bar of T
    const topBarGeom = new BoxGeometry(2.5, 0.6, 0.6);
    const topBar = new Mesh(topBarGeom, material);
    topBar.position.y = 1;

    // Vertical stem of T
    const stemGeom = new BoxGeometry(0.7, 2.5, 0.6);
    const stem = new Mesh(stemGeom, material);
    stem.position.y = -0.4;

    group.add(topBar);
    group.add(stem);
    scene.add(group);
    camera.position.z = 5;

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
    gsap.from(group.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();

      topBarGeom.dispose();
      stemGeom.dispose();
      material.dispose();
      scene.clear();
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className="reveal">
            <h1 className={styles.title}>Terraform<span>.</span></h1>
            <p className={styles.subtitle}>Provisionnement d'infrastructures cloud reproductible, sécurisé et versionné.</p>
            <p className={styles.desc}>
              Du code à la production en quelques commandes.
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
