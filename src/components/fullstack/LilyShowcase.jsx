import styles from './fullstack.module.css';

export default function LilyShowcase() {
  return (
    <section className={`${styles.showcase} section alt-bg`}>
      {/* Decorative background elements */}
      <div className={styles.blob} aria-hidden="true"></div>
      <div className={styles.blobAlt} aria-hidden="true"></div>

      <div className="container">
        <div className={styles.grid}>
          <div className={`${styles.content} reveal`}>
            <div className={styles.badge}>Projet Signature</div>
            <h2 className={styles.title}>Fidélité Connectée<span>.</span></h2>
            <p className={styles.desc}>
              Une solution digitale de pointe pour <strong>Lily Nails Studio</strong>, transformant radicalement l'expérience client traditionnelle en un parcours numérique fluide et premium.
            </p>
            
            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <h4>Expérience PWA</h4>
                <p>Application installable sans friction sur mobile, offrant une expérience native fluide.</p>
              </div>
              <div className={styles.featureItem}>
                <h4>Temps Réel</h4>
                <p>Synchronisation instantanée des points de fidélité via Supabase et PostgreSQL.</p>
              </div>
              <div className={styles.featureItem}>
                <h4>Sécurité</h4>
                <p>Authentification robuste et gestion stricte des données (RGPD).</p>
              </div>
            </div>

            <div className={styles.quotes}>
              <div className={styles.quoteCard}>
                <p>"Meilleure salon pour les ongles ! Lily est perfectionniste, à l'écoute, et pleine de bons conseils."</p>
                <span>- Cliente vérifiée</span>
              </div>
              <div className={styles.quoteCard}>
                <p>"Super beau travail, très précise et soignée. Je recommande x1000 !"</p>
                <span>- Cliente vérifiée</span>
              </div>
            </div>

            <a href="https://lilynailstudio.fr" target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
              Découvrir le projet
            </a>
          </div>

          <div className={`${styles.visual} reveal`}>
            <div className={styles.mockupWrapper}>
              <div className={styles.glowEffect}></div>
              <img 
                src="/images/lily/nail-art-1.png" 
                alt="Lily Nails App" 
                className={styles.appScreen} 
                width="456" 
                height="570"
                loading="lazy"
              />
              <div className={styles.glassFrame}></div>
              
              {/* Floating tech tags */}
              <div className={`${styles.techTag} ${styles.tag1}`}>React</div>
              <div className={`${styles.techTag} ${styles.tag2}`}>Supabase</div>
              <div className={`${styles.techTag} ${styles.tag3}`}>PWA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
