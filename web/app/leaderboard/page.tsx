import { Trophy, Medal, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header, Footer } from "@/components/layout/client-header";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface LeaderboardPlayer {
  rank: number;
  username: string;
  score: number;
  correct_count: number;
  duration_seconds: number;
}

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-amber-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />;
  return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
}

function getRankBg(rank: number) {
  if (rank === 1) return "bg-amber-50 border-amber-200";
  if (rank === 2) return "bg-gray-50 border-gray-200";
  if (rank === 3) return "bg-orange-50 border-orange-200";
  return "";
}

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

const gradients = [
  "from-amber-500 to-orange-400",
  "from-rose-500 to-pink-400",
  "from-emerald-500 to-teal-400",
  "from-violet-500 to-purple-400",
  "from-blue-500 to-cyan-400",
];

async function getLeaderboard(): Promise<LeaderboardPlayer[]> {
  try {
    const res = await fetch(
      "https://react-game-api.onrender.com/games/1/leaderboard",
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((d: any, i: number) => ({
      rank: i + 1,
      username: d.username,
      score: d.score,
      correct_count: d.correct_count,
      duration_seconds: d.duration_seconds,
    }));
  } catch {
    return [];
  }
}

export default async function LeaderboardPage() {
  const players = await getLeaderboard();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <Trophy className="h-12 w-12 text-amber-400" />
            </div>
            <h1 className="text-3xl font-extrabold">Liderlik Tablosu</h1>
            <p className="mt-1 text-muted-foreground">
              En iyi oyuncular burada!
            </p>
          </div>

          {players.length === 0 ? (
            <div className="py-20 text-center">
              <Trophy className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
              <h2 className="text-xl font-bold text-muted-foreground">Henüz kimse oynamamış</h2>
              <p className="mt-2 text-muted-foreground">İlk skor sana ait olabilir!</p>
            </div>
          ) : (
            <>
              {/* Top 3 */}
              {players.length >= 3 && (
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                  {players.slice(0, 3).map((player, index) => (
                    <div
                      key={`top-${player.rank}`}
                      className={cn(
                        index === 0 && "sm:order-2",
                        index === 1 && "sm:order-1",
                        index === 2 && "sm:order-3"
                      )}
                    >
                      <Card className={cn("text-center", getRankBg(player.rank))}>
                        <CardContent className="p-6">
                          <div className="mb-3 flex justify-center">
                            {getRankIcon(player.rank)}
                          </div>
                          <div
                            className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${gradients[index % gradients.length]} text-xl font-bold text-white ring-2 ring-background`}
                          >
                            {getInitials(player.username)}
                          </div>
                          <h3 className="font-bold">{player.username}</h3>
                          <p className="text-2xl font-extrabold text-primary">
                            {player.score.toLocaleString("tr-TR")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ✅ {player.correct_count}/10 • ⏱ {player.duration_seconds}s
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}

              {/* Top 3'ten az varsa hepsini listele */}
              {players.length < 3 && (
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                  {players.map((player, index) => (
                    <div key={`top-${player.rank}`}>
                      <Card className={cn("text-center", getRankBg(player.rank))}>
                        <CardContent className="p-6">
                          <div className="mb-3 flex justify-center">
                            {getRankIcon(player.rank)}
                          </div>
                          <div
                            className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${gradients[index % gradients.length]} text-xl font-bold text-white ring-2 ring-background`}
                          >
                            {getInitials(player.username)}
                          </div>
                          <h3 className="font-bold">{player.username}</h3>
                          <p className="text-2xl font-extrabold text-primary">
                            {player.score.toLocaleString("tr-TR")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ✅ {player.correct_count}/10 • ⏱ {player.duration_seconds}s
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}

              {/* 3'ten sonrası liste */}
              {players.length > 3 && (
                <Card>
                  <CardContent className="divide-y p-0">
                    {players.slice(3).map((player) => (
                      <div
                        key={`rest-${player.rank}`}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex w-8 justify-center">
                            {getRankIcon(player.rank)}
                          </div>
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradients[(player.rank - 1) % gradients.length]} text-sm font-bold text-white`}
                          >
                            {getInitials(player.username)}
                          </div>
                          <div>
                            <p className="font-semibold">{player.username}</p>
                            <p className="text-xs text-muted-foreground">
                              ✅ {player.correct_count}/10 • ⏱ {player.duration_seconds}s
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-bold">
                          {player.score.toLocaleString("tr-TR")}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
