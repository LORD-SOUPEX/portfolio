import styles from './terraform.module.css';

const skills = [
  {
    title: "Modules",
    desc: "Architecture modulaire réutilisable. Création de modules internes pour standardiser les déploiements."
  },
  {
    title: "Multi-Cloud",
    desc: "Déploiement sur AWS, Azure et GCP. Gestion unifiée des providers cloud."
  },
  {
    title: "State Management",
    desc: "Gestion sécurisée du state avec backend remote, locking et encryption."
  },
  {
    title: "CI/CD",
    desc: "Intégration dans les pipelines GitLab CI, GitHub Actions avec plan automatisé."
  },
  {
    title: "Policy as Code",
    desc: "Validation avec Sentinel et OPA. Conformité automatisée avant chaque déploiement."
  },
  {
    title: "Workspaces",
    desc: "Gestion multi-environnements (dev, staging, prod) avec workspaces isolés."
  }
];

export default function TerraformSkills() {
  return (
    <section className="section">
      <div className="container">
        <h2 className={styles.diagramTitle} style={{ marginBottom: '16px' }}>Compétences Terraform</h2>
        <p style={{ textAlign: 'center', marginBottom: '48px', color: 'var(--text-muted)' }}>
          Maîtrise complète de l'écosystème Terraform pour des déploiements fiables.
        </p>
        
        <div className={styles.skillsGrid}>
          {skills.map((skill, i) => (
            <div key={i} className={`${styles.skillCard} reveal`}>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
