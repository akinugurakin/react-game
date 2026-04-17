import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Link
        href="/test"
        className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg shadow hover:shadow-lg transition-all"
      >
        Söz Avcısı Oyununu Test Et
      </Link>
    </main>
  );
}
