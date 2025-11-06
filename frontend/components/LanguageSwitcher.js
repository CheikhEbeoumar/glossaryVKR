import { useTranslation } from '../hooks/useTranslation';

export default function LanguageSwitcher({ variant = 'default' }) {
  const { t, locale, changeLanguage } = useTranslation();

  // Style variants for different page contexts
  const variants = {
    default: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: '1px solid rgba(102, 126, 234, 0.3)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    },
    csr: {
      background: 'linear-gradient(135deg, #f093fb, #f5576c)',
      color: 'white',
      border: '1px solid rgba(240, 147, 251, 0.3)',
      boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
    },
    ssr: {
      background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      color: 'white',
      border: '1px solid rgba(79, 172, 254, 0.3)',
      boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
    },
    graph: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: 'none',
    }
  };

  const currentStyle = variants[variant] || variants.default;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <select
        value={locale}
        onChange={(e) => changeLanguage(e.target.value)}
        style={{
          padding: '8px 12px',
          borderRadius: '8px',
          border: currentStyle.border,
          background: currentStyle.background,
          color: currentStyle.color,
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          outline: 'none',
          appearance: 'none',
          paddingRight: '32px',
          backdropFilter: 'blur(10px)',
          boxShadow: currentStyle.boxShadow,
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-1px)';
          if (currentStyle.boxShadow !== 'none') {
            e.target.style.boxShadow = currentStyle.boxShadow.replace('0.3)', '0.4)');
          }
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = currentStyle.boxShadow;
        }}
      >
        <option value="en" style={{ color: '#333', background: 'white' }}>
          🇺🇸 {t('language.english')}
        </option>
        <option value="ru" style={{ color: '#333', background: 'white' }}>
          🇷🇺 {t('language.russian')}
        </option>
      </select>
      <div style={{
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: currentStyle.color,
        fontSize: '12px'
      }}>
        ▼
      </div>
    </div>
  );
}