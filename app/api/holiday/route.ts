import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// GET /api/holiday — returnează configurația curentă de sărbătoare
export async function GET() {
  const { data, error } = await getSupabase()
    .from('holiday_config')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// PATCH /api/holiday — actualizează configurația de sărbătoare
// Body: { discount_type?, discount_amount?, label? }
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { discount_type, discount_amount, label } = body;

  if (!discount_type || discount_amount === undefined || !label) {
    return NextResponse.json(
      { error: 'Câmpurile discount_type, discount_amount și label sunt obligatorii.' },
      { status: 400 }
    );
  }

  if (!['percent', 'value'].includes(discount_type)) {
    return NextResponse.json(
      { error: 'discount_type trebuie să fie "percent" sau "value".' },
      { status: 400 }
    );
  }

  const { error } = await getSupabase()
    .from('holiday_config')
    .update({ discount_type, discount_amount, label })
    .eq('id', 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
