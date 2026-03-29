import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import PDFDocument from 'pdfkit';
import { writeFileSync, createWriteStream } from 'fs';

const titlu = 'Recapitulare Lecție — 29 Martie 2026';
const subtitlu = 'Integrarea Supabase în proiectul Vibe Caffè';

const sectiuni = [
  {
    titlu: '1. Instalarea dependențelor',
    continut: [
      'Am instalat clientul JavaScript Supabase în proiectul Next.js:',
      '  npm install @supabase/supabase-js',
      'Versiunea instalată: @supabase/supabase-js v2.100.1',
      '',
      'Am instalat Supabase CLI prin Scoop (package manager pentru Windows):',
      '  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser',
      '  irm get.scoop.sh | iex',
      '  scoop bucket add supabase https://github.com/supabase/scoop-bucket.git',
      '  scoop install supabase',
      'Versiunea instalată: Supabase CLI v2.84.2',
    ],
  },
  {
    titlu: '2. Autentificarea în Supabase',
    continut: [
      'Ne-am logat în contul Supabase direct din terminal:',
      '  supabase login',
      'Comanda a deschis browserul automat pentru autentificare.',
      'Token creat: cli_WIN10ENT\\Admin@Win10Ent_1774783971',
      'Rezultat: "You are now logged in. Happy coding!"',
    ],
  },
  {
    titlu: '3. Crearea proiectului Supabase',
    continut: [
      'Am creat un proiect nou direct din CLI:',
      '  supabase projects create vibe-caffe --db-password "Vibe@Caffe#2026!Supabase" --region eu-central-1',
      '',
      'Detalii proiect creat:',
      '  • Nume: vibe-caffe',
      '  • Regiune: Central EU (Frankfurt) — cel mai aproape de România',
      '  • Reference ID: uevakhbqxujzqimaoytx',
      '  • Organizație: 2020nc',
      '  • Creat la: 2026-03-29 09:27:58 UTC',
    ],
  },
  {
    titlu: '4. Legarea proiectului local de Supabase',
    continut: [
      'Am conectat folderul local al proiectului Next.js la proiectul Supabase Cloud:',
      '  cd "k:\\Video-Prelucrat\\Vibe Coding\\Proiect_01"',
      '  supabase link --project-ref uevakhbqxujzqimaoytx',
      'Rezultat: "Finished supabase link."',
    ],
  },
  {
    titlu: '5. Configurarea cheilor API',
    continut: [
      'Am extras cheile API ale proiectului:',
      '  supabase projects api-keys --project-ref uevakhbqxujzqimaoytx',
      '',
      'Chei obținute:',
      '  • anon key — pentru acces public (frontend)',
      '  • service_role key — pentru acces admin (backend)',
      '',
      'Am creat fișierul .env.local cu variabilele de mediu:',
      '  NEXT_PUBLIC_SUPABASE_URL=https://uevakhbqxujzqimaoytx.supabase.co',
      '  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...',
      '',
      'Fișierul .env.local este protejat de .gitignore — nu va ajunge pe GitHub.',
    ],
  },
  {
    titlu: '6. Crearea clientului Supabase',
    continut: [
      'Am creat fișierul lib/supabase.ts — clientul Supabase reutilizabil:',
      '',
      '  import { createClient } from \'@supabase/supabase-js\';',
      '  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;',
      '  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;',
      '  export const supabase = createClient(supabaseUrl, supabaseAnonKey);',
      '',
      'Acum orice componentă din proiect poate importa clientul cu:',
      '  import { supabase } from \'@/lib/supabase\';',
    ],
  },
  {
    titlu: '7. Crearea tabelului rezervari în baza de date',
    continut: [
      'Am creat migrația SQL: supabase/migrations/20260329_create_rezervari.sql',
      '',
      'Structura tabelului:',
      '  • id          — uuid, primary key, auto-generat',
      '  • created_at  — timestamp, auto-generat',
      '  • nume        — text, obligatoriu',
      '  • email       — text, obligatoriu',
      '  • telefon     — text, obligatoriu',
      '  • data        — date, obligatoriu',
      '  • ora         — time, obligatoriu',
      '  • persoane    — integer (1-20), obligatoriu',
      '  • mesaj       — text, opțional',
      '  • status      — text: pending / confirmed / cancelled',
      '',
      'Securitate (Row Level Security):',
      '  • Oricine poate crea o rezervare (INSERT public — anon)',
      '  • Doar utilizatorii autentificați pot vedea/modifica/șterge (SELECT/UPDATE/DELETE — authenticated)',
      '',
      'Migrația a fost aplicată în cloud cu:',
      '  supabase db push',
    ],
  },
  {
    titlu: '8. Pagina de rezervări în Next.js',
    continut: [
      'Am creat app/rezervari/page.tsx — formular complet conectat la Supabase.',
      '',
      'Câmpuri formular:',
      '  • Nume complet, Email, Telefon',
      '  • Număr persoane (dropdown 1-20 + grupuri)',
      '  • Data (date picker cu minim azi)',
      '  • Ora (dropdown orar 08:00-21:00)',
      '  • Mesaj / Cerințe speciale (textarea)',
      '',
      'Funcționalități:',
      '  • Validare HTML5 (câmpuri obligatorii)',
      '  • La submit: insert în tabelul rezervari cu status "pending"',
      '  • Mesaj de succes cu iconiță cafea după trimitere',
      '  • Mesaj de eroare dacă ceva nu merge',
      '  • Buton "Rezervare nouă" pentru a reseta formularul',
      '  • Navigație: logo Vibe Caffè + link "Înapoi acasă"',
    ],
  },
  {
    titlu: '9. Popularea bazei de date cu date de test',
    continut: [
      'Am creat migrația supabase/migrations/20260330_seed_rezervari.sql',
      'cu 30 de rezervări de test:',
      '  • 10 rezervări cu status "pending"   (1-10 Aprilie 2026)',
      '  • 10 rezervări cu status "confirmed" (11-20 Aprilie 2026)',
      '  • 10 rezervări cu status "cancelled" (21-30 Aprilie 2026)',
      '',
      'Clienți de test: Alexandru Ionescu, Maria Popescu, Andrei Constantin,',
      'Elena Dumitrescu, Mihai Georgescu, Ana Radu, Cristian Popa,',
      'Ioana Stanescu, Bogdan Marin, Laura Nistor.',
      '',
      'Migrația aplicată cu: supabase db push',
    ],
  },
  {
    titlu: '10. Export date din Supabase',
    continut: [
      'Am văzut datele în Supabase Dashboard → Table Editor → rezervari.',
      '',
      'Export CSV:',
      '  • Table Editor → click dreapta pe tabel → Export data → Export table as CSV',
      '  • Fișier salvat: rezervari_rows.csv',
      '',
      'Conversie în Excel:',
      '  • Am instalat pachetul npm xlsx',
      '  • Am rulat un script Node.js care a convertit CSV-ul în format Excel',
      '  • Fișier generat: rezervari.xlsx',
    ],
  },
  {
    titlu: 'Fișiere create în această lecție',
    continut: [
      '  • .env.local                                    — variabile de mediu Supabase',
      '  • lib/supabase.ts                               — clientul Supabase',
      '  • app/rezervari/page.tsx                        — pagina cu formularul de rezervări',
      '  • supabase/migrations/20260329_create_rezervari.sql  — structura tabelului',
      '  • supabase/migrations/20260330_seed_rezervari.sql    — date de test',
      '  • scripts/seed-rezervari.mjs                   — script Node.js (alternativă)',
      '  • rezervari_rows.csv                           — export date Supabase',
      '  • rezervari.xlsx                               — date în format Excel',
    ],
  },
];

// ─── DOCX ────────────────────────────────────────────────────────────────────

const paragrafe = [];

paragrafe.push(
  new Paragraph({
    text: titlu,
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
  new Paragraph({
    text: subtitlu,
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [new TextRun({ text: subtitlu, italics: true, size: 26, color: '555555' })],
  })
);

for (const sectiune of sectiuni) {
  paragrafe.push(
    new Paragraph({
      text: sectiune.titlu,
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    })
  );
  for (const linie of sectiune.continut) {
    paragrafe.push(
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: linie,
            font: 'Calibri',
            size: 22,
            color: linie.startsWith('  ') ? '1a6b5e' : '222222',
          }),
        ],
      })
    );
  }
}

const doc = new Document({
  sections: [{ properties: {}, children: paragrafe }],
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 22 },
      },
    },
  },
});

const docxBuffer = await Packer.toBuffer(doc);
writeFileSync('Recapitulare-29-Martie-2026.docx', docxBuffer);
console.log('✅ Recapitulare-29-Martie-2026.docx creat!');

// ─── PDF ─────────────────────────────────────────────────────────────────────

const pdf = new PDFDocument({ margin: 50, size: 'A4' });
pdf.pipe(createWriteStream('Recapitulare-29-Martie-2026.pdf'));

// Titlu
pdf.fontSize(22).font('Helvetica-Bold').text(titlu, { align: 'center' });
pdf.fontSize(13).font('Helvetica-Oblique').fillColor('#555555').text(subtitlu, { align: 'center' });
pdf.moveDown(1.5);

for (const sectiune of sectiuni) {
  // heading
  pdf.fontSize(13).font('Helvetica-Bold').fillColor('#0d6b5e').text(sectiune.titlu);
  pdf.moveDown(0.3);

  for (const linie of sectiune.continut) {
    const isCode = linie.startsWith('  ');
    pdf.fontSize(10)
      .font(isCode ? 'Courier' : 'Helvetica')
      .fillColor(isCode ? '#1a5c50' : '#222222')
      .text(linie || ' ', { lineGap: 2 });
  }
  pdf.moveDown(0.8);
}

pdf.end();
console.log('✅ Recapitulare-29-Martie-2026.pdf creat!');
