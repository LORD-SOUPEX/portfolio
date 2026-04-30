import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '8rem', color: 'var(--accent-main)' }}>404</h1>
      <h2 style={{ marginBottom: '24px' }}>Page non trouvée</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '48px' }}>
        Oups ! La ressource que vous recherchez semble avoir été déplacée ou supprimée.
      </p>
      <Link to="/" style={{ 
        padding: '16px 32px', 
        backgroundColor: 'var(--accent-main)', 
        color: '#000', 
        borderRadius: '8px', 
        fontWeight: '600' 
      }}>
        Retour à l'accueil
      </Link>
    </div>
  );
}
