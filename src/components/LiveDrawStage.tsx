import React, { useState, useEffect } from "react";
import { LottoBall } from "./LottoBall";
import { soundFx } from "../utils/audio";
import { Sparkles, Trophy, RotateCcw, Check } from "lucide-react";

interface LiveDrawStageProps {
  onComplete: (numbers: number[]) => void;
  onCancel: () => void;
  targetNumbers: number[];
}

export const LiveDrawStage: React.FC<LiveDrawStageProps> = ({
  onComplete,
  onCancel,
  targetNumbers,
}) => {
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [shufflingNumber, setShufflingNumber] = useState<number>(1);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Ball rolling suspense effect
  useEffect(() => {
    let shuffleInterval: ReturnType<typeof setInterval>;
    let revealTimer: ReturnType<typeof setTimeout>;

    if (revealedCount < 6) {
      // Rapid shuffle preview for currently active ball
      shuffleInterval = setInterval(() => {
        setShufflingNumber(Math.floor(Math.random() * 45) + 1);
        soundFx.playShuffle();
      }, 70);

      // Reveal next ball after 750ms
      revealTimer = setTimeout(() => {
        clearInterval(shuffleInterval);
        const nextCount = revealedCount + 1;
        setRevealedCount(nextCount);
        soundFx.playBallDrop(400 + nextCount * 60);

        if (nextCount === 6) {
          setIsFinished(true);
          setTimeout(() => {
            soundFx.playFanfare();
          }, 300);
        }
      }, 750);
    }

    return () => {
      clearInterval(shuffleInterval);
      clearTimeout(revealTimer);
    };
  }, [revealedCount]);

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/40 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-center space-y-6">
      <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold border-b border-slate-800/80 pb-3">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>실시간 추첨 모드 · LIVE DRAW</span>
        </span>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-white transition-colors"
        >
          닫기
        </button>
      </div>

      <div className="py-2">
        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
          {isFinished ? "🎉 행운의 번호 6개 추첨 완료!" : "공을 뽑고 있습니다..."}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {isFinished
            ? "이번 주 1등 당첨의 주인공이 되시기를 진심으로 기원합니다!"
            : `${revealedCount + 1}번째 행운의 볼을 추첨 중입니다.`}
        </p>
      </div>

      {/* Tumbler / Rolling Slot */}
      {!isFinished && (
        <div className="flex justify-center items-center py-4">
          <div className="w-24 h-24 rounded-full bg-slate-950 border-2 border-indigo-500/60 shadow-[0_0_30px_rgba(99,102,241,0.3)] flex items-center justify-center animate-pulse">
            <LottoBall number={shufflingNumber} size="xl" />
          </div>
        </div>
      )}

      {/* Revealed Balls Row */}
      <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap min-h-[70px]">
        {targetNumbers.map((num, idx) => {
          const isRevealed = idx < revealedCount;
          return isRevealed ? (
            <div key={idx} className="transition-all transform scale-100 animate-in fade-in zoom-in duration-300">
              <LottoBall number={num} size="lg" />
            </div>
          ) : (
            <div
              key={idx}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-dashed border-slate-800 bg-slate-950/60 flex items-center justify-center text-xs font-mono text-slate-600 font-bold"
            >
              ?
            </div>
          );
        })}
      </div>

      {/* Finish Actions */}
      {isFinished && (
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => onComplete(targetNumbers)}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
          >
            <Check className="w-4 h-4" />
            <span>용지에 번호 담기</span>
          </button>
        </div>
      )}
    </div>
  );
};
