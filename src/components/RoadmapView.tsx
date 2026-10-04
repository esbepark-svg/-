import React, { useState, useEffect } from "react";
import { ROADMAP_PHASES, RoadmapPhase, ChecklistItem } from "../data/roadmapData";
import {
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Lightbulb,
  AlertOctagon,
  Clock,
  Compass,
  CheckCircle2
} from "lucide-react";

interface RoadmapViewProps {
  initialPhaseId?: string;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ initialPhaseId }) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(initialPhaseId || "phase-1");
  const [expandedItemId, setExpandedItemId] = useState<string | null>("p1-1");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("globalstack_roadmap_completed");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (initialPhaseId) {
      setSelectedPhaseId(initialPhaseId);
    }
  }, [initialPhaseId]);

  useEffect(() => {
    try {
      localStorage.setItem("globalstack_roadmap_completed", JSON.stringify(completedItems));
    } catch {
      // ignore
    }
  }, [completedItems]);

  const toggleItemCheck = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const toggleExpand = (itemId: string) => {
    setExpandedItemId((prev) => (prev === itemId ? null : itemId));
  };

  const currentPhase = ROADMAP_PHASES.find((p) => p.id === selectedPhaseId) || ROADMAP_PHASES[0];

  // Global progress calculation
  const allItemIds = ROADMAP_PHASES.flatMap((p) => p.items.map((i) => i.id));
  const totalCompleted = allItemIds.filter((id) => completedItems[id]).length;
  const overallProgress = Math.round((totalCompleted / allItemIds.length) * 100);

  return (
    <div className="space-y-6">
      {/* Overall Progress Ribbon */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <Compass className="w-4 h-4" />
            <span>글로벌 런칭 종합 마일스톤</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
            6단계 글로벌 런칭 & 수익화 로드맵
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5">
            아이디어 검증부터 MVP 개발, 결제 연동, 법적 구비, Product Hunt 런칭, 스케일업까지
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 shrink-0">
          <div>
            <div className="text-[11px] text-slate-400">전체 완료율</div>
            <div className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
              {totalCompleted} / {allItemIds.length} 과제 ({overallProgress}%)
            </div>
          </div>
          <div className="w-20 h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Phase Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {ROADMAP_PHASES.map((phase) => {
          const isSelected = phase.id === selectedPhaseId;
          const phaseCompletedCount = phase.items.filter((i) => completedItems[i.id]).length;
          const phasePercent = Math.round((phaseCompletedCount / phase.items.length) * 100);

          return (
            <button
              key={phase.id}
              onClick={() => setSelectedPhaseId(phase.id)}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                isSelected
                  ? "bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-950/50"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className={isSelected ? "text-indigo-400 font-bold" : "text-slate-400"}>
                  PHASE 0{phase.phaseNumber}
                </span>
                <span className="text-[10px] text-slate-400 tabular-nums font-mono">
                  {phaseCompletedCount}/{phase.items.length}
                </span>
              </div>
              <div className="text-xs font-bold text-white line-clamp-1">{phase.title}</div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-2.5">
                <div
                  className="h-full bg-indigo-500 transition-all"
                  style={{ width: `${phasePercent}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Phase Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-400 mb-1.5">
            <span className="font-mono">PHASE 0{currentPhase.phaseNumber}</span>
            <span>·</span>
            <span>{currentPhase.subtitle}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              권장 소요 기간: {currentPhase.duration}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {currentPhase.title}
          </h3>
          <p className="text-sm font-medium text-indigo-200/90 mt-1">
            "{currentPhase.tagline}"
          </p>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            {currentPhase.summary}
          </p>
        </div>

        {/* Checklist Accordion */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            단계별 핵심 실행 과제 & 체크리스트 ({currentPhase.items.length}개)
          </div>

          {currentPhase.items.map((item) => {
            const isDone = !!completedItems[item.id];
            const isExpanded = expandedItemId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isExpanded
                    ? "bg-slate-950 border-indigo-500/50 shadow-lg shadow-indigo-950/20"
                    : isDone
                    ? "bg-slate-950/40 border-slate-800/80 opacity-90"
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Header row */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-4 md:p-5 flex items-start justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      onClick={(e) => toggleItemCheck(item.id, e)}
                      className="mt-0.5 text-slate-400 hover:text-white transition-colors shrink-0"
                      aria-label={isDone ? "완료 해제" : "완료 체크"}
                    >
                      {isDone ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4
                          className={`text-sm md:text-base font-bold ${
                            isDone ? "line-through text-slate-400" : "text-white"
                          }`}
                        >
                          {item.title}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {item.estimatedDays}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isDone && (
                      <span className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" /> 완료됨
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-5 md:px-5 border-t border-slate-800/80 pt-4 space-y-4">
                    {/* Action guide */}
                    <div>
                      <div className="text-xs font-semibold text-slate-300 mb-1.5">
                        실행 가이드 (How to execute):
                      </div>
                      <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                        {item.actionDetails}
                      </div>
                    </div>

                    {/* Recommended Tools */}
                    {item.recommendedTools.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-slate-300 mb-1.5">
                          추천 도구 및 서비스:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {item.recommendedTools.map((tool, idx) => (
                            <a
                              key={idx}
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-colors group flex flex-col justify-between"
                            >
                              <div className="flex items-center justify-between text-xs font-semibold text-indigo-300 group-hover:text-indigo-200">
                                <span>{tool.name}</span>
                                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-indigo-400" />
                              </div>
                              <div className="text-[11px] text-slate-400 mt-1">{tool.note}</div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pro tip and Pitfall */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-xs">
                        <div className="flex items-center gap-1.5 text-indigo-300 font-semibold mb-1">
                          <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                          <span>실전 프로 팁</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{item.proTip}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-800/30 text-xs">
                        <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1">
                          <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                          <span>치명적 함정 (주의)</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{item.commonPitfall}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
