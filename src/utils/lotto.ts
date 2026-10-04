export interface LottoGame {
  id: string;
  label: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  numbers: number[];
  isSemiAuto: boolean;
  fixedNumbers: number[];
  createdAt: string;
  stats: {
    sum: number;
    oddCount: number;
    evenCount: number;
    lowCount: number; // 1 ~ 22
    highCount: number; // 23 ~ 45
    hasConsecutive: boolean;
  };
}

export type StrategyType = "pure_random" | "balanced_sum" | "no_consecutive" | "odd_even_balanced";

export interface GenerateOptions {
  count?: number; // 1, 5, 10
  fixedNumbers?: number[]; // Numbers that must be included
  excludedNumbers?: number[]; // Numbers that must NOT be included
  strategy?: StrategyType;
}

export function getBallColorClass(num: number): {
  bg: string;
  border: string;
  text: string;
  glow: string;
  accent: string;
} {
  if (num <= 10) {
    return {
      bg: "bg-amber-400 text-slate-950",
      border: "border-amber-300",
      text: "text-amber-400",
      glow: "shadow-[0_0_16px_rgba(251,191,36,0.35)]",
      accent: "from-amber-300 via-amber-400 to-amber-500",
    };
  }
  if (num <= 20) {
    return {
      bg: "bg-blue-600 text-white",
      border: "border-blue-400",
      text: "text-blue-400",
      glow: "shadow-[0_0_16px_rgba(59,130,246,0.35)]",
      accent: "from-blue-400 via-blue-600 to-blue-700",
    };
  }
  if (num <= 30) {
    return {
      bg: "bg-rose-600 text-white",
      border: "border-rose-400",
      text: "text-rose-400",
      glow: "shadow-[0_0_16px_rgba(225,29,72,0.35)]",
      accent: "from-rose-400 via-rose-600 to-rose-700",
    };
  }
  if (num <= 40) {
    return {
      bg: "bg-slate-600 text-white",
      border: "border-slate-400",
      text: "text-slate-400",
      glow: "shadow-[0_0_16px_rgba(148,163,184,0.35)]",
      accent: "from-slate-400 via-slate-600 to-slate-700",
    };
  }
  return {
    bg: "bg-emerald-600 text-white",
    border: "border-emerald-400",
    text: "text-emerald-400",
    glow: "shadow-[0_0_16px_rgba(16,185,129,0.35)]",
    accent: "from-emerald-400 via-emerald-600 to-emerald-700",
  };
}

export function analyzeNumbers(numbers: number[]) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  const oddCount = numbers.filter((n) => n % 2 !== 0).length;
  const evenCount = 6 - oddCount;
  const lowCount = numbers.filter((n) => n <= 22).length;
  const highCount = 6 - lowCount;

  const sorted = [...numbers].sort((a, b) => a - b);
  let hasConsecutive = false;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] - sorted[i] === 1) {
      hasConsecutive = true;
      break;
    }
  }

  return { sum, oddCount, evenCount, lowCount, highCount, hasConsecutive };
}

// Cryptographically sound single game generator
function generateSingleGame(
  fixedNumbers: number[] = [],
  excludedNumbers: number[] = [],
  strategy: StrategyType = "pure_random"
): number[] {
  const maxAttempts = 1000;
  let attempts = 0;

  const validFixed = fixedNumbers.filter((n) => n >= 1 && n <= 45 && !excludedNumbers.includes(n));
  const excludedSet = new Set(excludedNumbers);

  while (attempts < maxAttempts) {
    attempts++;
    const chosenSet = new Set<number>(validFixed);

    // Pool of available numbers
    const availablePool: number[] = [];
    for (let i = 1; i <= 45; i++) {
      if (!chosenSet.has(i) && !excludedSet.has(i)) {
        availablePool.push(i);
      }
    }

    if (availablePool.length < 6 - chosenSet.size) {
      // Not enough numbers left, fallback
      break;
    }

    // Pick remaining numbers randomly using crypto if available
    while (chosenSet.size < 6 && availablePool.length > 0) {
      let randIdx: number;
      if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
        const arr = new Uint32Array(1);
        window.crypto.getRandomValues(arr);
        randIdx = arr[0] % availablePool.length;
      } else {
        randIdx = Math.floor(Math.random() * availablePool.length);
      }

      chosenSet.add(availablePool[randIdx]);
      availablePool.splice(randIdx, 1);
    }

    const candidate = Array.from(chosenSet).sort((a, b) => a - b);
    if (candidate.length !== 6) continue;

    // Check strategy constraints
    if (strategy === "balanced_sum") {
      const sum = candidate.reduce((a, b) => a + b, 0);
      if (sum < 100 || sum > 175) continue;
    } else if (strategy === "odd_even_balanced") {
      const odds = candidate.filter((n) => n % 2 !== 0).length;
      if (odds < 2 || odds > 4) continue; // Allow 2:4, 3:3, 4:2
    } else if (strategy === "no_consecutive") {
      let hasConsecutive = false;
      for (let i = 0; i < candidate.length - 1; i++) {
        if (candidate[i + 1] - candidate[i] === 1) {
          hasConsecutive = true;
          break;
        }
      }
      if (hasConsecutive) continue;
    }

    return candidate;
  }

  // Fallback if tight filters prevented meeting constraint
  const fallbackSet = new Set<number>(validFixed);
  for (let i = 1; i <= 45; i++) {
    if (fallbackSet.size >= 6) break;
    if (!excludedSet.has(i)) {
      fallbackSet.add(i);
    }
  }
  return Array.from(fallbackSet).slice(0, 6).sort((a, b) => a - b);
}

export function generateLottoGames(options: GenerateOptions = {}): LottoGame[] {
  const count = options.count || 5;
  const fixed = options.fixedNumbers || [];
  const excluded = options.excludedNumbers || [];
  const strategy = options.strategy || "pure_random";

  const labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const now = new Date().toISOString();

  const games: LottoGame[] = [];
  for (let i = 0; i < count; i++) {
    const numbers = generateSingleGame(fixed, excluded, strategy);
    const stats = analyzeNumbers(numbers);
    games.push({
      id: `game-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 6)}`,
      label: labels[i % labels.length],
      numbers,
      isSemiAuto: fixed.length > 0,
      fixedNumbers: [...fixed],
      createdAt: now,
      stats,
    });
  }

  return games;
}

export interface WinningCheckResult {
  matchCount: number;
  bonusMatch: boolean;
  rank: "1등" | "2등" | "3등" | "4등" | "5등" | "낙첨";
  prizeDescription: string;
  matchedNumbers: number[];
}

export function checkWinning(
  gameNumbers: number[],
  winningNumbers: number[],
  bonusNumber: number
): WinningCheckResult {
  const winSet = new Set(winningNumbers);
  const matchedNumbers = gameNumbers.filter((n) => winSet.has(n));
  const matchCount = matchedNumbers.length;
  const bonusMatch = gameNumbers.includes(bonusNumber);

  let rank: "1등" | "2등" | "3등" | "4등" | "5등" | "낙첨" = "낙첨";
  let prizeDescription = "아쉽게도 낙첨되었습니다.";

  if (matchCount === 6) {
    rank = "1등";
    prizeDescription = "🎉 대박! 1등 당첨 (6개 일치 / 약 20억 원 상당)";
  } else if (matchCount === 5 && bonusMatch) {
    rank = "2등";
    prizeDescription = "🎊 축하합니다! 2등 당첨 (5개 + 보너스 일치 / 약 5천만 원 상당)";
  } else if (matchCount === 5) {
    rank = "3등";
    prizeDescription = "👏 축하합니다! 3등 당첨 (5개 일치 / 약 150만 원 상당)";
  } else if (matchCount === 4) {
    rank = "4등";
    prizeDescription = "✨ 4등 당첨 (4개 일치 / 고정 당첨금 50,000원)";
  } else if (matchCount === 3) {
    rank = "5등";
    prizeDescription = "🍀 5등 당첨 (3개 일치 / 고정 당첨금 5,000원)";
  }

  return {
    matchCount,
    bonusMatch,
    rank,
    prizeDescription,
    matchedNumbers,
  };
}

export interface PresetWinningDraw {
  round: number;
  date: string;
  numbers: number[];
  bonus: number;
}

export const SAMPLE_WINNING_DRAWS: PresetWinningDraw[] = [
  {
    round: 1160,
    date: "2025.02.22",
    numbers: [3, 8, 17, 24, 33, 42],
    bonus: 14,
  },
  {
    round: 1159,
    date: "2025.02.15",
    numbers: [5, 12, 19, 28, 31, 45],
    bonus: 2,
  },
  {
    round: 1158,
    date: "2025.02.08",
    numbers: [7, 14, 21, 29, 36, 44],
    bonus: 18,
  },
  {
    round: 1157,
    date: "2025.02.01",
    numbers: [2, 11, 23, 30, 38, 41],
    bonus: 9,
  },
];
