import React, { useState } from "react";
import { DollarSign, TrendingUp, Users, ShieldAlert, Check, HelpCircle } from "lucide-react";

export const MonetizationSimulator: React.FC = () => {
  const [targetMRR, setTargetMRR] = useState<number>(3000);
  const [monthlyPrice, setMonthlyPrice] = useState<number>(19);
  const [conversionRate, setConversionRate] = useState<number>(2.5); // %
  const [churnRate, setChurnRate] = useState<number>(5.0); // %
  const [annualMix, setAnnualMix] = useState<number>(30); // % of customers on annual (20% off)

  // Calculations
  // Average blended monthly price accounting for annual discount (20% discount for 30% of users)
  const annualDiscountMultiplier = 0.8;
  const blendedMonthlyARPU = monthlyPrice * (1 - (annualMix / 100) * (1 - annualDiscountMultiplier));

  // Required active paying subscribers
  const requiredSubscribers = Math.ceil(targetMRR / blendedMonthlyARPU);
  const annualARR = targetMRR * 12;

  // New customers needed per month just to cover churn
  const churnedPerMonth = Math.ceil(requiredSubscribers * (churnRate / 100));

  // Monthly unique visitors needed (assuming conversionRate % of visitors become paying customers)
  const monthlyVisitorsNeeded = Math.ceil((churnedPerMonth / (conversionRate / 100)) * 1.5);

  // Gateway fees simulation for $targetMRR
  // 1. Stripe: 2.9% + $0.30 per transaction
  const stripeFeePerTx = blendedMonthlyARPU * 0.029 + 0.30;
  const totalStripeFees = requiredSubscribers * stripeFeePerTx;
  const netStripe = Math.max(0, targetMRR - totalStripeFees);

  // 2. Lemon Squeezy: 5.0% + $0.50 per transaction (Includes global VAT/Sales Tax handling)
  const lemonFeePerTx = blendedMonthlyARPU * 0.05 + 0.50;
  const totalLemonFees = requiredSubscribers * lemonFeePerTx;
  const netLemon = Math.max(0, targetMRR - totalLemonFees);

  // Tax compliance cost comparison
  const taxAccountantMonthlyEstimate = 450; // Cost to hire EU VAT / US Sales Tax filing agency if using direct Stripe

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
              <DollarSign className="w-4 h-4" />
              <span>글로벌 SaaS 수익화 & MRR 시뮬레이터</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              목표 월 수익(MRR)을 달성하려면 몇 명의 고객이 필요할까?
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              가격 티어, 전환율, 이탈률을 입력하면 필요한 월간 방문자 수와 실 수령액(Stripe vs Lemon Squeezy)을 실시간 계산합니다.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">목표 연환산 매출(ARR):</span>
            <span className="text-base font-bold font-mono text-emerald-400 tabular-nums">
              ${annualARR.toLocaleString()} / yr
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-300 font-medium">목표 월간 반복 매출 (Target MRR)</span>
                <span className="font-mono text-emerald-400 font-bold tabular-nums">
                  ${targetMRR.toLocaleString()} / mo
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="20000"
                step="500"
                value={targetMRR}
                onChange={(e) => setTargetMRR(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>$500 (부업)</span>
                <span>$3,000 (1인 독립)</span>
                <span>$10,000 (팀 스케일)</span>
                <span>$20,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-300 font-medium">월간 구독 가격 (Monthly Pro Tier)</span>
                <span className="font-mono text-indigo-400 font-bold tabular-nums">${monthlyPrice} / mo</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[9, 15, 19, 29, 49].map((p) => (
                  <button
                    key={p}
                    onClick={() => setMonthlyPrice(p)}
                    className={`py-1.5 text-xs font-mono font-medium rounded-lg border transition-colors ${
                      monthlyPrice === p
                        ? "bg-indigo-600 text-white border-indigo-500"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    ${p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-300 font-medium">무료→유료 결제 전환율 (Conversion Rate)</span>
                <span className="font-mono text-slate-200 font-bold tabular-nums">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="text-[11px] text-slate-400 mt-1">
                글로벌 B2B SaaS 평균: 2.0% ~ 3.5% / 마이크로 툴: 1.5% ~ 2.5%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-slate-300 font-medium mb-1">월간 구독 이탈률 (Monthly Churn)</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="15"
                    step="0.5"
                    value={churnRate}
                    onChange={(e) => setChurnRate(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-xs text-slate-400">%</span>
                </div>
                <span className="text-[10px] text-slate-400">건강한 SaaS: &lt;5%</span>
              </div>
              <div>
                <div className="text-xs text-slate-300 font-medium mb-1">연간 결제 비율 (Annual Mix)</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="80"
                    step="5"
                    value={annualMix}
                    onChange={(e) => setAnnualMix(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-xs text-slate-400">%</span>
                </div>
                <span className="text-[10px] text-slate-400">20% 할인 시 현금 확보</span>
              </div>
            </div>
          </div>

          {/* Results Summary Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>필요 유료 고객 수</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">
                  {requiredSubscribers.toLocaleString()} <span className="text-xs font-normal text-slate-400">명</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  월 ${monthlyPrice} 결제자 기준
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>필요 월 방문자(트래픽)</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">
                  {monthlyVisitorsNeeded.toLocaleString()} <span className="text-xs font-normal text-slate-400">UV</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  이탈 방어 및 신규 순증 기준
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>월 이탈 방어 목표</span>
                </div>
                <div className="text-2xl font-bold font-mono text-amber-300 mt-2 tabular-nums">
                  {churnedPerMonth} <span className="text-xs font-normal text-slate-400">명/월</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  이탈률 {churnRate}% 방어 필요
                </div>
              </div>
            </div>

            {/* Payment Processor Fee Comparison */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center justify-between">
                <span>결제사별 실 수령액 및 세무 비용 비교 (월 ${targetMRR.toLocaleString()} 기준)</span>
                <span className="text-[11px] text-indigo-400">한국 거주 1인 개발자 기준</span>
              </div>

              <div className="space-y-3">
                {/* Lemon Squeezy */}
                <div className="p-3.5 rounded-lg bg-indigo-950/20 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">Lemon Squeezy / Paddle (MoR)</span>
                      <span className="text-[11px] text-indigo-300 bg-indigo-900/60 px-2 py-0.5 rounded border border-indigo-700/50">
                        1인 개발자 강력 추천
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      수수료 5% + 50¢ · 전 세계 100여 개국 EU VAT 및 US 세금 100% 법적 신고 대행
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums">
                      ${Math.round(netLemon).toLocaleString()} <span className="text-xs text-slate-400">/월 실입금</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      (수수료 약 ${Math.round(totalLemonFees)} 공제)
                    </div>
                  </div>
                </div>

                {/* Direct Stripe */}
                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-300">Stripe (직접 연동)</span>
                      <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        미국 법인 보유 시 적합
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      수수료 2.9% + 30¢ · 단, 해외 부가세(VAT) 직접 계산 및 국가별 세무 신고 의무 발생
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-bold font-mono text-slate-200 tabular-nums">
                      ${Math.round(netStripe).toLocaleString()} <span className="text-xs text-slate-400">/월</span>
                    </div>
                    <div className="text-[11px] text-rose-400 font-mono">
                      (세무 대행사 고용 시 -${taxAccountantMonthlyEstimate}/월 추가)
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Merchant of Record(MoR)란?</strong> 법적으로 결제 주체가 고객과 직접 거래하여 해당 국가의 부가세를 원천징수한 뒤 세무서에 납부해 주는 대행 모델입니다. 한국 1인 개발자가 Stripe를 직접 쓰면 유럽 각국 세무서에 개별 등록해야 하는 악몽을 겪게 되므로 초기에는 <strong>Lemon Squeezy</strong>가 압도적으로 안전합니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
