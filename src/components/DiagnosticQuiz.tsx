import React, { useState } from "react";
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

interface DiagnosticResult {
  headline: string;
  stageName: string;
  targetPhaseId: string;
  topActions: string[];
  recommendedSetup: {
    stack: string;
    payment: string;
    trafficChannel: string;
  };
  fatalMistake: string;
  insightQuote: string;
}

export const DiagnosticQuiz: React.FC<{
  onSelectPhase: (phaseId: string) => void;
}> = ({ onSelectPhase }) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<{
    stage: string;
    role: string;
    model: string;
  }>({
    stage: "",
    role: "",
    model: "",
  });
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const calculateResult = (stage: string, role: string, model: string): DiagnosticResult => {
    if (stage === "idea") {
      return {
        headline: "아직 코딩하지 마세요! 1-Page 대기자(Waitlist)로 수요부터 검증하세요.",
        stageName: "아이디어 & 수요 검증 단계 (Phase 1)",
        targetPhaseId: "phase-1",
        topActions: [
          "Reddit(r/SaaS, r/SideProject)에서 유사 툴 불만 글 10개 수집 및 타겟 고객 정의",
          "Framer/Tally로 1페이지 영문 랜딩페이지 제작 후 '얼리버드 50% 할인 대기자' 30명 모으기",
          "X(Twitter)에 '이런 페인포인트를 해결하는 툴을 만드는 중'이라고 #buildinpublic 트윗 시작"
        ],
        recommendedSetup: {
          stack: role === "dev" ? "Next.js + Tailwind + Supabase" : "Framer + Tally + Lemon Squeezy",
          payment: "Lemon Squeezy (MoR로 글로벌 세무/VAT 자동화)",
          trafficChannel: "Reddit r/SideProject & X(Twitter)"
        },
        fatalMistake: "수요가 입증되지 않은 기능에 2달 동안 골방에서 코딩만 하고 아무도 안 쓰는 서비스를 만드는 것.",
        insightQuote: "'If you aren't embarrassed by the first version of your product, you shipped too late.' - Reid Hoffman"
      };
    }

    if (stage === "building") {
      return {
        headline: "기능을 덜어내고 3주 안에 끝낼 수 있는 '초미니 MVP'로 스코프를 줄이세요.",
        stageName: "기술 스택 & 초고속 MVP 빌드 (Phase 2)",
        targetPhaseId: "phase-2",
        topActions: [
          "핵심 가치를 제공하는 단 1개의 '입력 -> 출력' 화면만 남기고 나머지 기능 전부 삭제",
          "글로벌 엣지 지연시간을 위해 DB 리전을 미국/유럽(us-east-1)으로 세팅 및 Google 1-Click 로그인 연동",
          "기본 언어를 100% 영어로 작성하고, 결제 연동(Lemon Squeezy Webhook) 먼저 테스트 모드로 연동"
        ],
        recommendedSetup: {
          stack: "Next.js (App Router) + Supabase (PostgreSQL) + Vercel",
          payment: "Lemon Squeezy (또는 미국 법인 보유 시 Stripe)",
          trafficChannel: "Waitlist 사전 등록자 대상 클로즈드 알파"
        },
        fatalMistake: "완벽한 디자인 시스템이나 마이크로서비스 아키텍처에 매몰되어 런칭이 몇 달씩 밀리는 것.",
        insightQuote: "기능 10개가 70점인 서비스보다, 단 1가지 기능을 100점으로 빠르게 끝내주는 툴이 돈을 법니다."
      };
    }

    if (stage === "mvp_ready") {
      return {
        headline: "축하합니다! 이제 글로벌 결제 연동과 법적 약관을 갖추고 런칭할 시간입니다.",
        stageName: "결제 & 글로벌 컴플라이언스 인프라 (Phase 3 & 4)",
        targetPhaseId: "phase-3",
        topActions: [
          "Lemon Squeezy에 가입하고 웹사이트에 Terms, Privacy Policy, Refund Policy 링크 게시",
          "월간 구독($15~$29/mo) 및 2개월 무료 연간 결제 토글 세팅",
          "Product Hunt 런칭 에셋 (1270x760 갤러리 5장 + 30초 데모 영상) 패키징 시작"
        ],
        recommendedSetup: {
          stack: "현재 빌드된 스택 + PostHog (세션 리플레이 필수)",
          payment: "Lemon Squeezy (Merchant of Record)",
          trafficChannel: "Product Hunt + Hacker News Show HN"
        },
        fatalMistake: "사이트에 환불 규정이나 개인정보처리방침이 없어 결제사 심사에서 반려되거나 계정이 정지되는 것.",
        insightQuote: "결제 버튼이 열리지 않은 제품은 취미일 뿐, 비즈니스가 아닙니다. 지금 바로 유료화하세요."
      };
    }

    return {
      headline: "트래픽 엔진 가동! Product Hunt와 Reddit을 관통하는 글로벌 GTM을 실행하세요.",
      stageName: "글로벌 런칭 & 트래픽 획득 (Phase 5 & 6)",
      targetPhaseId: "phase-5",
      topActions: [
        "샌프란시스코 00:01 PT(한국 오후 4~5시) 정각에 Product Hunt 공식 런칭 및 Maker Comment 등록",
        "Hacker News에 'Show HN: [단 하나의 핵심 가치]' 제목으로 아키텍처와 솔직한 빌더 스토리 공유",
        "There's An AI For That 등 글로벌 AI/툴 디렉토리 30곳에 무료 제출 등록"
      ],
      recommendedSetup: {
        stack: "Vercel Analytics + PostHog 퍼널 분석",
        payment: "Lemon Squeezy + 자동 고객 감사 이메일 (Loops/Resend)",
        trafficChannel: "Product Hunt, Reddit, Hacker News, X #buildinpublic"
      },
      fatalMistake: "런칭 당일에 'Upvote 부탁합니다'라며 스팸 링크를 뿌려 Product Hunt 알고리즘에 강등당하는 것.",
      insightQuote: "트래픽은 빌려오는 것이고, 제품의 아하 모먼트는 남는 것입니다. 온보딩 60초를 사수하세요."
    };
  };

  const handleSelect = (key: "stage" | "role" | "model", value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step < 3) {
      setStep(step + 1);
    } else {
      const res = calculateResult(updated.stage, updated.role, updated.model);
      setResult(res);
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ stage: "", role: "", model: "" });
    setResult(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>30초 맞춤형 런칭 진단</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            지금 내 상황에서 뭐부터 해야 할까?
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            현재 개발 단계와 상황에 맞춘 즉시 실행 가능한 우선순위 3대 과제를 도출해 드립니다.
          </p>
        </div>
        {step === 4 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            다시 진단하기
          </button>
        )}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="text-sm font-semibold text-slate-300">
            질문 1 / 3: 현재 프로젝트 진행 상태는 어느 단계인가요?
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: "idea", label: "아이디어 구상 중", desc: "글로벌 니즈가 있을지 확신이 없고, 아직 코딩은 시작 안 함" },
              { id: "building", label: "한창 코드 개발 중", desc: "기능을 구현하는 중이나 스코프가 계속 늘어나고 런칭이 지연됨" },
              { id: "mvp_ready", label: "MVP 기능 구현 완료", desc: "핵심 기능은 완성되었으나 결제 연동 및 글로벌 배포 전" },
              { id: "launch_ready", label: "배포 완료 & 런칭 직전", desc: "사이트는 열려 있으나 글로벌 트래픽과 첫 10명 결제자가 필요함" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect("stage", opt.id)}
                className="text-left p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-indigo-500/60 hover:bg-indigo-950/20 transition-all group"
              >
                <div className="text-sm font-semibold text-white group-hover:text-indigo-300 flex items-center justify-between">
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="text-xs text-slate-400 mt-1">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="text-sm font-semibold text-slate-300">
            질문 2 / 3: 주력 무기(가장 편안한 분야)는 무엇인가요?
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: "dev", label: "풀스택 / 소프트웨어 개발자", desc: "코드 작성은 능숙하나 마케팅과 세무/결제가 막막함" },
              { id: "design", label: "UI/UX 디자이너 / 기획자", desc: "제품 감각은 좋으나 백엔드 인프라와 배포가 고민됨" },
              { id: "marketing", label: "마케터 / 비개발 창업자", desc: "시장과 세일즈는 아나 노코드/AI 툴로 빠르게 만들고 싶음" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect("role", opt.id)}
                className="text-left p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-indigo-500/60 hover:bg-indigo-950/20 transition-all group"
              >
                <div className="text-sm font-semibold text-white group-hover:text-indigo-300 flex items-center justify-between">
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400" />
                </div>
                <div className="text-xs text-slate-400 mt-1">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="text-sm font-semibold text-slate-300">
            질문 3 / 3: 목표로 하는 글로벌 수익화 비즈니스 모델은?
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: "sub", label: "월간 반복 구독 (SaaS MRR)", desc: "월 $9 ~ $49 정기 구독으로 안정적인 현금 흐름 창출" },
              { id: "credit", label: "크레딧 / 사용량 기반 (Usage)", desc: "AI 이미지/토큰 사용량만큼 충전형 결제" },
              { id: "ltd", label: "단건 결제 / 평생 이용권 (LTD)", desc: "1회성 $19~$49 결제로 초기 현금 확보 및 빠른 전환" },
              { id: "b2b", label: "B2B 팀 / 엔터프라이즈", desc: "좌석당 $49~$149/mo 높은 객단가의 팀 워크스페이스" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect("model", opt.id)}
                className="text-left p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-indigo-500/60 hover:bg-indigo-950/20 transition-all group"
              >
                <div className="text-sm font-semibold text-white group-hover:text-indigo-300 flex items-center justify-between">
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400" />
                </div>
                <div className="text-xs text-slate-400 mt-1">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && result && (
        <div className="space-y-6">
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-5">
            <div className="text-xs font-semibold text-indigo-400 mb-1">
              진단 완료 · 추천 진입 단계: {result.stageName}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              {result.headline}
            </h3>
            <p className="text-sm text-slate-300 italic border-l-2 border-indigo-500 pl-3 py-0.5">
              {result.insightQuote}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              오늘 당장 실행해야 할 3대 액션 (Top 3 Actions)
            </h4>
            <div className="space-y-2.5">
              {result.topActions.map((action, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-sm text-slate-200"
                >
                  <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800/50 rounded px-2 py-0.5 mt-0.5 shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs text-slate-400">추천 기술 스택</div>
              <div className="text-xs font-semibold text-white mt-1">{result.recommendedSetup.stack}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs text-slate-400">추천 결제/세무</div>
              <div className="text-xs font-semibold text-white mt-1">{result.recommendedSetup.payment}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs text-slate-400">최우선 트래픽 채널</div>
              <div className="text-xs font-semibold text-white mt-1">{result.recommendedSetup.trafficChannel}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200 text-xs flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-rose-300">절대 피해야 할 치명적 실수: </span>
              {result.fatalMistake}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => onSelectPhase(result.targetPhaseId)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
            >
              <ShieldCheck className="w-4 h-4" />
              해당 로드맵 단계 상세 가이드로 이동
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
