import styles from './Contact.module.css';
import SectionHeader from '../ui/SectionHeader';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader title="Contact" subtitle="Parlons de votre projet" />
        
        <div className={styles.grid}>
          <div className={`${styles.card} reveal`}>
            <h3>Prêt à collaborer ?</h3>
            <p>Je suis toujours ouvert aux nouvelles opportunités professionnelles, aux défis techniques et aux échanges enrichissants.</p>
            <a href="https://www.linkedin.com/in/brice-doublet/" target="_blank" rel="noopener noreferrer" className={styles.btn}>Me retrouver sur LinkedIn</a>
          </div>
          
          <div className={`${styles.card} reveal`} style={{ transitionDelay: '0.2s' }}>
            <h3>Formation Brice Info</h3>
            <p className={styles.subtitle}>Micro-Entreprise Formation</p>
            <div className={styles.legalInfo}>
              <div className={styles.legalRow}>
                <span className={styles.legalLabel}>SIREN :</span>
                <span className={styles.legalValue}>101612950</span>
              </div>
              <div className={styles.legalRow}>
                <span className={styles.legalLabel}>SIRET :</span>
                <span className={styles.legalValue}>10161295000010</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
