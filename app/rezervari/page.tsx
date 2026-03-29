'use client';

import { useState, useEffect } from 'react';
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

const ORE = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
             '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export default function RezervariPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [rezervari, setRezervari] = useState<any[]>([]);

  const fetchRezervari = async () => {
    const { data } = await supabase
      .from('rezervari')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setRezervari(data);
  };

  useEffect(() => {
    fetchRezervari();
  }, []);

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
      .insert([{ ...form, status: 'în așteptare' }]);

    setLoading(false);

    if (supabaseError) {
      setError('A apărut o eroare. Te rugăm să încerci din nou.');
    } else {
      setSuccess(true);
      setForm(initialForm);
      setStep(1);
      fetchRezervari();
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setForm(initialForm);
    setStep(1);
  };

  return (
    <>
      {/* Header */}
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Rezervă o masă</h1>
            <p className="text-lg text-gray-600">Completează formularul și te confirmăm în cel mai scurt timp.</p>
          </div>

          {/* Success */}
          {success && (
            <div className="mb-8 p-6 bg-teal-50 border border-teal-200 rounded-2xl text-center">
              <div className="text-4xl mb-3">☕</div>
              <h2 className="text-xl font-bold text-teal-700 mb-2">Rezervare trimisă!</h2>
              <p className="text-teal-600">Te vom contacta în curând pentru confirmare.</p>
              <button
                onClick={resetForm}
                className="mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors"
              >
                Rezervare nouă
              </button>
            </div>
          )}

          {/* Formular multi-step */}
          {!success && (
            <div className="bg-white rounded-3xl shadow-lg p-8">

              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {[
                  { nr: 1, label: 'Data' },
                  { nr: 2, label: 'Ora' },
                  { nr: 3, label: 'Detalii' },
                ].map(({ nr, label }, i) => (
                  <div key={nr} className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        step > nr ? 'bg-teal-500 text-white' :
                        step === nr ? 'bg-teal-500 text-white ring-4 ring-teal-100' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {step > nr ? '✓' : nr}
                      </div>
                      <span className={`text-xs font-medium ${step === nr ? 'text-teal-600' : 'text-gray-400'}`}>
                        {label}
                      </span>
                    </div>
                    {i < 2 && (
                      <div className={`w-16 h-0.5 mb-5 transition-all duration-300 ${step > nr ? 'bg-teal-500' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Pasul 1 — Data */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Când vrei să vii?</h2>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alege data *</label>
                    <input
                      type="date"
                      name="data"
                      value={form.data}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-lg"
                    />
                    <button
                      type="button"
                      disabled={!form.data}
                      onClick={() => setStep(2)}
                      className="mt-6 w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
                    >
                      Continuă →
                    </button>
                  </div>
                )}

                {/* Pasul 2 — Ora */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">La ce oră?</h2>
                    <div className="grid grid-cols-4 gap-3">
                      {ORE.map(h => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => { setForm(prev => ({ ...prev, ora: h })); }}
                          className={`py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                            form.ora === h
                              ? 'bg-teal-500 text-white ring-2 ring-teal-300 scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-lg rounded-xl transition-all"
                      >
                        ← Înapoi
                      </button>
                      <button
                        type="button"
                        disabled={!form.ora}
                        onClick={() => setStep(3)}
                        className="flex-1 py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
                      >
                        Continuă →
                      </button>
                    </div>
                  </div>
                )}

                {/* Pasul 3 — Detalii */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Datele tale</h2>

                    {/* Rezumat alegeri */}
                    <div className="bg-teal-50 rounded-xl px-4 py-3 text-sm text-teal-700 text-center font-medium">
                      {form.data} · {form.ora}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-lg rounded-xl transition-all"
                      >
                        ← Înapoi
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02]"
                      >
                        {loading ? 'Se trimite...' : 'Rezervă acum ☕'}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          )}
        </div>
      </main>

      {/* Lista rezervari */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Toate rezervările ({rezervari.length})</h2>
        <div className="space-y-3">
          {rezervari.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900">{r.nume}</p>
                <p className="text-sm text-gray-500">{r.email} · {r.telefon}</p>
              </div>
              <div className="text-sm text-gray-600">
                {r.data} la {r.ora} · {r.persoane} {r.persoane === 1 ? 'persoană' : 'persoane'}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                r.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                r.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <FooterStarter />
    </>
  );
}
