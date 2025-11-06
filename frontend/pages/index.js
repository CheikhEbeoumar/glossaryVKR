import TermCard from '../components/TermCard';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { fetchTerms } from '../lib/api';
import { useTranslation } from '../hooks/useTranslation';

// SSG page: gets built at build-time
export default function Home({ terms }) {
  const { t } = useTranslation();
  
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '20px 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <h1 style={{ 
            margin: 0,
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '28px',
            fontWeight: '700'
          }}>
            📚 {t('common.glossary')}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LanguageSwitcher />
            <nav style={{ display: 'flex', gap: '8px' }}>
              {[
                { href: '/csr', label: t('navigation.csrDemo'), icon: '⚡' },
                { href: '/ssr', label: t('navigation.ssrDemo'), icon: '🚀' },
                { href: '/graph', label: t('navigation.graphView'), icon: '🔗' }
              ].map(link => (
              <a 
                key={link.href}
                href={link.href}
                style={{ 
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }}
              >
                <span>{link.icon}</span>
                {link.label}
              </a>
            ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '40px 24px'
      }}>
        {/* Hero Section */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '48px',
          color: 'white'
        }}>
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            margin: '0 0 16px 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            {t('pages.home.title')}
          </h2>
          <p style={{ 
            fontSize: '20px', 
            opacity: 0.9, 
            margin: 0,
            fontWeight: '300'
          }}>
            {t('pages.home.subtitle')}
          </p>
        </div>

        {/* Terms Grid */}
        <section style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
          marginTop: '32px'
        }}>
          {terms.map(term => <TermCard key={term.id} term={term} />)}
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // Note: when running build, ensure backend is running locally to fetch /api/terms
  const terms = await fetch('http://localhost:3000/api/terms').then(r => r.json()).catch(() => ([]));
  return { props: { terms }, revalidate: 60 };
}