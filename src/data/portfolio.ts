export const palette = {
  caramel: '#D9A06A',
  caramelDeep: '#A65F1F',
  caramelLight: '#EDC795',
  matcha: '#6E8F45',
  matchaDeep: '#3E5A26',
  matchaLight: '#C3D49E',
  ink: '#2A1A0C',
  cream: '#FFF8EC'
};

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' }
];

export interface Job {
  when: string;
  meta: string;
  title: string;
  org: string;
  current?: boolean;
  points: string[];
}

export const jobs: Job[] = [
  {
    when: 'Oct 2024 – Present',
    meta: 'Full-time · Remote',
    title: 'Full Stack Software Engineer',
    org: 'Multisys Technologies Corporation',
    current: true,
    points: [
      'Build full stack features for government and LGU systems, including BLGF RPIS, BLGF CAMA, Go Manila and LGUBox.',
      'Work in a TypeScript (strict, ESM) Turborepo monorepo with an Express 5 API, a React 19 + Vite dashboard and shared packages.',
      'Model data in PostgreSQL 16 with Drizzle ORM and hand-written SQL migrations, with Redis-backed caching and Bull job queues.',
      'Implement secure sign-in: RS256 JWTs with refresh-token rotation, authenticator-app 2FA and WebAuthn passkeys.',
      'Build map-based and data-heavy screens with TanStack Router and Query, Leaflet, Chart.js and PDF/Excel exports.',
      'Contribute to Multiverse UI, the company design system and component library.',
      'Test with Vitest, Testing Library, vitest-axe and Playwright, and ship through GitHub Actions to Docker, Nginx, PM2 and Google Cloud Run.'
    ]
  },
  {
    when: 'Apr 2022 – Oct 2024',
    meta: '2 yrs 7 mos · Hybrid',
    title: 'Full Stack Software Engineer',
    org: 'MDI Novare Technologies Inc.',
    points: [
      'Built front ends with ReactJS, Next.js and Angular, and tested APIs with Postman.',
      'Designed web interfaces in HTML, CSS and JavaScript using Tailwind, Bootstrap and Salesforce templates.',
      'Built full-stack features with ReactJS and Next.js on the front end and PHP and MySQL on the back end, in an agile team.',
      'From Feb 2024, focused on build automation: deployed applications with GitLab Runners and GitLab CI/CD pipelines to AWS Cloud and VMware virtual machines.',
      'Worked daily in Confluence, GitLab, Bitbucket and Jira for code, tickets and documentation.'
    ]
  },
  {
    when: 'Apr 2020 – Jul 2021',
    meta: '1 yr 4 mos · On-site',
    title: 'Junior Programmer Intern',
    org: 'Polytechnic University of the Philippines – Taguig Branch',
    points: [
      'Served as team programmer, system web designer and database designer.',
      'Developed systems in PHP with the CodeIgniter framework for one year.',
      'Managed hosting and data with Hostinger, MySQL and XAMPP.',
      'Used GitHub and Git Bash for version control, and VS Code, Notepad++ and Atom as editors.'
    ]
  }
];

export interface Project {
  name: string;
  org: string;
  text: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: 'BLGF RPIS',
    org: 'Multisys',
    text: 'Real Property Information System for the Bureau of Local Government Finance (BLGF): an electronic database of real property records and transactions, rolled out to local assessors under the Real Property Valuation and Assessment Reform Act (RA 12001).',
    tags: ['Government', 'Real property', 'RA 12001', 'LGU assessors']
  },
  {
    name: 'BLGF CAMA System',
    org: 'Multisys',
    text: 'Computer-Assisted Mass Appraisal system for the BLGF that values properties at scale toward uniform market values, with map views, statistical and AI valuation models, and PDF and Excel reports.',
    tags: ['React 19', 'Express 5', 'PostgreSQL', 'Leaflet', 'ml-matrix']
  },
  {
    name: 'Multiverse UI',
    org: 'Multisys',
    text: 'The company design system: a shared React component library used across products, with rich-text editing, date pickers and motion built in.',
    tags: ['React', 'Headless UI', 'TipTap', 'Framer Motion', 'dayjs']
  },
  {
    name: 'Go Manila',
    org: 'Multisys',
    text: "The City of Manila's platform for paying bills, real property tax, business permits and other city transactions. I worked across its web app, core and API.",
    tags: ['Web', 'Core', 'API', 'City of Manila']
  },
  {
    name: 'LGUBox',
    org: 'Multisys',
    text: 'A local government services platform with modules for ordinance violation receipts (OVR), miscellaneous fees, market stalls, cedula (community tax certificate) and a content management system.',
    tags: ['OVR', 'Miscellaneous', 'Market Stall', 'Cedula', 'CMS']
  },
  {
    name: 'Talibon System',
    org: 'Multisys',
    text: 'An LGU system with the same service modules: ordinance violation receipts (OVR), miscellaneous fees, market stalls, cedula (community tax certificate) and a content management system.',
    tags: ['OVR', 'Miscellaneous', 'Market Stall', 'Cedula', 'CMS']
  }
];

export const pipeline: [string, string, string][] = [
  ['Plan', 'Claude Code · Figma', 'GitHub issues'],
  ['Code', 'TypeScript · React 19', 'Express 5 · Drizzle'],
  ['Check', 'ESLint · Prettier', 'Knip · type-check'],
  ['Test', 'Vitest · Supertest', 'Testing Library · Playwright'],
  ['Integrate', 'GitHub Actions', 'CodeQL · audits'],
  ['Deploy', 'Docker · Nginx · PM2', 'Google Cloud Run']
];

export const stack: { title: string; items: string[] }[] = [
  { title: 'Monorepo & tooling', items: ['Turborepo', 'npm workspaces', 'TypeScript 5 (strict)', 'ESM', 'Node.js 22 / 26', 'ESLint 10', 'Prettier 3', 'Knip'] },
  { title: 'Backend API', items: ['Express 5', 'PostgreSQL 16', 'Drizzle ORM', 'SQL migrations', 'Redis 7 (ioredis)', 'Bull queues', 'Zod 4', 'Pino', 'Swagger UI · OpenAPI 3.1', 'nodemailer'] },
  { title: 'Auth & security', items: ['RS256 JWT', 'Refresh-token rotation', 'bcrypt', '2FA (otpauth)', 'WebAuthn passkeys', 'firebase-admin', 'helmet', 'csrf-csrf', 'Rate limiting (Redis)', 'CORS'] },
  { title: 'Files, documents & valuation', items: ['S3 / MinIO', 'Google Cloud Storage', 'multer', 'sharp', 'pdfkit', 'pdfmake', 'exceljs', 'CSV parsing', 'archiver', 'qrcode', 'ml-matrix', 'Statistical & AI valuation models'] },
  { title: 'Frontend dashboard', items: ['React 19', 'Vite 8', 'TanStack Router', 'TanStack Query', 'Tailwind CSS 4', 'React Hook Form + Zod', 'Leaflet', 'PMTiles offline maps', 'Chart.js', 'jsPDF', 'DOMPurify', 'react-markdown'] },
  { title: 'Design system & shared code', items: ['Multiverse UI', 'Headless UI', 'TipTap', 'Framer Motion', 'react-datepicker', 'dayjs', 'Shared Zod schemas', 'Roles & permissions'] },
  { title: 'Testing', items: ['Vitest 4', 'Supertest', 'Testing Library', 'jsdom', 'vitest-axe (accessibility)', 'Playwright (E2E)'] },
  { title: 'Infrastructure & CI/CD', items: ['Docker Compose', 'node:26-slim', 'Nginx', 'PM2', 'Google Cloud Run', 'GitHub Actions', 'CodeQL', 'License checks', 'Automated release notes'] },
  { title: 'AI tools', items: ['Claude Code (CLI & desktop)', 'Cursor', 'Gemini for images', 'ChatGPT for quick tasks'] },
  { title: 'Also experienced with', items: ['Next.js', 'Angular', 'Java', 'PHP (CodeIgniter)', 'MySQL', 'Axios', 'Bootstrap', 'Figma', 'Terraform', 'Ansible', 'GitLab CI/CD', 'AWS EC2', 'VMware', 'Jira', 'Confluence'] }
];

export const frontLoop = ['React 19', 'TypeScript', 'Vite', 'TanStack Router', 'TanStack Query', 'Tailwind CSS 4', 'React Hook Form', 'Leaflet', 'Chart.js', 'Next.js', 'Figma'];
export const backLoop = ['Express 5', 'PostgreSQL 16', 'Drizzle ORM', 'Redis 7', 'Zod', 'Docker', 'Nginx', 'Google Cloud Run', 'GitHub Actions', 'Vitest', 'Playwright', 'Claude Code'];

export const heroGradient = ['#C27F42', '#D9A06A', '#E8B883', '#D9A06A', '#BFC98A'];
export const rotatingTexts = ['government systems', 'React 19 dashboards', 'Express APIs', 'PostgreSQL databases', 'design systems'];
export const contactGradient = ['#3E5A26', '#A65F1F', '#6E8F45', '#3E5A26'];
export const traits = ['Goal-oriented', 'Team player', 'Works with minimal supervision', 'Adaptable', 'Problem solver'];

/** AI tools used day to day — shown first under "Learning & credentials". */
export const aiTools: { name: string; use: string }[] = [
  { name: 'Claude Code', use: 'Everyday coding partner (CLI & desktop)' },
  { name: 'Cursor', use: 'AI-assisted editing and refactoring' },
  { name: 'Gemini', use: 'Image generation' },
  { name: 'ChatGPT', use: 'Quick tasks and research' }
];

/** Latest certificates (AI-assisted development). [name, issuer, year] */
export const aiCertifications: [string, string, string][] = [
  ['Cursor AI Training 1', 'Multisys Technologies', '2026'],
  ['Cursor AI Training 2', 'Multisys Technologies', '2026'],
  ['Claude Code Training Workshops', 'Multisys Technologies', '2026'],
  ['Hackathon AI Training using Claude Code', 'Multisys Technologies', '2026']
];

export const education: { degree: string; school: string }[] = [
  { degree: 'Bachelor of Science in Information Technology', school: 'Polytechnic University of the Philippines – Taguig Branch' },
  { degree: 'Diploma in Information Communication Technology', school: 'Polytechnic University of the Philippines – Taguig Branch' }
];

export const summary =
  'Full Stack Software Engineer with 4+ years of experience building government and LGU web systems from front to back with TypeScript, React, Node.js/Express and PostgreSQL. Delivers secure, tested and easy-to-use systems for Philippine government agencies, cities and LGUs, and works daily with AI-assisted development tools such as Claude Code and Cursor.';

export const certifications: [string, string][] = [
  ['Bootcamp Training', 'MDI Novare Inc.'],
  ['NiFi Training', 'Ingestion Squad'],
  ['Careers@SQE Cascade', 'Training'],
  ['React: The Complete Guide 2023 (incl. React Router & Redux)', 'Udemy'],
  ['Learning NextJS', 'LinkedIn Learning'],
  ['React: Server-Side Rendering', 'LinkedIn Learning'],
  ['Conflict Resolution and Escalation Management', 'Training'],
  ['Continuous Integration and Continuous Delivery with GitLab', 'LinkedIn Learning'],
  ['Introduction to VMware', 'LinkedIn Learning']
];

export const contact = {
  email: 'edmondelacruz110@gmail.com',
  phone: '+63 949 959 4616',
  location: 'Poblacion, San Nicolas, Batangas',
  /** Paste full URLs here (e.g. https://www.linkedin.com/in/your-name). Empty = hidden on the site and résumé. */
  linkedin: '',
  github: ''
};

export const totalCertificates = aiCertifications.length + certifications.length;
