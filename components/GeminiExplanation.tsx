/**
 * @file GeminiExplanation.tsx
 * This component displays detailed explanations for various topics related to Shor's algorithm.
 * It currently uses a dictionary of static text but is designed to be potentially replaced
 * with dynamic content from a generative model. It also handles parsing and rendering
 * LaTeX-style math formulas within the text.
 */

import React from 'react';
import Katex from 'react-katex';
import { ExplanationTopic } from '../types';

/**
 * Props for the GeminiExplanation component.
 */
interface ExplanationProps {
  /** The topic to display an explanation for. */
  topic: ExplanationTopic;
}

/**
 * A dictionary containing pre-written static explanations for each topic.
 * This serves as the content source for the component.
 */
const staticExplanations: Record<ExplanationTopic, string> = {
  [ExplanationTopic.ShorIntro]: "Shor's algorithm is a quantum algorithm for integer factorization. Developed by Peter Shor in 1994, it's significant because it can factor large numbers exponentially faster than the best-known classical algorithms. This ability poses a threat to modern cryptography, which relies on the difficulty of factoring.\n\nThe algorithm cleverly combines classical steps with a quantum core. The main steps are:\n1. Choose a random number 'a'.\n2. Use a quantum computer to find the period 'r' of the function $f(x) = a^x \\pmod{N}$.\n3. Use the period 'r' in a classical calculation to find the factors of N.",
  [ExplanationTopic.CoprimeSelection]: "The first classical step is to pick a random integer 'a' such that $1 < a < N$. We then compute the greatest common divisor (GCD) of 'a' and 'N', written as $gcd(a, N)$.\n\nIf $gcd(a, N) > 1$, we have luckily found a non-trivial factor of N, and the algorithm terminates. If $gcd(a, N) = 1$, 'a' and 'N' are co-prime, and we proceed to the quantum part of the algorithm. This check is necessary because the subsequent steps rely on 'a' being co-prime with N to form a valid periodic function.",
  [ExplanationTopic.QuantumPeriodFinding]: "This is the heart of Shor's algorithm. We need to find the period 'r' of the function $$f(x) = a^x \\pmod{N}$$ The period 'r' is the smallest positive integer such that $a^r \\equiv 1 \\pmod{N}$.\n\nWhile finding 'r' is extremely hard for classical computers, a quantum computer can do it efficiently using the Quantum Fourier Transform (QFT). The quantum circuit prepares a superposition of states, computes $f(x)$ for all of them simultaneously, and then uses the QFT to transform the state, making the period 'r' likely to be revealed upon measurement.",
  [ExplanationTopic.QuantumCircuit]: "The simplified circuit consists of two registers of qubits. The first register (t-qubits) is initialized to a superposition of all possible input values using Hadamard (H) gates. The second register (n-qubits) is for storing the output of the function.\n\nA controlled-Uf gate then computes $f(x) = a^x \\pmod{N}$, entangling the two registers. Finally, an inverse Quantum Fourier Transform (QFT⁻¹) is applied to the first register. This transformation concentrates the probability amplitude on states related to the period 'r'. Measuring this first register gives a value from which 'r' can be deduced.",
  [ExplanationTopic.ContinuedFractions]: "The quantum measurement doesn't directly give us the period 'r'. Instead, it gives an integer 'c' which is a good approximation of a random multiple of $q/r$, where 'q' is the size of the first quantum register ($q = 2^t$). So, we have the approximation $$\\frac{c}{q} \\approx \\frac{s}{r}$$ for some unknown integer 's'.\n\nThe Continued Fractions algorithm is a classical method to find the best rational approximations for a given value. By applying it to $c/q$, we can efficiently recover the fraction $s/r$ and extract the denominator, which is our candidate for the period 'r'.",
  [ExplanationTopic.PeriodVerification]: "After the continued fractions step gives us a candidate period 'r', we must perform two classical checks.\n\nFirst, we check if 'r' is odd. If it is, the method fails for this 'a', and we must restart with a new one.\n\nSecond, if 'r' is even, we compute $a^{r/2} \\pmod{N}$. If this result is congruent to $-1 \\pmod{N}$ (or $N-1$), it leads to trivial factors (1 and N). This is also a failure case, requiring a restart. If 'r' is even and the second check passes, we have found a valid period and can proceed to the final step.",
  [ExplanationTopic.FinalFactorCalculation]: "Once a valid period 'r' is found (it's even and doesn't produce a trivial result), we know that $a^r \\equiv 1 \\pmod{N}$. This can be rewritten as $(a^{r/2} - 1)(a^{r/2} + 1) \\equiv 0 \\pmod{N}$.\n\nThis means that N must share a factor with either $(a^{r/2} - 1)$ or $(a^{r/2} + 1)$. We can find these factors by computing the greatest common divisor (GCD) with N:\n\n$$p = gcd(a^{r/2} - 1, N)$$\n$$q = gcd(a^{r/2} + 1, N)$$\n\nThese values, p and q, are the non-trivial factors of N.",
};

/**
 * A component that displays an explanation for a given topic.
 * @param {ExplanationProps} props The props for the component.
 */
function GeminiExplanation({ topic }: ExplanationProps) {
  /**
   * Parses a string of text, finds LaTeX expressions ($...$ and $$...$$),
   * and renders them using react-katex, while rendering the rest as plain text.
   * @param text The raw explanation string to parse.
   * @returns A React element containing the parsed content.
   */
  const parseAndRender = (text: string) => {
    if (!text) return null;
    // Regex to find $...$ (inline) and $$...$$ (block) LaTeX expressions.
    const regex = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g;
    const parts = text.split(regex).filter(Boolean);

    const elements = parts.map((part, index) => {
      // Render block math for expressions enclosed in $$
      if (part.startsWith('$$') && part.endsWith('$$')) {
        return <Katex.BlockMath key={index} math={part.slice(2, -2)} />;
      }
      // Render inline math for expressions enclosed in $
      if (part.startsWith('$') && part.endsWith('$')) {
        return <Katex.InlineMath key={index} math={part.slice(1, -1)} />;
      }
      // Render regular text
      return <span key={index}>{part}</span>;
    });

    // Use `white-space: pre-wrap` to preserve newlines from the original text for better readability.
    return <div style={{ whiteSpace: 'pre-wrap' }}>{elements}</div>;
  };
  
  const explanation = staticExplanations[topic] || "Explanation not found.";

  return (
    <div>
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500 mb-4">
        {topic}
      </h3>
      <div className="text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-4 -mr-4">
        {parseAndRender(explanation)}
      </div>
    </div>
  );
}

export default GeminiExplanation;
