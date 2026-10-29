import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Lang } from './data';
import { answer, chips, type Section } from './agentLogic';

interface Msg {
  id: number;
  q: string;
  text: string;
  section?: Section;
}

const UI = {
  en: {
    title: 'Ask my CV',
    placeholder: 'Ask me anything…',
    send: 'Send',
    hide: 'Hide',
    clear: 'Clear',
    jump: 'Show on page ↓',
    label: 'Ask a question about my CV',
  },
  de: {
    title: 'Frag meinen Lebenslauf',
    placeholder: 'Frag mich etwas…',
    send: 'Senden',
    hide: 'Ausblenden',
    clear: 'Leeren',
    jump: 'Auf der Seite zeigen ↓',
    label: 'Stelle eine Frage zu meinem Lebenslauf',
  },
} as const;

const LINK =
  /([\w.+-]+@[\w-]+\.[\w.]+|(?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:com|app|dev|io)(?:\/[^\s,;)]*)?)/gi;

function linkify(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(text))) {
    const t = m[0].replace(/[.]+$/, '');
    out.push(text.slice(last, m.index));
    const href = t.includes('@')
      ? `mailto:${t}`
      : /^https?:/.test(t)
        ? t
        : `https://${t}`;
    out.push(
      <a key={m.index} href={href} target="_blank" rel="noopener noreferrer">
        {t}
      </a>,
    );
    last = m.index + t.length;
    LINK.lastIndex = last;
  }
  out.push(text.slice(last));
  return out;
}

/** Types the answer out; shows links once it has finished. */
function Typed({ text, onTick }: { text: string; onTick: () => void }) {
  const reduce = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [n, setN] = useState(reduce.current ? text.length : 0);

  useEffect(() => {
    if (n >= text.length) return;
    const id = window.setTimeout(
      () => setN((v) => Math.min(text.length, v + 4)),
      12,
    );
    return () => window.clearTimeout(id);
  }, [n, text]);

  useEffect(() => {
    onTick();
  }, [n]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{n >= text.length ? linkify(text) : text.slice(0, n)}</>;
}

export default function Agent({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const nextId = useRef(1);
  const barRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Keep the page's bottom spacer in sync with the dock bar height.
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty(
        '--dock-h',
        `${el.offsetHeight}px`,
      );
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollDown = () => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const ask = (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    const r = answer(q, lang);
    setMsgs((m) => [
      ...m.slice(-9),
      { id: nextId.current++, q, text: r.text, section: r.section },
    ]);
    setOpen(true);
    setInput('');
  };

  const jump = (section: Section) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document
      .getElementById(section)
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <div className="dock">
      <div className="dock-inner">
        <section
          className={open && msgs.length ? 'dock-panel open' : 'dock-panel'}
          aria-label={t.title}
        >
          <div className="dock-panel-head">
            <span className="mono dim">{t.title}</span>
            <span className="dock-actions">
              <button type="button" onClick={() => setMsgs([])}>
                {t.clear}
              </button>
              <button type="button" onClick={() => setOpen(false)}>
                {t.hide}
              </button>
            </span>
          </div>
          <div className="dock-log" ref={listRef} role="log" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={m.id} className="dock-msg">
                <p className="dock-q mono">&gt; {m.q}</p>
                <p className="dock-a">
                  <Typed text={m.text} onTick={scrollDown} />
                </p>
                {m.section && i === msgs.length - 1 && (
                  <button
                    type="button"
                    className="dock-jump"
                    onClick={() => jump(m.section as Section)}
                  >
                    {t.jump}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="dock-bar" ref={barRef}>
          <div className="dock-chips">
            {chips[lang].map((c) => (
              <button
                key={c.query}
                type="button"
                className="dock-chip"
                onClick={() => ask(c.query)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <form
            className="dock-form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <span className="mono accent" aria-hidden="true">
              &gt;
            </span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => msgs.length && setOpen(true)}
              onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
              placeholder={t.placeholder}
              aria-label={t.label}
              maxLength={300}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="send"
            />
            <button type="submit" className="dock-send" disabled={!input.trim()}>
              {t.send}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
