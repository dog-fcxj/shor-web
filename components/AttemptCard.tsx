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

/**
 * Props for the AttemptCard component.
 */
interface AttemptCardProps {
  /** The attempt object containing all the data to display. */
  attempt: ShorAttempt;
  /** Callback function to trigger the explanation modal for a specific topic. */
  onExplain: (topic: ExplanationTopic) => void;
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
function AttemptCard({ attempt, onExplain }: AttemptCardProps) {
  const { id, n, a, status, gcdCheck, quantumResult, fractionResult, period, verification, factorizationResult, factors, error } = attempt;
  // A counter to number the steps as they are rendered.
  let step = 1;

  return (
    <div className={`border-2 rounded-lg shadow-xl overflow-hidden transition-all duration-500 ${getStatusColorClasses(status)}`}>
      <header className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-800/50 flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-200">
          Attempt #{id}
        </h3>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${
            status === 'success' ? 'bg-green-500/20 text-green-300' :
            status === 'failed' ? 'bg-red-500/20 text-red-300' :
            'bg-sky-500/20 text-sky-300'
        }`}>
          {status}
        </span>
      </header>
      
      <div className="p-4 sm:p-6 space-y-6">
        {/* Step 1: GCD Check */}
        <div className="border-b border-slate-700 pb-4">
          <h4 className="text-lg font-semibold text-slate-300 flex items-center">
            {step++}. Pick a base 'a' and check GCD
            <ExplainButton onClick={() => onExplain(ExplanationTopic.CoprimeSelection)} />
          </h4>
          <p className="text-slate-400 mt-2">
            Chosen base <Katex.InlineMath math={`a = ${a.toString()}`} />
          </p>
          {gcdCheck && (
            <p className="text-slate-400 mt-1 animate-step-in">
              Checking <Katex.InlineMath math={`gcd(a, N) = gcd(${a.toString()}, ${n.toString()}) = ${gcdCheck.toString()}`} />
            </p>
          )}
        </div>

        {/* Step 2: Quantum Period Finding */}
        {quantumResult && (
          <div className="border-b border-slate-700 pb-4 animate-step-in">
            <h4 className="text-lg font-semibold text-slate-300 flex items-center">
              {step++}. Quantum Period Finding
              <ExplainButton onClick={() => onExplain(ExplanationTopic.QuantumPeriodFinding)} />
            </h4>
            <p className="text-slate-400 mt-2 mb-4">
              Simulate the quantum circuit to find the period 'r' of <Katex.InlineMath math={`f(x) = ${a.toString()}^x \\pmod{${n.toString()}}`} />.
            </p>
            <QuantumCircuitDiagram t={quantumResult.t} nBits={Math.ceil(Math.log2(Number(n)))} onExplain={onExplain} />
            <p className="text-slate-400 mt-4">
              Simulated measurement: <Katex.InlineMath math={`c = ${quantumResult.c.toString()}`} /> on a register of size <Katex.InlineMath math={`q = 2^{${quantumResult.t}} = ${quantumResult.q.toString()}`} />.
            </p>
          </div>
        )}

        {/* Step 3: Continued Fractions */}
        {fractionResult && (
          <div className="border-b border-slate-700 pb-4 animate-step-in">
            <h4 className="text-lg font-semibold text-slate-300 flex items-center">
              {step++}. Continued Fraction Expansion
              <ExplainButton onClick={() => onExplain(ExplanationTopic.ContinuedFractions)} />
            </h4>
            <p className="text-slate-400 mt-2 mb-4">
              Expand the fraction <Katex.BlockMath math={`\\frac{c}{q} = \\frac{${quantumResult?.c.toString()}}{${quantumResult?.q.toString()}}`} /> to find a candidate for the period 'r'.
            </p>
            <ContinuedFractionDisplay convergents={fractionResult.convergents} candidateR={fractionResult.candidateR} />
          </div>
        )}

        {/* Step 4: Verification */}
        {verification && fractionResult && (
          <div className="border-b border-slate-700 pb-4 animate-step-in">
            <h4 className="text-lg font-semibold text-slate-300 flex items-center">
              {step++}. Verify Period
              <ExplainButton onClick={() => onExplain(ExplanationTopic.PeriodVerification)} />
            </h4>
            <p className="text-slate-400 mt-2">Verifying candidate period <Katex.InlineMath math={`r = ${fractionResult.candidateR.toString()}`} />:</p>
            <div className="text-slate-300 pl-4 mt-1 space-y-1">
              <p>
                Is 'r' odd? <span className={verification.isPeriodOdd ? "text-red-400 font-bold" : "text-green-400 font-bold"}>{verification.isPeriodOdd ? 'Yes' : 'No'}</span>.
              </p>
              {!verification.isPeriodOdd && (
                <p>
                  Is <Katex.InlineMath math={`a^{\\frac{r}{2}} \\equiv -1 \\pmod{N}`} /> (trivial result)? <span className={verification.isTrivial ? "text-red-400 font-bold" : "text-green-400 font-bold"}>{verification.isTrivial ? 'Yes' : 'No'}</span>.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Final Result */}
        {factors && factorizationResult && period && (
           <div className="animate-step-in">
            <h4 className="text-lg font-semibold text-slate-300 flex items-center">
              {step++}. Calculate Factors
              <ExplainButton onClick={() => onExplain(ExplanationTopic.FinalFactorCalculation)} />
            </h4>
            <p className="text-slate-400 mt-2">
              Since the period 'r' is valid, we can calculate the factors using the base <Katex.InlineMath math={`a = ${a.toString()}`} />:
            </p>
            <div className="bg-slate-950/50 p-4 rounded-lg mt-2 space-y-2 text-slate-300 border border-slate-700">
              <p>Term = <Katex.InlineMath math={`a^{\\frac{r}{2}} \\pmod{N} = ${a.toString()}^{\\frac{${period.toString()}}{2}} \\pmod{${n.toString()}} = ${factorizationResult.term.toString()}`} /></p>
              <p>Factor 1 = <Katex.InlineMath math={`gcd(Term - 1, N) = gcd(${(factorizationResult.term - 1n).toString()}, ${n.toString()}) = ${factorizationResult.p1.toString()}`} /></p>
              <p>Factor 2 = <Katex.InlineMath math={`gcd(Term + 1, N) = gcd(${(factorizationResult.term + 1n).toString()}, ${n.toString()}) = ${factorizationResult.p2.toString()}`} /></p>
            </div>
            <div className="mt-4 p-4 bg-green-900/40 border border-green-700 rounded-lg">
              <h5 className="font-bold text-green-300">Success & Verification</h5>
              <p className="text-lg text-green-200 mt-1">
                Found factors <Katex.InlineMath math={`${factors[0].toString()}`} /> and <Katex.InlineMath math={`${factors[1].toString()}`} />
              </p>
              <p className="text-lg text-green-200 mt-1">
                Check: <Katex.InlineMath math={`${factors[0].toString()} \\times ${factors[1].toString()} = ${(factors[0] * factors[1]).toString()}`} />
              </p>
            </div>
           </div>
        )}

        {error && (
          <div className="animate-step-in">
            <h4 className="text-lg font-semibold text-red-400">Attempt Failed</h4>
            <p className="text-slate-400 mt-2">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttemptCard;
