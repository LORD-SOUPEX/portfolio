import styles from './terraform.module.css';

const steps = [
  {
    cmd: "terraform init",
    desc: "Initialisation du projet et téléchargement des providers."
  },
  {
    cmd: "terraform plan",
    desc: "Prévisualisation des changements avant application."
  },
  {
    cmd: "terraform apply",
    desc: "Déploiement de l'infrastructure déclarée."
  },
  {
    cmd: "terraform destroy",
    desc: "Suppression propre de toute l'infrastructure."
  }
];

export default function TerraformWorkflow() {
  return (
    <section className="section alt-bg">
      <div className="container">
        <h2 className={styles.diagramTitle} style={{ marginBottom: '16px' }}>Le Cycle Terraform</h2>
        <p style={{ textAlign: 'center', marginBottom: '64px', color: 'var(--text-muted)' }}>
          Quatre commandes pour gouverner votre infrastructure.
        </p>
        
        <div className={styles.workflowGrid}>
          {steps.map((step, i) => (
            <div key={i} className={`${styles.workflowStep} reveal`}>
              <div className={styles.stepCmd}>{step.cmd}</div>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
