import styles from './Experience.module.css';
import SectionHeader from '../ui/SectionHeader';

const experiences = [
  {
    period: "Sept. 2025 - Présent",
    title: "Intervenant Technique",
    company: "CESI · Indépendant (La Rochelle)",
    description: "Intervenant technique en infrastructure, système et réseaux pour des élèves de Master (MALSI) et Licence (Bachelors ASR).",
    tags: ["Infrastructure", "Réseaux", "Pédagogie"]
  },
  {
    period: "Févr. 2025 - Présent",
    title: "Ingénieur Système et Infrastructure",
    company: "Groupe Covéa (Niort)",
    description: "Mise en œuvre et gestion d'infrastructures cloud et locales. Démarche DevSecOps, certification CIS CAT (OSE) et mise en place de tableaux de bord Grafana.",
    tags: ["DevSecOps", "Grafana", "Sécurité"]
  },
  {
    period: "Févr. 2024 - Août 2024",
    title: "Stagiaire en Laboratoire Universitaire",
    company: "Massey University (Auckland, NZ)",
    description: "Création et programmation de serveur physique / architecture IoT. Création de dashboards basés sur des modules Arduino. Formation au Machine Learning. Rédaction d'un article de recherche en anglais sur le forecasting IoT.",
    tags: ["IoT", "Machine Learning", "Arduino"]
  },
  {
    period: "Sept. 2022 - Déc. 2022",
    title: "Stagiaire en Développement",
    company: "Kapsül Teknoloji Platformu (Turquie)",
    description: "Membre de la section \"Ville Intelligente\". Développement d'un jeu vidéo mobile en C# sous Unity permettant de visiter virtuellement la ville.",
    tags: ["C#", "Unity"]
  },
  {
    period: "Sept. 2021 - Sept. 2022",
    title: "Alternant Informatique",
    company: "ADEI 17 (Aytré)",
    description: "Gestion quotidienne du service informatique : support technique, changement de postes, configuration et mise en place de switch niveau 2 pour la téléphonie IP. Déploiement d'un projet de supervision Centreon sous environnement Linux.",
    tags: ["Linux", "Centreon", "Réseaux"]
  },
  {
    period: "Avr. 2021 - Juil. 2021",
    title: "Stagiaire en Informatique",
    company: "CGO Expertise Comptable (Fontcouverte)",
    description: "Mise en place de machines virtuelles Linux en production. Recherche de solutions et implémentation d'un serveur de logs visant à centraliser toutes les remontées de l'entreprise (Stack Graylog, Elastic, SLK).",
    tags: ["Elastic", "Graylog", "Virtualisation"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader title="Parcours" subtitle="Expériences Professionnelles" />
        
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={index} className={`${styles.item} reveal`}>
              <div className={styles.dot}></div>
              <div className={styles.content}>
                <span className={styles.period}>{exp.period}</span>
                <h3 className={styles.title}>{exp.title}</h3>
                <h4 className={styles.company}>{exp.company}</h4>
                <p className={styles.desc}>{exp.description}</p>
                <div className={styles.tags}>
                  {exp.tags.map((tag, tIndex) => (
                    <span key={tIndex} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
