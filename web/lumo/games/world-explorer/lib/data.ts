// ---------- Round 1: Landmarks ----------

export interface LandmarkItem {
  landmark: string;
  city: string;
  country: string;
  icon: string;
}

export const LANDMARKS: LandmarkItem[] = [
  { landmark: "Eiffel Tower", city: "Paris", country: "France", icon: "🗼" },
  { landmark: "Big Ben", city: "London", country: "England", icon: "🕰️" },
  { landmark: "Colosseum", city: "Rome", country: "Italy", icon: "🏛️" },
  {
    landmark: "Hagia Sophia",
    city: "Istanbul",
    country: "Turkiye",
    icon: "🕌",
  },
  {
    landmark: "Statue of Liberty",
    city: "New York",
    country: "USA",
    icon: "🗽",
  },
  { landmark: "Great Wall", city: "Beijing", country: "China", icon: "🧱" },
  {
    landmark: "Sydney Opera House",
    city: "Sydney",
    country: "Australia",
    icon: "🎭",
  },
  {
    landmark: "Galata Tower",
    city: "Istanbul",
    country: "Turkiye",
    icon: "🏰",
  },
];

// ---------- Round 2: Sentences ----------

export interface SentenceDef {
  words: string[];
  answer: string;
  grammar: "present-perfect-for" | "question-tag";
}

export const SENTENCES: SentenceDef[] = [
  {
    words: [
      "They",
      "have",
      "visited",
      "the",
      "ancient",
      "castle",
      "for",
      "years.",
    ],
    answer: "They have visited the ancient castle for years.",
    grammar: "present-perfect-for",
  },
  {
    words: [
      "She",
      "has",
      "toured",
      "historic",
      "cities",
      "for",
      "a",
      "long",
      "time.",
    ],
    answer: "She has toured historic cities for a long time.",
    grammar: "present-perfect-for",
  },
  {
    words: [
      "We",
      "have",
      "competed",
      "in",
      "tournaments",
      "for",
      "three",
      "seasons.",
    ],
    answer: "We have competed in tournaments for three seasons.",
    grammar: "present-perfect-for",
  },
  {
    words: [
      "People",
      "have",
      "celebrated",
      "this",
      "festival",
      "for",
      "centuries.",
    ],
    answer: "People have celebrated this festival for centuries.",
    grammar: "present-perfect-for",
  },
  {
    words: [
      "He",
      "has",
      "taken",
      "a",
      "tour",
      "of",
      "the",
      "palace,",
      "hasn't",
      "he?",
    ],
    answer: "He has taken a tour of the palace, hasn't he?",
    grammar: "question-tag",
  },
  {
    words: [
      "They",
      "have",
      "cheered",
      "for",
      "the",
      "runners,",
      "haven't",
      "they?",
    ],
    answer: "They have cheered for the runners, haven't they?",
    grammar: "question-tag",
  },
  {
    words: [
      "She",
      "has",
      "experienced",
      "life",
      "abroad,",
      "hasn't",
      "she?",
    ],
    answer: "She has experienced life abroad, hasn't she?",
    grammar: "question-tag",
  },
  {
    words: ["You", "have", "attended", "the", "event,", "haven't", "you?"],
    answer: "You have attended the event, haven't you?",
    grammar: "question-tag",
  },
];

// ---------- Round 3: Quiz ----------

export interface QuizQuestion {
  passage: string;
  question: string;
  options: string[];
  /** Zero-based index of the correct option */
  correctIndex: number;
}

export const QUESTIONS: QuizQuestion[] = [
  {
    passage:
      "The Olympic Games is one of the most exciting global events. Athletes from all over the world compete for gold, silver, and bronze medals. Runners train on the track and field every day to prepare for this international tournament.",
    question: "What do athletes compete for at the Olympics?",
    options: ["Trophies", "Medals", "Money", "Flags"],
    correctIndex: 1,
  },
  {
    passage:
      "Football fans have supported their teams for decades. When a player scores a goal, the crowd cheers loudly. The stadium is packed with excited supporters wearing their team colours.",
    question: "What happens when a player scores a goal?",
    options: [
      "The crowd leaves",
      "The crowd cheers",
      "The game stops",
      "The lights turn off",
    ],
    correctIndex: 1,
  },
  {
    passage:
      "Cycling is a popular sport in many countries. Riders cycle through wide roads, across ancient bridges, and along beautiful coasts. The most famous cycling tournament in the world has been held in France for over a hundred years.",
    question: "Where do cyclists ride through?",
    options: [
      "Only in cities",
      "Wide roads, bridges, and coasts",
      "Only on tracks",
      "Only in France",
    ],
    correctIndex: 1,
  },
  {
    passage:
      "Istanbul has hosted many international sports events. Athletes have competed in this historic city for many years. The city\u2019s active sports community supports runners, swimmers, and cyclists.",
    question: "What kind of city is Istanbul described as?",
    options: [
      "A quiet city",
      "A historic city with active sports",
      "A small town",
      "A city with no events",
    ],
    correctIndex: 1,
  },
  {
    passage:
      "Attending a live sports event is a great adventure. You can feel the movement and energy of the crowd. Many fans take photographs of the exciting moments and cheer for their favourite athletes.",
    question: "What do fans do at live sports events?",
    options: [
      "Sleep",
      "Take photographs and cheer",
      "Read books",
      "Cook food",
    ],
    correctIndex: 1,
  },
  {
    passage:
      "The World Cup is a global football tournament. Teams from different countries compete to win the golden trophy. Millions of people watch the matches on TV. Players have trained for months to score goals on the international field.",
    question: "How long have players trained for the World Cup?",
    options: ["For days", "For weeks", "For months", "For a day"],
    correctIndex: 2,
  },
];
