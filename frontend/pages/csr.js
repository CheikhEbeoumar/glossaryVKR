import { useEffect, useState } from 'react';
import TermCard from '../components/TermCard';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { fetchTerms } from '../lib/api';
import { useTranslation } from '../hooks/useTranslation';

// CSR page: content fetched on the client
export default function CSRPage() {
  const { t } = useTranslation();
  const [terms, setTerms] = useState(null);
  useEffect(() => {
    fetchTerms().then(t => setTerms(t)).catch(() => setTerms([]));
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '28px',
            fontWeight: '700'
          }}>
            ⚡ {t('navigation.csrDemo')}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LanguageSwitcher variant="csr" />
            <a 
              href="/"
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                color: 'white',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)'
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
            {t('pages.csr.title')}
          </h2>
          <p style={{ 
            fontSize: '18px', 
            opacity: 0.9, 
            margin: 0,
            fontWeight: '300'
          }}>
            {t('pages.csr.subtitle')}
          </p>
        </div>

        {/* Terms Grid */}
        <section style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px'
        }}>
          {terms === null ? (
            <div style={{ 
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 20px',
              color: 'white'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px',
                animation: 'spin 1s linear infinite'
              }}>
                ⚡
              </div>
              <p style={{ fontSize: '18px', fontWeight: '500' }}>{t('pages.csr.loadingTerms')}</p>
            </div>
          ) : (
            terms.map(t => <TermCard key={t.id} term={t} />)
          )}
        </section>
      </main>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}