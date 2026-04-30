import styles from './ansible.module.css';

const steps = [
  {
    num: "01",
    desc: "Ciblage des serveurs et groupes d'hôtes."
  },
  {
    num: "02",
    desc: "Définition de l'état souhaité en YAML."
  },
  {
    num: "03",
    desc: "Validation en mode dry-run (check mode)."
  },
  {
    num: "04",
    desc: "Exécution et convergence de l'état."
  }
];

export default function AnsibleWorkflow() {
  return (
    <section className="section alt-bg">
      <div className="container">
        <h2 className={styles.diagramTitle} style={{ marginBottom: '16px' }}>L'Approche Ansible</h2>
        <p style={{ textAlign: 'center', marginBottom: '64px', color: 'var(--text-muted)' }}>
          Quatre étapes pour une configuration sans faille.
        </p>
        
        <div className={styles.workflowGrid}>
          {steps.map((step, i) => (
            <div key={i} className={`${styles.workflowStep} reveal`}>
              <div className={styles.stepNum}>{step.num}</div>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
