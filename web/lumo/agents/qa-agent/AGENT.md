# QA Agent'i (qa-agent)

## Gorev
Uretilen oyunu test eder ve kalite kontrol yapar.

## Girdi
- Oyun bileseni (Kod Agent'i ciktisi)
- `scenario.json` (Senaryo Agent'i ciktisi)

## Cikti
`test-report.json` dosyasi:

```json
{
  "gameId": "string",
  "timestamp": "ISO 8601",
  "status": "passed | failed",
  "checks": {
    "playability": {
      "canStart": true,
      "canComplete": true,
      "scoreRecorded": true,
      "notes": "string"
    },
    "visual": {
      "responsive": true,
      "uiBroken": false,
      "minWidth320": true,
      "notes": "string"
    },
    "content": {
      "curriculumAligned": true,
      "ageAppropriate": true,
      "languageCorrect": true,
      "notes": "string"
    },
    "performance": {
      "loadTimeUnder2s": true,
      "smoothAnimations": true,
      "notes": "string"
    },
    "accessibility": {
      "wcagAA": true,
      "minTouchTarget44px": true,
      "notes": "string"
    }
  },
  "errors": ["string"],
  "recommendation": "approve | revise"
}
```

## Kurallar
- Her oyun en az 1 happy-path testi icermeli
- Basarisiz testlerde oyun Kod Agent'ina geri doner
- Skor 0-100 araliginda mi kontrol et
- Turkce karakterler dogru gorunuyor mu kontrol et
- Oyun senaryodaki kazanimla gercekten uyumlu mu degerlendir
- Mobil ve masaustu gorunumu kontrol et
