import styles from './fullstack.module.css';

const stack = [
  {
    title: "Vanilla JavaScript",
    desc: "ES6+, manipulation du DOM native pour une légèreté absolue sans framework lourd."
  },
  {
    title: "PostgreSQL",
    desc: "Architecture de données robuste, Row Level Security (RLS) et fonctions sécurisées."
  },
  {
    title: "PWA (Progressive Web App)",
    desc: "Expérience proche du natif : mode hors-ligne, icône sur écran d'accueil et rapidité."
  }
];

export default function TechStack() {
  return (
    <section className="section">
      <div className="container">
        <h2 className={styles.diagramTitle} style={{ marginBottom: '16px' }}>Maîtrise Technique</h2>
        <p style={{ textAlign: 'center', marginBottom: '64px', color: 'var(--text-muted)' }}>
          Des outils modernes pour des applications web rapides et sécurisées.
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
