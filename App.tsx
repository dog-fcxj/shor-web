/**
 * @file App.tsx
 * This is the main component of the Shor's Algorithm Explorer application.
 * It manages the application's state, including the number to be factored,
 * the list of factorization attempts, loading states, errors, and final results.
 * It also orchestrates the UI, rendering the input form, attempt cards, and explanation modal.
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Katex from 'react-katex';
import { ShorAttempt, ExplanationTopic, Language } from './types';
import { runShor } from './services/shor';
import { translations } from './i18n/locales';
import InputForm from './components/InputForm';
import AttemptCard from './components/AttemptCard';
import Modal from './components/Modal';
import GeminiExplanation from './components/GeminiExplanation';
import LanguageSwitcher from './components/LanguageSwitcher';

/**
 * The main application component.
 */
function App() {
  // State to store the history of all factorization attempts for the current number.
  const [attempts, setAttempts] = useState<ShorAttempt[]>([]);
  // State to indicate if the algorithm is currently running.
  const [isLoading, setIsLoading] = useState(false);
  // State to store any error messages that occur during factorization.
  const [error, setError] = useState<string | null>(null);
  // State to store the final factors once they are found.
  const [finalFactors, setFinalFactors] = useState<bigint[] | null>(null);
  // State to keep track of the number currently being factored.
  const [currentN, setCurrentN] = useState<bigint | null>(null);
  
  // State for controlling the explanation modal visibility.
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to store which topic is being explained in the modal.
  const [explanationTopic, setExplanationTopic] = useState<ExplanationTopic | null>(null);

  // State for the current language, defaulting to English.
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  // Ref to the container div for all attempt cards to enable auto-scrolling.
  const attemptsContainerRef = useRef<HTMLDivElement>(null);
  
  // Effect to set the document language attribute whenever the language changes.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);


  // Effect to automatically scroll to the latest attempt card when a new one is added.
  useEffect(() => {
    if (attemptsContainerRef.current) {
        const lastCard = attemptsContainerRef.current.lastElementChild;
        if (lastCard) {
            lastCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }
  }, [attempts]);

  /**
   * Callback to open the explanation modal for a specific topic.
   * @param topic The explanation topic to display.
   */
  const handleExplain = useCallback((topic: ExplanationTopic) => {
    setExplanationTopic(topic);
    setIsModalOpen(true);
  }, []);

  /**
   * Initiates the factorization process for a given number.
   * This function sets up the initial state and then iterates through the
   * steps of the Shor's algorithm simulation provided by the `runShor` generator.
   * @param nToFactor The integer to be factored.
   */
  const startFactorization = async (nToFactor: number) => {
    const N = BigInt(nToFactor);
    // Basic input validation.
    if (N <= 1n) {
      setError(t.errorNumberTooSmall);
      return;
    }
    if (N % 2n === 0n) {
      setError(t.errorNumberEven);
      setFinalFactors([2n, N/2n]);
      return;
    }

    // Reset application state for a new factorization run.
    setIsLoading(true);
    setAttempts([]);
    setError(null);
    setFinalFactors(null);
    setCurrentN(N);

    try {
      // Consume the async generator from runShor to get step-by-step updates.
      for await (const attempt of runShor(N, t)) {
        // Update the state with the latest information for the current attempt.
        setAttempts(prev => {
          const existingAttemptIndex = prev.findIndex(a => a.id === attempt.id);
          if (existingAttemptIndex > -1) {
            // If the attempt already exists, update it.
            const updatedAttempts = [...prev];
            updatedAttempts[existingAttemptIndex] = attempt;
            return updatedAttempts;
          }
          // Otherwise, add it as a new attempt.
          return [...prev, attempt];
        });

        // If a successful factorization occurs, store the factors and stop.
        if (attempt.status === 'success' && attempt.factors) {
          setFinalFactors(attempt.factors);
          break;
        }
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 relative">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500 mb-2">
            {t.title}
          </h1>
          <p className="text-slate-400">
            {t.subtitle}
          </p>
          <LanguageSwitcher currentLang={language} onLangChange={setLanguage} />
        </header>

        <main>
          <InputForm onStart={startFactorization} isLoading={isLoading} t={t} />
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg my-6 text-center">
              <strong>{t.errorLabel}:</strong> {error}
            </div>
          )}

          {currentN && !finalFactors && (
            <div className="my-6 text-center text-lg">
              <p>{t.runningFactorization(currentN.toString())}</p>
            </div>
          )}

          <div ref={attemptsContainerRef} className="space-y-6">
            {attempts.map((attempt) => (
              <AttemptCard key={attempt.id} attempt={attempt} onExplain={handleExplain} t={t} />
            ))}
          </div>

          {isLoading && (
            <div className="flex justify-center items-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
              <p className="ml-4 text-slate-400">{t.simulatingQuantum}</p>
            </div>
          )}

          {finalFactors && (
            <div className="mt-8 p-6 bg-green-900/50 border border-green-700 rounded-lg shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-green-300 mb-4">{t.factorizationComplete}</h2>
              <div className="text-2xl sm:text-3xl text-slate-200">
                <Katex.InlineMath math={`${finalFactors[0].toString()} \\times ${finalFactors[1].toString()} = ${currentN?.toString()}`} />
              </div>
            </div>
          )}

          {attempts.length > 0 && !finalFactors && !isLoading && !error && (
             <div className="mt-8 p-6 bg-yellow-900/50 border border-yellow-700 rounded-lg shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-yellow-300 mb-2">{t.factorizationFailed}</h2>
              <p className="text-lg">
                {t.factorizationFailedMessage(currentN?.toString() ?? '')}
              </p>
            </div>
          )}

        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={t}>
        {explanationTopic && (
          <GeminiExplanation topic={explanationTopic} lang={language} />
        )}
      </Modal>
    </div>
  );
}

export default App;