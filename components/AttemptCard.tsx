/**
 * @file AttemptCard.tsx
 * This component is responsible for displaying the detailed information of a single
 * attempt to factor a number using Shor's algorithm. It visualizes each step
 * as the information becomes available.
 */

import React from 'react';
import Katex from 'react-katex';
import { ShorAttempt, ExplanationTopic } from '../types';
import QuantumCircuitDiagram from './QuantumCircuitDiagram';
import ContinuedFractionDisplay from './ContinuedFractionDisplay';
import ExplainButton from './ExplainButton';
import type { TranslationSet } from '../i18n/locales';

/**
 * Props for the AttemptCard component.
 */
interface AttemptCardProps {
  /** The attempt object containing all the data to display. */
  attempt: ShorAttempt;
  /** Callback function to trigger the explanation modal for a specific topic. */
  onExplain: (topic: ExplanationTopic) => void;
  /** The translation object for the current language. */
  t: TranslationSet;
}

/**
 * Helper function to determine the border and background color of the card based on its status.
 * @param status The current status of the attempt ('running', 'success', 'failed').
 * @returns A string of Tailwind CSS classes.
 */
const getStatusColorClasses = (status: ShorAttempt['status']) => {
  switch (status) {
    case 'success':
      return 'border-green-500 bg-green-900/30';
    case 'failed':
      return 'border-red-500 bg-red-900/30';
    case 'running':
    default:
      return 'border-sky-500 bg-sky-900/30';
  }
};

/**
 * A card component that displays the step-by-step progress of one factorization attempt.
 * @param {AttemptCardProps} props The props for the component.
 */
function AttemptCard({ attempt, onExplain, t }: AttemptCardProps) {
  const { id, n, a, status, gcdCheck, quantumResult, fractionResult, period, verification, factorizationResult, factors, error } = attempt;
  // A counter to number the steps as they are rendered.
  let step = 1;

  return (
    <div className={`border-2 rounded-lg shadow-xl overflow-hidden transition-all duration-500 ${getStatusColorClasses(status)}`}>
      <header className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-800/50 flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-200">
          {t.attemptTitle(id)}
        </h3>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${
            status === 'success' ? 'bg-green-500/20 text-green-300' :
            status === 'failed' ? 'bg-red-500/20 text-red-300' :
            'bg-sky-500/20 text-sky-300'
        }`}>
          {t.status[status]}
        </span>
      </header>
      
      <div className="p-4 sm:p-6 space-y-6">
        {/* Step 1: GCD Check */}
        <div className="border-b border-slate-700 pb-4">
          <h4 className="text-lg font-semibold text-slate-300 flex items-center">
            {step++}. {t.step1Title}
            <ExplainButton onClick={() => onExplain(ExplanationTopic.CoprimeSelection)} t={t} />
          </h4>
          <p className="text-slate-400 mt-2">
            {t.step1ChosenBase} <Katex.InlineMath math={`a = ${a.toString()}`} />
          </p>
          {gcdCheck && (
            <p className="text-slate-400 mt-1 animate-step-in">
              {t.step1CheckingGcd} <Katex.InlineMath math={`gcd(a, N) = gcd(${a.toString()}, ${n.toString()}) = ${gcdCheck.toString()}`} />
            </p>
          )}
        </div>

        {/* Step 2: Quantum Period Finding */}
        {quantumResult && (
          <div className="border-b border-slate-700 pb-4 animate-step-in">
            <h4 className="text-lg font-semibold text-slate-300 flex items-center">
              {step++}. {t.step2Title}
              <ExplainButton onClick={() => onExplain(ExplanationTopic.QuantumPeriodFinding)} t={t} />
            </h4>
            <p className="text-slate-400 mt-2 mb-4">
              {t.step2Description(a.toString(), n.toString())}
            </p>
            <QuantumCircuitDiagram tQubits={quantumResult.t} nBits={Math.ceil(Math.log2(Number(n)))} onExplain={onExplain} t={t} />
            <p className="text-slate-400 mt-4">
              {t.step2Measurement(quantumResult.c.toString(), quantumResult.t.toString(), quantumResult.q.toString())}
            </p>
          </div>
        )}

        {/* Step 3: Continued Fractions */}
        {fractionResult && (
          <div className="border-b border-slate-700 pb-4 animate-step-in">
            <h4 className="text-lg font-semibold text-slate-300 flex items-center">
              {step++}. {t.step3Title}
              <ExplainButton onClick={() => onExplain(ExplanationTopic.ContinuedFractions)} t={t} />
            </h4>
            <p className="text-slate-400 mt-2 mb-4">
              {t.step3Description} <Katex.BlockMath math={`\\frac{c}{q} = \\frac{${quantumResult?.c.toString()}}{${quantumResult?.q.toString()}}`} />
            </p>
            <ContinuedFractionDisplay convergents={fractionResult.convergents} candidateR={fractionResult.candidateR} t={t} />
          </div>
        )}

        {/* Step 4: Verification */}
        {verification && fractionResult && (
          <div className="border-b border-slate-700 pb-4 animate-step-in">
            <h4 className="text-lg font-semibold text-slate-300 flex items-center">
              {step++}. {t.step4Title}
              <ExplainButton onClick={() => onExplain(ExplanationTopic.PeriodVerification)} t={t} />
            </h4>
            <p className="text-slate-400 mt-2">{t.step4Description(fractionResult.candidateR.toString())}:</p>
            <div className="text-slate-300 pl-4 mt-1 space-y-1">
              <p>
                {t.step4IsOdd} <span className={verification.isPeriodOdd ? "text-red-400 font-bold" : "text-green-400 font-bold"}>{verification.isPeriodOdd ? t.yes : t.no}</span>.
              </p>
              {!verification.isPeriodOdd && (
                <p>
                  {t.step4IsTrivial} <span className={verification.isTrivial ? "text-red-400 font-bold" : "text-green-400 font-bold"}>{verification.isTrivial ? t.yes : t.no}</span>.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Final Result */}
        {factors && factorizationResult && period && (
           <div className="animate-step-in">
            <h4 className="text-lg font-semibold text-slate-300 flex items-center">
              {step++}. {t.step5Title}
              <ExplainButton onClick={() => onExplain(ExplanationTopic.FinalFactorCalculation)} t={t} />
            </h4>
            <p className="text-slate-400 mt-2">
              {t.step5Description(a.toString())}
            </p>
            <div className="bg-slate-950/50 p-4 rounded-lg mt-2 space-y-2 text-slate-300 border border-slate-700">
              <p>{t.step5Term} = <Katex.InlineMath math={`a^{\\frac{r}{2}} \\pmod{N} = ${a.toString()}^{\\frac{${period.toString()}}{2}} \\pmod{${n.toString()}} = ${factorizationResult.term.toString()}`} /></p>
              <p>{t.step5Factor1} = <Katex.InlineMath math={`gcd(Term - 1, N) = gcd(${(factorizationResult.term - 1n).toString()}, ${n.toString()}) = ${factorizationResult.p1.toString()}`} /></p>
              <p>{t.step5Factor2} = <Katex.InlineMath math={`gcd(Term + 1, N) = gcd(${(factorizationResult.term + 1n).toString()}, ${n.toString()}) = ${factorizationResult.p2.toString()}`} /></p>
            </div>
            <div className="mt-4 p-4 bg-green-900/40 border border-green-700 rounded-lg">
              <h5 className="font-bold text-green-300">{t.step5Success}</h5>
              <p className="text-lg text-green-200 mt-1">
                {t.step5FoundFactors(factors[0].toString(), factors[1].toString())}
              </p>
              <p className="text-lg text-green-200 mt-1">
                {t.step5Check} <Katex.InlineMath math={`${factors[0].toString()} \\times ${factors[1].toString()} = ${(factors[0] * factors[1]).toString()}`} />
              </p>
            </div>
           </div>
        )}

        {error && (
          <div className="animate-step-in">
            <h4 className="text-lg font-semibold text-red-400">{t.attemptFailed}</h4>
            <p className="text-slate-400 mt-2">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttemptCard;