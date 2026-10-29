import { content, type Lang } from './data';

export type Section = 'experience' | 'education' | 'contact';

export interface Reply {
  text: string;
  section?: Section;
}

interface Chunk {
  id: string;
  keys: string[];
  w?: number;
  section?: Section;
  text: Record<Lang, string>;
}

const both = (en: string, de: string): Record<Lang, string> => ({ en, de });

function jobText(lang: Lang, i: number): string {
  const j = content[lang].jobs[i];
  return `${j.company} | ${j.role} | ${j.dates} | ${j.location}\n${j.bullets
    .map((b) => `• ${b}`)
    .join('\n')}\nStack: ${j.stack}`;
}

function experienceText(lang: Lang): string {
  const t = content[lang];
  const intro = lang === 'de' ? 'Berufserfahrung' : 'Experience';
  const hint =
    lang === 'de'
      ? 'Frag nach einer Firma für Details.'
      : 'Ask about a company for details.';
  return `${intro}\n${t.jobs
    .map((j) => `• ${j.company}, ${j.role}, ${j.dates}, ${j.location}`)
    .join('\n')}\n${hint}`;
}

function educationText(lang: Lang): string {
  const t = content[lang];
  const intro = lang === 'de' ? 'Ausbildung' : 'Education';
  return `${intro}\n${t.education
    .map((e) => `• ${e.degree}, ${e.school}, ${e.dates} (${e.location})`)
    .join('\n')}`;
}

const chunks: Chunk[] = [
  {
    id: 'about',
    keys: ['about', 'who', 'yourself', 'intro', 'profile', 'über', 'ueber', 'wer', 'profil', 'vorstellen', 'summary'],
    text: both(
      "I'm Zillur, a full-stack software engineer in Dortmund, Germany. I build production web apps with PHP/Symfony, Node.js/NestJS, Vue.js and React, and I like turning legacy systems into modern platforms.",
      'Ich bin Zillur, Full-Stack-Softwareentwickler in Dortmund. Ich baue produktive Webanwendungen mit PHP/Symfony, Node.js/NestJS, Vue.js und React und modernisiere gern Altsysteme.',
    ),
  },
  {
    id: 'experience',
    section: 'experience',
    keys: ['experience', 'work', 'worked', 'job', 'jobs', 'career', 'company', 'companies', 'history', 'employer', 'erfahrung', 'berufserfahrung', 'arbeit', 'arbeitet', 'gearbeitet', 'karriere', 'arbeitgeber', 'firma', 'firmen', 'lebenslauf', 'cv', 'resume'],
    text: both(experienceText('en'), experienceText('de')),
  },
  {
    id: 'lingoking',
    section: 'experience',
    w: 4,
    keys: ['lingoking', 'legacy', 'symfony', 'platform', 'support', 'neos', 'redesign', 'neugestaltung', 'plattform'],
    text: both(jobText('en', 0), jobText('de', 0)),
  },
  {
    id: 'faaren',
    section: 'experience',
    w: 4,
    keys: ['faaren', 'laravel', 'car', 'auto', 'subscription', 'abo', 'würzburg', 'wuerzburg'],
    text: both(jobText('en', 1), jobText('de', 1)),
  },
  {
    id: 'modoplus',
    section: 'experience',
    w: 4,
    keys: ['modoplus', 'payment', 'payments', 'zahlung', 'zahlungen', 'stripe', 'trpc', 'nestjs', 'nest', 'mapbox', 'hamburg', 'search', 'suche', 'gateway', 'reviews'],
    text: both(jobText('en', 2), jobText('de', 2)),
  },
  {
    id: 'desseinlab',
    section: 'experience',
    w: 4,
    keys: ['desseinlab', 'london', 'mern', 'express', 'uk', 'england'],
    text: both(jobText('en', 3), jobText('de', 3)),
  },
  {
    id: 'skills',
    keys: ['skills', 'skill', 'stack', 'tech', 'technologies', 'technology', 'tools', 'know', 'knows', 'frameworks', 'framework', 'programming', 'programmiersprachen', 'programmiersprache', 'kenntnisse', 'kompetenzen', 'fähigkeiten', 'faehigkeiten', 'kannst', 'können', 'koennen', 'technologien'],
    text: both(
      'Skills\n• Backend: PHP, Symfony, API Platform, Laravel, Node.js, NestJS, Python, Django, Java, Spring Boot\n• Frontend: TypeScript, JavaScript, Vue.js, React, Next.js, HTML5, CSS3, Tailwind CSS\n• Data & Cloud: PostgreSQL, MySQL, MongoDB, AWS, Google Cloud\n• Tools & DevOps: Linux, Docker, Git, GitLab, Shell\n• AI-assisted dev: ChatGPT, Codex and Claude; LLM APIs, RAG, vector databases, LangChain',
      'Kompetenzen\n• Backend: PHP, Symfony, API Platform, Laravel, Node.js, NestJS, Python, Django, Java, Spring Boot\n• Frontend: TypeScript, JavaScript, Vue.js, React, Next.js, HTML5, CSS3, Tailwind CSS\n• Daten & Cloud: PostgreSQL, MySQL, MongoDB, AWS, Google Cloud\n• Tools & DevOps: Linux, Docker, Git, GitLab, Shell\n• KI-gestützte Entwicklung: ChatGPT, Codex und Claude; LLM-APIs, RAG, Vektordatenbanken, LangChain',
    ),
  },
  {
    id: 'techs',
    w: 2,
    keys: ['backend', 'frontend', 'python', 'php', 'typescript', 'javascript', 'vue', 'vuejs', 'docker', 'git', 'gitlab', 'linux', 'database', 'databases', 'datenbank', 'datenbanken', 'postgresql', 'mysql', 'mongodb', 'node', 'nodejs', 'django', 'java', 'spring', 'tailwind', 'next', 'nextjs', 'react', 'css', 'html'],
    text: { en: '@skills', de: '@skills' },
  },
  {
    id: 'ai',
    w: 3,
    keys: ['ai', 'llm', 'rag', 'langchain', 'vector', 'embedding', 'claude', 'chatgpt', 'codex', 'ki', 'vektordatenbanken', 'künstliche', 'intelligenz'],
    text: both(
      'AI-assisted development\nI work with ChatGPT, Codex and Claude, and I know LLM APIs, RAG, vector databases and LangChain.',
      'KI-gestützte Entwicklung\nIch arbeite mit ChatGPT, Codex und Claude und kenne LLM-APIs, RAG, Vektordatenbanken und LangChain.',
    ),
  },
  {
    id: 'aws',
    w: 3,
    keys: ['aws', 'amazon', 'cloud', 'certification', 'certified', 'certificate', 'zertifizierung', 'zertifikat', 'architect', 'solutions', 'exam', 'prüfung', 'pruefung'],
    text: both(
      "Cloud & AWS\nI know AWS and Google Cloud, and I'm preparing for the AWS Certified Solutions Architect - Associate exam.",
      'Cloud & AWS\nIch kenne AWS und Google Cloud und bereite mich auf die Prüfung AWS Certified Solutions Architect - Associate vor.',
    ),
  },
  {
    id: 'education',
    section: 'education',
    keys: ['education', 'study', 'studied', 'degree', 'university', 'school', 'bachelor', 'college', 'studium', 'studiert', 'ausbildung', 'uni', 'universität', 'universitaet', 'hochschule', 'abschluss', 'fachhochschule', 'soest', 'bangladesh', 'bangladesch'],
    text: both(educationText('en'), educationText('de')),
  },
  {
    id: 'languages',
    keys: ['speak', 'speaks', 'language', 'german', 'english', 'fluent', 'level', 'b1', 'b2', 'sprichst', 'sprechen', 'spricht', 'sprache', 'sprachen', 'deutsch', 'englisch', 'sprachkenntnisse'],
    text: both(
      'Languages\n• English: fluent\n• German: B1, B2 course in progress',
      'Sprachen\n• Englisch: fließend\n• Deutsch: B1, B2-Kurs läuft',
    ),
  },
  {
    id: 'availability',
    section: 'contact',
    w: 2,
    keys: ['available', 'availability', 'start', 'notice', 'immediately', 'joining', 'verfügbar', 'verfuegbar', 'verfügbarkeit', 'wann', 'ab', 'sofort', 'roles', 'positions', 'stelle', 'stellen', 'relocate', 'remote', 'onsite', 'hire', 'hiring', 'einstellen'],
    text: both(
      `${content.en.availability}.\n${content.en.contactBody}`,
      `${content.de.availability}.\n${content.de.contactBody}`,
    ),
  },
  {
    id: 'location',
    keys: ['live', 'lives', 'location', 'based', 'city', 'wohnst', 'wohnt', 'lebst', 'wohnort', 'standort', 'stadt', 'dortmund', 'germany', 'deutschland', 'licence', 'license', 'führerschein', 'fuehrerschein', 'driving'],
    text: both(
      "I'm based in Dortmund, Germany, and have worked remotely for companies in Munich, Hamburg and Würzburg. I hold a Class B driving licence.",
      'Ich lebe in Dortmund und habe remote für Unternehmen in München, Hamburg und Würzburg gearbeitet. Führerschein Klasse B.',
    ),
  },
  {
    id: 'projects',
    keys: ['projects', 'project', 'built', 'build', 'portfolio', 'side', 'projekte', 'projekt', 'gebaut', 'bauen', 'github', 'demo', 'source', 'code'],
    text: both(
      'Projects\n• This portfolio: built with Vite, React and TypeScript, bilingual (EN/DE), with light and dark mode. Source: github.com/zillur-rgb/portfolio-2',
      'Projekte\n• Dieses Portfolio: gebaut mit Vite, React und TypeScript, zweisprachig (DE/EN), mit hellem und dunklem Modus. Quellcode: github.com/zillur-rgb/portfolio-2',
    ),
  },
  {
    id: 'contact',
    section: 'contact',
    keys: ['contact', 'email', 'mail', 'reach', 'linkedin', 'message', 'social', 'kontakt', 'kontaktieren', 'erreichen', 'erreiche', 'nachricht'],
    text: both(
      'Contact\n• Email: zillurdeu@gmail.com\n• LinkedIn: linkedin.com/in/zillur-rgb\n• GitHub: github.com/zillur-rgb',
      'Kontakt\n• E-Mail: zillurdeu@gmail.com\n• LinkedIn: linkedin.com/in/zillur-rgb\n• GitHub: github.com/zillur-rgb',
    ),
  },
];

const DE_HINTS = new Set(
  'der die das und ist nicht ich du sie er wie was wer wo welche welcher welches hat haben mit für fuer von bei auf ein eine einen kannst kann erzähl erzaehl erfahrung berufserfahrung fähigkeiten faehigkeiten sprichst sprache sprachen arbeitest gearbeitet wohnst wohnt über ueber mir mich dir bitte hallo kontakt ausbildung studium kenntnisse projekte lebenslauf wann warum deutsch hilfe wieso kennst'.split(' '),
);
const EN_HINTS = new Set(
  'the and is are what who where which how does did do you your his her he she with for about tell me can experience skills worked work languages speak contact education projects hello hi help'.split(' '),
);

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9äöüß ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/** Language of the question; falls back to the language selected on the page. */
export function detectLang(s: string, fallback: Lang): Lang {
  let de = 0;
  let en = 0;
  for (const w of tokens(s)) {
    if (DE_HINTS.has(w)) de++;
    if (EN_HINTS.has(w)) en++;
  }
  if (/[äöüß]/i.test(s)) de++;
  return de > en ? 'de' : en > de ? 'en' : fallback;
}

function retrieve(s: string): Chunk | null {
  const words = tokens(s);
  let best: Chunk | null = null;
  let top = 0;
  for (const c of chunks) {
    let sc = 0;
    for (const w of words) {
      if (c.keys.includes(w)) sc += 3 * (c.w ?? 1);
      else if (w.length > 4) {
        const near = c.keys.find(
          (k) => k.length > 4 && (k.startsWith(w) || w.startsWith(k)),
        );
        if (near) sc += 2 * (c.w ?? 1);
      }
    }
    if (sc > top) {
      top = sc;
      best = c;
    }
  }
  return best;
}

const UI = {
  en: {
    help: 'Try: experience, skills, education, availability, contact. Or ask in your own words, in English or German.',
    greet: 'Hi! Ask me about my work, skills or education.',
    fallback:
      "I don't have that in my notes. Try asking about my experience, skills, education or contact details.",
  },
  de: {
    help: 'Probier: erfahrung, skills, ausbildung, verfügbarkeit, kontakt. Oder frag frei heraus, auf Deutsch oder Englisch.',
    greet: 'Hallo! Frag mich nach meiner Arbeit, meinen Skills oder meiner Ausbildung.',
    fallback:
      'Dazu habe ich nichts in meinen Notizen. Frag mich nach Erfahrung, Skills, Ausbildung oder Kontakt.',
  },
} as const;

export function answer(question: string, uiLang: Lang): Reply {
  const q = question.trim();
  const l = detectLang(q, uiLang);
  const low = q.toLowerCase();
  if (/^(help|\?|commands|hilfe)$/.test(low)) return { text: UI[l].help };
  if (/^(hi|hello|hey|hallo|moin|servus|hola)\W*$/.test(low))
    return { text: UI[l].greet };
  let hit = retrieve(q);
  if (hit && hit.text[l].startsWith('@')) {
    const ref = hit.text[l].slice(1);
    hit = chunks.find((c) => c.id === ref) ?? hit;
  }
  return hit
    ? { text: hit.text[l], section: hit.section }
    : { text: UI[l].fallback };
}

export const chips: Record<Lang, { label: string; query: string }[]> = {
  en: [
    { label: 'Experience', query: 'experience' },
    { label: 'Skills', query: 'skills' },
    { label: 'Education', query: 'education' },
    { label: 'Availability', query: 'availability' },
    { label: 'Contact', query: 'contact' },
  ],
  de: [
    { label: 'Erfahrung', query: 'erfahrung' },
    { label: 'Skills', query: 'skills' },
    { label: 'Ausbildung', query: 'ausbildung' },
    { label: 'Verfügbarkeit', query: 'verfügbarkeit' },
    { label: 'Kontakt', query: 'kontakt' },
  ],
};
