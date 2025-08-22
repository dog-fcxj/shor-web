/**
 * @file LanguageSwitcher.tsx
 * A component that allows the user to switch between supported languages.
 */

import React from 'react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

function LanguageSwitcher({ currentLang, onLangChange }: LanguageSwitcherProps) {
  const inactiveClass = "text-slate-500 hover:text-sky-400";
  const activeClass = "text-sky-400 font-bold";

  return (
    <div className="absolute top-2 right-2 flex items-center space-x-2 text-sm">
      <button
        onClick={() => onLangChange('en')}
        className={`transition-colors ${currentLang === 'en' ? activeClass : inactiveClass}`}
      >
        EN
      </button>
      <span className="text-slate-600">/</span>
      <button
        onClick={() => onLangChange('zh')}
        className={`transition-colors ${currentLang === 'zh' ? activeClass : inactiveClass}`}
      >
        中文
      </button>
    </div>
  );
}

export default LanguageSwitcher;
