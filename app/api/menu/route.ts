import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// GET /api/menu — returnează toate produsele ordonate
export async function GET() {
  const { data, error } = await getSupabase()
    .from('menu_items')
    .select('*')
    .order('category')
    .order('sort_order')
    .order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// POST /api/menu — adaugă produs nou
// Body: { name, category, price, description?, image_url?, discount_type?, discount_amount?, sort_order? }
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, category, price } = body;

  if (!name || !category || price === undefined) {
    return NextResponse.json(
      { error: 'Câmpurile name, category și price sunt obligatorii.' },
      { status: 400 }
    );
  }

  const { data, error } = await getSupabase()
    .from('menu_items')
    .insert([{
      name:            body.name,
      category:        body.category,
      price:           body.price,
      description:     body.description     ?? null,
      image_url:       body.image_url       ?? null,
      discount_type:   body.discount_type   ?? null,
      discount_amount: body.discount_amount ?? null,
      sort_order:      body.sort_order      ?? 0,
      available:       body.available       ?? true,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

// PATCH /api/menu — editează un produs
// Body: { id, ...câmpuri de actualizat }
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, ...fields } = body;

  if (!id) {
    return NextResponse.json({ error: 'Lipsește câmpul id.' }, { status: 400 });
  }

  // Permite doar câmpurile valide
  const allowed = ['name', 'category', 'price', 'description', 'image_url',
                   'discount_type', 'discount_amount', 'available', 'sort_order'];
  const update: Record<string, unknown> = {};
  allowed.forEach((key) => {
    if (key in fields) update[key] = fields[key];
  });

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Niciun câmp valid de actualizat.' }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from('menu_items')
    .update(update)
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/menu — șterge un produs
// Body: { id }
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Lipsește câmpul id.' }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from('menu_items')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
