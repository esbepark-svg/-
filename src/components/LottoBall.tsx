import React from "react";
import { getBallColorClass } from "../utils/lotto";

interface LottoBallProps {
  number: number;
  size?: "sm" | "md" | "lg" | "xl";
  isMatched?: boolean;
  isBonus?: boolean;
  isFixed?: boolean;
  animate?: boolean;
  onClick?: () => void;
}

export const LottoBall: React.FC<LottoBallProps> = ({
  number,
  size = "md",
  isMatched = false,
  isBonus = false,
  isFixed = false,
  animate = false,
  onClick,
}) => {
  const color = getBallColorClass(number);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base md:w-14 md:h-14 md:text-lg",
    xl: "w-14 h-14 text-lg md:w-16 md:h-16 md:text-xl",
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative inline-flex items-center justify-center rounded-full font-mono font-extrabold select-none shrink-0 transition-all duration-200 ${
        sizeClasses[size]
      } ${color.bg} shadow-md ${
        isMatched ? "ring-4 ring-emerald-400 scale-105" : ""
      } ${isBonus ? "ring-4 ring-purple-400 scale-105" : ""} ${
        onClick ? "cursor-pointer hover:scale-110 active:scale-95" : ""
      } ${animate ? "animate-bounce" : ""}`}
      style={{
        boxShadow: "inset -2px -2px 6px rgba(0,0,0,0.35), inset 2px 2px 5px rgba(255,255,255,0.45)",
      }}
      title={`로또 볼 ${number}${isFixed ? " (고정수)" : ""}`}
      aria-label={`로또 번호 ${number}`}
    >
      {/* Specular highlight */}
      <span className="absolute top-1 left-2 w-2.5 h-1.5 bg-white/50 rounded-full blur-[0.5px] pointer-events-none" />

      {/* Number text */}
      <span className="relative z-10 font-mono tracking-tighter drop-shadow-sm tabular-nums">
        {number}
      </span>

      {/* Fixed indicator badge */}
      {isFixed && (
        <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[9px] font-sans font-bold px-1 rounded-full border border-slate-900 shadow">
          고정
        </span>
      )}
    </div>
  );
};
