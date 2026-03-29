import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type RezervareStatus = 'în așteptare' | 'confirmat' | 'respins';

// PATCH /api/rezervari — schimbă statusul unei rezervări
// Body: { id: string, status: RezervareStatus }
export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json({ error: 'Lipsesc câmpurile id sau status.' }, { status: 400 });
  }

  const statusuriPermise: RezervareStatus[] = ['în așteptare', 'confirmat', 'respins'];
  if (!statusuriPermise.includes(status)) {
    return NextResponse.json({ error: `Status invalid. Valori permise: ${statusuriPermise.join(', ')}` }, { status: 400 });
  }

  const { error } = await supabase
    .from('rezervari')
    .update({ status })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/rezervari — șterge o rezervare
// Body: { id: string }
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Lipsește câmpul id.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('rezervari')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
