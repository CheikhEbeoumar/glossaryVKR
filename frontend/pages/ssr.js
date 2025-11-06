import TermCard from '../components/TermCard';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { fetchTerms } from '../lib/api';
import { useTranslation } from '../hooks/useTranslation';

// SSR page: data loaded on each request on the server
export default function SSRPage({ terms }) {
  const { t } = useTranslation();
  
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
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
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '28px',
            fontWeight: '700'
          }}>
            🚀 {t('navigation.ssrDemo')}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LanguageSwitcher variant="ssr" />
            <a 
              href="/"
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                color: 'white',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)'
              }}
            >
              ← {t('common.backToHome')}
            </a>
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
            fontSize: '36px', 
            fontWeight: '800', 
            margin: '0 0 16px 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            {t('pages.ssr.title')}
          </h2>
          <p style={{ 
            fontSize: '18px', 
            opacity: 0.9, 
            margin: 0,
            fontWeight: '300'
          }}>
            {t('pages.ssr.subtitle')}
          </p>
        </div>

        {/* Terms Grid */}
        <section style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px'
        }}>
          {terms.map(t => <TermCard key={t.id} term={t} />)}
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/terms');
    const terms = await res.json();
    return { props: { terms } };
  } catch (err) {
    return { props: { terms: [] } };
  }
}