/**
 * Generează prezentarea facilităților noi — Vibe Caffè Modul 3
 * Fișiere: prezentare-modul3.docx + prezentare-modul3.pdf
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

const TITLU    = 'Vibe Caffè — Facilități noi introduse în Modul 3';
const SUBTITLU = 'Prezentare pentru profesor — Vibe Coding';
const DATA     = '31 martie 2026';

// ─── DATE CONȚINUT ────────────────────────────────────────────────────────────

const sectiuni = [
  {
    titlu: '1. Contextul și motivația',
    continut: [
      'În Modulul 2, meniul cafenelei Vibe Caffè era static — toate produsele, categoriile și prețurile erau scrise direct în codul sursă, într-un fișier TypeScript. Dacă doream să adăugăm un produs nou, să schimbăm un preț sau să marcăm ceva ca indisponibil, trebuia să edităm codul și să redeschidem aplicația. Meniul de sărbătoare funcționa pe același principiu: reducerea de -5 RON era hardcodată, fixă, fără posibilitate de configurare.',
      'Modulul 3 rezolvă complet această limitare. Meniul devine o bază de date vie, gestionată în timp real dintr-un panou de administrare, fără a mai atinge codul sursă.',
    ],
  },
  {
    titlu: '2. Ce s-a schimbat la bază',
    continut: [
      'Primul lucru construit a fost infrastructura de date. În Supabase — baza de date PostgreSQL din cloud folosită deja pentru rezervări — au fost create două tabele noi. Primul, menu_items, stochează toate produsele cu toate atributele lor: nume, categorie, preț, descriere, imagine, tip reducere, valoare reducere și disponibilitate. Al doilea, holiday_config, stochează configurația reducerii de sărbătoare: tipul reducerii, valoarea și eticheta evenimentului.',
      'Pornind de la aceste tabele, au fost construite trei rute API noi în Next.js, care comunică între interfața vizuală și baza de date. Prima rută, /api/menu, gestionează operațiile complete pe produse — citire, adăugare, modificare și ștergere. A doua, /api/menu/bulk, permite aplicarea unei modificări identice la mai multe produse simultan, într-o singură operațiune. A treia, /api/holiday, gestionează configurația reducerii de sărbătoare.',
    ],
  },
  {
    titlu: '3. Meniul public — ce vede clientul',
    continut: [
      'Componenta vizibilă publicului, MenuStarter, a fost rescrisă complet. Înainte importa o listă fixă din cod. Acum, la fiecare accesare a paginii, face o cerere la /api/menu și afișează produsele direct din baza de date. Dacă un produs este marcat ca indisponibil, dispare automat din meniu. Dacă un produs are o reducere setată, cardul său afișează un badge roșu cu valoarea reducerii, prețul original tăiat și prețul final în roșu, calculat corect indiferent dacă reducerea este în procente sau în valoare fixă RON. Categoriile de tab-uri se generează dinamic din datele reale, fără să fie definite nicăieri în cod.',
      'Componenta HolidayMenu — meniul special de sărbători — a fost la rândul ei rescrisă. Nu mai are niciun fel de date fixe. Produsele le citește din /api/menu, iar reducerea și eticheta evenimentului le citește din /api/holiday. Astfel, administratorul poate schimba oricând sărbătoarea afișată, tipul reducerii și valoarea ei, iar pagina publică reflectă imediat schimbările, fără redeschierea aplicației.',
    ],
  },
  {
    titlu: '4. Panoul de administrare — ce poate face administratorul',
    continut: [
      'Pagina de administrare a fost extinsă semnificativ. La tab-ul existent pentru rezervări s-au adăugat două tab-uri noi: Meniu și Sărbători.',
      'Tab-ul Meniu prezintă toate produsele într-un tabel complet, cu imagine, nume, categorie, preț, reducere curentă, toggle de disponibilitate și butoane de acțiune. Administratorul poate filtra produsele pe categorii folosind butoanele de filtrare. Poate activa sau dezactiva un produs direct din tabel, printr-un simplu click pe toggle — schimbarea este instantanee și se salvează în baza de date. Poate edita orice produs sau îl poate șterge cu confirmare.',
      'Adăugarea sau editarea unui produs se face printr-un wizard în trei pași, similar cu cel de la rezervări. Primul pas cere categoria și numele produsului. Al doilea pas cere prețul, descrierea și disponibilitatea, cu un toggle vizual. Al treilea pas permite introducerea URL-ului imaginii cu preview live — se vede imediat cum arată fotografia — și configurarea reducerii individuale a produsului, cu tipul și valoarea, plus afișarea prețului final calculat în timp real.',
      'Acțiunile în bloc reprezintă una dintre funcționalitățile cu adevărat noi față de modulele anterioare. Administratorul poate bifa oricare produse din tabel folosind checkboxurile, poate selecta tot dintr-un singur click pe checkbox-ul din header, și poate aplica o singură operațiune la toate produsele selectate simultan: fie setează o reducere identică pentru toate, fie le dezactivează pe toate. Bara de acțiuni în bloc apare doar când există produse selectate și dispare automat după ce operațiunea este executată.',
      'Exportul este disponibil atât în format Excel cât și PDF, direct din browser, fără a necesita un server dedicat. Exportul respectă filtrul de categorie activ — dacă administratorul se află pe filtrul Espresso, exportul va conține doar produsele din acea categorie. Fișierul Excel conține toate coloanele cu date complete. Fișierul PDF este generat cu font DejaVu Sans, care suportă complet diacriticele românești, cu header portocaliu și rânduri alternante ușor galbene pentru lizibilitate.',
    ],
  },
  {
    titlu: '5. Tab-ul Sărbători — administrarea meniurilor speciale',
    continut: [
      'Tab-ul Sărbători este cel mai complex element nou. El reunește în același loc configurarea și previzualizarea.',
      'În partea de sus se află panoul de configurare globală: administratorul poate schimba eticheta sărbătorii afișate publicului, tipul reducerii (valoare fixă în RON sau procent), și valoarea reducerii. Un click pe Salvează configurația trimite datele la /api/holiday și le stochează în Supabase. Imediat, pagina publică de sărbătoare va reflecta noile valori.',
      'Sub configurare se află previzualizarea meniului cu prețurile de sărbătoare deja calculate. Fiecare produs apare cu prețul normal tăiat și prețul de sărbătoare în roșu. Administratorul poate filtra pe categorii și poate exporta în Excel sau PDF chiar de aici, cu un fișier dedicat sărbătorilor.',
      'Funcționalitatea avansată a acestui tab este reducerea specifică per grup. Dacă administratorul dorește ca produsele dintr-o categorie să aibă o reducere diferită față de restul — spre exemplu -20% față de reducerea globală de -5 RON — poate selecta acele produse cu checkboxurile, apasă Setează reducere specifică, alege tipul și valoarea, și salvează. În tabel, produsele cu reducere specifică sunt marcate cu un badge portocaliu și textul specifică, în timp ce celelalte rămân cu badge-ul roz al reducerii globale. Calculul prețului de sărbătoare folosește automat reducerea specifică unde există și reducerea globală pentru restul. Dacă ulterior dorește să reseteze reducerile specifice și să revină la reducerea globală pentru toate, poate selecta produsele și apăsa Resetează reducere.',
    ],
  },
  {
    titlu: '6. Concluzie tehnică',
    continut: [
      'Proiectul a evoluat de la o aplicație cu date statice la o aplicație full-stack cu bază de date în timp real, API REST complet, panou de administrare funcțional și export de documente. Toate modificările sunt persistente în cloud prin Supabase și se reflectă imediat în interfața publică, fără niciun fel de intervenție în cod.',
    ],
  },
];

const tabel1 = {
  titlu: 'Tabel 1 — Funcționalități noi introduse în Modul 3',
  header: ['Funcționalitate', 'Descriere'],
  rows: [
    ['Bază de date meniu', 'Tabel menu_items în Supabase cu 11 câmpuri'],
    ['Configurație sărbători', 'Tabel holiday_config cu tip, valoare și etichetă'],
    ['API REST meniu', 'GET / POST / PATCH / DELETE pe /api/menu'],
    ['API bulk', 'PATCH pe /api/menu/bulk pentru operații multiple'],
    ['API sărbători', 'GET / PATCH pe /api/holiday'],
    ['Meniu public dinamic', 'MenuStarter citește din Supabase în loc de fișier static'],
    ['Meniu sărbători dinamic', 'HolidayMenu citește produse și config din Supabase'],
    ['Badge reducere pe carduri', 'Afișare preț tăiat, preț final și tip reducere'],
    ['Tab Admin Meniu', 'Tabel produse cu imagine, toggle, editare, ștergere'],
    ['Wizard 3 pași', 'Adăugare/editare produs cu preview imagine live'],
    ['Toggle disponibilitate', 'Activare/dezactivare produs cu un click'],
    ['Selectare multiplă', 'Checkboxuri și selectare tot pentru acțiuni în bloc'],
    ['Bulk discount', 'Aplicare reducere la grup de produse selectate'],
    ['Bulk dezactivare', 'Dezactivare simultană produse selectate'],
    ['Export Excel', 'Fișier .xlsx cu lățimi de coloane automate'],
    ['Export PDF', 'Fișier .pdf cu font DejaVu Sans și diacritice corecte'],
    ['Tab Admin Sărbători', 'Configurare reducere globală, preview și export'],
    ['Reducere specifică per grup', 'Produse selectate primesc reducere diferită de cea globală'],
    ['Indicator reducere specifică', 'Badge portocaliu și text specifică în previzualizare'],
    ['Export sărbători', 'Excel și PDF dedicat cu prețuri de sărbătoare'],
  ],
};

const tabel2 = {
  titlu: 'Tabel 2 — Tehnologii și librării utilizate',
  header: ['Tehnologie', 'Rol în proiect'],
  rows: [
    ['Next.js 16 App Router', 'Framework principal, routing, API Routes'],
    ['React 19', 'Interfața utilizator, componente, state management'],
    ['TypeScript 5', 'Tipizare strictă, siguranță la compilare'],
    ['Tailwind CSS 4', 'Stilizare, design responsive'],
    ['Supabase (PostgreSQL)', 'Bază de date cloud, stocare persistentă'],
    ['jsPDF + jspdf-autotable', 'Generare PDF în browser'],
    ['SheetJS (xlsx)', 'Generare Excel în browser'],
    ['DejaVu Sans TTF', 'Font cu suport diacritice românești în PDF'],
    ['canvas-confetti', 'Animație confetti pentru meniul de sărbători'],
  ],
};

// ════════════════════════════════════════════════════════════════════════════
//  GENERARE PDF
// ════════════════════════════════════════════════════════════════════════════

function generarePDF() {
  const doc = createPdf({ size: 'A4', margin: 50, bufferPages: true });
  const out = path.join(OUT_DIR, 'prezentare-modul3.pdf');
  const ws  = fs.createWriteStream(out);
  doc.pipe(ws);

  const PW = doc.page.width;
  const M  = 50;
  const W  = PW - M * 2;

  // ── HEADER ──
  doc.rect(0, 0, PW, 130).fill('#1a1a2e');
  doc.fillColor('#f59e0b').font('Bold').fontSize(17)
     .text(TITLU, M, 18, { width: W, lineBreak: true });
  doc.fillColor('#e2e8f0').font('Regular').fontSize(10)
     .text(SUBTITLU, M, 78, { width: W, lineBreak: false });
  doc.fillColor('#94a3b8').fontSize(9)
     .text(DATA, M, 96, { width: W, lineBreak: false });
  doc.y = 150;

  function checkPage(needed) {
    if (doc.y + needed > doc.page.height - 50) {
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
    doc.fillColor('#374151').font('Regular').fontSize(9.5)
       .text(text, M, doc.y, { width: W, lineGap: 3 });
    doc.moveDown(0.5);
  }

  // ── SECȚIUNI ──
  sectiuni.forEach((s) => {
    sectionTitle(s.titlu);
    s.continut.forEach((p) => paragraph(p));
  });

  // ── TABELE ──
  function drawTable(tbl) {
    const colW = [W * 0.35, W * 0.65];
    const rowH  = 20;
    const hH    = 22;
    const padX  = 6;
    const padY  = 4;

    function drawHeader(startY) {
      doc.rect(M, startY, W, hH).fill('#1e293b');
      [tbl.header[0], tbl.header[1]].forEach((h, ci) => {
        const x = M + (ci === 0 ? 0 : colW[0]);
        doc.fillColor('#f8fafc').font('Bold').fontSize(9)
           .text(h, x + padX, startY + padY, { width: colW[ci] - padX * 2, lineBreak: false });
      });
      doc.y = startY + hH;
    }

    checkPage(hH + rowH + 10);
    const tblStart = doc.y;
    drawHeader(tblStart);

    tbl.rows.forEach((row, ri) => {
      checkPage(rowH + 4);
      const y = doc.y;
      const bg = ri % 2 === 0 ? '#f8fafc' : '#ffffff';
      doc.rect(M, y, W, rowH).fill(bg);
      doc.rect(M, y, W, rowH).strokeColor('#e2e8f0').lineWidth(0.5).stroke();

      row.forEach((cell, ci) => {
        const x = M + (ci === 0 ? 0 : colW[0]);
        if (ci === 0) {
          doc.fillColor('#1e293b').font('Bold').fontSize(8.5);
        } else {
          doc.fillColor('#374151').font('Regular').fontSize(8.5);
        }
        doc.text(cell, x + padX, y + padY, { width: colW[ci] - padX * 2, lineBreak: false });
      });
      doc.y = y + rowH;
    });
    doc.moveDown(1);
  }

  checkPage(120);
  sectionTitle(tabel1.titlu);
  drawTable(tabel1);

  checkPage(120);
  sectionTitle(tabel2.titlu);
  drawTable(tabel2);

  // ── NUMEROTARE PAGINI (bufferPages) ──
  const range = doc.bufferedPageRange();
  const total = range.count;

  for (let i = 0; i < total; i++) {
    doc.switchToPage(range.start + i);
    const pageH = doc.page.height;
    const fy    = pageH - 28;

    // Linie separator
    doc.moveTo(M, pageH - 40).lineTo(M + W, pageH - 40)
       .strokeColor('#e2e8f0').lineWidth(0.5).stroke();

    // Stânga — poziție absolută, fără width/align
    doc.fillColor('#94a3b8').font('Regular').fontSize(7.5)
       .text('Vibe Caffè — Vibe Coding Modul 3', M, fy, { lineBreak: false });

    // Centru — calculăm x manual ca să nu folosim width+align
    const centerStr = `Pagina ${i + 1} din ${total}`;
    doc.font('Bold').fontSize(7.5);
    const cw = doc.widthOfString(centerStr);
    const cx = M + (W - cw) / 2;
    doc.fillColor('#64748b').text(centerStr, cx, fy, { lineBreak: false });

    // Dreapta — calculăm x manual
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

  // Titlu principal
  children.push(
    new Paragraph({
      children: [new TextRun({ text: TITLU, bold: true, size: 36, color: '1e293b' })],
      heading: HeadingLevel.TITLE,
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: SUBTITLU, size: 24, color: '64748b', italics: true })],
      spacing: { after: 80 },
    }),
    new Paragraph({
      children: [new TextRun({ text: DATA, size: 20, color: '94a3b8' })],
      spacing: { after: 400 },
    })
  );

  // Secțiuni
  sectiuni.forEach((s) => {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: s.titlu, bold: true, size: 26, color: '1e293b' })],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'f59e0b' } },
      })
    );
    s.continut.forEach((p) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: p, size: 20, color: '374151' })],
          spacing: { after: 160, line: 320 },
        })
      );
    });
  });

  // Funcție tabel DOCX
  function buildDocxTable(tbl) {
    const rows = [];

    // Header
    rows.push(
      new TableRow({
        tableHeader: true,
        children: tbl.header.map((h, ci) =>
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({ text: h, bold: true, size: 19, color: 'f8fafc' })],
              alignment: AlignmentType.LEFT,
            })],
            shading: { type: ShadingType.SOLID, fill: '1e293b' },
            width: { size: ci === 0 ? 35 : 65, type: WidthType.PERCENTAGE },
          })
        ),
      })
    );

    // Date
    tbl.rows.forEach((row, ri) => {
      const bg = ri % 2 === 0 ? 'f8fafc' : 'ffffff';
      rows.push(
        new TableRow({
          children: row.map((cell, ci) =>
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: cell, bold: ci === 0, size: 18, color: ci === 0 ? '1e293b' : '374151' })],
              })],
              shading: { type: ShadingType.SOLID, fill: bg },
              width: { size: ci === 0 ? 35 : 65, type: WidthType.PERCENTAGE },
            })
          ),
        })
      );
    });

    return new Table({
      rows,
      width: { size: 100, type: WidthType.PERCENTAGE },
    });
  }

  // Tabel 1
  children.push(
    new Paragraph({
      children: [new TextRun({ text: tabel1.titlu, bold: true, size: 26, color: '1e293b' })],
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 160 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'f59e0b' } },
    }),
    buildDocxTable(tabel1),
    new Paragraph({ spacing: { after: 320 } })
  );

  // Tabel 2
  children.push(
    new Paragraph({
      children: [new TextRun({ text: tabel2.titlu, bold: true, size: 26, color: '1e293b' })],
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 160 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'f59e0b' } },
    }),
    buildDocxTable(tabel2),
    new Paragraph({ spacing: { after: 200 } })
  );

  const doc = new Document({
    creator: 'Vibe Coding',
    title: TITLU,
    description: SUBTITLU,
    sections: [{
      properties: {
        page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } },
      },
      children,
    }],
  });

  const buf = await Packer.toBuffer(doc);
  const out = path.join(OUT_DIR, 'prezentare-modul3.docx');
  fs.writeFileSync(out, buf);
  console.log('✅ DOCX generat:', out);
}

// ════════════════════════════════════════════════════════════════════════════
//  RUN
// ════════════════════════════════════════════════════════════════════════════
generarePDF();
generareDocx().catch(console.error);
