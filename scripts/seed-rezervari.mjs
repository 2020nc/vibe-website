import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://uevakhbqxujzqimaoytx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVldmFraGJxdXp6cWltYW95dHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc0MzI0NzY4MiwiZXhwIjoyMDU4ODIzNjgyfQ.GhaNKHBk10Tu1o7l83AU-imvE991TRG14maRuG4idVo'
);

const nume = ['Alexandru Ionescu', 'Maria Popescu', 'Andrei Constantin', 'Elena Dumitrescu', 'Mihai Georgescu', 'Ana Radu', 'Cristian Popa', 'Ioana Stanescu', 'Bogdan Marin', 'Laura Nistor'];
const emailuri = ['alex@gmail.com', 'maria@yahoo.com', 'andrei@gmail.com', 'elena@outlook.com', 'mihai@gmail.com', 'ana@yahoo.com', 'cristi@gmail.com', 'ioana@gmail.com', 'bogdan@yahoo.com', 'laura@gmail.com'];
const telefoane = ['0721345678', '0732456789', '0743567890', '0754678901', '0765789012', '0776890123', '0787901234', '0798012345', '0709123456', '0710234567'];
const ore = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '17:00', '18:00', '19:00'];
const mesaje = [
  'Loc la fereastră, vă rog.',
  'Aniversare de ziua de naștere.',
  'Alerg la gluten, vă rog să țineți cont.',
  '',
  'Meeting de afaceri, avem nevoie de liniște.',
  'Venim cu un copil mic.',
  '',
  'Loc în interior, departe de ușă.',
  'Prima vizită la voi!',
  'Ziua de naștere a soției mele.'
];
const persoane = [1, 2, 2, 3, 4, 2, 5, 3, 2, 6];

const statusuri = ['pending', 'confirmed', 'cancelled'];

const rezervari = [];

statusuri.forEach((status, si) => {
  for (let i = 0; i < 10; i++) {
    const ziua = 1 + si * 10 + i;
    const luna = ziua <= 31 ? '04' : '05';
    const zi = String(ziua <= 31 ? ziua : ziua - 31).padStart(2, '0');
    rezervari.push({
      nume: nume[i],
      email: emailuri[i],
      telefon: telefoane[i],
      data: `2026-${luna}-${zi}`,
      ora: ore[i],
      persoane: persoane[i],
      mesaj: mesaje[i],
      status,
    });
  }
});

const { error } = await supabase.from('rezervari').insert(rezervari);

if (error) {
  console.error('Eroare:', error.message);
} else {
  console.log('✅ 30 rezervări inserate cu succes! (10 pending, 10 confirmed, 10 cancelled)');
}
