import styles from './About.module.css';
import SectionHeader from '../ui/SectionHeader';

export default function About() {
  return (
    <section id="about" className={`${styles.about} section alt-bg`}>
      <div className="container">
        <SectionHeader title="À Propos" subtitle="Expertise et Passion au service de l'Innovation" />
        
        <div className={styles.content}>
          <div className={`${styles.text} reveal`}>
            <p>
              Professionnel passionné par l'infrastructure et l'automatisation, je m'efforce de concevoir des systèmes qui ne sont pas seulement robustes, mais aussi évolutifs et intelligents.
            </p>
            <p>
              Mon parcours est guidé par une curiosité insatiable pour les nouvelles technologies et une rigueur méthodologique héritée de mes années d'expérience terrain. J'allie vision stratégique et exécution technique pour transformer des besoins complexes en architectures performantes.
            </p>
          </div>

          <div className={`${styles.grid} reveal`}>
            <div className={styles.card}>
              <h3>Architecture Cloud</h3>
              <p>Conception de systèmes haute disponibilité sur AWS, Azure et GCP avec une approche IaC.</p>
            </div>
            <div className={styles.card}>
              <h3>Performance & CI/CD</h3>
              <p>Optimisation des cycles de développement et automatisation radicale des pipelines de déploiement.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
