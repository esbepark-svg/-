import React, { useState, useEffect } from "react";
import {
  generateLottoGames,
  LottoGame,
  StrategyType,
  SAMPLE_WINNING_DRAWS,
} from "./utils/lotto";
import { soundFx } from "./utils/audio";
import { LottoTicketView } from "./components/LottoTicketView";
import { NumberFilterPanel } from "./components/NumberFilterPanel";
import { WinningChecker } from "./components/WinningChecker";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { LiveDrawStage } from "./components/LiveDrawStage";
import {
  Sparkles,
  Volume2,
  VolumeX,
  SlidersHorizontal,
  Trophy,
  Bookmark,
  Dices,
  RotateCcw,
  CheckCircle2,
  Info,
  Layers,
} from "lucide-react";

export default function App() {
  const [games, setGames] = useState<LottoGame[]>([]);
  const [gameCount, setGameCount] = useState<number>(5);
  const [strategy, setStrategy] = useState<StrategyType>("pure_random");
  const [fixedNumbers, setFixedNumbers] = useState<number[]>([]);
  const [excludedNumbers, setExcludedNumbers] = useState<number[]>([]);
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"generator" | "checker" | "history">("generator");
  const [isLiveDrawing, setIsLiveDrawing] = useState<boolean>(false);
  const [liveDrawTarget, setLiveDrawTarget] = useState<number[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Saved Batches from LocalStorage
  const [savedBatches, setSavedBatches] = useState<{ id: string; savedAt: string; games: LottoGame[] }[]>(() => {
    try {
      const saved = localStorage.getItem("lotto_saved_batches");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lotto_saved_batches", JSON.stringify(savedBatches));
    } catch {
      // ignore
    }
  }, [savedBatches]);

  // Initial generation on first mount
  useEffect(() => {
    handleGenerate(false);
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.enabled = next;
  };

  const handleGenerate = (playSfx: boolean = true) => {
    if (playSfx) {
      soundFx.playBallDrop(520);
    }
    const newGames = generateLottoGames({
      count: gameCount,
      fixedNumbers,
      excludedNumbers,
      strategy,
    });
    setGames(newGames);
  };

  const startLiveDraw = () => {
    const preview = generateLottoGames({
      count: 1,
      fixedNumbers,
      excludedNumbers,
      strategy,
    })[0].numbers;
    setLiveDrawTarget(preview);
    setIsLiveDrawing(true);
  };

  const handleLiveDrawComplete = (numbers: number[]) => {
    setIsLiveDrawing(false);
    const newGame: LottoGame = {
      id: `live-${Date.now()}`,
      label: String.fromCharCode(65 + (games.length % 10)),
      numbers,
      isSemiAuto: fixedNumbers.length > 0,
      fixedNumbers: [...fixedNumbers],
      createdAt: new Date().toISOString(),
      stats: {
        sum: numbers.reduce((a, b) => a + b, 0),
        oddCount: numbers.filter((n) => n % 2 !== 0).length,
        evenCount: 6 - numbers.filter((n) => n % 2 !== 0).length,
        lowCount: numbers.filter((n) => n <= 22).length,
        highCount: 6 - numbers.filter((n) => n <= 22).length,
        hasConsecutive: false,
      },
    };
    setGames([newGame, ...games.slice(0, 4)]);
  };

  const handleRerollSingle = (gameId: string) => {
    soundFx.playBallDrop(600);
    const updated = games.map((g) => {
      if (g.id === gameId) {
        const replacement = generateLottoGames({
          count: 1,
          fixedNumbers,
          excludedNumbers,
          strategy,
        })[0];
        return {
          ...replacement,
          id: g.id,
          label: g.label,
        };
      }
      return g;
    });
    setGames(updated);
  };

  const handleToggleFixed = (num: number) => {
    if (fixedNumbers.includes(num)) {
      setFixedNumbers(fixedNumbers.filter((n) => n !== num));
    } else {
      if (fixedNumbers.length >= 5) {
        alert("고정수는 최대 5개까지만 지정할 수 있습니다.");
        return;
      }
      setFixedNumbers([...fixedNumbers, num]);
      // Remove from excluded if present
      setExcludedNumbers(excludedNumbers.filter((n) => n !== num));
    }
  };

  const handleToggleExcluded = (num: number) => {
    if (excludedNumbers.includes(num)) {
      setExcludedNumbers(excludedNumbers.filter((n) => n !== num));
    } else {
      if (excludedNumbers.length >= 20) {
        alert("제외수는 최대 20개까지만 지정할 수 있습니다.");
        return;
      }
      setExcludedNumbers([...excludedNumbers, num]);
      // Remove from fixed if present
      setFixedNumbers(fixedNumbers.filter((n) => n !== num));
    }
  };

  const handleClearFilters = () => {
    setFixedNumbers([]);
    setExcludedNumbers([]);
  };

  const handleSaveToHistory = (ticketGames: LottoGame[]) => {
    soundFx.playFanfare();
    const newBatch = {
      id: `batch-${Date.now()}`,
      savedAt: new Date().toISOString(),
      games: [...ticketGames],
    };
    setSavedBatches([newBatch, ...savedBatches]);
  };

  const handleDeleteBatch = (batchId: string) => {
    setSavedBatches(savedBatches.filter((b) => b.id !== batchId));
  };

  const handleClearHistory = () => {
    if (confirm("보관된 모든 번호를 삭제하시겠습니까?")) {
      setSavedBatches([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-6 Links) - Zone 3 (Actions) */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("generator");
            }}
            className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-2 hover:text-amber-400 transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-mono font-extrabold flex items-center justify-center text-sm shadow-md shadow-amber-400/20">
              645
            </span>
            <span>로또645 마스터</span>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
          <button
            onClick={() => setActiveTab("generator")}
            className={`transition-colors hover:text-white ${
              activeTab === "generator" ? "text-amber-400 border-b-2 border-amber-400 pb-1" : ""
            }`}
          >
            번호 생성기
          </button>
          <button
            onClick={() => {
              setActiveTab("generator");
              setShowFilterPanel(true);
            }}
            className="transition-colors hover:text-white flex items-center gap-1.5"
          >
            <span>고정/제외수 필터</span>
            {(fixedNumbers.length > 0 || excludedNumbers.length > 0) && (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("checker")}
            className={`transition-colors hover:text-white ${
              activeTab === "checker" ? "text-amber-400 border-b-2 border-amber-400 pb-1" : ""
            }`}
          >
            당첨 확인 시뮬레이터
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`transition-colors hover:text-white flex items-center gap-1.5 ${
              activeTab === "history" ? "text-amber-400 border-b-2 border-amber-400 pb-1" : ""
            }`}
          >
            <span>보관함</span>
            {savedBatches.length > 0 && (
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded-full">
                {savedBatches.length}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSound}
            title={soundEnabled ? "효과음 끄기" : "효과음 켜기"}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleGenerate(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-400/20 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>즉시 생성</span>
          </button>
        </div>
      </header>

      {/* Mobile Nav Tabs */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("generator")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === "generator" ? "bg-amber-400 text-slate-950 font-bold" : "text-slate-400"
          }`}
        >
          번호 생성기
        </button>
        <button
          onClick={() => {
            setActiveTab("generator");
            setShowFilterPanel(!showFilterPanel);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
            showFilterPanel ? "bg-slate-800 text-white" : "text-slate-400"
          }`}
        >
          <span>고정/제외 필터</span>
          {(fixedNumbers.length > 0 || excludedNumbers.length > 0) && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("checker")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === "checker" ? "bg-amber-400 text-slate-950 font-bold" : "text-slate-400"
          }`}
        >
          당첨 확인
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === "history" ? "bg-amber-400 text-slate-950 font-bold" : "text-slate-400"
          }`}
        >
          보관함 ({savedBatches.length})
        </button>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6">
        {/* Generator View */}
        {activeTab === "generator" && (
          <div className="space-y-6">
            {/* Live Draw Modal Stage (if active) */}
            {isLiveDrawing && (
              <LiveDrawStage
                targetNumbers={liveDrawTarget}
                onComplete={handleLiveDrawComplete}
                onCancel={() => setIsLiveDrawing(false)}
              />
            )}

            {/* Generator Dashboard Control Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <Dices className="w-4 h-4" />
                    <span>대한민국 로또 6/45 스마트 생성기</span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">
                    행운의 당첨 번호를 생성하세요
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    암호학적 난수 생성 엔진과 통계 밸런스 필터로 최적의 조합을 추천합니다.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Game Count Selector (1, 5, 10) */}
                  <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    {[1, 5, 10].map((cnt) => (
                      <button
                        key={cnt}
                        onClick={() => setGameCount(cnt)}
                        className={`px-3 py-1.5 rounded-lg font-bold font-mono transition-colors ${
                          gameCount === cnt
                            ? "bg-amber-400 text-slate-950 shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {cnt}게임{cnt === 5 ? " (1장)" : ""}
                      </button>
                    ))}
                  </div>

                  {/* Filter Toggle Button */}
                  <button
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                      showFilterPanel || fixedNumbers.length > 0 || excludedNumbers.length > 0
                        ? "bg-indigo-950 text-indigo-300 border-indigo-700"
                        : "bg-slate-950 text-slate-400 hover:text-white border-slate-800"
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>고정/제외수 ({fixedNumbers.length + excludedNumbers.length})</span>
                  </button>
                </div>
              </div>

              {/* Strategy Presets */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400">생성 전략 (Strategy Preset):</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "pure_random", label: "완전 자동", desc: "100% 무작위 추첨" },
                    { id: "balanced_sum", label: "총합 밸런스", desc: "100 ~ 175 통계 구간" },
                    { id: "odd_even_balanced", label: "홀짝 균형", desc: "2:4, 3:3 황금비" },
                    { id: "no_consecutive", label: "연속 번호 제외", desc: "12, 13 연번 배제" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setStrategy(item.id as StrategyType)}
                      className={`text-left p-3 rounded-xl border transition-all ${
                        strategy === item.id
                          ? "bg-amber-400/10 border-amber-400 text-white shadow-sm"
                          : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{item.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generation Trigger Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => handleGenerate(true)}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm md:text-base transition-all shadow-lg shadow-amber-400/25 flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                  <span>행운의 번호 {gameCount}게임 생성하기</span>
                </button>

                <button
                  onClick={startLiveDraw}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-indigo-300 border border-indigo-700/60 font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Dices className="w-4 h-4 text-indigo-400" />
                  <span>두근두근 추첨 모드</span>
                </button>
              </div>
            </div>

            {/* Expandable Filter Panel */}
            {showFilterPanel && (
              <NumberFilterPanel
                fixedNumbers={fixedNumbers}
                excludedNumbers={excludedNumbers}
                onToggleFixed={handleToggleFixed}
                onToggleExcluded={handleToggleExcluded}
                onClearFilters={handleClearFilters}
              />
            )}

            {/* Generated Ticket View */}
            <LottoTicketView
              games={games}
              onRerollSingle={handleRerollSingle}
              onSaveToHistory={handleSaveToHistory}
            />

            {/* Official Lotto Ball Color Guide & Pro-Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 md:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>공식 로또 볼 색상 체계</span>
                </div>
                <div className="grid grid-cols-5 gap-2 pt-1 text-center font-mono font-bold">
                  <div className="p-2 rounded-lg bg-amber-400 text-slate-950 text-xs">
                    1 ~ 10<div className="text-[10px] font-sans font-normal">노랑</div>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-600 text-white text-xs">
                    11 ~ 20<div className="text-[10px] font-sans font-normal">파랑</div>
                  </div>
                  <div className="p-2 rounded-lg bg-rose-600 text-white text-xs">
                    21 ~ 30<div className="text-[10px] font-sans font-normal">빨강</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-600 text-white text-xs">
                    31 ~ 40<div className="text-[10px] font-sans font-normal">회색</div>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-600 text-white text-xs">
                    41 ~ 45<div className="text-[10px] font-sans font-normal">초록</div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>로또 상식 & 통계 요약</span>
                </div>
                <ul className="space-y-1 text-slate-400 leading-relaxed">
                  <li>· 1등 당첨 확률: <strong>1 / 8,145,060</strong> (약 814만 분의 1)</li>
                  <li>· 당첨 번호 6개의 총합은 대략 <strong>120 ~ 160</strong> 사이가 가장 빈번합니다.</li>
                  <li>· 홀수와 짝수의 비율은 <strong>3:3 (약 33%)</strong> 또는 <strong>4:2/2:4 (약 48%)</strong>가 대부분입니다.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Winning Checker View */}
        {activeTab === "checker" && <WinningChecker currentGames={games} />}

        {/* History Drawer View */}
        {activeTab === "history" && (
          <HistoryDrawer
            savedBatches={savedBatches}
            onClearHistory={handleClearHistory}
            onDeleteBatch={handleDeleteBatch}
            onClose={() => setActiveTab("generator")}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-4 md:px-8 py-5 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-bold text-slate-400">로또645 마스터</span> · 건전한 복권 문화를 응원합니다.
          </div>
          <div className="text-slate-500">
            복권 구매는 소액으로 가볍게 즐기세요 · 만 19세 미만 청소년은 복권을 구매할 수 없습니다.
          </div>
        </div>
      </footer>
    </div>
  );
}
