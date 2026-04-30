import styles from './SectionHeader.module.css';

export default function SectionHeader({ title, subtitle, className = '' }) {
  return (
    <div className={`${styles.header} reveal ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.line}></div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
