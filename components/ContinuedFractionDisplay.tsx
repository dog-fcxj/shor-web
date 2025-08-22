/**
 * @file ContinuedFractionDisplay.tsx
 * This component renders a table of the convergents calculated from the continued
 * fraction expansion. It highlights the row corresponding to the chosen period candidate.
 */

import React from 'react';
import Katex from 'react-katex';
import { Convergent } from '../types';

/**
 * Props for the ContinuedFractionDisplay component.
 */
interface ContinuedFractionDisplayProps {
  /** An array of convergent objects to be displayed in the table. */
  convergents: Convergent[];
  /** The denominator selected as the best candidate for the period 'r'. */
  candidateR: bigint;
}

/**
 * A component that displays the results of the continued fraction expansion in a table.
 * @param {ContinuedFractionDisplayProps} props - The props for the component.
 */
function ContinuedFractionDisplay({ convergents, candidateR }: ContinuedFractionDisplayProps) {
  return (
    <div className="overflow-x-auto bg-slate-950/50 p-4 rounded-lg border border-slate-700">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="border-b border-slate-600 text-slate-400">
          <tr>
            <th className="p-2 text-center"><Katex.InlineMath math="k" /></th>
            <th className="p-2 text-center"><Katex.InlineMath math="a_k" /></th>
            <th className="p-2 text-center">Convergent <Katex.InlineMath math="\frac{p_k}{q_k}" /></th>
            <th className="p-2 text-center">Denominator <Katex.InlineMath math="q_k" /></th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {convergents.map((c, i) => (
            <tr 
              key={i} 
              className={`border-b border-slate-700/50 ${c.denominator === candidateR ? 'bg-sky-800/50 text-sky-300' : ''}`}
              title={c.denominator === candidateR ? "This denominator is the best candidate for the period 'r'" : ""}
            >
              <td className="p-2 text-center">{i}</td>
              <td className="p-2 text-center">{c.a.toString()}</td>
              <td className="p-2 text-center">{`${c.numerator.toString()}/${c.denominator.toString()}`}</td>
              <td className="p-2 text-center">{c.denominator.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-center text-slate-300">
        Best candidate for period <Katex.InlineMath math={`r = ${candidateR.toString()}`} />.
      </p>
    </div>
  );
}

export default ContinuedFractionDisplay;
