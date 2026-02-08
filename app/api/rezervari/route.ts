import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, guests, date, time } = body;

    // Validare câmpuri obligatorii
    if (!name || !email || !phone || !guests || !date || !time) {
      return NextResponse.json(
        { error: 'Toate câmpurile sunt obligatorii.' },
        { status: 400 }
      );
    }

    // Salvare în Supabase
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rezervari')
      .insert([{ name, email, phone, guests: Number(guests), date, time }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Eroare la salvarea rezervării. Încearcă din nou.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Rezervare salvată cu succes!', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Eroare de server. Încearcă din nou.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rezervari')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Eroare la citirea rezervărilor.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Eroare de server.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status: newStatus } = body;

    if (!id || !newStatus || !['confirmed', 'rejected', 'pending'].includes(newStatus)) {
      return NextResponse.json(
        { error: 'ID și status valid sunt obligatorii.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rezervari')
      .update({ status: newStatus })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Eroare la actualizarea rezervării.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Eroare de server.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID-ul rezervării este obligatoriu.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from('rezervari')
      .delete()
      .eq('id', Number(id));

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Eroare la ștergerea rezervării.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Rezervare ștearsă.' }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Eroare de server.' },
      { status: 500 }
    );
  }
}
