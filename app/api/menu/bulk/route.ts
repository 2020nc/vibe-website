import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// PATCH /api/menu/bulk — aplică același update la mai multe produse simultan
// Body: { ids: string[], update: { discount_type?, discount_amount?, available? } }
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { ids, update } = body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'Lipsește lista de ids.' }, { status: 400 });
  }

  if (!update || typeof update !== 'object') {
    return NextResponse.json({ error: 'Lipsește obiectul update.' }, { status: 400 });
  }

  // Permite doar câmpurile sigure pentru bulk update
  const allowed = ['discount_type', 'discount_amount', 'available'];
  const safeUpdate: Record<string, unknown> = {};
  allowed.forEach((key) => {
    if (key in update) safeUpdate[key] = update[key];
  });

  if (Object.keys(safeUpdate).length === 0) {
    return NextResponse.json({ error: 'Niciun câmp valid pentru bulk update.' }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from('menu_items')
    .update(safeUpdate)
    .in('id', ids);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, updated: ids.length });
}
