import React, { useState, useEffect } from "react";
import { LAUNCH_14_DAYS_PLAN, LaunchDayPlan } from "../data/roadmapData";
import { Calendar, Clock, CheckSquare, Square, Rocket, Globe } from "lucide-react";

export const LaunchPlanner14Days: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("D - DAY");
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("globalstack_launch_completed");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("globalstack_launch_completed", JSON.stringify(completedTasks));
    } catch {
      // ignore
    }
  }, [completedTasks]);

  const toggleTask = (taskKey: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskKey]: !prev[taskKey],
    }));
  };

  const currentPlan = LAUNCH_14_DAYS_PLAN.find((p) => p.day === selectedDay) || LAUNCH_14_DAYS_PLAN[5];

  const totalTasks = LAUNCH_14_DAYS_PLAN.reduce((acc, cur) => acc + cur.tasks.length, 0);
  const doneTasks = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-1">
            <Rocket className="w-4 h-4" />
            <span>14일 글로벌 런칭 타임라인 플래너</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            D-14부터 D+7까지: 실패 없는 글로벌 GTM 실행표
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Product Hunt, Reddit, Hacker News 런칭의 최적 시간대와 필수 준비 에셋을 일자별로 안내합니다.
          </p>
        </div>
        <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-4 self-start md:self-auto">
          <div>
            <div className="text-[11px] text-slate-400">런칭 태스크 완료율</div>
            <div className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
              {doneTasks} / {totalTasks} ({progressPercent}%)
            </div>
          </div>
          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Global Launch Timezone Box */}
      <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-indigo-300">
          <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Product Hunt 골든 아워:</strong> 샌프란시스코 <strong>00:01 AM PT</strong> 정각에 오픈됩니다. (한국 시간 오후 4시 또는 서머타임 시 오후 5시)
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 shrink-0">
          <Globe className="w-3.5 h-3.5" />
          <span>전 세계 24시간 랭킹 경쟁 기준</span>
        </div>
      </div>

      {/* Timeline Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {LAUNCH_14_DAYS_PLAN.map((item) => {
          const isSelected = item.day === selectedDay;
          const isDDay = item.day === "D - DAY";
          return (
            <button
              key={item.day}
              onClick={() => setSelectedDay(item.day)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex flex-col items-center gap-0.5 border ${
                isSelected
                  ? isDDay
                    ? "bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/50"
                    : "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-950/50"
                  : isDDay
                  ? "bg-rose-950/40 text-rose-300 border-rose-800/60 hover:bg-rose-900/40"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <span className="font-mono text-xs">{item.day}</span>
              <span className="text-[10px] font-normal opacity-80">{item.phase}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Action Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded">
                {currentPlan.day}
              </span>
              <span className="text-xs text-slate-400">단계: {currentPlan.phase}</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{currentPlan.focus}</h3>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
            <span className="text-slate-500">핵심 산출물: </span>
            <span className="text-slate-200 font-semibold">{currentPlan.keyAsset}</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-300 mb-2.5">
            이 날 반드시 완료해야 할 체크리스트:
          </div>
          <div className="space-y-2">
            {currentPlan.tasks.map((task, idx) => {
              const taskKey = `${currentPlan.day}_${idx}`;
              const isDone = !!completedTasks[taskKey];
              return (
                <button
                  key={idx}
                  onClick={() => toggleTask(taskKey)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${
                    isDone
                      ? "bg-emerald-950/20 border-emerald-800/40 text-slate-400 line-through"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200"
                  }`}
                >
                  <span className="shrink-0 mt-0.5">
                    {isDone ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500" />
                    )}
                  </span>
                  <span className="text-sm">{task}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
