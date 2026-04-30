import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsOpen(false), 0);
      return () => clearTimeout(timer);
    }
  }, [location, isOpen]);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandText}>BD</span><span className={styles.brandDot}>.</span>
        </Link>

        <button 
          className={`${styles.mobileToggle} ${isOpen ? styles.active : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>

        <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
          {location.pathname === '/' ? (
            <>
              <li><a href="#about" onClick={() => setIsOpen(false)}>À propos</a></li>
              <li><a href="#experience" onClick={() => setIsOpen(false)}>Expérience</a></li>
              <li><a href="#skills" onClick={() => setIsOpen(false)}>Compétences</a></li>
              <li><Link to="/ansible" onClick={() => setIsOpen(false)}>Ansible</Link></li>
              <li><Link to="/terraform" onClick={() => setIsOpen(false)}>Terraform</Link></li>
              <li><Link to="/fullstack" onClick={() => setIsOpen(false)}>Full-Stack</Link></li>
              <li><a href="#contact" className={styles.contactBtn} onClick={() => setIsOpen(false)}>Me Contacter</a></li>
            </>
          ) : (
            <>
              <li><Link to="/" onClick={() => setIsOpen(false)}>Retour à l'accueil</Link></li>
              {location.pathname !== '/ansible' && <li><Link to="/ansible" onClick={() => setIsOpen(false)}>Ansible</Link></li>}
              {location.pathname !== '/terraform' && <li><Link to="/terraform" onClick={() => setIsOpen(false)}>Terraform</Link></li>}
              {location.pathname !== '/fullstack' && <li><Link to="/fullstack" onClick={() => setIsOpen(false)}>Full-Stack</Link></li>}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
