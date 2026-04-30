import styles from './fullstack.module.css';

const stack = [
  {
    title: "GitHub Pages",
    desc: "Hébergement statique haute performance avec déploiement continu automatisé."
  },
  {
    title: "Supabase",
    desc: "Base de données PostgreSQL temps réel, authentification sécurisée et stockage fichiers."
  },
  {
    title: "OVH DNS",
    desc: "Gestion professionnelle des noms de domaine et redirection DNS optimisée."
  }
];

export default function CloudStack() {
  return (
    <section className="section alt-bg">
      <div className="container">
        <h2 className={styles.diagramTitle} style={{ marginBottom: '16px' }}>Écosystème Full Cloud</h2>
        <p style={{ textAlign: 'center', marginBottom: '64px', color: 'var(--text-muted)' }}>
          Une infrastructure légère, sans serveur à gérer, pour une performance maximale et des coûts maîtrisés.
        </p>
        
        <div className={styles.stackGrid}>
          {stack.map((item, i) => (
            <div key={i} className={`${styles.stackCard} reveal`}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
