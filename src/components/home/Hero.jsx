import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} container`}>
        <div className={`${styles.content} reveal`}>
          <div className={styles.badge}>Bonjour, je suis</div>
          <h1 className={styles.title}>
            Brice Doublet
          </h1>
          <h2 className={styles.subtitle}>Ingénieur DevOps</h2>
          <p className={styles.description}>
            Spécialiste de l'automatisation, des pipelines CI/CD et de la robustesse des infrastructures. Passionné par l'innovation technique.
          </p>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4+</span>
              <span className={styles.statLabel}>Années d'expérience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Démarche CI/CD</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>∞</span>
              <span className={styles.statLabel}>Passionné par l'informatique</span>
            </div>
          </div>
          <div className={styles.cta}>
            <a href="#contact" className={styles.btnPrimary}>Démarrer un projet</a>
            <a href="#about" className={styles.btnSecondary}>Découvrir mon profil</a>
            <a href="/CV_Brice_DOUBLET.pdf" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>Télécharger mon CV</a>
          </div>
        </div>
        <div className={`${styles.visual} reveal`}>
          <div className={styles.imageBox}>
            <img src="/images/profil.jpg" alt="Brice Doublet" className={styles.profileImg} />
            <div className={styles.accentBox}></div>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}></div>
      </div>
    </section>
  );
}
