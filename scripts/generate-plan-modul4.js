/**
 * Generează planul sesiunii următoare — Vibe Caffè
 * Fișiere: plan-modul4.docx + plan-modul4.pdf
 */

const fs   = require('fs');
const path = require('path');

const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf');

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, AlignmentType,
  BorderStyle, ShadingType,
} = require('docx');

const OUT_DIR = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const TITLU    = 'Vibe Caffè — Plan sesiunea următoare';
const SUBTITLU = 'Facilități de adăugat față de proiectul profesorului';
const DATA     = '31 martie 2026';

// ─── CONȚINUT ─────────────────────────────────────────────────────────────────

const sectiuni = [
  {
    titlu: '1. Context — Analiza proiectului profesorului',
    paragrafe: [
      'La finalul sesiunii din 31 martie 2026 a fost analizat site-ul live al profesorului, disponibil la adresa https://vibe-website-rho.vercel.app/. Scopul analizei a fost să identificăm ce funcționalități și pagini există în proiectul de referință și care dintre acestea lipsesc din varianta noastră.',
      'Proiectul nostru Vibe Caffè este mai avansat în zona de administrare și baze de date — avem Admin Panel complet, meniu dinamic din Supabase, meniu de sărbători cu reduceri configurabile și export PDF/Excel. Totuși, există câteva pagini și secțiuni vizibile pe site-ul public al profesorului pe care nu le-am implementat încă.',
    ],
  },
  {
    titlu: '2. Ce lipsește față de proiectul profesorului',
    paragrafe: [
      'După analiza completă a site-ului profesorului au fost identificate următoarele elemente lipsă din proiectul nostru:',
      '① Pagina /locatie — O pagină dedicată locației cafenelei, cu adresă, program, facilități, galerie foto și hartă Google Maps.',
      '② Secțiunea About pe homepage — O secțiune narativă despre povestea cafenelei, originea boabelor de cafea și filosofia brandului.',
      '③ Happy Hour pe pagina Locație — Afișarea promoției de 16:00-18:00 cu reducere 20%, vizibilă pe pagina de locație.',
      '④ Galerie foto pe pagina Locație — 6 carduri cu imagini din cafenea (interior, bar espresso, terasă), cu efect hover de zoom și overlay cu descriere.',
      '⑤ Google Maps pe pagina Locație — Secțiune cu hartă embed sau placeholder pentru localizare geografică.',
      '⑥ Newsletter în Footer — Câmp de email cu buton de abonare la newsletter.',
      '⑦ Social media în Footer — Linkuri către Facebook, Instagram, TikTok.',
      '⑧ Opțiuni personalizare meniu — Secțiune care afișează opțiunile de customizare: lapte alternativ (+2 RON), shot extra espresso (+5 RON), siropuri aromatizate (+3 RON).',
    ],
  },
  {
    titlu: '3. Prioritizare — Ordinea implementării',
    paragrafe: [
      'Elementele identificate au fost prioritizate în funcție de impactul vizual și complexitatea implementării:',
      'Prioritate MARE — Pagina /locatie: Este cea mai vizibilă lipsă. Profesorul are o pagină completă cu mai multe secțiuni. Această pagină include harta, galeria foto, Happy Hour și toate facilitățile.',
      'Prioritate MARE — Secțiunea About pe homepage: Secțiune importantă pentru storytelling și completitudinea paginii principale.',
      'Prioritate MEDIE — Opțiuni personalizare în meniu: Adaugă valoare comercială și informează clientul despre posibilități.',
      'Prioritate MEDIE — Newsletter + Social media în Footer: Completează footer-ul care momentan este minimalist.',
      'Prioritate MICĂ — Google Maps embed: Poate fi implementat cu iframe Google Maps sau cu un placeholder elegant.',
    ],
  },
  {
    titlu: '4. Detalii tehnice — Pagina /locatie',
    paragrafe: [
      'Pagina /locatie va fi creată ca fișier app/locatie/page.tsx și va conține mai multe secțiuni:',
      'Hero Section — Imagine de fundal cu overlay, titlu "Găsește-ne" și subtitlu cu adresa.',
      'Info + Program — Grid cu două coloane: stânga adresă/contact, dreapta tabel cu orele de program pe zile. Include și cardul de Happy Hour (16:00-18:00, -20%).',
      'Facilități — Grid cu iconuri pentru: WiFi gratuit, prize la mese, acces persoane cu dizabilități, parcare gratuită, pet-friendly.',
      'Google Maps — Secțiune cu iframe embed sau placeholder cu buton "Deschide în Google Maps".',
      'Galerie foto — Grid 3x2 cu 6 carduri: imagini din interior, zona de lucru, bar espresso, colț relaxare, terasă, atmosferă. Hover: zoom + overlay cu titlu.',
    ],
  },
  {
    titlu: '5. Detalii tehnice — Secțiunea About și Footer',
    paragrafe: [
      'Secțiunea About va fi adăugată pe homepage (app/page.tsx) ca un nou component components/About.tsx.',
      'Va conține: povestea fondării cafenelei, informații despre originea boabelor de cafea (Columbia, Etiopia, Brazilia), certificările barista și angajamentul față de sustenabilitate.',
      'Layout: două coloane — text stânga, imagine dreapta, cu animație la scroll folosind useScrollAnimation hook-ul existent.',
      'Footer-ul va fi extins cu un câmp de newsletter (input email + buton Abonează-te) și iconuri de social media (Facebook, Instagram, TikTok) cu link-uri.',
    ],
  },
  {
    titlu: '6. Ce avem noi în plus față de profesor',
    paragrafe: [
      'Este important de menționat că proiectul nostru depășește proiectul profesorului în mai multe privințe:',
      '✓ Meniu dinamic din Supabase — Profesorul are meniu static hardcodat. Noi avem produse în baza de date, editabile din Admin fără a atinge codul.',
      '✓ Admin Panel complet — Tab Meniu cu wizard 3 pași, bulk discount, checkboxes. Profesorul are admin simplificat.',
      '✓ Meniu Sărbători configurat din DB — Reducerile și eticheta se configurează din Admin, nu din cod.',
      '✓ Export PDF/Excel — Din Admin se pot exporta listele de produse și prețuri reduse cu suport pentru diacritice.',
      '✓ Discount per produs — Fiecare produs poate avea reducere specifică, independent de reducerea globală de sărbătoare.',
      '✓ Deploy automat — Orice push pe main deployează automat pe Vercel la adresa vibe-website2.vercel.app.',
    ],
  },
];

const tabelLipsa = {
  titlu: 'Tabel 1 — Elemente lipsă față de proiectul profesorului',
  header: ['Element', 'Pagina', 'Prioritate', 'Complexitate'],
  rows: [
    ['Pagina /locatie (complet)', '/locatie', 'Mare', 'Mare'],
    ['Secțiunea About', 'homepage', 'Mare', 'Medie'],
    ['Happy Hour (16:00-18:00, -20%)', '/locatie', 'Mare', 'Mică'],
    ['Galerie foto (6 carduri hover)', '/locatie', 'Mare', 'Medie'],
    ['Google Maps embed/placeholder', '/locatie', 'Medie', 'Mică'],
    ['Opțiuni personalizare meniu', 'homepage', 'Medie', 'Mică'],
    ['Newsletter în Footer', 'global', 'Medie', 'Mică'],
    ['Social media în Footer', 'global', 'Mică', 'Mică'],
  ],
};

const tabelAvantaje = {
  titlu: 'Tabel 2 — Comparativ Proiect nostru vs. Proiect profesor',
  header: ['Funcționalitate', 'Profesor', 'Noi'],
  rows: [
    ['Meniu produse', 'Static (cod)', 'Dinamic (Supabase)'],
    ['Admin Panel', 'Simplificat', 'Complet (wizard, bulk)'],
    ['Meniu Sărbători', 'Lipsă', 'Configurat din DB'],
    ['Export PDF/Excel', 'Lipsă', 'Implementat'],
    ['Discount per produs', 'Lipsă', 'Implementat'],
    ['Pagina /locatie', 'Completă', 'Lipsă (de adăugat)'],
    ['Secțiunea About', 'Prezentă', 'Lipsă (de adăugat)'],
    ['Newsletter Footer', 'Prezent', 'Lipsă (de adăugat)'],
  ],
};

// ════════════════════════════════════════════════════════════════════════════
//  GENERARE PDF
// ════════════════════════════════════════════════════════════════════════════

function generarePDF() {
  const doc = createPdf({ size: 'A4', margin: 50, bufferPages: true });
  const out = path.join(OUT_DIR, 'plan-modul4.pdf');
  const ws  = fs.createWriteStream(out);
  doc.pipe(ws);

  const PW = doc.page.width;
  const M  = 50;
  const W  = PW - M * 2;

  // ── HEADER ──
  doc.rect(0, 0, PW, 130).fill('#0f172a');
  doc.fillColor('#f59e0b').font('Bold').fontSize(17)
     .text(TITLU, M, 18, { width: W, lineBreak: true });
  doc.fillColor('#e2e8f0').font('Regular').fontSize(10)
     .text(SUBTITLU, M, 78, { width: W, lineBreak: false });
  doc.fillColor('#94a3b8').fontSize(9)
     .text(DATA, M, 96, { width: W, lineBreak: false });
  doc.y = 150;

  function checkPage(needed) {
    if (doc.y + needed > doc.page.height - 70) {
      doc.addPage();
      doc.y = M;
    }
  }

  function sectionTitle(text) {
    checkPage(40);
    doc.moveDown(0.5);
    doc.fillColor('#1e293b').font('Bold').fontSize(12).text(text, M, doc.y, { width: W });
    doc.moveDown(0.3);
    doc.moveTo(M, doc.y).lineTo(M + W, doc.y).strokeColor('#f59e0b').lineWidth(1.5).stroke();
    doc.moveDown(0.4);
  }

  function paragraph(text) {
    checkPage(30);
    doc.fillColor('#334155').font('Regular').fontSize(10)
       .text(text, M, doc.y, { width: W, align: 'justify' });
    doc.moveDown(0.4);
  }

  function drawTable(tabel) {
    const colCount = tabel.header.length;
    const colW = W / colCount;
    const rowH = 20;
    const padX = 6, padY = 5;

    checkPage(rowH * (tabel.rows.length + 1) + 20);

    // Header
    doc.rect(M, doc.y, W, rowH).fill('#1e293b');
    tabel.header.forEach((h, ci) => {
      doc.fillColor('#ffffff').font('Bold').fontSize(9)
         .text(h, M + ci * colW + padX, doc.y + padY, { width: colW - padX * 2, lineBreak: false });
    });
    doc.y += rowH;

    // Rows
    tabel.rows.forEach((row, ri) => {
      const bg = ri % 2 === 0 ? '#f8fafc' : '#ffffff';
      doc.rect(M, doc.y, W, rowH).fill(bg);
      row.forEach((cell, ci) => {
        doc.fillColor('#1e293b').font('Regular').fontSize(9)
           .text(cell, M + ci * colW + padX, doc.y + padY, { width: colW - padX * 2, lineBreak: false });
      });
      doc.rect(M, doc.y, W, rowH).stroke('#e2e8f0');
      doc.y += rowH;
    });
    doc.moveDown(1);
  }

  // ── CONȚINUT ──
  for (const s of sectiuni) {
    sectionTitle(s.titlu);
    for (const p of s.paragrafe) {
      paragraph(p);
    }
    if (s.titlu.startsWith('2.')) {
      checkPage(20);
      doc.fillColor('#0f172a').font('Bold').fontSize(10)
         .text(tabelLipsa.titlu, M, doc.y, { width: W }); doc.moveDown(0.4);
      drawTable(tabelLipsa);
    }
    if (s.titlu.startsWith('6.')) {
      checkPage(20);
      doc.fillColor('#0f172a').font('Bold').fontSize(10)
         .text(tabelAvantaje.titlu, M, doc.y, { width: W }); doc.moveDown(0.4);
      drawTable(tabelAvantaje);
    }
  }

  // ── NUMEROTARE PAGINI ──
  const range = doc.bufferedPageRange();
  const total = range.count;

  for (let i = 0; i < total; i++) {
    doc.switchToPage(range.start + i);
    const pageH = doc.page.height;
    const fy    = pageH - 28;

    doc.moveTo(M, pageH - 40).lineTo(M + W, pageH - 40)
       .strokeColor('#e2e8f0').lineWidth(0.5).stroke();

    doc.fillColor('#94a3b8').font('Regular').fontSize(7.5)
       .text('Vibe Caffè — Plan sesiunea următoare', M, fy, { lineBreak: false });

    const centerStr = `Pagina ${i + 1} din ${total}`;
    doc.font('Bold').fontSize(7.5);
    const cw = doc.widthOfString(centerStr);
    const cx = M + (W - cw) / 2;
    doc.fillColor('#64748b').text(centerStr, cx, fy, { lineBreak: false });

    doc.font('Regular').fontSize(7.5);
    const rw = doc.widthOfString(DATA);
    const rx = M + W - rw;
    doc.fillColor('#94a3b8').text(DATA, rx, fy, { lineBreak: false });
  }

  doc.flushPages();
  doc.end();
  ws.on('finish', () => console.log('✅ PDF generat:', out));
}

// ════════════════════════════════════════════════════════════════════════════
//  GENERARE DOCX
// ════════════════════════════════════════════════════════════════════════════

async function generareDocx() {
  const children = [];

  function cell(text, isHeader = false, isEven = false) {
    return new TableCell({
      shading: isHeader
        ? { type: ShadingType.SOLID, color: '1e293b' }
        : isEven ? { type: ShadingType.SOLID, color: 'f8fafc' } : undefined,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({
        children: [new TextRun({
          text, bold: isHeader,
          color: isHeader ? 'FFFFFF' : '1e293b',
          size: 19, font: 'Calibri',
        })],
      })],
    });
  }

  function makeTable(tabel) {
    const rows = [tabel.header, ...tabel.rows];
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top:     { style: BorderStyle.SINGLE, size: 1, color: 'cbd5e1' },
        bottom:  { style: BorderStyle.SINGLE, size: 1, color: 'cbd5e1' },
        left:    { style: BorderStyle.SINGLE, size: 1, color: 'cbd5e1' },
        right:   { style: BorderStyle.SINGLE, size: 1, color: 'cbd5e1' },
        insideH: { style: BorderStyle.SINGLE, size: 1, color: 'e2e8f0' },
        insideV: { style: BorderStyle.SINGLE, size: 1, color: 'e2e8f0' },
      },
      rows: rows.map((row, ri) =>
        new TableRow({
          tableHeader: ri === 0,
          children: row.map((c) => cell(c, ri === 0, ri % 2 === 0 && ri > 0)),
        })
      ),
    });
  }

  // Titlu
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: TITLU, bold: true, size: 52, color: '0f172a', font: 'Calibri' })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new TextRun({ text: SUBTITLU, size: 28, color: '64748b', font: 'Calibri' })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [new TextRun({ text: DATA, size: 24, color: '94a3b8', font: 'Calibri' })],
  }));

  for (const s of sectiuni) {
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 160 },
      children: [new TextRun({ text: s.titlu, bold: true, size: 32, color: '0f172a', font: 'Calibri' })],
    }));
    for (const p of s.paragrafe) {
      children.push(new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun({ text: p, size: 22, color: '334155', font: 'Calibri' })],
      }));
    }
    if (s.titlu.startsWith('2.')) {
      children.push(new Paragraph({ spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: tabelLipsa.titlu, bold: true, size: 22, color: '0f172a', font: 'Calibri' })] }));
      children.push(makeTable(tabelLipsa));
      children.push(new Paragraph({ spacing: { after: 200 } }));
    }
    if (s.titlu.startsWith('6.')) {
      children.push(new Paragraph({ spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: tabelAvantaje.titlu, bold: true, size: 22, color: '0f172a', font: 'Calibri' })] }));
      children.push(makeTable(tabelAvantaje));
      children.push(new Paragraph({ spacing: { after: 200 } }));
    }
  }

  const doc = new Document({ sections: [{ children }] });
  const buf = await Packer.toBuffer(doc);
  const out = path.join(OUT_DIR, 'plan-modul4.docx');
  fs.writeFileSync(out, buf);
  console.log('✅ DOCX generat:', out);
}

// ════════════════════════════════════════════════════════════════════════════
//  MAIN
// ════════════════════════════════════════════════════════════════════════════

generarePDF();
generareDocx();
