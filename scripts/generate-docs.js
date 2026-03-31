/**
 * Generează documentația proiectului Vibe Caffè — Modul 3
 * Fișiere: cerinte-meniu-modul3.docx + cerinte-meniu-modul3.pdf
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

const TITLU    = 'Vibe Caffè — Sistem de Management Meniu';
const SUBTITLU = 'Propunere inovație Modul 3 — Vibe Coding';
const DATA     = '30 martie 2026';

// ════════════════════════════════════════════════════════════════════════════
//  GENERARE PDF
// ════════════════════════════════════════════════════════════════════════════

function generarePDF() {
  const doc  = createPdf({ size: 'A4', margin: 50 });
  const out  = path.join(OUT_DIR, 'cerinte-meniu-modul3.pdf');
  const pipe = fs.createWriteStream(out);
  doc.pipe(pipe);

  const PW   = doc.page.width;
  const PH   = doc.page.height;
  const ML   = 50;
  const MR   = 50;
  const W    = PW - ML - MR;

  const TEAL      = '#0D9488';
  const TEAL_LIGHT= '#E6FFFA';
  const TEAL_MID  = '#99F6E4';
  const WHITE     = '#FFFFFF';
  const DARK      = '#111827';
  const GRAY      = '#4B5563';
  const GRAY_LIGHT= '#F9FAFB';
  const BORDER    = '#D1FAE5';

  // ── Helpers ──────────────────────────────────────────────────────────────

  function checkPage(needed = 80) {
    if (doc.y > PH - needed - 50) doc.addPage();
  }

  function sectionHeader(text) {
    checkPage(40);
    const y = doc.y;
    doc.rect(ML - 5, y, W + 10, 28).fill(TEAL_LIGHT);
    doc.rect(ML - 5, y, 4, 28).fill(TEAL);
    doc.fill(TEAL).font('Bold').fontSize(12).text(text, ML + 6, y + 8, { width: W - 10 });
    doc.y = y + 36;
  }

  function bodyText(text, indent = 0) {
    checkPage(20);
    doc.fill(GRAY).font('Regular').fontSize(10)
       .text(text, ML + indent, doc.y, { width: W - indent });
    doc.y += 4;
  }

  function boldText(text, indent = 0) {
    checkPage(20);
    doc.fill(DARK).font('Bold').fontSize(10.5)
       .text(text, ML + indent, doc.y, { width: W - indent });
    doc.y += 2;
  }

  function spacer(h = 8) { doc.y += h; }

  // Calculează înălțimea necesară pentru un text într-o coloană
  function cellHeight(text, colW, isBold) {
    doc.font(isBold ? 'Bold' : 'Regular').fontSize(9);
    return doc.heightOfString(String(text), { width: colW - 12 });
  }

  // Desenează header tabel (reutilizat la split pagini)
  function drawTableHeader(headers, colWidths, y) {
    const headerH = 28;
    const startX  = ML;
    doc.rect(startX, y, W, headerH).fill(TEAL);
    let x = startX;
    headers.forEach((h, i) => {
      doc.fill(WHITE).font('Bold').fontSize(9.5)
         .text(h, x + 6, y + 9, { width: colWidths[i] - 12 });
      doc.y = y + headerH;
      x += colWidths[i];
    });
    return y + headerH;
  }

  // Desenează un tabel PDF cu header repetat la split pagini
  function drawTable(headers, rows, colWidths) {
    const headerH  = 28;
    const PAD_V    = 8;
    const startX   = ML;
    const MIN_ROWS = 1; // câte rânduri trebuie să încapă după header

    // Pre-calculează înălțimile rândurilor
    const rowHeights = rows.map((row) => {
      const heights = row.map((cell, ci) => cellHeight(cell, colWidths[ci], ci === 0));
      return Math.max(...heights) + PAD_V * 2;
    });

    // Dacă nu încap header + 1 rând → pagină nouă înainte de a începe tabelul
    const firstRowH = rowHeights[0] || 30;
    if (doc.y > PH - 50 - headerH - firstRowH) {
      doc.addPage();
    }

    let y        = doc.y;
    let tableTop = y;

    // Desenează primul header
    y = drawTableHeader(headers, colWidths, y);
    doc.y = y;

    // ── Rânduri ──
    rows.forEach((row, ri) => {
      const rowH = rowHeights[ri];

      // Dacă rândul nu mai încape pe pagina curentă → pagină nouă + header repetat
      if (y + rowH > PH - 50) {
        // Închide border exterior al secțiunii curente
        doc.rect(startX, tableTop, W, y - tableTop)
           .strokeColor(TEAL_MID).lineWidth(1).stroke();

        doc.addPage();
        y        = doc.margins ? doc.page.margins.top : 50;
        tableTop = y;

        // Repetă header pe pagina nouă
        y = drawTableHeader(headers, colWidths, y);
        doc.y = y;
      }

      const bg = ri % 2 === 0 ? WHITE : GRAY_LIGHT;
      doc.rect(startX, y, W, rowH).fill(bg);

      // Conținut celule — reset doc.y după fiecare
      let x = startX;
      row.forEach((cell, ci) => {
        const isBold = ci === 0;
        doc.fill(isBold ? DARK : GRAY)
           .font(isBold ? 'Bold' : 'Regular')
           .fontSize(9)
           .text(String(cell), x + 6, y + PAD_V, { width: colWidths[ci] - 12 });
        doc.y = y + rowH; // reset crucial
        x += colWidths[ci];
      });

      // Linie orizontală jos
      doc.moveTo(startX, y + rowH).lineTo(startX + W, y + rowH)
         .strokeColor(BORDER).lineWidth(0.5).stroke();

      // Linii verticale
      let vx = startX;
      colWidths.slice(0, -1).forEach((cw) => {
        vx += cw;
        doc.moveTo(vx, y).lineTo(vx, y + rowH)
           .strokeColor(BORDER).lineWidth(0.5).stroke();
      });

      y += rowH;
      doc.y = y;
    });

    // Border exterior final
    doc.rect(startX, tableTop, W, y - tableTop)
       .strokeColor(TEAL_MID).lineWidth(1).stroke();

    doc.y = y + 10;
  }

  // ── HEADER PAGINA 1 ──────────────────────────────────────────────────────
  doc.rect(0, 0, PW, 110).fill(TEAL);

  // Titlu — fixat la y=28, fontSize mai mic să nu depășească
  doc.fill(WHITE).font('Bold').fontSize(20)
     .text(TITLU, ML, 22, { width: W, lineBreak: false });

  // Subtitlu — fixat la y=58
  doc.fill(TEAL_MID).font('Regular').fontSize(12)
     .text(SUBTITLU, ML, 55, { width: W, lineBreak: false });

  // Data — fixat la y=80
  doc.fill(TEAL_LIGHT).font('Regular').fontSize(10)
     .text(DATA, ML, 80, { width: W, lineBreak: false });

  doc.y = 128;

  // ── SECȚIUNEA 1 ──────────────────────────────────────────────────────────
  sectionHeader('1. Contextul proiectului');
  spacer(4);
  bodyText('Proiectul Vibe Caffè este o aplicație web modernă construită cu Next.js 16 (App Router), React 19, TypeScript 5 și Tailwind CSS 4, cu backend pe Supabase (PostgreSQL).');
  spacer(4);
  bodyText('La Modulul 2 a fost implementat un sistem complet de rezervări: formular multi-step în 3 pași, dashboard admin cu filtrare și management status, și API REST conectat la Supabase. Nota obținută: 10.');
  spacer(4);
  bodyText('Propunerea pentru Modulul 3 extinde aplicația cu un sistem profesionist de management al meniului, inspirat din arhitectura rezervărilor, dar cu funcționalități semnificativ mai avansate.');
  spacer(12);

  // ── SECȚIUNEA 2 ──────────────────────────────────────────────────────────
  sectionHeader('2. Cerințe funcționale — ce am propus');
  spacer(6);

  const cerinte = [
    ['2.1', 'Bază de date pentru meniu (Supabase)', 'Mutarea datelor de meniu din fișierul static menuData.ts într-un tabel Supabase menu_items. Permite actualizarea în timp real, fără redeploy al aplicației.'],
    ['2.2', 'Sistem de reduceri flexibil', 'Fiecare produs poate avea reducere de tip Procent (%) sau Valoare fixă (RON). Prețul final calculat automat, afișat cu prețul original tăiat.'],
    ['2.3', 'Meniu de Sărbătoare integrat', 'Reducerea globală de sărbătoare devine configurabilă din Admin (nu mai e hardcodată la -5 RON). Stocată în tabelul holiday_config.'],
    ['2.4', 'Formular Admin multi-step (3 pași)', 'Wizard pentru adăugare/editare produs: Pas 1 — Categorie + Nume | Pas 2 — Preț + Descriere | Pas 3 — Imagine + Reducere + Confirmare.'],
    ['2.5', 'Selecție și acțiuni în bloc', 'Checkbox pe fiecare produs, selectare multiplă, bară flotantă cu: Aplică reducere în bloc, Șterge reducerea, Toggle disponibil/indisponibil.'],
    ['2.6', 'Căutare imagine asistată', 'În Pasul 3: input URL cu preview live + butoane rapide "Caută pe Unsplash" și "Google Images".'],
    ['2.7', 'Export meniu PDF și Excel', 'Buton "Exportă meniu" cu opțiuni: Excel (.xlsx) cu toate coloanele și PDF tabel curat grupat pe categorii. Generate direct în browser.'],
  ];

  drawTable(
    ['Nr.', 'Funcționalitate', 'Descriere'],
    cerinte,
    [35, 155, W - 190]
  );
  spacer(6);

  // ── SECȚIUNEA 3 ──────────────────────────────────────────────────────────
  // verifică spațiu pentru titlu secțiune + label + header tabel + primul rând
  checkPage(160);
  sectionHeader('3. Schema bazei de date Supabase');
  spacer(6);

  checkPage(120);
  boldText('Tabelul menu_items');
  spacer(4);
  drawTable(
    ['Coloană', 'Tip', 'Constrângere / Descriere'],
    [
      ['id',              'uuid',        'PRIMARY KEY — auto-generat'],
      ['name',           'text',        'NOT NULL — Numele produsului'],
      ['category',       'text',        'NOT NULL — Espresso / Specialty / Cold Brew / Patiserie'],
      ['price',          'numeric',     'NOT NULL — Prețul de bază (RON)'],
      ['description',    'text',        'Descriere scurtă afișată pe card'],
      ['image_url',      'text',        'URL imagine produs'],
      ['discount_type',  'text',        "\'percent\' | \'value\' | null"],
      ['discount_amount','numeric',     'Mărimea reducerii — null înseamnă fără reducere'],
      ['available',      'boolean',     'DEFAULT true — afișat / ascuns din meniu'],
      ['sort_order',     'int',         'DEFAULT 0 — ordinea în categorie'],
      ['created_at',     'timestamptz', 'DEFAULT now()'],
    ],
    [110, 80, W - 190]
  );

  spacer(10);
  checkPage(100);
  boldText('Tabelul holiday_config');
  spacer(4);
  drawTable(
    ['Coloană', 'Tip', 'Descriere'],
    [
      ['id',              'int',     'PRIMARY KEY — mereu = 1 (un singur rând)'],
      ['discount_type',  'text',    "\'percent\' | \'value\' — tipul reducerii globale"],
      ['discount_amount','numeric', 'Valoarea reducerii globale de sărbătoare'],
      ['label',          'text',    'ex: "8 Martie — Ziua Femeii"'],
    ],
    [110, 80, W - 190]
  );
  spacer(6);

  // ── SECȚIUNEA 4 ──────────────────────────────────────────────────────────
  sectionHeader('4. Plan de implementare — 7 pași');
  spacer(6);

  drawTable(
    ['Pas', 'Titlu', 'Acțiuni principale', 'Verificare'],
    [
      ['1', 'Baza de date',    'Creare tabele menu_items + holiday_config, seed 21 produse',         'Date vizibile în Supabase Table Editor'],
      ['2', 'API Routes',      '/api/menu (GET/POST/PATCH/DELETE), /api/menu/bulk, /api/holiday',     'Testare cu browser / Postman'],
      ['3', 'MenuStarter.tsx', 'Fetch din Supabase, calcul preț final, badge reducere pe carduri',   'Meniu afișat corect în browser'],
      ['4', 'Admin — Tab Meniu','Liste produse cu checkbox, filtre categorie, toggle disponibil, export', 'Toate acțiunile funcționează'],
      ['5', 'Wizard 3 pași',   'Formular adăugare/editare: Categorie→Preț→Imagine+Reducere',         'Produsul apare în meniu după salvare'],
      ['6', 'Export PDF/Excel','jsPDF + autotable (PDF), SheetJS (Excel), generate în browser',       'Fișierele se descarcă cu date corecte'],
      ['7', 'Holiday actualizat','HolidayMenu citește din Supabase + holiday_config editabil din Admin','Reducerea configurată se aplică corect'],
    ],
    [40, 90, W - 220, 90]
  );
  spacer(6);

  // ── SECȚIUNEA 5 ──────────────────────────────────────────────────────────
  sectionHeader('5. Stack tehnologic');
  spacer(6);

  drawTable(
    ['Zonă', 'Tehnologie'],
    [
      ['Frontend',  'Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4'],
      ['Backend',   'Supabase (PostgreSQL) · Next.js API Routes'],
      ['Export',    'SheetJS / xlsx (Excel) · jsPDF + autotable (PDF)'],
      ['UI/UX',     'Wizard multi-step · Selecție în bloc · Preview imagini live'],
      ['Consistență','Pattern identic cu sistemul de rezervări implementat la Modulul 2'],
    ],
    [120, W - 120]
  );
  spacer(6);

  // ── SECȚIUNEA 6 ──────────────────────────────────────────────────────────
  sectionHeader('6. Valoarea adăugată față de cerința de bază');
  spacer(6);

  drawTable(
    ['Funcționalitate', 'Beneficiu'],
    [
      ['Reduceri duale (% + RON)',    'Mai flexibile decât un discount fix — acoperă orice tip de promoție'],
      ['Selecție și acțiuni în bloc', 'Productivitate ridicată la actualizări de sezon (ex: Black Friday)'],
      ['Export PDF + Excel',          'Verificare și arhivare profesionistă a meniului curent'],
      ['Wizard 3 pași în Admin',      'UX consistent cu rezervările — experiență unitară în aplicație'],
      ['Preview imagine live',        'Reduce erorile de URL greșit înainte de salvare'],
      ['Holiday config editabil',     'Fără hardcoding în cod sursă — configurabil fără redeploy'],
      ['Available toggle',            'Produse temporar indisponibile fără ștergere din baza de date'],
    ],
    [180, W - 180]
  );

  doc.end();
  return new Promise((resolve) => pipe.on('finish', () => resolve(out)));
}

// ════════════════════════════════════════════════════════════════════════════
//  GENERARE DOCX
// ════════════════════════════════════════════════════════════════════════════

function makeTableDocx(headers, rows, colPcts) {
  const totalW = 9000; // twips totali
  const colW   = colPcts.map((p) => Math.round((p / 100) * totalW));

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) =>
      new TableCell({
        width: { size: colW[i], type: WidthType.DXA },
        shading: { type: ShadingType.SOLID, color: '0D9488' },
        children: [
          new Paragraph({
            children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 19, font: 'Calibri' })],
          }),
        ],
      })
    ),
  });

  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, ci) =>
        new TableCell({
          width: { size: colW[ci], type: WidthType.DXA },
          shading: { type: ShadingType.SOLID, color: ri % 2 === 0 ? 'FFFFFF' : 'F0FDFA' },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: String(cell),
                  bold: ci === 0,
                  size: 18,
                  color: ci === 0 ? '111827' : '374151',
                  font: 'Calibri',
                }),
              ],
            }),
          ],
        })
      ),
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

function h1(text) {
  return new Paragraph({
    spacing: { before: 280, after: 100 },
    shading: { type: ShadingType.SOLID, color: 'E6FFFA' },
    children: [new TextRun({ text, bold: true, size: 26, color: '0D9488', font: 'Calibri' })],
  });
}

function body(text) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 20, color: '374151', font: 'Calibri' })],
  });
}

function spacerDocx() {
  return new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun('')] });
}

async function generareDocx() {
  const children = [];

  // Titlu
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 160 },
      children: [new TextRun({ text: TITLU, bold: true, size: 36, color: '0D9488', font: 'Calibri' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [new TextRun({ text: SUBTITLU, size: 24, color: '6B7280', font: 'Calibri', italics: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 360 },
      children: [new TextRun({ text: DATA, size: 20, color: '9CA3AF', font: 'Calibri' })],
    })
  );

  // 1. Context
  children.push(h1('1. Contextul proiectului'), spacerDocx());
  children.push(
    body('Proiectul Vibe Caffè este o aplicație web modernă construită cu Next.js 16 (App Router), React 19, TypeScript 5 și Tailwind CSS 4, cu backend pe Supabase (PostgreSQL).'),
    body('La Modulul 2 a fost implementat un sistem complet de rezervări: formular multi-step în 3 pași, dashboard admin și API REST. Nota obținută: 10.'),
    body('Modulul 3 extinde aplicația cu un sistem profesionist de management al meniului, cu funcționalități avansate față de cerința de bază.'),
    spacerDocx()
  );

  // 2. Cerinte
  children.push(h1('2. Cerințe funcționale'), spacerDocx());
  children.push(
    makeTableDocx(
      ['Nr.', 'Funcționalitate', 'Descriere'],
      [
        ['2.1', 'Bază de date meniu (Supabase)',  'Datele de meniu migrate din fișier static în tabel Supabase menu_items. Actualizare în timp real, fără redeploy.'],
        ['2.2', 'Sistem reduceri flexibil',        'Reducere per produs: Procent (%) sau Valoare fixă (RON). Prețul final calculat automat.'],
        ['2.3', 'Meniu Sărbătoare integrat',       'Reducere globală configurabilă din Admin, stocată în tabelul holiday_config.'],
        ['2.4', 'Wizard Admin 3 pași',             'Pas 1: Categorie + Nume | Pas 2: Preț + Descriere | Pas 3: Imagine + Reducere + Confirmare.'],
        ['2.5', 'Selecție și acțiuni în bloc',     'Checkbox multiplu + bară flotantă: reducere în bloc, toggle disponibilitate.'],
        ['2.6', 'Căutare imagine asistată',        'Preview live URL + butoane rapide Unsplash și Google Images.'],
        ['2.7', 'Export PDF și Excel',             'Export din Admin: Excel (.xlsx) + PDF tabel, generate direct în browser.'],
      ],
      [8, 28, 64]
    ),
    spacerDocx()
  );

  // 3. Schema BD
  children.push(h1('3. Schema bazei de date Supabase'), spacerDocx());
  children.push(
    new Paragraph({ spacing: { before: 60, after: 80 }, children: [new TextRun({ text: 'Tabelul menu_items', bold: true, size: 22, color: '111827', font: 'Calibri' })] }),
    makeTableDocx(
      ['Coloană', 'Tip', 'Descriere'],
      [
        ['id',               'uuid',         'PRIMARY KEY — auto-generat'],
        ['name',             'text',         'NOT NULL — Numele produsului'],
        ['category',         'text',         'NOT NULL — Espresso / Specialty / Cold Brew / Patiserie'],
        ['price',            'numeric',      'NOT NULL — Prețul de bază (RON)'],
        ['description',      'text',         'Descriere scurtă afișată pe card'],
        ['image_url',        'text',         'URL imagine produs'],
        ['discount_type',    'text',         "'percent' | 'value' | null"],
        ['discount_amount',  'numeric',      'Mărimea reducerii — null = fără reducere'],
        ['available',        'boolean',      'DEFAULT true — afișat / ascuns din meniu'],
        ['sort_order',       'int',          'DEFAULT 0 — ordinea în categorie'],
        ['created_at',       'timestamptz',  'DEFAULT now()'],
      ],
      [25, 18, 57]
    ),
    spacerDocx(),
    new Paragraph({ spacing: { before: 60, after: 80 }, children: [new TextRun({ text: 'Tabelul holiday_config', bold: true, size: 22, color: '111827', font: 'Calibri' })] }),
    makeTableDocx(
      ['Coloană', 'Tip', 'Descriere'],
      [
        ['id',               'int',      'PRIMARY KEY — mereu = 1 (un singur rând)'],
        ['discount_type',    'text',     "'percent' | 'value' — tipul reducerii globale"],
        ['discount_amount',  'numeric',  'Valoarea reducerii globale de sărbătoare'],
        ['label',            'text',     'ex: "8 Martie — Ziua Femeii"'],
      ],
      [25, 18, 57]
    ),
    spacerDocx()
  );

  // 4. Plan implementare
  children.push(h1('4. Plan de implementare — 7 pași'), spacerDocx());
  children.push(
    makeTableDocx(
      ['Pas', 'Titlu', 'Acțiuni principale', 'Verificare'],
      [
        ['1', 'Baza de date',     'Creare tabele, seed 21 produse din menuData.ts',               'Date vizibile în Supabase'],
        ['2', 'API Routes',       '/api/menu (CRUD), /api/menu/bulk, /api/holiday',                'Testare Postman / browser'],
        ['3', 'MenuStarter.tsx',  'Fetch Supabase, calcul preț final, badge reducere',             'Meniu corect în browser'],
        ['4', 'Admin Tab Meniu',  'Liste produse, checkbox, filtre, export',                       'Toate acțiunile funcționează'],
        ['5', 'Wizard 3 pași',    'Adăugare/editare: Categorie → Preț → Imagine + Reducere',       'Produsul apare în meniu'],
        ['6', 'Export',           'PDF (jsPDF + autotable), Excel (SheetJS), generate în browser', 'Fișiere corecte descărcate'],
        ['7', 'Holiday actualizat','HolidayMenu din Supabase + holiday_config editabil din Admin',  'Reducerea configurată aplicată'],
      ],
      [8, 22, 42, 28]
    ),
    spacerDocx()
  );

  // 5. Stack
  children.push(h1('5. Stack tehnologic'), spacerDocx());
  children.push(
    makeTableDocx(
      ['Zonă', 'Tehnologie'],
      [
        ['Frontend',    'Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4'],
        ['Backend',     'Supabase (PostgreSQL) · Next.js API Routes'],
        ['Export',      'SheetJS / xlsx (Excel) · jsPDF + autotable (PDF)'],
        ['UI/UX',       'Wizard multi-step · Selecție în bloc · Preview imagini live'],
        ['Consistență', 'Pattern identic cu sistemul de rezervări — Modulul 2'],
      ],
      [25, 75]
    ),
    spacerDocx()
  );

  // 6. Valoare adaugata
  children.push(h1('6. Valoarea adăugată față de cerința de bază'), spacerDocx());
  children.push(
    makeTableDocx(
      ['Funcționalitate', 'Beneficiu'],
      [
        ['Reduceri duale (% + RON)',    'Acoperă orice tip de promoție, nu doar un discount fix'],
        ['Acțiuni în bloc',             'Productivitate ridicată la actualizări de sezon (Black Friday etc.)'],
        ['Export PDF + Excel',          'Verificare și arhivare profesionistă a meniului curent'],
        ['Wizard 3 pași în Admin',      'UX consistent cu rezervările — experiență unitară în aplicație'],
        ['Preview imagine live',        'Elimină erorile de URL greșit înainte de salvare'],
        ['Holiday config editabil',     'Fără hardcoding — configurabil fără redeploy al aplicației'],
        ['Available toggle',            'Produse indisponibile temporar fără ștergere din baza de date'],
      ],
      [35, 65]
    )
  );

  const doc = new Document({
    styles: { default: { document: { run: { font: 'Calibri', size: 20 } } } },
    sections: [{ properties: {}, children }],
  });

  const out    = path.join(OUT_DIR, 'cerinte-meniu-modul3.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(out, buffer);
  return out;
}

// ════════════════════════════════════════════════════════════════════════════
//  MAIN
// ════════════════════════════════════════════════════════════════════════════

(async () => {
  console.log('Generez documentele...');
  try {
    const [pdfOut, docxOut] = await Promise.all([generarePDF(), generareDocx()]);
    console.log('PDF  →', pdfOut);
    console.log('DOCX →', docxOut);
    console.log('Gata!');
  } catch (err) {
    console.error('Eroare:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();
