import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import PDFDocument from 'pdfkit';
import { writeFileSync, createWriteStream } from 'fs';

const titlu = 'Recapitulare — Modulul 3, Lecția 2';
const subtitlu = 'Formular rezervări în 3 pași + integrare Supabase';
const data = '29 Martie 2026';

const sectiuni = [
  {
    titlu: '✅ Ce am realizat',
    puncte: [
      '1. Verificat că @supabase/supabase-js este instalat (v2.100.1) din lecția anterioară',
      '2. Verificat clientul Supabase existent în lib/supabase.ts — citește cheile din .env.local',
      '3. Corectat cheia API din .env.local — era o nepotrivire între URL și JWT (ref diferit)',
      '4. Adăugat citirea rezervărilor din Supabase (fetchRezervari) cu ordonare descrescătoare',
      '5. Refăcut formularul de rezervări în 3 pași separați (wizard multi-step)',
      '6. Testat trimiterea unei rezervări — confirmată în Table Editor din Supabase Dashboard',
    ],
  },
  {
    titlu: '🔧 Fișiere modificate',
    puncte: [
      '.env.local                  — cheie API Supabase corectată',
      'app/rezervari/page.tsx      — formular refăcut în 3 pași + citire rezervări',
    ],
  },
  {
    titlu: '📋 Formularul în 3 pași',
    puncte: [
      'Pasul 1 — Data: input de tip date, butonul Continuă dezactivat până se alege o dată',
      'Pasul 2 — Ora: grid 4x4 cu butoane pentru fiecare oră (08:00-21:00), selectare vizuală',
      'Pasul 3 — Detalii: rezumat data+ora, câmpuri nume/email/telefon/persoane/mesaj + submit',
      'Progress bar în sus: cercuri 1→2→3, bifate cu ✓ după ce treci peste ele',
      'Buton ← Înapoi pe pașii 2 și 3 pentru a reveni la pasul anterior',
    ],
  },
  {
    titlu: '🗄️ Operații Supabase folosite',
    puncte: [
      'INSERT — salvează rezervarea nouă cu status: "pending"',
      'SELECT + ORDER BY created_at DESC — citește toate rezervările, cele mai noi primele',
      'fetchRezervari() este apelată la mount (useEffect) și după fiecare insert reușit',
      'RLS activ: INSERT permis public, SELECT blocat (date personale protejate)',
    ],
  },
  {
    titlu: '🔑 Problema cheii API — explicație',
    puncte: [
      'Simptom: eroare "Invalid API key" la trimiterea formularului',
      'Cauză: cheia JWT din .env.local avea ref "uevakhbquzzqimaoytx" (greșit)',
      'URL-ul proiectului era "uevakhbqxujzqimaoytx" (corect)',
      'Soluție: copiată cheia corectă din Settings → API Keys → Legacy anon key',
      'Lecție: cheia anon trebuie să provină din același proiect ca URL-ul',
    ],
  },
  {
    titlu: '💡 Concepte învățate',
    puncte: [
      'Formular multi-step (wizard) — state "step" controlează ce se afișează',
      'Validare per pas — butonul Continuă dezactivat până câmpul pasului curent e completat',
      'supabase.from("tabel").select("*").order("coloana", { ascending: false })',
      'useEffect pentru fetch la încărcarea paginii',
      'RLS (Row Level Security) — controlează cine poate citi/scrie în tabel',
    ],
  },
];

// ─── DOCX ────────────────────────────────────────────────────────────────────

const paragrafe = [];

paragrafe.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new TextRun({ text: titlu, bold: true, size: 36, font: 'Calibri' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new TextRun({ text: subtitlu, italics: true, size: 24, color: '555555', font: 'Calibri' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [new TextRun({ text: data, size: 20, color: '888888', font: 'Calibri' })],
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
writeFileSync('Recapitulare-Modulul3-Lectia2.docx', docxBuffer);
console.log('✅ Recapitulare-Modulul3-Lectia2.docx creat!');

// ─── PDF ─────────────────────────────────────────────────────────────────────

const FONT = 'C:/Windows/Fonts/calibri.ttf';
const FONT_BOLD = 'C:/Windows/Fonts/calibrib.ttf';

const pdf = new PDFDocument({ margin: 55, size: 'A4' });
pdf.pipe(createWriteStream('Recapitulare-Modulul3-Lectia2.pdf'));

pdf.registerFont('Regular', FONT);
pdf.registerFont('Bold', FONT_BOLD);

pdf.fontSize(22).font('Bold').fillColor('#111111').text(titlu, { align: 'center' });
pdf.moveDown(0.3);
pdf.fontSize(13).font('Regular').fillColor('#555555').text(subtitlu, { align: 'center' });
pdf.moveDown(0.2);
pdf.fontSize(10).font('Regular').fillColor('#888888').text(data, { align: 'center' });
pdf.moveDown(1.5);

for (const sectiune of sectiuni) {
  pdf.fontSize(14).font('Bold').fillColor('#0d6b5e').text(sectiune.titlu);
  pdf.moveDown(0.4);
  for (const punct of sectiune.puncte) {
    pdf.fontSize(10).font('Regular').fillColor('#222222').text(punct, { lineGap: 3 });
  }
  pdf.moveDown(1);
}

pdf.end();
console.log('✅ Recapitulare-Modulul3-Lectia2.pdf creat!');
