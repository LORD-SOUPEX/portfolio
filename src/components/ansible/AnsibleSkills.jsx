import styles from './ansible.module.css';

const skills = [
  {
    title: "Playbooks",
    desc: "Conception de playbooks YAML complexes pour l'automatisation de bout en bout."
  },
  {
    title: "Roles & Collections",
    desc: "Modularisation du code Ansible pour une réutilisabilité maximale sur différents projets."
  },
  {
    title: "Ansible Vault",
    desc: "Gestion sécurisée des secrets, mots de passe et certificats via chiffrement AES."
  },
  {
    title: "Dynamic Inventory",
    desc: "Gestion d'inventaires dynamiques pour AWS, Azure et environnements hybrides."
  },
  {
    title: "CI/CD Integration",
    desc: "Automatisation du testing de roles (Molecule) et intégration dans GitLab/GitHub."
  },
  {
    title: "Ansible Galaxy",
    desc: "Utilisation et contribution à la communauté pour accélérer les déploiements."
  }
];

export default function AnsibleSkills() {
  return (
    <section className="section">
      <div className="container">
        <h2 className={styles.diagramTitle} style={{ marginBottom: '16px' }}>Compétences Ansible</h2>
        <p style={{ textAlign: 'center', marginBottom: '48px', color: 'var(--text-muted)' }}>
          Une maîtrise approfondie pour des infrastructures robustes et reproductibles.
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
