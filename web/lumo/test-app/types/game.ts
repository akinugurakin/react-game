export interface GameConfig {
  id: string;
  title: string;
  description: string;
  discipline: "turkce" | "matematik" | "fen" | "sosyal" | "ingilizce";
  grade: 3 | 4 | 5 | 6 | 7 | 8;
  minAge: number;
  maxAge: number;
  duration: number;
  difficulty: "kolay" | "orta" | "zor";
  thumbnailUrl?: string;
  curriculumCodes: string[];
  tags: string[];
}
