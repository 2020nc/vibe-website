'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import FooterStarter from '@/components/FooterStarter';

interface FormData {
  nume: string;
  email: string;
  telefon: string;
  data: string;
  ora: string;
  persoane: number;
  mesaj: string;
}

const initialForm: FormData = {
  nume: '',
  email: '',
  telefon: '',
  data: '',
  ora: '',
  persoane: 2,
  mesaj: '',
};

export default function RezervariPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'persoane' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: supabaseError } = await supabase
      .from('rezervari')
      .insert([{ ...form, status: 'pending' }]);

    setLoading(false);

    if (supabaseError) {
      setError('A apărut o eroare. Te rugăm să încerci din nou.');
    } else {
      setSuccess(true);
      setForm(initialForm);
    }
  };

  return (
    <>
      {/* Header simplu */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-teal-500">Vibe Caffè</a>
          <a href="/" className="text-gray-600 hover:text-teal-500 transition-colors">← Înapoi acasă</a>
        </div>
      </nav>

      <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Titlu */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Rezervă o masă
            </h1>
            <p className="text-lg text-gray-600">
              Completează formularul și te confirmăm în cel mai scurt timp.
            </p>
          </div>

          {/* Success */}
          {success && (
            <div className="mb-8 p-6 bg-teal-50 border border-teal-200 rounded-2xl text-center">
              <div className="text-4xl mb-3">☕</div>
              <h2 className="text-xl font-bold text-teal-700 mb-2">Rezervare trimisă!</h2>
              <p className="text-teal-600">Te vom contacta în curând pentru confirmare.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors"
              >
                Rezervare nouă
              </button>
            </div>
          )}

          {/* Formular */}
          {!success && (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-8 space-y-6">

              {/* Nume + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nume complet *</label>
                  <input
                    type="text"
                    name="nume"
                    value={form.nume}
                    onChange={handleChange}
                    required
                    placeholder="Ion Popescu"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="ion@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                </div>
              </div>

              {/* Telefon + Persoane */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon *</label>
                  <input
                    type="tel"
                    name="telefon"
                    value={form.telefon}
                    onChange={handleChange}
                    required
                    placeholder="07xx xxx xxx"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Număr persoane *</label>
                  <select
                    name="persoane"
                    value={form.persoane}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'persoană' : 'persoane'}</option>
                    ))}
                    <option value={15}>Grup 11-15</option>
                    <option value={20}>Grup 16-20</option>
                  </select>
                </div>
              </div>

              {/* Data + Ora */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data *</label>
                  <input
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ora *</label>
                  <select
                    name="ora"
                    value={form.ora}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition bg-white"
                  >
                    <option value="">Selectează ora</option>
                    {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
                      '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mesaj */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mesaj / Cerințe speciale</label>
                <textarea
                  name="mesaj"
                  value={form.mesaj}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Ex: aniversare, loc la fereastră, alergii..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {loading ? 'Se trimite...' : 'Rezervă acum ☕'}
              </button>

            </form>
          )}
        </div>
      </main>

      <FooterStarter />
    </>
  );
}
