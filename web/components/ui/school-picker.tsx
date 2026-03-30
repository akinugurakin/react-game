"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search, MapPin, Building, School } from "lucide-react";
import { cn } from "@/lib/utils";
import { cities } from "@/lib/schools-data";

type SchoolPickerProps = {
  value: string;
  onChange: (schoolName: string, schoolId: string) => void;
  className?: string;
};

export function SchoolPicker({ value, onChange, className }: SchoolPickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [search, setSearch] = useState("");

  const city = cities.find((c) => c.name === selectedCity);
  const district = city?.districts.find((d) => d.name === selectedDistrict);

  // Arama modunda tüm okullarda ara
  const searchResults = useMemo(() => {
    if (search.length < 2) return [];
    const q = search.toLowerCase();
    const results: { cityName: string; districtName: string; schoolName: string; schoolId: string }[] = [];
    for (const c of cities) {
      for (const d of c.districts) {
        for (const s of d.schools) {
          if (s.name.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || d.name.toLowerCase().includes(q)) {
            results.push({ cityName: c.name, districtName: d.name, schoolName: s.name, schoolId: s.id });
          }
        }
      }
    }
    return results.slice(0, 10);
  }, [search]);

  const handleSelect = (schoolName: string, schoolId: string) => {
    onChange(schoolName, schoolId);
    setOpen(false);
    setSearch("");
    setSelectedCity("");
    setSelectedDistrict("");
  };

  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || "Okul seçin veya arayın"}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border bg-background shadow-lg">
          {/* Arama */}
          <div className="border-b p-3">
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Okul adı, il veya ilçe ara..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {/* Arama sonuçları */}
            {search.length >= 2 ? (
              searchResults.length > 0 ? (
                <div className="p-1">
                  {searchResults.map((r) => (
                    <button
                      key={r.schoolId}
                      type="button"
                      onClick={() => handleSelect(r.schoolName, r.schoolId)}
                      className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/50"
                    >
                      <School className="mt-0.5 h-4 w-4 shrink-0 text-[#005C53]" />
                      <div>
                        <p className="text-sm font-medium">{r.schoolName}</p>
                        <p className="text-xs text-muted-foreground">{r.districtName}, {r.cityName}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="p-4 text-center text-sm text-muted-foreground">Sonuç bulunamadı</p>
              )
            ) : !selectedCity ? (
              /* İl seçimi */
              <div className="p-1">
                <p className="px-3 py-2 text-xs font-bold uppercase text-muted-foreground">İl Seçin</p>
                {cities.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => { setSelectedCity(c.name); setSelectedDistrict(""); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted/50"
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {c.name}
                  </button>
                ))}
              </div>
            ) : !selectedDistrict ? (
              /* İlçe seçimi */
              <div className="p-1">
                <button
                  type="button"
                  onClick={() => setSelectedCity("")}
                  className="mb-1 flex w-full items-center gap-1 px-3 py-1.5 text-xs text-[#005C53] hover:underline"
                >
                  ← İl seçimine dön
                </button>
                <p className="px-3 py-2 text-xs font-bold uppercase text-muted-foreground">{selectedCity} — İlçe Seçin</p>
                {city?.districts.map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => setSelectedDistrict(d.name)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted/50"
                  >
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {d.name}
                    <span className="ml-auto text-xs text-muted-foreground">{d.schools.length} okul</span>
                  </button>
                ))}
              </div>
            ) : (
              /* Okul seçimi */
              <div className="p-1">
                <button
                  type="button"
                  onClick={() => setSelectedDistrict("")}
                  className="mb-1 flex w-full items-center gap-1 px-3 py-1.5 text-xs text-[#005C53] hover:underline"
                >
                  ← İlçe seçimine dön
                </button>
                <p className="px-3 py-2 text-xs font-bold uppercase text-muted-foreground">{selectedCity} / {selectedDistrict}</p>
                {district?.schools.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelect(s.name, s.id)}
                    className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/50"
                  >
                    <School className="mt-0.5 h-4 w-4 shrink-0 text-[#005C53]" />
                    <div>
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.type === "ilkokul" ? "İlkokul" : "Ortaokul"}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
