import type { jsPDF as JsPDF } from 'jspdf';
import {
  aiCertifications,
  aiTools,
  certifications,
  contact,
  education,
  jobs,
  projects,
  stack,
  summary
} from '../data/portfolio';

/**
 * Builds a plain, ATS-friendly résumé (black text on white, no graphics)
 * straight from src/data/portfolio.ts, so the PDF always matches the site.
 */
export async function buildResume(): Promise<JsPDF> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const M = 48; // page margin
  const W = pageW - M * 2;
  const BODY = 10;
  const LH = 13.2; // body line height
  let y = M;

  const font = (style: 'normal' | 'bold' | 'italic', size = BODY) => {
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
  };
  const ensure = (h: number) => {
    if (y + h > pageH - M) {
      doc.addPage();
      y = M;
    }
  };
  const rule = () => {
    doc.setLineWidth(0.8);
    doc.line(M, y, pageW - M, y);
  };
  const centered = (text: string, size: number, style: 'normal' | 'bold' = 'normal', lh = size * 1.3) => {
    font(style, size);
    for (const line of doc.splitTextToSize(text, W) as string[]) {
      ensure(lh);
      doc.text(line, pageW / 2, y, { align: 'center', baseline: 'top' });
      y += lh;
    }
  };
  const section = (title: string) => {
    ensure(48);
    y += 10;
    font('bold', 11);
    doc.text(title.toUpperCase(), pageW / 2, y, { align: 'center', baseline: 'top' });
    y += 15;
    rule();
    y += 8;
  };
  /** Left text + right-aligned text on one line. */
  const split = (left: string, right: string, leftStyle: 'normal' | 'bold', rightStyle: 'normal' | 'bold' | 'italic' = 'normal', size = 10.5) => {
    ensure(LH + 2);
    font(rightStyle, size);
    const rw = right ? doc.getTextWidth(right) + 12 : 0;
    if (right) doc.text(right, pageW - M, y, { align: 'right', baseline: 'top' });
    font(leftStyle, size);
    const lines = doc.splitTextToSize(left, W - rw) as string[];
    lines.forEach((l, i) => {
      if (i) ensure(LH);
      doc.text(l, M, y, { baseline: 'top' });
      y += LH + 1;
    });
  };
  /** Bullet with hanging indent; optional bold lead-in ("Label: rest"). */
  const bullet = (text: string, lead = '') => {
    const indent = 14;
    const x = M + indent;
    const width = W - indent;
    ensure(LH);
    font('normal');
    doc.text('•', M + 3, y, { baseline: 'top' });
    let first = text;
    let offset = 0;
    if (lead) {
      font('bold');
      doc.text(lead, x, y, { baseline: 'top' });
      offset = doc.getTextWidth(lead + ' ');
      font('normal');
      // wrap the remainder: first line is shorter by the lead width
      const words = text.split(' ');
      let line = '';
      while (words.length && doc.getTextWidth(line + words[0]) <= width - offset) line += words.shift() + ' ';
      doc.text(line.trim(), x + offset, y, { baseline: 'top' });
      y += LH;
      first = words.join(' ');
      if (!first) return;
    }
    font('normal');
    for (const l of doc.splitTextToSize(first, width) as string[]) {
      ensure(LH);
      doc.text(l, x, y, { baseline: 'top' });
      y += LH;
    }
  };
  /** "Label: values" paragraph without a bullet. */
  const labeled = (label: string, text: string) => {
    ensure(LH);
    font('bold');
    doc.text(label, M, y, { baseline: 'top' });
    const offset = doc.getTextWidth(label + ' ');
    font('normal');
    const words = text.split(' ');
    let line = '';
    while (words.length && doc.getTextWidth(line + words[0]) <= W - offset) line += words.shift() + ' ';
    doc.text(line.trim(), M + offset, y, { baseline: 'top' });
    y += LH;
    const rest = words.join(' ');
    if (rest)
      for (const l of doc.splitTextToSize(rest, W) as string[]) {
        ensure(LH);
        doc.text(l, M, y, { baseline: 'top' });
        y += LH;
      }
    y += 2;
  };

  /* ---------- header ---------- */
  doc.setTextColor(0, 0, 0);
  doc.setDrawColor(0, 0, 0);
  centered('EDMON DELA CRUZ', 20, 'bold', 24);
  y += 2;
  const contactLine = [
    `${contact.location}, Philippines`,
    contact.phone,
    contact.email,
    contact.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
    contact.github.replace(/^https?:\/\/(www\.)?/, '')
  ]
    .filter(Boolean)
    .join('  ·  ');
  centered(contactLine, 9.5);
  centered('Full Stack Software Engineer', 10.5, 'bold', 14);
  y += 4;
  rule();
  y += 10;
  centered(summary, BODY, 'normal', LH);

  /* ---------- experience ---------- */
  section('Professional Experience');
  jobs.forEach((job, i) => {
    if (i) y += 6;
    ensure(LH * 4);
    split(job.org, job.when.replace('–', '-'), 'normal');
    split(job.title, job.meta, 'bold', 'italic', 10);
    y += 1;
    job.points.forEach(p => bullet(p));
  });

  /* ---------- projects ---------- */
  section('Key Projects');
  projects.forEach(p => bullet(p.text, `${p.name}:`));

  /* ---------- education ---------- */
  section('Education');
  education.forEach((e, i) => {
    if (i) y += 4;
    split(e.degree, '', 'bold');
    font('normal');
    ensure(LH);
    doc.text(e.school, M, y, { baseline: 'top' });
    y += LH;
  });

  /* ---------- certifications ---------- */
  section('Trainings & Certifications');
  font('bold', 10);
  ensure(LH);
  doc.text('Latest: AI-assisted development', M, y, { baseline: 'top' });
  y += LH + 1;
  aiCertifications.forEach(([name, by, year]) => bullet(`${name} - ${by}, ${year}`));
  y += 3;
  font('bold', 10);
  ensure(LH);
  doc.text('Earlier trainings', M, y, { baseline: 'top' });
  y += LH + 1;
  certifications.forEach(([name, by]) => bullet(`${name} - ${by}`));

  /* ---------- skills ---------- */
  section('Skills & Tools');
  labeled('AI tools:', aiTools.map(t => `${t.name} - ${t.use}`).join('; '));
  stack
    .filter(g => g.title !== 'AI tools')
    .forEach(g => labeled(`${g.title}:`, g.items.join(', ').replace(/ · /g, ', ')));
  labeled(
    'Soft skills:',
    'Goal-oriented, team player, works with minimal supervision, adaptable, problem solver'
  );

  return doc;
}

export async function downloadResume() {
  const doc = await buildResume();
  doc.save('Edmon-Dela-Cruz-Resume.pdf');
}
