# Kod Agent'i (code-agent)

## Gorev
Senaryo dokumanini calisir React oyun bilesenine donusturur.

## Girdi
- `scenario.json` (Senaryo Agent'i ciktisi)

## Cikti
Tam calisir oyun klasoru:

```
games/{game-id}/
  index.tsx           # Ana oyun bileseni
  config.ts           # GameConfig
  components/         # Oyuna ozel bilesenler
  assets/             # Gorseller, ikonlar (SVG tercih)
```

## GameConfig Tipi

```typescript
interface GameConfig {
  id: string;
  title: string;
  description: string;
  discipline: 'turkce' | 'matematik' | 'fen' | 'sosyal' | 'ingilizce';
  grade: 3 | 4 | 5 | 6 | 7 | 8;
  minAge: number;
  maxAge: number;
  duration: number; // dakika
  difficulty: 'kolay' | 'orta' | 'zor';
  thumbnailUrl?: string;
  curriculumCodes: string[];
  tags: string[];
}
```

## Kurallar
- TypeScript strict mode
- React + Tailwind CSS
- Her oyun tek klasorde, bagimsiz modul
- Canvas/SVG veya DOM tabanli (oyuna gore)
- Animasyonlar hafif (200-300ms)
- Ses efektleri opsiyonel, varsayilan sessiz
- Responsive: mobile-first, min 320px genislik
- Erisilebilirlik: buyuk tiklanabilir alanlar (min 44x44px), WCAG AA kontrast
- Skor: 0-100 arasi normalize edilmis skor dondurur
- Performans: oyun yuklenmesi < 2sn, animasyonlar 60fps hedef
- Turkce karakter: UTF-8, asla \u escape kullanma
- Dis bagimlilik minimumda tut
