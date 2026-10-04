import React, { useState } from "react";
import { LottoGame, SAMPLE_WINNING_DRAWS, checkWinning, PresetWinningDraw } from "../utils/lotto";
import { LottoBall } from "./LottoBall";
import { Trophy, CheckCircle, RefreshCcw, Sparkles } from "lucide-react";

interface WinningCheckerProps {
  currentGames: LottoGame[];
}

export const WinningChecker: React.FC<WinningCheckerProps> = ({ currentGames }) => {
  const [selectedRound, setSelectedRound] = useState<number>(1160);
  const [customMode, setCustomMode] = useState<boolean>(false);
  const [customNumbers, setCustomNumbers] = useState<number[]>([1, 10, 20, 30, 40, 45]);
  const [customBonus, setCustomBonus] = useState<number>(7);

  const currentDraw = SAMPLE_WINNING_DRAWS.find((d) => d.round === selectedRound) || SAMPLE_WINNING_DRAWS[0];

  const targetWinNumbers = customMode ? customNumbers : currentDraw.numbers;
  const targetBonus = customMode ? customBonus : currentDraw.bonus;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Trophy className="w-4 h-4" />
            <span>모의 당첨 확인 시뮬레이터</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
            내 번호 당첨 결과 맞춰보기
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            실제 회차 당첨 번호와 대조하여 1등~5등 당첨 여부를 즉시 시뮬레이션합니다.
          </p>
        </div>

        {/* Round Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {SAMPLE_WINNING_DRAWS.map((draw) => (
            <button
              key={draw.round}
              onClick={() => {
                setSelectedRound(draw.round);
                setCustomMode(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                !customMode && selectedRound === draw.round
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              제 {draw.round}회
            </button>
          ))}
        </div>
      </div>

      {/* Winning Numbers Header Display */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-400">
            제 {currentDraw.round}회 당첨 결과 ({currentDraw.date})
          </div>
          <div className="text-sm font-bold text-white mt-0.5">
            당첨 번호 6개 + 보너스 번호
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          {targetWinNumbers.map((num) => (
            <LottoBall key={num} number={num} size="md" />
          ))}
          <span className="text-lg font-bold text-slate-500 px-1">+</span>
          <div className="flex flex-col items-center">
            <LottoBall number={targetBonus} size="md" isBonus={true} />
            <span className="text-[10px] text-purple-400 font-bold mt-0.5">보너스</span>
          </div>
        </div>
      </div>

      {/* Comparison against current generated games */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-400">
          현재 발급된 게임 대조 결과 ({currentGames.length}개 게임):
        </div>

        {currentGames.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 bg-slate-950/50 rounded-2xl border border-slate-800">
            아직 생성된 로또 번호가 없습니다. 상단에서 [번호 생성하기] 버튼을 눌러주세요.
          </div>
        ) : (
          currentGames.map((game) => {
            const check = checkWinning(game.numbers, targetWinNumbers, targetBonus);
            const isWinner = check.rank !== "낙첨";

            return (
              <div
                key={game.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isWinner
                    ? "bg-amber-950/20 border-amber-500/50 shadow-md shadow-amber-950/30"
                    : "bg-slate-950/60 border-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-950/80 border border-indigo-700 font-mono font-bold text-indigo-300 text-sm flex items-center justify-center shrink-0">
                    {game.label}
                  </span>

                  <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                    {game.numbers.map((num) => {
                      const isMatch = check.matchedNumbers.includes(num);
                      const isBonusMatch = num === targetBonus;

                      return (
                        <LottoBall
                          key={num}
                          number={num}
                          size="sm"
                          isMatched={isMatch}
                          isBonus={isBonusMatch}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <div className="text-right">
                    <div
                      className={`text-sm font-bold ${
                        check.rank === "1등"
                          ? "text-rose-400 font-black text-base"
                          : check.rank === "2등" || check.rank === "3등"
                          ? "text-amber-400"
                          : check.rank === "4등" || check.rank === "5등"
                          ? "text-emerald-400"
                          : "text-slate-500"
                      }`}
                    >
                      {check.rank}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      일치: {check.matchCount}개{check.bonusMatch ? " + 보너스" : ""}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
