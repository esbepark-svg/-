import React, { useState } from "react";
import { TECH_STACK_PRESETS, TechStackPreset } from "../data/roadmapData";
import { Layers, Check, Copy, ExternalLink, Zap } from "lucide-react";

export const TechStackBuilder: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>("ai-saas");
  const [copied, setCopied] = useState<boolean>(false);

  const currentPreset = TECH_STACK_PRESETS.find((p) => p.id === selectedId) || TECH_STACK_PRESETS[0];

  const handleCopy = () => {
    const text = `[Global SaaS Tech Stack: ${currentPreset.name}]
- Target: ${currentPreset.targetType}
- Frontend: ${currentPreset.frontend}
- Backend: ${currentPreset.backend}
- Database: ${currentPreset.database}
- Edge Hosting: ${currentPreset.hosting}
- Auth: ${currentPreset.auth}
- Payments: ${currentPreset.payment}
- Analytics: ${currentPreset.analytics}
- Monthly Cost: ${currentPreset.monthlyCost}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-1">
            <Layers className="w-4 h-4" />
            <span>글로벌 확장형 기술 스택 셀렉터</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            1인 개발자에게 가장 검증된 모던 아키텍처
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            서버 관리 인력 없이 전 세계 100ms 미만 지연시간을 보장하는 최적의 배포/결제 조합을 선택하세요.
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 self-start md:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "스택 명세 복사됨" : "스택 명세 복사"}</span>
        </button>
      </div>

      {/* Preset Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TECH_STACK_PRESETS.map((preset) => {
          const isSelected = preset.id === selectedId;
          return (
            <button
              key={preset.id}
              onClick={() => setSelectedId(preset.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? "bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-950/50"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
              }`}
            >
              <div className="text-xs font-semibold text-indigo-400 mb-1 flex items-center justify-between">
                <span>{preset.targetType.split("/")[0]}</span>
                {isSelected && <Zap className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />}
              </div>
              <div className="text-sm font-bold text-white line-clamp-1">{preset.name}</div>
              <div className="text-xs text-slate-400 mt-2 line-clamp-2">{preset.description}</div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400 font-semibold">
                {preset.monthlyCost}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Preset Details */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 md:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">{currentPreset.name} 상세 아키텍처</h3>
            <p className="text-xs text-slate-400 mt-0.5">{currentPreset.bestFor}</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-3 py-1 rounded-md self-start sm:self-auto">
            월 예상 인프라 비용: {currentPreset.monthlyCost}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: "Frontend Framework", value: currentPreset.frontend, hint: "초기 로딩 및 반응형 최적화" },
            { label: "Backend & Serverless", value: currentPreset.backend, hint: "서버 인스턴스 없는 오토스케일" },
            { label: "Database & Vector", value: currentPreset.database, hint: "글로벌 리전 PostgreSQL" },
            { label: "Global Edge & Hosting", value: currentPreset.hosting, hint: "전 세계 CDN 엣지 배포" },
            { label: "Global Authentication", value: currentPreset.auth, hint: "Google/GitHub 1-Click 로그인" },
            { label: "Payment & Tax (MoR)", value: currentPreset.payment, hint: "글로벌 세금 및 정산 자동화" },
            { label: "Analytics & Replay", value: currentPreset.analytics, hint: "유저 이탈 세션 녹화 분석" },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                {item.label}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">{item.value}</div>
              <div className="text-[11px] text-slate-500 mt-1">{item.hint}</div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 text-xs text-slate-300 space-y-2">
          <div className="font-semibold text-white flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            왜 이 조합인가요? (Why this stack?)
          </div>
          <p className="leading-relaxed">
            이 스택의 핵심은 <strong>초기 고정비 $0</strong>과 <strong>무관리(Zero-maintenance) 운영</strong>입니다. 
            서버를 직접 띄우지 않고 <strong>Vercel</strong> 또는 <strong>Cloudflare</strong>의 엣지 네트워크에 올려 전 세계 어디서 접속해도 100ms 이내로 반응하며, 
            <strong>Supabase</strong>로 데이터베이스 보안(RLS)과 인증을 한 번에 끝냅니다. 
            결제는 <strong>Lemon Squeezy</strong>를 붙여 복잡한 EU VAT나 US Sales Tax 법률 문제를 완전히 외주화합니다.
          </p>
        </div>
      </div>
    </div>
  );
};
