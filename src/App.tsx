import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { content, type Lang } from './data';

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)',
    color: 'var(--ink)',
    transition: 'background 0.3s ease, color 0.3s ease',
    fontFamily: "'Archivo', sans-serif",
    fontSize: 16,
    lineHeight: 1.6,
  },
  main: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '48px 28px 0 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: 88,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    borderBottom: '1px solid var(--line)',
    paddingBottom: 14,
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'var(--accent)',
    color: '#FAF7F1',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: 15,
    padding: '11px 20px',
    borderRadius: 999,
  },
  btnOutline: {
    color: 'var(--ink)',
    textDecoration: 'none',
    fontSize: 15,
    fontWeight: 500,
    padding: '11px 16px',
    borderRadius: 999,
    border: '1px solid var(--border)',
  },
  rowGrid: {
    display: 'grid',
    gridTemplateColumns: '150px 1fr',
    gap: 20,
  },
} satisfies Record<string, CSSProperties>;

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, className: shown ? 'reveal shown' : 'reveal' };
}

function LangSwitch({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignSelf: 'flex-end',
        border: '1px solid var(--border)',
        borderRadius: 999,
        padding: 3,
        gap: 2,
      }}
      role="group"
      aria-label="Language"
    >
      {(['en', 'de'] as const).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          aria-pressed={lang === l}
          style={{
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.04em',
            padding: '5px 12px',
            borderRadius: 999,
            background: lang === l ? 'var(--ink)' : 'transparent',
            color: lang === l ? 'var(--bg)' : 'var(--muted)',
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [photoOk, setPhotoOk] = useState(true);
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'de') return saved;
    return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const t = content[lang];
  const experience = useReveal();
  const educationReveal = useReveal();
  const contact = useReveal();

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        {/* HERO */}
        <header
          className="rise"
          style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
        >
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-end',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
              className="theme-btn"
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--muted)',
                cursor: 'pointer',
                fontSize: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <LangSwitch lang={lang} onChange={setLang} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {photoOk && (
              <img
                src="/portrait.jpg"
                alt="MD Zillur Rahman"
                onError={() => setPhotoOk(false)}
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  flex: 'none',
                  padding: 2,
                  border: '2px solid var(--accent)',
                }}
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <h1
                style={{
                  margin: 0,
                  fontFamily: "'Newsreader', serif",
                  fontWeight: 500,
                  fontSize: 42,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                MD Zillur Rahman
              </h1>
              <p style={{ margin: 0, fontSize: 17, color: 'var(--muted)' }}>
                {t.subtitle}
              </p>
            </div>
          </div>

          <p
            style={{
              margin: 0,
              fontFamily: "'Newsreader', serif",
              fontSize: 23,
              lineHeight: 1.5,
              fontWeight: 400,
              color: 'var(--body)',
              textWrap: 'pretty',
            }}
          >
            {t.intro}
          </p>

          <p
            style={{
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 15,
              color: 'var(--accent)',
              fontWeight: 500,
            }}
          >
            <span
              className="dot"
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--accent)',
                flex: 'none',
              }}
            />
            {t.availability}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 12,
              paddingTop: 4,
            }}
          >
            <a
              className="btn-primary"
              href="/CV_Zillur_Rahman_DE_BW.pdf"
              download="CV_Zillur_Rahman_DE_BW.pdf"
              style={styles.btnPrimary}
            >
              {t.downloadCv}
            </a>
            <a
              className="btn-outline"
              href="https://github.com/zillur-rgb"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.btnOutline}
            >
              GitHub
            </a>
            <a
              className="btn-outline"
              href="https://www.linkedin.com/in/zillur-rgb/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.btnOutline}
            >
              LinkedIn
            </a>
            <a
              className="btn-outline"
              href="mailto:zillurdeu@gmail.com"
              style={styles.btnOutline}
            >
              {t.email}
            </a>
          </div>
        </header>

        {/* EXPERIENCE */}
        <section
          ref={experience.ref}
          className={experience.className}
          style={{ display: 'flex', flexDirection: 'column', gap: 40 }}
        >
          <h2 style={styles.sectionTitle}>{t.experienceTitle}</h2>

          {t.jobs.map((job) => (
            <article
              key={job.company + job.dates}
              className="row-grid"
              style={styles.rowGrid}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  paddingTop: 3,
                }}
              >
                <span
                  style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}
                >
                  {job.dates}
                </span>
                <span style={{ fontSize: 13, color: 'var(--faint)' }}>
                  {job.location}
                </span>
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Newsreader', serif",
                      fontSize: 24,
                      fontWeight: 500,
                      lineHeight: 1.25,
                    }}
                  >
                    {job.role}
                  </h3>
                  <span style={{ fontSize: 15, color: 'var(--muted)' }}>
                    {job.company}
                  </span>
                </div>
                <ul
                  style={{
                    margin: 0,
                    padding: '0 0 0 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 7,
                    fontSize: 15.5,
                    color: 'var(--body)',
                  }}
                >
                  {job.bullets.map((b) => (
                    <li key={b} style={{ textWrap: 'pretty' }}>
                      {b}
                    </li>
                  ))}
                </ul>
                <p
                  style={{
                    margin: '2px 0 0 0',
                    fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                    fontSize: 12.5,
                    lineHeight: 1.7,
                    color: 'var(--faint)',
                  }}
                >
                  {job.stack}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* EDUCATION */}
        <section
          ref={educationReveal.ref}
          className={educationReveal.className}
          style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
        >
          <h2 style={styles.sectionTitle}>{t.educationTitle}</h2>

          {t.education.map((ed) => (
            <div key={ed.school} className="row-grid" style={styles.rowGrid}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  paddingTop: 3,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500 }}>
                  {ed.dates}
                </span>
                <span style={{ fontSize: 13, color: 'var(--faint)' }}>
                  {ed.location}
                </span>
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Newsreader', serif",
                    fontSize: 21,
                    fontWeight: 500,
                  }}
                >
                  {ed.degree}
                </h3>
                <span style={{ fontSize: 15, color: 'var(--muted)' }}>
                  {ed.school}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* CONTACT */}
        <section
          ref={contact.ref}
          className={contact.className}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            borderTop: '1px solid var(--line)',
            padding: '56px 0 80px 0',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "'Newsreader', serif",
              fontSize: 34,
              fontWeight: 500,
              letterSpacing: '-0.01em',
            }}
          >
            {t.contactTitle}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              color: 'var(--body)',
              maxWidth: 480,
              textWrap: 'pretty',
            }}
          >
            {t.contactBody}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 12,
              paddingTop: 6,
            }}
          >
            <a
              className="btn-primary"
              href="mailto:zillurdeu@gmail.com"
              style={styles.btnPrimary}
            >
              zillurdeu@gmail.com
            </a>
            <a
              className="btn-outline"
              href="tel:+4917661965122"
              style={styles.btnOutline}
            >
              +49 176 6196 5122
            </a>
          </div>
          <p style={{ margin: '24px 0 0 0', fontSize: 13, color: 'var(--faint)' }}>
            {t.footer}
          </p>
        </section>
      </main>
    </div>
  );
}
