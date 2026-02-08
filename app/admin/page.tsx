'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface Rezervare {
  id: number;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'rejected';
  created_at: string;
}

type FilterType = 'all' | 'pending' | 'confirmed' | 'rejected';

const STATUS_CONFIG = {
  pending: { label: 'In asteptare', bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-400' },
  confirmed: { label: 'Confirmata', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-400' },
  rejected: { label: 'Respinsa', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-400' },
};

export default function AdminPage() {
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const fetchRezervari = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/rezervari');
      if (!res.ok) throw new Error('Eroare la incarcarea rezervarilor.');
      const json = await res.json();
      setRezervari(json.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Eroare necunoscuta.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRezervari();
  }, []);

  const updateStatus = async (id: number, newStatus: 'confirmed' | 'rejected' | 'pending') => {
    try {
      const res = await fetch('/api/rezervari', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error('Eroare la actualizare.');
      setRezervari(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch {
      alert('Eroare la actualizarea statusului.');
    }
  };

  const deleteRezervare = async (id: number) => {
    if (!confirm('Sigur vrei sa stergi aceasta rezervare?')) return;
    try {
      const res = await fetch(`/api/rezervari?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Eroare la stergere.');
      setRezervari(prev => prev.filter(r => r.id !== id));
    } catch {
      alert('Eroare la stergerea rezervarii.');
    }
  };

  const formatCreatedAt = (iso: string) => {
    return new Date(iso).toLocaleString('ro-RO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filtered = useMemo(() => {
    let result = rezervari;
    if (filter !== 'all') {
      result = result.filter(r => r.status === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [rezervari, filter, search]);

  const counts = useMemo(() => ({
    all: rezervari.length,
    pending: rezervari.filter(r => r.status === 'pending').length,
    confirmed: rezervari.filter(r => r.status === 'confirmed').length,
    rejected: rezervari.filter(r => r.status === 'rejected').length,
  }), [rezervari]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass rounded-3xl p-12 text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Se incarca rezervarile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="glass rounded-3xl p-12 text-center max-w-lg w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Eroare</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchRezervari}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 hover:scale-105"
          >
            Incearca din nou
          </button>
        </div>
      </div>
    );
  }

  const StatusBadge = ({ status }: { status: Rezervare['status'] }) => {
    const cfg = STATUS_CONFIG[status];
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
        <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
        {cfg.label}
      </span>
    );
  };

  const ActionButtons = ({ r }: { r: Rezervare }) => (
    <div className="flex items-center gap-1">
      {r.status !== 'confirmed' && (
        <button
          onClick={() => updateStatus(r.id, 'confirmed')}
          title="Confirma"
          className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      )}
      {r.status !== 'rejected' && (
        <button
          onClick={() => updateStatus(r.id, 'rejected')}
          title="Respinge"
          className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      {r.status !== 'pending' && (
        <button
          onClick={() => updateStatus(r.id, 'pending')}
          title="Reseteaza"
          className="p-2 rounded-lg hover:bg-yellow-50 text-yellow-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}
      <button
        onClick={() => deleteRezervare(r.id)}
        title="Sterge"
        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6 text-primary hover:text-primary-dark transition-colors">
            &larr; Inapoi acasa
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Panou Admin <span className="text-primary">Vibe Coffee</span>
          </h1>
          <p className="text-xl text-gray-600">Gestioneaza rezervarile</p>
        </div>

        {/* Filters + Search */}
        <div className="glass rounded-2xl p-4 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {([
                ['all', 'Toate', counts.all],
                ['pending', 'In asteptare', counts.pending],
                ['confirmed', 'Confirmate', counts.confirmed],
                ['rejected', 'Respinse', counts.rejected],
              ] as [FilterType, string, number][]).map(([key, label, count]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    filter === key
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white/60 text-gray-600 hover:bg-white'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 w-full md:w-auto">
              <input
                type="text"
                placeholder="Cauta dupa nume, telefon sau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm"
              />
            </div>

            {/* Refresh */}
            <button
              onClick={fetchRezervari}
              className="px-4 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4">
          <span className="bg-secondary text-white text-sm font-bold px-4 py-2 rounded-full">
            {filtered.length} {filtered.length === 1 ? 'rezervare' : 'rezervari'}
            {filter !== 'all' || search ? ' (filtrate)' : ''}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {rezervari.length === 0 ? 'Nicio rezervare' : 'Niciun rezultat'}
            </h2>
            <p className="text-gray-600 mb-6">
              {rezervari.length === 0
                ? 'Nu exista rezervari inca.'
                : 'Incearca alte criterii de cautare sau filtrare.'}
            </p>
            {rezervari.length === 0 && (
              <Link
                href="/rezervari"
                className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 hover:scale-105"
              >
                Fa prima rezervare
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Desktop: tabel */}
            <div className="hidden md:block glass rounded-3xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-4 text-left text-sm font-semibold">Nume</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold">Contact</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold">Pers.</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold">Data</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold">Ora</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold">Status</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold">Creat</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold">Actiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr
                      key={r.id}
                      className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white/50' : 'bg-white/30'} hover:bg-primary/5 transition-colors`}
                    >
                      <td className="px-4 py-3 font-semibold text-foreground">{r.name}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-600">{r.email}</div>
                        <div className="text-sm text-gray-500">{r.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
                          {r.guests}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground text-sm">{r.date}</td>
                      <td className="px-4 py-3 text-foreground font-semibold">{r.time}</td>
                      <td className="px-4 py-3 text-center">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{formatCreatedAt(r.created_at)}</td>
                      <td className="px-4 py-3 text-center">
                        <ActionButtons r={r} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobil: card-uri */}
            <div className="md:hidden space-y-4">
              {filtered.map((r) => (
                <div key={r.id} className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-foreground">{r.name}</h3>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">{r.email}</p>
                    <p className="text-gray-600">{r.phone}</p>
                    <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                      <span className="text-foreground font-semibold">{r.date}</span>
                      <span className="text-primary font-bold">{r.time}</span>
                      <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full text-xs">
                        {r.guests} pers.
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <p className="text-gray-400 text-xs">{formatCreatedAt(r.created_at)}</p>
                      <ActionButtons r={r} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
