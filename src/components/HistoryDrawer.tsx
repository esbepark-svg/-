import React from "react";
import { LottoGame } from "../utils/lotto";
import { LottoBall } from "./LottoBall";
import { Trash2, Copy, Check, Bookmark, X } from "lucide-react";

interface HistoryDrawerProps {
  savedBatches: { id: string; savedAt: string; games: LottoGame[] }[];
  onClearHistory: () => void;
  onDeleteBatch: (batchId: string) => void;
  onClose: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  savedBatches,
  onClearHistory,
  onDeleteBatch,
  onClose,
}) => {
  const [copiedBatchId, setCopiedBatchId] = React.useState<string | null>(null);

  const handleCopyBatch = (batch: { id: string; games: LottoGame[] }) => {
    const lines = batch.games.map(
      (g) => `${g.label} [${g.isSemiAuto ? "반자동" : "자동"}] ${g.numbers.map((n) => String(n).padStart(2, "0")).join(" ")}`
    );
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedBatchId(batch.id);
    setTimeout(() => setCopiedBatchId(null), 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg md:text-xl font-bold text-white">내가 보관한 행운의 번호</h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
            {savedBatches.length}개 세트
          </span>
        </div>

        <div className="flex items-center gap-2">
          {savedBatches.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>전체 삭제</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-950 border border-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {savedBatches.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-500 bg-slate-950/60 rounded-2xl border border-slate-800">
          아직 보관된 로또 번호가 없습니다. 생성된 번호에서 [번호 보관] 버튼을 눌러보세요.
        </div>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {savedBatches.map((batch) => {
            const isCopied = copiedBatchId === batch.id;
            return (
              <div
                key={batch.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <div className="text-xs text-slate-400 font-mono">
                    저장 일시: {new Date(batch.savedAt).toLocaleString("ko-KR")}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyBatch(batch)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? "복사됨" : "복사"}</span>
                    </button>
                    <button
                      onClick={() => onDeleteBatch(batch.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {batch.games.map((g) => (
                    <div key={g.id} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded text-[11px] font-mono font-bold bg-slate-900 text-indigo-400 flex items-center justify-center shrink-0">
                        {g.label}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {g.numbers.map((n) => (
                          <LottoBall key={n} number={n} size="sm" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
