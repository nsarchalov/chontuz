import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<Props> = ({ current, onChange }) => {
  return (
    <div className="flex gap-2">
      {(['ru', 'kg', 'en'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`px-2 py-1 rounded text-sm font-semibold transition-colors ${
            current === lang
              ? 'bg-primary-600 text-white'
              : 'bg-white text-primary-900 hover:bg-primary-100'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};