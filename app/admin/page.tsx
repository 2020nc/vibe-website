'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from 'react';
import { getSupabase } from '@/lib/supabase';

type Status = 'în așteptare' | 'confirmat' | 'respins';

interface Rezervare {
  id: string;
  nume: string;
  email: string;
  telefon: string;
  data: string;
  ora: string;
  persoane: number;
  mesaj: string;
  status: Status;
  created_at: string;
}

const STATUS_CONFIG: Record<Status, { label: string; bg: string; text: string }> = {
  'în așteptare': { label: 'În așteptare', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'confirmat':    { label: 'Confirmat',    bg: 'bg-teal-100',   text: 'text-teal-700'   },
  'respins':      { label: 'Respins',      bg: 'bg-red-100',    text: 'text-red-700'    },
};

const FILTRE = ['toate', 'în așteptare', 'confirmat', 'respins'] as const;

export default function AdminPage() {
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtru, setFiltru] = useState<typeof FILTRE[number]>('toate');
  const [cautare, setCautare] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [eroare, setEroare] = useState('');

  const fetchRezervari = useCallback(async () => {
    setLoading(true);
    const { data, error } = await getSupabase()
      .from('rezervari')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setRezervari(data as Rezervare[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRezervari();
  }, [fetchRezervari]);

  const updateStatus = async (id: string, status: Status) => {
    setActionLoading(id + status);
    setEroare('');
    const res = await fetch('/api/rezervari', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      setEroare(error ?? 'Eroare la actualizare.');
    } else {
      await fetchRezervari();
    }
    setActionLoading(null);
  };

  const stergeRezervare = async (id: string, nume: string) => {
    if (!window.confirm(`Ștergi rezervarea lui ${nume}?`)) return;
    setActionLoading(id + 'delete');
    setEroare('');
    const res = await fetch('/api/rezervari', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      setEroare(error ?? 'Eroare la ștergere.');
    } else {
      await fetchRezervari();
    }
    setActionLoading(null);
  };

  const rezervariFiltrate = rezervari.filter((r) => {
    const potrivireStatus = filtru === 'toate' || r.status === filtru;
    const potrivireCautare = r.nume.toLowerCase().includes(cautare.toLowerCase());
    return potrivireStatus && potrivireCautare;
  });

  const numarPeStatus = (s: typeof FILTRE[number]) =>
    s === 'toate' ? rezervari.length : rezervari.filter((r) => r.status === s).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-teal-500">Vibe Caffè</span>
            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">Admin</span>
          </div>
          <a href="/" className="text-gray-600 hover:text-teal-500 transition-colors text-sm">← Înapoi acasă</a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Titlu */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Dashboard Rezervări</h1>
          <p className="text-gray-500 mt-1">{rezervari.length} rezervări în total</p>
        </div>

        {/* Eroare globală */}
        {eroare && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {eroare}
          </div>
        )}

        {/* Căutare + Filtre */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Căutare */}
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Caută după nume..."
              value={cautare}
              onChange={(e) => setCautare(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-sm"
            />
          </div>

          {/* Filtre status */}
          <div className="flex gap-2 flex-wrap">
            {FILTRE.map((f) => (
              <button
                key={f}
                onClick={() => setFiltru(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  filtru === f
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                  filtru === f ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {numarPeStatus(f)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-400">Se încarcă rezervările...</div>
        )}

        {/* Gol */}
        {!loading && rezervariFiltrate.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">☕</div>
            <p className="text-lg">Nicio rezervare găsită.</p>
          </div>
        )}

        {/* TABEL — desktop */}
        {!loading && rezervariFiltrate.length > 0 && (
          <div className="hidden md:block bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Client</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Contact</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Data / Ora</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Persoane</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Status</th>
                  <th className="text-right px-5 py-3 text-gray-500 font-semibold">Acțiuni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rezervariFiltrate.map((r) => {
                  const cfg = STATUS_CONFIG[r.status] ?? STATUS_CONFIG['în așteptare'];
                  return (
                    <tr key={r.id} className="hover:bg-teal-50/30 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">{r.nume}</p>
                        {r.mesaj && <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[180px]">{r.mesaj}</p>}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        <p>{r.email}</p>
                        <p className="text-gray-400">{r.telefon}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        <p className="font-medium">{r.data}</p>
                        <p className="text-gray-400">{r.ora}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-700">{r.persoane}</td>
                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2 justify-end">
                          {r.status !== 'confirmat' && (
                            <button
                              onClick={() => updateStatus(r.id, 'confirmat')}
                              disabled={!!actionLoading}
                              className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all"
                            >
                              {actionLoading === r.id + 'confirmat' ? '...' : 'Confirmă'}
                            </button>
                          )}
                          {r.status !== 'respins' && (
                            <button
                              onClick={() => updateStatus(r.id, 'respins')}
                              disabled={!!actionLoading}
                              className="px-3 py-1.5 bg-orange-100 hover:bg-orange-200 disabled:opacity-50 text-orange-700 text-xs font-semibold rounded-lg transition-all"
                            >
                              {actionLoading === r.id + 'respins' ? '...' : 'Respinge'}
                            </button>
                          )}
                          <button
                            onClick={() => stergeRezervare(r.id, r.nume)}
                            disabled={!!actionLoading}
                            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 disabled:opacity-50 text-red-700 text-xs font-semibold rounded-lg transition-all"
                          >
                            {actionLoading === r.id + 'delete' ? '...' : 'Șterge'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* CARDURI — mobil */}
        {!loading && rezervariFiltrate.length > 0 && (
          <div className="md:hidden space-y-4">
            {rezervariFiltrate.map((r) => {
              const cfg = STATUS_CONFIG[r.status] ?? STATUS_CONFIG['în așteptare'];
              return (
                <div key={r.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-5">
                  {/* Header card */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-gray-900 text-base">{r.nume}</p>
                      <p className="text-xs text-gray-400">{r.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Detalii */}
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="text-gray-400 text-xs block">Data</span>
                      {r.data}
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs block">Ora</span>
                      {r.ora}
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs block">Persoane</span>
                      {r.persoane}
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs block">Telefon</span>
                      {r.telefon}
                    </div>
                  </div>

                  {r.mesaj && (
                    <p className="text-xs text-gray-400 italic mb-4">"{r.mesaj}"</p>
                  )}

                  {/* Acțiuni */}
                  <div className="flex gap-2 flex-wrap">
                    {r.status !== 'confirmat' && (
                      <button
                        onClick={() => updateStatus(r.id, 'confirmat')}
                        disabled={!!actionLoading}
                        className="flex-1 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all"
                      >
                        {actionLoading === r.id + 'confirmat' ? '...' : 'Confirmă'}
                      </button>
                    )}
                    {r.status !== 'respins' && (
                      <button
                        onClick={() => updateStatus(r.id, 'respins')}
                        disabled={!!actionLoading}
                        className="flex-1 py-2 bg-orange-100 hover:bg-orange-200 disabled:opacity-50 text-orange-700 text-sm font-semibold rounded-xl transition-all"
                      >
                        {actionLoading === r.id + 'respins' ? '...' : 'Respinge'}
                      </button>
                    )}
                    <button
                      onClick={() => stergeRezervare(r.id, r.nume)}
                      disabled={!!actionLoading}
                      className="py-2 px-4 bg-red-100 hover:bg-red-200 disabled:opacity-50 text-red-700 text-sm font-semibold rounded-xl transition-all"
                    >
                      {actionLoading === r.id + 'delete' ? '...' : 'Șterge'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
