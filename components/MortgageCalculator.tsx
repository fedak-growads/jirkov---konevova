"use client";

import { useMemo, useState } from "react";
import { property } from "@/data/property";
import Reveal from "./Reveal";

const fmt = (n: number) => new Intl.NumberFormat("cs-CZ").format(Math.round(n));

/** Annuity loan payment formula. */
function monthlyPayment(loanAmount: number, annualRatePct: number, years: number) {
  if (loanAmount <= 0 || years <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return loanAmount / n;
  return (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

export default function MortgageCalculator() {
  const [downPct, setDownPct] = useState<number>(property.mortgage.defaultDownPaymentPct);
  const [years, setYears] = useState<number>(property.mortgage.defaultTermYears);
  const [ratePct, setRatePct] = useState<number>(property.mortgage.defaultRatePct);

  const fees = property.monthlyFees;
  const hasFees = fees.enabled && fees.amount > 0;

  const calc = useMemo(() => {
    const down = (property.price * downPct) / 100;
    const loan = property.price - down;
    const monthly = monthlyPayment(loan, ratePct, years);
    const totalPaid = monthly * years * 12;
    const totalInterest = totalPaid - loan;
    const totalMonthly = monthly + (hasFees ? fees.amount : 0);
    return { down, loan, monthly, totalPaid, totalInterest, totalMonthly };
  }, [downPct, years, ratePct, hasFees, fees.amount]);

  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-bg-soft border-y border-border">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal text-center mb-3">
            Hypoteční kalkulačka
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text text-center mb-3">
            Kolik byste platili měsíčně?
          </h2>
          <p className="text-sm text-text-muted text-center mb-10 max-w-xl mx-auto">
            Orientační výpočet pro tento byt. Posuňte parametry a uvidíte změnu okamžitě.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden">
            {/* Top: result */}
            <div className="bg-teal-dark text-white p-6 md:p-8">
              {hasFees ? (
                <>
                  {/* Two side-by-side cards: hypotéka + provoz */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5">
                    <div className="rounded-xl bg-white/10 border border-white/10 px-4 py-4 text-center">
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 mb-1.5">
                        Hypotéka
                      </p>
                      <div className="font-display text-xl md:text-2xl tabular-nums">
                        {fmt(calc.monthly)} Kč
                      </div>
                      <p className="text-[10px] text-white/50 mt-1">měsíčně</p>
                    </div>
                    <div className="rounded-xl bg-white/10 border border-white/10 px-4 py-4 text-center">
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 mb-1.5">
                        Provoz bytu
                      </p>
                      <div className="font-display text-xl md:text-2xl tabular-nums">
                        {fmt(fees.amount)} Kč
                      </div>
                      <p className="text-[10px] text-white/50 mt-1">měsíčně</p>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-center pt-3 border-t border-white/15">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal-mid mb-2">
                      Celkem měsíčně za bydlení
                    </p>
                    <div className="font-display text-4xl md:text-5xl tabular-nums">
                      {fmt(calc.totalMonthly)} Kč
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal-mid mb-2">
                    Měsíční splátka hypotéky
                  </p>
                  <div className="font-display text-4xl md:text-5xl tabular-nums">
                    {fmt(calc.monthly)} Kč
                  </div>
                </div>
              )}

              <p className="text-xs text-white/65 mt-4 text-center">
                Cena bytu: {fmt(property.price)} Kč · Vlastní zdroje: {fmt(calc.down)} Kč
                {" · "}Úvěr: {fmt(calc.loan)} Kč
              </p>

              {hasFees && fees.context && (
                <p className="text-[11px] text-white/55 mt-2 italic text-center">
                  Provoz bytu kalkulován {fees.context}
                </p>
              )}
            </div>

            {/* Sliders */}
            <div className="p-6 md:p-8 space-y-6">
              <SliderField
                label="Vlastní zdroje"
                value={`${downPct} %`}
                hint={`(${fmt(calc.down)} Kč)`}
                min={10}
                max={50}
                step={5}
                current={downPct}
                onChange={setDownPct}
              />
              <SliderField
                label="Doba splácení"
                value={`${years} let`}
                min={10}
                max={30}
                step={5}
                current={years}
                onChange={setYears}
              />
              <SliderField
                label="Úroková sazba"
                value={`${ratePct.toFixed(1)} % p.a.`}
                min={3.5}
                max={7.5}
                step={0.1}
                current={ratePct}
                onChange={setRatePct}
              />

              {/* Summary stats */}
              <div className="pt-2 grid grid-cols-2 gap-4 text-center border-t border-border">
                <div className="pt-4">
                  <div className="text-xs text-text-muted uppercase tracking-wider mb-1">
                    Celkově zaplaceno
                  </div>
                  <div className="font-display text-lg text-text tabular-nums">
                    {fmt(calc.totalPaid)} Kč
                  </div>
                </div>
                <div className="pt-4">
                  <div className="text-xs text-text-muted uppercase tracking-wider mb-1">
                    Z toho úroky
                  </div>
                  <div className="font-display text-lg text-text tabular-nums">
                    {fmt(calc.totalInterest)} Kč
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-text-light text-center leading-relaxed pt-1">
                Orientační výpočet anuitní splátky. Konečná sazba závisí na bonitě,
                příjmech a dalších faktorech.
              </p>

              {hasFees && fees.note && (
                <div className="rounded-lg bg-teal-light/50 border border-teal-mid/40 px-4 py-3 text-xs text-text-muted leading-relaxed">
                  <span className="font-medium text-text">Co je v provozu zahrnuto:</span>{" "}
                  {fees.note}
                </div>
              )}

              {/* Soft hint — primary CTA stays in main lead form below */}
              <p className="text-xs text-text-muted text-center leading-relaxed pt-2 border-t border-border">
                💡 Marie spolupracuje s hypoteční poradkyní. Pokud chcete přesný výpočet
                na míru, zaškrtněte „Chci řešit i hypotéku" v poptávce níže.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SliderField({
  label,
  value,
  hint,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string;
  value: string;
  hint?: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm text-text font-medium">{label}</label>
        <div className="text-sm font-medium text-teal tabular-nums">
          {value}
          {hint && <span className="text-text-muted font-normal ml-1.5">{hint}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-teal h-1.5 cursor-pointer"
      />
      <div className="flex justify-between text-[11px] text-text-light mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
