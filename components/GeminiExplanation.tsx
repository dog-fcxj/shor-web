/**
 * @file GeminiExplanation.tsx
 * This component displays detailed explanations for various topics related to Shor's algorithm.
 * It currently uses a dictionary of static text but is designed to be potentially replaced
 * with dynamic content from a generative model. It also handles parsing and rendering
 * LaTeX-style math formulas within the text.
 */

import React from 'react';
import Katex from 'react-katex';
import { ExplanationTopic, Language } from '../types';
import { explanationContent, explanationTitles } from '../i18n/locales';

/**
 * Props for the GeminiExplanation component.
 */
interface ExplanationProps {
  /** The topic to display an explanation for. */
  topic: ExplanationTopic;
  /** The current language code. */
  lang: Language;
}

/**
 * A component that displays an explanation for a given topic.
 * @param {ExplanationProps} props The props for the component.
 */
function GeminiExplanation({ topic, lang }: ExplanationProps) {
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
  
  const title = explanationTitles[lang][topic] || "Explanation";
  const explanation = explanationContent[lang][topic] || "Explanation not found.";

  return (
    <div>
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500 mb-4">
        {title}
      </h3>
      <div className="text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-4 -mr-4">
        {parseAndRender(explanation)}
      </div>
    </div>
  );
}

export default GeminiExplanation;