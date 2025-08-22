/**
 * @file QuantumCircuitDiagram.tsx
 * This component renders a simplified SVG diagram of the quantum circuit used in
 * Shor's algorithm for period finding. It is a visual aid to help users understand
 * the quantum part of the process.
 */

import React from 'react';
import { ExplanationTopic } from '../types';
import ExplainButton from './ExplainButton';
import type { TranslationSet } from '../i18n/locales';

/**
 * Props for the QuantumCircuitDiagram component.
 */
interface QuantumCircuitDiagramProps {
  /** The number of qubits in the first register. */
  tQubits: number;
  /** The number of qubits in the second register, determined by the number to be factored. */
  nBits: number;
  /** Callback function to trigger the explanation modal. */
  onExplain: (topic: ExplanationTopic) => void;
  /** The translation object for the current language. */
  t: TranslationSet;
}

/**
 * A component that displays a simplified diagram of the quantum circuit for period finding.
 * @param {QuantumCircuitDiagramProps} props - The props for the component.
 */
function QuantumCircuitDiagram({ tQubits, nBits, onExplain, t }: QuantumCircuitDiagramProps) {
  const height = 150;
  const width = 500;
  const wireY1 = 50;
  const wireY2 = 100;
  const startX = 20;
  const endX = width - 20;
  const gateSize = 30;

  return (
    <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-700 flex flex-col items-center">
       <div className="w-full flex justify-start mb-2">
            <h5 className="text-md font-semibold text-slate-300 flex items-center">
                {t.circuitDiagramTitle}
                 <ExplainButton onClick={() => onExplain(ExplanationTopic.QuantumCircuit)} t={t} />
            </h5>
        </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-lg">
        {/* Wires representing the two qubit registers */}
        <line x1={startX} y1={wireY1} x2={endX} y2={wireY1} stroke="white" strokeWidth="1" />
        <line x1={startX} y1={wireY2} x2={endX} y2={wireY2} stroke="white" strokeWidth="1" />

        {/* Labels for the registers */}
        <text x={startX - 15} y={wireY1 + 4} fill="white" fontSize="12" textAnchor="end">|0⟩⊗t</text>
        <text x={startX - 15} y={wireY2 + 4} fill="white" fontSize="12" textAnchor="end">|0⟩⊗n</text>
        <text x={endX + 15} y={wireY1 + 4} fill="white" fontSize="12">{t.circuitMeasure}</text>

        {/* Labels indicating the number of qubits in each register */}
        <text x={(startX + 100) / 2} y={wireY1 - 5} fill="gray" fontSize="10">{t.circuitQubits(tQubits)}</text>
        <line x1={startX} y1={wireY1-2} x2={startX} y2={wireY1+2} stroke="white" strokeWidth="1" />
        <line x1={100} y1={wireY1-2} x2={100} y2={wireY1+2} stroke="white" strokeWidth="1" />

        <text x={(startX + 100) / 2} y={wireY2 - 5} fill="gray" fontSize="10">{t.circuitQubits(nBits)}</text>
        <line x1={startX} y1={wireY2-2} x2={startX} y2={wireY2+2} stroke="white" strokeWidth="1" />
        <line x1={100} y1={wireY2-2} x2={100} y2={wireY2+2} stroke="white" strokeWidth="1" />


        {/* Quantum Gates */}
        {/* Hadamard Gate: Puts the first register into superposition */}
        <rect x={100} y={wireY1 - gateSize/2} width={gateSize} height={gateSize} fill="#0ea5e9" stroke="white" strokeWidth="1" />
        <text x={100 + gateSize/2} y={wireY1 + 5} fill="black" fontSize="12" textAnchor="middle" fontWeight="bold">H</text>

        {/* Controlled-U Gate: Computes the function f(x) = a^x mod N */}
        <rect x={200} y={wireY2 - gateSize/2} width={gateSize*1.5} height={gateSize} fill="#8b5cf6" stroke="white" strokeWidth="1" />
        <text x={200 + (gateSize*1.5)/2} y={wireY2 + 5} fill="black" fontSize="12" textAnchor="middle" fontWeight="bold">U_f</text>
        <line x1={200 + (gateSize*1.5)/2} y1={wireY1} x2={200 + (gateSize*1.5)/2} y2={wireY2 - gateSize/2} stroke="white" strokeWidth="1" />
        <circle cx={200 + (gateSize*1.5)/2} cy={wireY1} r="4" fill="#8b5cf6" />
        
        {/* Inverse Quantum Fourier Transform (QFT): Extracts the period information */}
        <rect x={320} y={wireY1 - gateSize/2} width={gateSize*2} height={gateSize} fill="#f59e0b" stroke="white" strokeWidth="1" />
        <text x={320 + gateSize} y={wireY1 + 5} fill="black" fontSize="12" textAnchor="middle" fontWeight="bold">QFT⁻¹</text>

        {/* Measurement Symbol: Represents measuring the first register */}
        <rect x={endX - gateSize} y={wireY1 - gateSize/2} width={gateSize} height={gateSize} fill="#10b981" stroke="white" strokeWidth="1" />
        <path d={`M ${endX - gateSize + 5} ${wireY1 + 5} A 10 10 0 0 1 ${endX - 5} ${wireY1 + 5}`} stroke="black" fill="none" strokeWidth="1.5" />
        <line x1={endX - gateSize/2} y1={wireY1 + 5} x2={endX - 5} y2={wireY1 - 8} stroke="black" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default QuantumCircuitDiagram;