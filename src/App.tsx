import { useEffect, useState, type ReactNode } from 'react';

import AnimatedContent from './components/reactbits/AnimatedContent/AnimatedContent';
import CircularCarousel from './components/reactbits/CircularCarousel/CircularCarousel';
import ClickSpark from './components/reactbits/ClickSpark/ClickSpark';
import Counter from './components/reactbits/Counter/Counter';
import GradientText from './components/reactbits/GradientText/GradientText';
import Grainient from './components/reactbits/Grainient/Grainient';
import LogoLoop from './components/reactbits/LogoLoop/LogoLoop';
import Magnet from './components/reactbits/Magnet/Magnet';
import PillNav from './components/reactbits/PillNav/PillNav';
import RotatingText from './components/reactbits/RotatingText/RotatingText';
import ScrollReveal from './components/reactbits/ScrollReveal/ScrollReveal';
import ShinyText from './components/reactbits/ShinyText/ShinyText';
import SplitText from './components/reactbits/SplitText/SplitText';
import TiltedCard from './components/reactbits/TiltedCard/TiltedCard';

import portrait from './assets/portrait.jpg';
import project1 from './assets/projects/project-1.jpg';
import project2 from './assets/projects/project-2.jpg';
import project3 from './assets/projects/project-3.jpg';
import project4 from './assets/projects/project-4.jpg';
import project5 from './assets/projects/project-5.jpg';
import project6 from './assets/projects/project-6.jpg';

import { downloadResume } from './lib/resume';

import {
  aiCertifications,
  aiTools,
  backLoop,
  certifications,
  contact,
  contactGradient,
  education,
  frontLoop,
  heroGradient,
  jobs,
  navItems,
  palette,
  pipeline,
  projects,
  rotatingTexts,
  stack,
  totalCertificates,
  traits
} from './data/portfolio';

const projectImages = [project1, project2, project3, project4, project5, project6];

const carouselItems = projects.map((p, i) => ({
  src: projectImages[i],
  alt: `${p.name}, ${p.org}`,
  title: p.name,
  subtitle: p.org
}));

const toChips = (items: string[], tone: 'matcha' | 'caramel') =>
  items.map(label => ({ node: <span className={`chip chip--${tone}`}>{label}</span>, title: label }));

const frontChips = toChips(frontLoop, 'matcha');
const backChips = toChips(backLoop, 'caramel');

/* ---------- hooks ---------- */

function useRingSize() {
  const measure = () => {
    const w = typeof window === 'undefined' ? 1024 : window.innerWidth;
    if (w < 520) return { card: 160, h: 330 };
    if (w < 900) return { card: 210, h: 430 };
    if (w < 1200) return { card: 250, h: 490 };
    return { card: 280, h: 540 };
  };
  const [size, setSize] = useState(measure);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setSize(measure()), 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, []);
  return size;
}

function useActiveSection() {
  const [active, setActive] = useState('#about');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navItems.forEach(item => {
      const el = document.querySelector(item.href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ---------- pieces ---------- */

function ProjectRing() {
  const { card, h } = useRingSize();
  const [index, setIndex] = useState(0);
  const current = projects[index] ?? projects[0];
  return (
    <div className="ring-wrap">
      <div className="ring-stage" style={{ height: h }}>
        <CircularCarousel
          key={card}
          items={carouselItems}
          preset="cylinder"
          intro="rise"
          cardWidth={card}
          aspectRatio={0.8}
          gap={22}
          speed={12}
          cornerRadius={22}
          fadeColor="#F7F5EC"
          depthFade={0.5}
          innerShade={0.35}
          captions
          onChange={setIndex}
        />
      </div>
      <div className="ring-detail" aria-live="polite">
        <p key={current.name}>{current.text}</p>
        <ul className="tags">
          {current.tags.map(t => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <span className="ring-hint">Drag to spin · tap a card to view it</span>
      </div>
    </div>
  );
}

function CopyChannel({ id, label, value, button }: { id: string; label: string; value: string; button: string }) {
  const [text, setText] = useState(button);
  const onCopy = () => {
    const el = document.getElementById(id);
    const selectFallback = () => {
      if (!el) return;
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      setText('Selected, press Ctrl+C');
    };
    try {
      navigator.clipboard.writeText(value).then(() => setText('Copied!'), selectFallback);
    } catch {
      selectFallback();
    }
    setTimeout(() => setText(button), 1800);
  };
  return (
    <div className="channel">
      <span className="k">{label}</span>
      <span className="v" id={id}>
        {value}
      </span>
      <Magnet padding={40} magnetStrength={3}>
        <button className="copy" type="button" onClick={onCopy}>
          {text}
        </button>
      </Magnet>
    </div>
  );
}

function ResumeButton() {
  const [busy, setBusy] = useState(false);
  const onClick = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await downloadResume();
    } finally {
      setBusy(false);
    }
  };
  return (
    <button className="btn resume" type="button" onClick={onClick} aria-busy={busy}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
      {busy ? 'Preparing PDF…' : 'Download résumé'}
    </button>
  );
}

function SectionHead({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <AnimatedContent distance={40} duration={0.7} className="head" stagger={0.08}>
      <span className="kicker">{kicker}</span>
      <h2>{children}</h2>
    </AnimatedContent>
  );
}

const logoMark = (
  <span className="mark" aria-hidden="true">
    E
  </span>
);

/* ---------- page ---------- */

export default function App() {
  const active = useActiveSection();

  return (
    <ClickSpark sparkColor={palette.caramelDeep} sparkSize={11} sparkRadius={22} sparkCount={9} duration={480}>
      <div className="nav-shell">
        <PillNav
          logo={logoMark}
          logoAlt="Back to top"
          logoHref="#top"
          items={navItems}
          activeHref={active}
          theme="light"
          size="md"
          surface="glass"
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
          highlightColor={palette.matchaDeep}
          highlightTextColor={palette.cream}
          ariaLabel="Sections"
        />
      </div>

      <header className="hero" id="top">
        <div className="hero-bg" aria-hidden="true">
          <Grainient colors={heroGradient} angle={60} flow={0.6} silk={0.4} speed={0.6} grainAmount={0.05} />
        </div>
        <div className="wrap hero-grid">
          <div className="portrait">
            <TiltedCard
              imageSrc={portrait}
              altText="Portrait of Edmon Dela Cruz wearing a barong"
              captionText="Click me to flip"
              containerHeight="clamp(300px, 36vw, 470px)"
              containerWidth="clamp(250px, 30vw, 390px)"
              imageHeight="clamp(300px, 36vw, 470px)"
              imageWidth="clamp(250px, 30vw, 390px)"
              rotateAmplitude={10}
              scaleOnHover={1.04}
              radius={28}
              glare={0.35}
              glareColor="#FFF4E2"
              shadow={0.4}
              backContent={
                <div className="card-back">
                  <span className="hand">Hi, I'm Edmon!</span>
                  <p>
                    Full stack software engineer at Multisys Technologies, building government and LGU systems with
                    TypeScript, React, Express and PostgreSQL.
                  </p>
                  <a href="#contact">Say hello</a>
                </div>
              }
            />
          </div>

          <div className="hero-copy">
            <p className="eyebrow">
              <ShinyText
                text="Full Stack Software Engineer"
                color={palette.matchaDeep}
                shineColor="#F3FFE0"
                speed={3}
                shineWidth={34}
              />
            </p>
            <SplitText
              text="Edmon Dela Cruz"
              tag="h1"
              className="hero-name"
              splitType="chars"
              effect="rise"
              delay={45}
              duration={1}
              trigger="load"
              hoverEffect="lift"
              textAlign="left"
            />
            <div className="rotator">
              <span>I build</span>
              <RotatingText
                texts={rotatingTexts}
                effect="slide"
                direction="up"
                highlight
                highlightColor={palette.matchaDeep}
                staggerFrom="last"
                staggerDuration={0.02}
                rotationInterval={2400}
                mainClassName="rot-main"
                splitLevelClassName="rot-split"
              />
            </div>
            <p className="lede">
              Fast, secure and easy-to-use web systems from front to back, for Philippine government agencies, cities
              and LGUs.
            </p>
            <div className="actions">
              <Magnet padding={60} magnetStrength={3}>
                <a className="btn primary" href="#experience">
                  View my work
                </a>
              </Magnet>
              <Magnet padding={60} magnetStrength={3}>
                <a className="btn ghost" href="#contact">
                  Get in touch
                </a>
              </Magnet>
              <Magnet padding={60} magnetStrength={3}>
                <ResumeButton />
              </Magnet>
            </div>
            <div className="facts">
              <div>
                <b>
                  <Counter value={4} suffix="+" fontSize={34} fontWeight={600} />
                </b>
                <span>years building software</span>
              </div>
              <div>
                <b>
                  <Counter value={6} fontSize={34} fontWeight={600} />
                </b>
                <span>government &amp; LGU projects</span>
              </div>
              <div>
                <b>
                  <Counter value={totalCertificates} fontSize={34} fontWeight={600} />
                </b>
                <span>trainings &amp; certificates</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="chapter" id="about">
          <div className="wrap">
            <SectionHead kicker="Profile">
              A developer who keeps <em>learning</em>
            </SectionHead>
            <div className="body-col">
              <ScrollReveal
                baseOpacity={0.18}
                enableBlur
                blurStrength={3}
                baseRotation={2}
                containerClassName="about-reveal"
                textClassName="about-reveal-text"
                rotationEnd="bottom 60%"
                wordAnimationEnd="bottom 60%"
              >
                Hi! I'm a full stack software engineer who loves building websites and apps that are fast, useful and
                easy to use. I take projects from front to back with TypeScript, React, Node.js and PostgreSQL.
              </ScrollReveal>
              <AnimatedContent className="about-more" distance={30} stagger={0.12}>
                <p>
                  Today I work on government and LGU systems at Multisys, such as BLGF RPIS, BLGF CAMA and Go Manila.
                  On the front end I build React 19 dashboards with TanStack Router, Tailwind CSS 4 and maps in
                  Leaflet. On the back end I build Express 5 APIs on PostgreSQL with secure sign-in, background jobs
                  and document exports. I test with Vitest and Playwright and ship through GitHub Actions to Google
                  Cloud Run, with Claude Code as my everyday coding partner.
                </p>
                <p>
                  I'm always curious about new tech, whether it's a new framework or a better way to solve a problem.
                  I write clean, organized code, and I believe good communication and teamwork matter as much as
                  technical skill.
                </p>
              </AnimatedContent>
              <AnimatedContent className="traits" distance={20} scale={0.8} stagger={0.07} ease="back.out(2)">
                {traits.map(t => (
                  <span className="trait" key={t}>
                    {t}
                  </span>
                ))}
              </AnimatedContent>
            </div>
          </div>
        </section>

        <section className="chapter" id="experience">
          <div className="wrap">
            <SectionHead kicker="Experience">
              Where I have <em>worked</em>
            </SectionHead>
            <div className="timeline">
              {jobs.map(job => (
                <AnimatedContent
                  key={job.org}
                  className="job"
                  distance={60}
                  direction="horizontal"
                  reverse
                  duration={0.8}
                >
                  <div className="when">
                    <b>{job.when}</b>
                    {job.meta}
                    {job.current && <span className="now">Current</span>}
                  </div>
                  <div className="card">
                    <h3>{job.title}</h3>
                    <p className="org">{job.org}</p>
                    <ul>
                      {job.points.map(p => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter" id="projects">
          <div className="wrap">
            <SectionHead kicker="Selected projects">
              Systems I have helped <em>build</em>
            </SectionHead>
            <AnimatedContent className="projects-stage" distance={50} duration={0.9} scale={0.95}>
              <ProjectRing />
            </AnimatedContent>
          </div>
        </section>

        <section className="chapter" id="pipeline">
          <div className="wrap">
            <SectionHead kicker="How I ship">
              From ticket to <em>production</em>
            </SectionHead>
            <p className="pipeline-intro">
              The tools I use at each stage of delivery, from planning a change to running it on a server.
            </p>
            <div className="pipe-scroll">
              <AnimatedContent className="pipeline" distance={40} direction="horizontal" reverse stagger={0.1}>
                {pipeline.map(([stage, a, b], i) => (
                  <div className="stage" key={stage}>
                    <span className="step">0{i + 1}</span>
                    <h4>{stage}</h4>
                    <p>
                      {a}
                      <br />
                      {b}
                    </p>
                  </div>
                ))}
              </AnimatedContent>
            </div>
          </div>
        </section>

        <section className="chapter" id="skills">
          <div className="wrap">
            <SectionHead kicker="Skills">
              Technical <em>toolkit</em>
            </SectionHead>
          </div>
          <div className="loops">
            <LogoLoop
              logos={frontChips}
              speed={60}
              direction="left"
              logoHeight={40}
              gap={14}
              hoverSpeed={12}
              scaleOnHover
              fadeOut
              ariaLabel="Front-end and full stack tools"
            />
            <LogoLoop
              logos={backChips}
              speed={60}
              direction="right"
              logoHeight={40}
              gap={14}
              hoverSpeed={12}
              scaleOnHover
              fadeOut
              ariaLabel="Back-end and DevOps tools"
            />
          </div>
          <div className="wrap">
            <p className="stack-intro">The stack I use every day at Multisys, grouped by layer.</p>
            <AnimatedContent className="stack" distance={30} stagger={0.06}>
              {stack.map(group => (
                <div
                  key={group.title}
                  className={`stack-card${group.title === 'AI tools' ? ' stack-card--ai' : ''}${
                    group.title === 'Also experienced with' ? ' stack-card--wide' : ''
                  }`}
                >
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </AnimatedContent>
          </div>
        </section>

        <section className="chapter" id="education">
          <div className="wrap">
            <SectionHead kicker="Education">
              Learning &amp; <em>credentials</em>
            </SectionHead>
            <AnimatedContent className="ai-creds" distance={40} duration={0.8}>
              <div className="ai-creds__top">
                <div>
                  <span className="pill-badge">Latest · 2026</span>
                  <h3>AI tools &amp; certificates</h3>
                </div>
                <p className="ai-creds__note">
                  The AI tools I use every day, and the trainings I completed to use them well in real projects.
                </p>
              </div>
              <ul className="ai-tools" aria-label="AI tools I use">
                {aiTools.map(tool => (
                  <li className="ai-tool" key={tool.name}>
                    <b>{tool.name}</b>
                    <span>{tool.use}</span>
                  </li>
                ))}
              </ul>
              <div className="ai-certs">
                {aiCertifications.map(([name, by, year]) => (
                  <div className="ai-cert" key={name}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="9" r="6" />
                      <path d="M9 14.5 8 22l4-2 4 2-1-7.5" />
                    </svg>
                    <div>
                      <b>{name}</b>
                      <span>
                        {by} · {year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedContent>
            <div className="edu">
              <AnimatedContent distance={40} stagger={0.12}>
                <h3>Education</h3>
                {education.map(e => (
                  <div className="degree" key={e.degree}>
                    <b>{e.degree}</b>
                    <span>{e.school}</span>
                  </div>
                ))}
              </AnimatedContent>
              <div>
                <h3>Earlier trainings &amp; certifications</h3>
                <AnimatedContent className="certs" distance={20} stagger={0.06}>
                  {certifications.map(([name, by]) => (
                    <div className="cert" key={name}>
                      <span>{name}</span>
                      <span>{by}</span>
                    </div>
                  ))}
                </AnimatedContent>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="contact" id="contact">
        <div className="wrap">
          <p className="eyebrow eyebrow--dark">Contact</p>
          <h2>
            Let's build something{' '}
            <GradientText colors={contactGradient} animationSpeed={6} variant="flow">
              together
            </GradientText>
          </h2>
          <p className="sub">
            I'm always happy to meet new people and talk about tech, and I'm open to new challenges, collaborations
            and full stack roles.
          </p>
          <div className="actions">
            <Magnet padding={50} magnetStrength={3}>
              <ResumeButton />
            </Magnet>
            <Magnet padding={50} magnetStrength={3}>
              <a className="btn primary" href={`mailto:${contact.email}`}>
                Email me
              </a>
            </Magnet>
          </div>
          <AnimatedContent className="channels" distance={40} stagger={0.1}>
            <CopyChannel id="c-email" label="Email" value={contact.email} button="Copy email" />
            <CopyChannel id="c-phone" label="Phone" value={contact.phone} button="Copy number" />
            <div className="channel">
              <span className="k">Location</span>
              <span className="v">{contact.location}</span>
              <span className="muted">Philippines · Remote</span>
            </div>
            {contact.linkedin && (
              <div className="channel">
                <span className="k">LinkedIn</span>
                <a className="v" href={contact.linkedin} target="_blank" rel="noreferrer">
                  {contact.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
            {contact.github && (
              <div className="channel">
                <span className="k">GitHub</span>
                <a className="v" href={contact.github} target="_blank" rel="noreferrer">
                  {contact.github.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
          </AnimatedContent>
        </div>
      </section>

      <footer>
        <div className="wrap foot">
          <span className="sig">Edmon Dela Cruz</span>
          <span>Full Stack Software Engineer · Animations by React Bits</span>
        </div>
      </footer>
    </ClickSpark>
  );
}
