# GHID 3.1 - Setup Supabase prin Claude Code
> Material suplimentar pentru cursanti - Video 3.1
> Vorbesti cu Claude Code ca si cum vorbesti cu un coleg - in limba naturala.

---

## Inainte de a incepe

Ai nevoie de:
- **VS Code** cu Claude Code instalat (din Saptamana 1)
- **Cont GitHub** (din Saptamana 1)
- O conexiune la internet

Asta e tot. Restul il faci vorbind cu Claude Code.

---

## COMANDA 1: Instaleaza Supabase

Deschide Claude Code in VS Code si spune-i:

> **"Am nevoie sa lucrez cu Supabase. Instaleaza tot ce trebuie pe calculatorul meu."**

**Ce face Claude Code:**
- Instaleaza programul Supabase pe Mac (sau Windows/Linux)
- Iti spune cand e gata
- Iti arata versiunea instalata

**Ce astepti sa vezi:**
```
Supabase CLI 2.75.0 instalat cu succes
```

> **Daca ceva nu merge,** Claude Code te intreaba ce sistem ai (Mac/Windows) si iti da alte optiuni.

---

## COMANDA 2: Conecteaza-te la Supabase

Spune-i lui Claude Code:

> **"Vreau sa ma conectez la Supabase. Logheaza-ma."**

**Ce face Claude Code:**
- Deschide browserul automat
- Te duce pe site-ul Supabase
- Iti spune sa te loghezi cu GitHub

**Ce faci tu:**
1. In browser, click "Sign up with GitHub" (sau "Log in" daca ai cont deja)
2. Autorizeaza accesul
3. Revii in VS Code - Claude Code iti spune "Gata, esti conectat"

**Verificare (optional):**

> **"Arata-mi ce proiecte am pe Supabase."**

Daca e prima data, lista e goala - normal.

---

## COMANDA 3: Creaza proiectul pe Supabase

Spune-i lui Claude Code:

> **"Vreau sa fac un proiect nou pe Supabase pentru site-ul meu de cafenea. Numele e vibe-caffe. Pune-l cat mai aproape de Romania geografic. Si genereaza o parola pentru baza de date."**

**Ce face Claude Code:**
- Creaza proiectul "vibe-caffe" pe Supabase
- Il pune pe un server in Europa (Frankfurt)
- Genereaza o parola sigura automat
- Iti da un link unde poti vedea proiectul pe site

**Ce astepti sa vezi:**
```
Proiect creat: vibe-caffe
URL: https://supabase.com/dashboard/project/abc123
```

> **Important:** Asteapta 1-2 minute. Supabase pregateste serverul pentru tine in spate.

---

## COMANDA 4: Leaga proiectul local de Supabase

Spune-i lui Claude Code:

> **"Acum vreau sa leag proiectul meu de pe calculator de proiectul vibe-caffe de pe Supabase."**

**Ce face Claude Code:**
- Creeaza un folder special `supabase/` in proiectul tau
- Il conecteaza la proiectul de pe cloud
- Iti cere parola bazei de date (cea generata la comanda 3)

**Ce astepti sa vezi:**
Un folder nou `supabase/` in proiect, cu fisiere inauntru:
```
supabase/
  config.toml
  migrations/
  seed.sql
```

> **Nota:** Claude Code tine minte parola. Nu trebuie sa ti-o notezi.

---

## COMANDA 5: Creaza tabelul pentru rezervari

Aici vine partea importanta - cream structura in care se salveaza rezervarile.

Spune-i lui Claude Code:

> **"Vreau sa creez un tabel pentru rezervari in baza de date. Tabelul sa aiba urmatoarele campuri:**
>
> **- nume, email, telefon (toate obligatorii)**
> **- numar de persoane (implicit 2)**
> **- data si ora**
> **- un status care sa fie 'in asteptare' cand cineva face o rezervare noua**
> **- o coloana care sa tina minte cand s-a facut rezervarea**
> **- un ID unic care sa creasca automat**
>
> **Si vreau sa fie securizat - adica oricine sa poata adauga, citi, modifica si sterge rezervari."**

**Ce face Claude Code:**
- Creeaza un fisier SQL in `supabase/migrations/`
- Scrie tot codul necesar (tu nu trebuie sa stii SQL)
- Iti explica pe scurt ce a scris

**Ce astepti sa vezi:**
Un fisier nou in `supabase/migrations/` cu un nume de genul:
```
20260208123045_create_rezervari_table.sql
```

> **Ce contine fisierul (nu trebuie sa il scrii tu):**
> - Tabelul `rezervari` cu toate campurile
> - Securitatea setata (Row Level Security)
> - 4 reguli: insert, select, update, delete

---

## COMANDA 6: Trimite tabelul pe Supabase

Acum tabelul e doar pe calculatorul tau. Trebuie sa-l trimitem pe cloud.

Spune-i lui Claude Code:

> **"Gata cu tabelul local. Trimite-l acum pe Supabase, pe serverul de acolo."**

**Ce face Claude Code:**
- Trimite fisierul SQL pe cloud
- Ruleaza codul acolo (creeaza tabelul in baza de date)
- Iti confirma ca a mers

**Ce astepti sa vezi:**
```
Migration applied successfully
Tabel 'rezervari' creat pe Supabase
```

**Gata!** Acum tabelul `rezervari` exista pe Supabase, in cloud, gata sa primeasca date.

---

## COMANDA 7: Ia cheile si salveaza-le local

Ca sa vorbeasca site-ul nostru cu Supabase, avem nevoie de 2 informatii: o adresa (URL) si o cheie de acces.

Spune-i lui Claude Code:

> **"Ia cheile de acces pentru proiectul vibe-caffe de pe Supabase si pune-le intr-un fisier .env.local in proiectul meu. Nu vreau sa le vad, doar sa le salvezi acolo."**

**Ce face Claude Code:**
- Ia URL-ul si cheia de acces de pe Supabase
- Creeaza fisierul `.env.local` in radacina proiectului
- Scrie cheile acolo in formatul corect
- Iti spune ca fisierul e gata

**Ce astepti sa vezi:**
```
Fisier .env.local creat cu cheile Supabase
```

Si un fisier nou `.env.local` in proiect cu continut de genul:
```
NEXT_PUBLIC_SUPABASE_URL=https://abc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

> **Important:** Fisierul asta nu se urca pe GitHub. E doar al tau, local.

---

## VERIFICARE FINALA (optional)

Spune-i lui Claude Code:

> **"Verifica te rog ca totul e OK: proiectul e conectat la Supabase, tabelul e creat si cheile sunt salvate."**

**Ce face Claude Code:**
- Verifica conexiunea la Supabase
- Verifica ca tabelul `rezervari` exista
- Verifica ca `.env.local` are cheile
- Iti da un rezumat

**Ce astepti sa vezi:**
```
✓ Conectat la Supabase (proiect vibe-caffe)
✓ Tabel 'rezervari' exista
✓ Chei salvate in .env.local
Totul e in regula!
```

---

## Rezumat: Cele 7 comenzi

| # | Ce i-ai spus lui Claude Code | Ce a facut |
|---|------------------------------|-----------|
| 1 | "Instaleaza tot ce trebuie pentru Supabase" | A instalat Supabase CLI |
| 2 | "Conecteaza-ma la Supabase" | Te-a logat prin browser |
| 3 | "Creaza proiect vibe-caffe aproape de Romania" | Proiect creat pe server in Europa |
| 4 | "Leaga proiectul local de cel de pe cloud" | Folder `supabase/` creat si conectat |
| 5 | "Creaza tabel pentru rezervari cu campurile..." | Fisier SQL scris in `migrations/` |
| 6 | "Trimite tabelul pe Supabase" | Tabel creat in baza de date cloud |
| 7 | "Ia cheile si salveaza-le in .env.local" | Fisier `.env.local` creat cu chei |

**7 comenzi simple = baza de date completa.**

Nu ai scris nicio comanda tehnica. Doar ai vorbit normal cu Claude Code.

---

## Daca ceva nu merge

**"Nu gasesc Supabase instalat"**
→ Spune-i: *"Instaleaza Supabase altfel, nu am Homebrew"* (sau ce program ti-a cerut)

**"Nu ma pot conecta la Supabase"**
→ Spune-i: *"Incearca din nou sa ma loghezi la Supabase"*

**"Proiectul nu e gata"**
→ Normal, asteapta 2 minute si spune-i: *"Verifica daca proiectul e gata acum"*

**"Tabelul exista deja"**
→ Perfect, inseamna ca deja l-ai creat. Sari peste comanda 6.

**"Nu gasesc cheile"**
→ Spune-i: *"Ia cheile din nou si arata-mi fisierul .env.local"*

**"Cum verific daca a mers?"**
→ Spune-i: *"Verifica ca totul e OK"* (verificarea finala)

---

## Ce ai acum

Dupa aceste 7 comenzi ai:

✅ Supabase instalat pe calculator
✅ Cont conectat la Supabase
✅ Proiect "vibe-caffe" pe cloud (Frankfurt)
✅ Folder `supabase/` in proiect (legat la cloud)
✅ Tabel `rezervari` cu toate campurile (in cloud)
✅ Securitate setata (oricine poate accesa)
✅ Chei de conectare salvate in `.env.local`

**In video-ul urmator** conectam formularul de rezervari la tabelul asta si incepem sa salvam date reale.
