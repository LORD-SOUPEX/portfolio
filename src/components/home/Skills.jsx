import styles from './Skills.module.css';
import SectionHeader from '../ui/SectionHeader';

const skills = [
  {
    title: "Touche à tout",
    description: "Polyvalent par nature, j'aime explorer et maîtriser de nouvelles technologies à chaque niveau de l'infrastructure."
  },
  {
    title: "Architecture",
    description: "Conception de systèmes scalables, maintenables et pensés pour évoluer avec les besoins de l'entreprise."
  },
  {
    title: "Analyse & Stratégie",
    description: "Capacité à traduire des besoins complexes en plans d'action mesurables et efficaces."
  }
];

export default function Skills() {
  return (
    <section id="skills" className={`${styles.skills} section alt-bg`}>
      <div className="container">
        <SectionHeader title="Compétences" subtitle="Un aperçu de mon expertise et des outils que j'utilise au quotidien." />

        <div className={styles.grid}>
          {skills.map((skill, i) => (
            <div key={i} className={`${styles.card} reveal`}>
              <div className={styles.icon}>{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
