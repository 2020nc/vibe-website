import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import PDFDocument from 'pdfkit';
import { writeFileSync, createWriteStream } from 'fs';

const titlu = 'Sumar Sesiune — 29 Martie 2026';
const subtitlu = 'Integrarea Supabase în proiectul Vibe Caffè';

const sectiuni = [
  {
    titlu: '✅ Ce am realizat',
    puncte: [
      '1. Instalat Supabase CLI v2.84.2 via Scoop (package manager Windows)',
      '2. Instalat @supabase/supabase-js v2.100.1 în proiectul Next.js',
      '3. Logat în contul Supabase din terminal (supabase login)',
      '4. Creat proiect "vibe-caffe" pe serverul Frankfurt — cel mai aproape de România',
      '5. Linkat proiectul local la Supabase Cloud (supabase link)',
      '6. Configurat cheile API în .env.local + creat lib/supabase.ts',
      '7. Creat tabelul "rezervari" cu 10 câmpuri și securitate RLS',
      '8. Construit pagina /rezervari cu formular complet conectat la Supabase',
      '9. Populat baza de date cu 30 înregistrări de test (10 pending, 10 confirmed, 10 cancelled)',
      '10. Exportat date din Supabase: CSV → convertit în Excel (.xlsx)',
      '11. Generat recapitulare detaliată (.docx + .pdf)',
      '12. Commit + Push pe GitHub (branch: starter)',
    ],
  },
  {
    titlu: '📁 Fișiere create',
    puncte: [
      '.env.local                                  — chei API Supabase (protejat de .gitignore)',
      'lib/supabase.ts                             — clientul Supabase reutilizabil',
      'app/rezervari/page.tsx                      — pagina cu formularul de rezervări',
      'supabase/migrations/20260329_create_rezervari.sql  — structura tabelului',
      'supabase/migrations/20260330_seed_rezervari.sql    — 30 rezervări de test',
      'scripts/seed-rezervari.mjs                 — script Node.js pentru seed',
      'scripts/recap-29-martie.mjs                — script generare recapitulare',
      'Recapitulare-29-Martie-2026.docx           — recapitulare detaliată Word',
      'Recapitulare-29-Martie-2026.pdf            — recapitulare detaliată PDF',
      'rezervari_rows.csv                         — export date Supabase',
      'rezervari.xlsx                             — date în format Excel',
    ],
  },
  {
    titlu: '🗄️ Baza de date Supabase',
    puncte: [
      'Proiect: vibe-caffe',
      'Regiune: Central EU (Frankfurt)',
      'Reference ID: uevakhbqxujzqimaoytx',
      'Tabel: rezervari — 30 înregistrări, 10 coloane',
      'Securitate: RLS activ — INSERT public, SELECT/UPDATE/DELETE doar admin',
    ],
  },
  {
    titlu: '🔧 Tehnologii folosite',
    puncte: [
      'Supabase CLI v2.84.2 — management proiect și migrații',
      '@supabase/supabase-js v2.100.1 — client JavaScript',
      'Next.js 16 (App Router) — pagina /rezervari',
      'Tailwind CSS — stilizare formular',
      'SQL (PostgreSQL) — creare tabel și seed date',
      'npm xlsx — conversie CSV → Excel',
    ],
  },
];

// ─── DOCX ────────────────────────────────────────────────────────────────────

const paragrafe = [];

paragrafe.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: titlu, bold: true, size: 36, font: 'Calibri' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [new TextRun({ text: subtitlu, italics: true, size: 24, color: '555555', font: 'Calibri' })],
  })
);

for (const sectiune of sectiuni) {
  paragrafe.push(
    new Paragraph({
      spacing: { before: 400, after: 200 },
      children: [new TextRun({ text: sectiune.titlu, bold: true, size: 28, color: '0d6b5e', font: 'Calibri' })],
    })
  );
  for (const punct of sectiune.puncte) {
    paragrafe.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: punct, font: 'Calibri', size: 22, color: '222222' })],
      })
    );
  }
}

const doc = new Document({
  sections: [{ properties: {}, children: paragrafe }],
});

const docxBuffer = await Packer.toBuffer(doc);
writeFileSync('Sumar-Sesiune-29-Martie-2026.docx', docxBuffer);
console.log('✅ Sumar-Sesiune-29-Martie-2026.docx creat!');

// ─── PDF ─────────────────────────────────────────────────────────────────────

const pdf = new PDFDocument({ margin: 55, size: 'A4' });
pdf.pipe(createWriteStream('Sumar-Sesiune-29-Martie-2026.pdf'));

pdf.fontSize(22).font('Helvetica-Bold').fillColor('#111111').text(titlu, { align: 'center' });
pdf.moveDown(0.3);
pdf.fontSize(13).font('Helvetica-Oblique').fillColor('#555555').text(subtitlu, { align: 'center' });
pdf.moveDown(1.5);

for (const sectiune of sectiuni) {
  pdf.fontSize(14).font('Helvetica-Bold').fillColor('#0d6b5e').text(sectiune.titlu);
  pdf.moveDown(0.4);
  for (const punct of sectiune.puncte) {
    pdf.fontSize(10).font('Helvetica').fillColor('#222222').text(punct, { lineGap: 3 });
  }
  pdf.moveDown(1);
}

pdf.end();
console.log('✅ Sumar-Sesiune-29-Martie-2026.pdf creat!');
