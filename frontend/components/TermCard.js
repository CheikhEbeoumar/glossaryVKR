import { useTranslation } from '../hooks/useTranslation';

export default function TermCard({ term }) {
  const { t } = useTranslation();
  
  return (
    <article style={{
      borderRadius: '16px',
      padding: '24px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '16px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    }}
    >
      {/* Gradient accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
        borderRadius: '16px 16px 0 0'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ 
          margin: '0 0 12px 0',
          fontSize: '20px',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #2d3748, #4a5568)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: '1.3'
        }}>
          {term.name}
        </h3>
        
        <p style={{ 
          color: '#4a5568',
          lineHeight: '1.6',
          fontSize: '16px',
          margin: '0 0 16px 0',
          fontWeight: '400'
        }}>
          {term.definition}
        </p>
        
        {term.sources && term.sources.length > 0 && (
          <div style={{ 
            marginTop: '16px',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            borderRadius: '10px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <p style={{ 
              margin: 0,
              fontSize: '14px',
              color: '#667eea',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>🔗</span>
              {t('common.source')}: 
              <a 
                href={term.sources[0]} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: '600',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderBottomColor = '#667eea';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderBottomColor = 'transparent';
                }}
              >
                {t('common.viewReference')}
              </a>
            </p>
          </div>
        )}
      </div>
    </article>
  );
}