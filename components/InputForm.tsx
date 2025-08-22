/**
 * @file InputForm.tsx
 * This component provides the user interface for inputting the number to be factored.
 * It includes an input field, a submit button, and handles basic client-side validation.
 */

import React, { useState, FormEvent } from 'react';

/**
 * Props for the InputForm component.
 */
interface InputFormProps {
  /** Function to call when the factorization process is started. */
  onStart: (n: number) => void;
  /** Boolean indicating if the main application is in a loading state. */
  isLoading: boolean;
}

/**
 * A form component for users to enter a number and start the factorization process.
 * @param {InputFormProps} props - The props for the component.
 */
function InputForm({ onStart, isLoading }: InputFormProps) {
  // State for the value of the number input field.
  const [inputValue, setInputValue] = useState('91');
  // State for displaying validation error messages.
  const [error, setError] = useState('');

  /**
   * Handles the form submission event.
   * It performs validation on the input value before calling the onStart callback.
   * @param e The form event.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const n = parseInt(inputValue, 10);
    if (isNaN(n) || n <= 3 || n > 100000) {
      setError('Please enter an integer between 4 and 100,000.');
      return;
    }
     if (n % 2 === 0) {
      setError('Please enter an odd number. A factor is 2.');
      return;
    }
    setError('');
    onStart(n);
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700 mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
        <label htmlFor="number-input" className="font-semibold text-lg whitespace-nowrap">
          Factorize N =
        </label>
        <input
          id="number-input"
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full sm:w-auto flex-grow bg-slate-900 border border-slate-600 rounded-md px-4 py-2 text-lg text-center font-mono focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
          placeholder="e.g., 91"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-transform duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
        >
          {isLoading ? 'Running...' : 'Start Factorization'}
        </button>
      </form>
      {error && <p className="text-red-400 mt-3 text-center sm:text-left">{error}</p>}
       <div className="text-sm text-slate-400 mt-4 text-center">
        Try composite odd numbers like 15, 35, 91, 143, or 323.
      </div>
    </div>
  );
}

export default InputForm;
