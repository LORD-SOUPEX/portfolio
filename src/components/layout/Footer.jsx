import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            BD<span>.</span>
          </Link>
          <p>Création numérique & Innovation.</p>
        </div>

        <div className={styles.links}>
          <div className={styles.group}>
            <h4>Exploration</h4>
            <ul className={styles.iconLinks}>
              <li>
                <Link to="/ansible" aria-label="Ansible Page" title="Ansible">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.176 17.514l-1.92-4.148-4.606.012 1.34 2.898H8.504l-1.424-3.085-1.574 1.353-.872-.99 2.115-1.815-.004-.008L12 3.655l5.952 12.864-.776.995zM12 5.922l-2.822 6.098 5.644-.015L12 5.922z"/>
                  </svg>
                </Link>
              </li>
              <li>
                <Link to="/terraform" aria-label="Terraform Page" title="Terraform">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" style={{ fontFamily: 'var(--font-heading)', fontWeight: '900', fontSize: '22px' }}>T</text>
                  </svg>
                </Link>
              </li>
              <li>
                <Link to="/fullstack" aria-label="Full Stack Page" title="Full Stack / React">
                  <svg width="40" height="40" viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                    <g stroke="currentColor">
                      <ellipse rx="11" ry="4.2"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                    </g>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.group}>
            <h4>Social</h4>
            <ul>
              <li><a href="https://www.linkedin.com/in/brice-doublet/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {currentYear} Brice Doublet. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
