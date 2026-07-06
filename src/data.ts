export type Lang = 'en' | 'de';

export interface Job {
  role: string;
  company: string;
  dates: string;
  location: string;
  stack: string;
  bullets: string[];
}

export interface School {
  degree: string;
  school: string;
  dates: string;
  location: string;
}

export interface Content {
  subtitle: string;
  intro: string;
  availability: string;
  downloadCv: string;
  email: string;
  experienceTitle: string;
  educationTitle: string;
  contactTitle: string;
  contactBody: string;
  footer: string;
  jobs: Job[];
  education: School[];
}

export const content: Record<Lang, Content> = {
  en: {
    subtitle: 'Full-Stack Software Engineer · Dortmund, Germany',
    intro:
      "End-to-end web engineering that drives business value. > I bridge the gap between complex backend logic and seamless frontend experiences. With four years of experience shipping production software in the German market, I specialize in transforming legacy systems into modern, scalable platforms.",
    availability:
      'Available immediately — remote or on-site across Germany & the EU',
    downloadCv: 'Download CV ↓',
    email: 'Email',
    experienceTitle: 'Experience',
    educationTitle: 'Education',
    contactTitle: "Let's talk.",
    contactBody:
      'Open to full-stack, frontend, or backend roles at German and European companies — remote or on-site.',
    footer: '© 2026 MD Zillur Rahman · Dortmund, Germany',
    jobs: [
      {
        role: 'Software Engineer',
        company: 'Lingoking GmbH',
        dates: 'Feb 2024 – Present',
        location: 'Munich (remote)',
        stack:
          'PHP · Symfony · API Platform · PostgreSQL · TypeScript · Vue.js · NEOS · Docker · GitLab · Stripe',
        bullets: [
          'Contributed to the complete redesign and re-implementation of the customer-facing and internal user applications.',
          'Full-stack development across frontend and backend, improving the overall system architecture.',
          'Ongoing development and maintenance of the core platform.',
          'Provided 2nd-level technical support for users.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'Faaren GmbH',
        dates: 'Sep 2023 – Nov 2023',
        location: 'Würzburg (remote)',
        stack: 'PHP · Laravel · MySQL · TypeScript · Vue.js · Docker · Stripe',
        bullets: [
          'Backend team member on the car-subscription platform.',
          'Implemented and integrated UI features in close collaboration with the frontend team.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'Modoplus GmbH',
        dates: 'Aug 2022 – Jun 2023',
        location: 'Hamburg (remote)',
        stack:
          'TypeScript · NestJS · tRPC · Next.js · React · Mongoose · Prisma · Zod · Mapbox · Google Cloud · Stripe',
        bullets: [
          'Integrated a secure payment gateway to improve the purchase flow.',
          'Built an advanced search feature with the product owner, improving usability and customer satisfaction.',
          'Implemented complex data-analysis and aggregation features.',
          'Optimised REST APIs with NestJS and adopted tRPC for better performance and scalability.',
          'Conducted code reviews and peer reviews to keep code quality high.',
        ],
      },
      {
        role: 'Frontend Software Engineer',
        company: 'Desseinlab',
        dates: 'Jan 2020 – Jun 2021',
        location: 'London, UK',
        stack:
          'TypeScript · JavaScript · React · Vue.js · PHP · Laravel · Express · MySQL · MongoDB',
        bullets: [
          'Improved user experience and engagement by building intuitive graphical interfaces.',
          'Worked across the MERN stack and a range of other technologies.',
          'Streamlined development through code refactoring and thorough documentation.',
        ],
      },
    ],
    education: [
      {
        degree: 'B.A. in Business Informatics',
        school: 'Fachhochschule Südwestfalen',
        dates: '2021 – 2022',
        location: 'Soest, Germany',
      },
      {
        degree: 'B.Sc. in Computer Science & Engineering',
        school: 'North East University Bangladesh',
        dates: '2015 – 2019',
        location: 'Sylhet, Bangladesh',
      },
    ],
  },
  de: {
    subtitle: 'Full-Stack-Softwareentwickler · Dortmund, Deutschland',
    intro:
      'End-to-End Web Engineering mit echtem Mehrwert. > Ich verbinde komplexe Backend-Logik mit nahtlosen Frontend-Erlebnissen. Mit vier Jahren Erfahrung im Release von Produktionssoftware auf dem deutschen Markt bin ich Experte darin, Altsysteme in moderne, skalierbare Plattformen zu verwandeln.',
    availability:
      'Ab sofort verfügbar — remote oder vor Ort in Deutschland & der EU',
    downloadCv: 'Lebenslauf ↓',
    email: 'E-Mail',
    experienceTitle: 'Berufserfahrung',
    educationTitle: 'Ausbildung',
    contactTitle: 'Lassen Sie uns sprechen.',
    contactBody:
      'Offen für Full-Stack-, Frontend- oder Backend-Positionen bei deutschen und europäischen Unternehmen — remote oder vor Ort.',
    footer: '© 2026 MD Zillur Rahman · Dortmund, Deutschland',
    jobs: [
      {
        role: 'Softwareentwickler',
        company: 'Lingoking GmbH',
        dates: 'Feb. 2024 – heute',
        location: 'München (remote)',
        stack:
          'PHP · Symfony · API Platform · PostgreSQL · TypeScript · Vue.js · NEOS · Docker · GitLab · Stripe',
        bullets: [
          'Mitwirkung an der vollständigen Neugestaltung und Neuimplementierung der Kundenanwendung und der internen Benutzeranwendung.',
          'Full-Stack-Entwicklung in Frontend und Backend mit Verbesserung der Gesamtarchitektur.',
          'Laufende Weiterentwicklung und Wartung der Kernplattform.',
          '2nd-Level-Support für Nutzer.',
        ],
      },
      {
        role: 'Softwareentwickler',
        company: 'Faaren GmbH',
        dates: 'Sep. 2023 – Nov. 2023',
        location: 'Würzburg (remote)',
        stack: 'PHP · Laravel · MySQL · TypeScript · Vue.js · Docker · Stripe',
        bullets: [
          'Mitglied des Backend-Teams der Auto-Abo-Plattform.',
          'Implementierung und Integration von UI-Features in enger Zusammenarbeit mit dem Frontend-Team.',
        ],
      },
      {
        role: 'Softwareentwickler',
        company: 'Modoplus GmbH',
        dates: 'Aug. 2022 – Juni 2023',
        location: 'Hamburg (remote)',
        stack:
          'TypeScript · NestJS · tRPC · Next.js · React · Mongoose · Prisma · Zod · Mapbox · Google Cloud · Stripe',
        bullets: [
          'Integration eines sicheren Payment-Gateways zur Verbesserung des Kaufprozesses.',
          'Entwicklung einer erweiterten Suchfunktion gemeinsam mit dem Product Owner — für bessere Usability und Kundenzufriedenheit.',
          'Implementierung komplexer Datenanalyse- und Aggregationsfunktionen.',
          'Optimierung von REST-APIs mit NestJS und Einführung von tRPC für bessere Performance und Skalierbarkeit.',
          'Code-Reviews und Peer-Reviews zur Sicherung der Codequalität.',
        ],
      },
      {
        role: 'Frontend-Softwareentwickler',
        company: 'Desseinlab',
        dates: 'Jan. 2020 – Juni 2021',
        location: 'London, Großbritannien',
        stack:
          'TypeScript · JavaScript · React · Vue.js · PHP · Laravel · Express · MySQL · MongoDB',
        bullets: [
          'Verbesserung von User Experience und Engagement durch intuitive grafische Oberflächen.',
          'Arbeit mit dem MERN-Stack und weiteren Technologien.',
          'Effizientere Entwicklung durch Code-Refactoring und gründliche Dokumentation.',
        ],
      },
    ],
    education: [
      {
        degree: 'B.A. Wirtschaftsinformatik',
        school: 'Fachhochschule Südwestfalen',
        dates: '2021 – 2022',
        location: 'Soest, Deutschland',
      },
      {
        degree: 'B.Sc. Informatik & Ingenieurwesen',
        school: 'North East University Bangladesh',
        dates: '2015 – 2019',
        location: 'Sylhet, Bangladesch',
      },
    ],
  },
};
