
'use client';
import { useState } from 'react';
import { religions, languages } from '../constants/religions';

type Props = {
  onSelectionComplete: (religion: string, language: string) => void;
};

export default function SelectionScreen({ onSelectionComplete }: Props) {
  const [selectedReligion, setSelectedReligion] = useState(religions[0].religion);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].code);

  const handleReligionSelect = (religion: string) => {
    setSelectedReligion(religion);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleActionClick = () => {
    onSelectionComplete(selectedReligion, selectedLanguage);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold">Select Your Preferences</h2>
      
      <div className="w-full">
        <h3 className="mb-2 font-medium">Select Religion</h3>
        <div className="grid grid-cols-4 gap-4">
          {religions.map((item) => (
            <button
              key={item.religion}
              onClick={() => handleReligionSelect(item.religion)}
              className={`p-4 text-2xl rounded-lg flex items-center justify-center ${
                selectedReligion === item.religion 
                  ? 'bg-blue-200 border-2 border-blue-500' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label={item.religion}
            >
              {item.emoji}
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-full">
        <h3 className="mb-2 font-medium">Select Language</h3>
        <div className="flex gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`px-6 py-2 rounded-lg font-medium ${
                selectedLanguage === lang.code 
                  ? 'bg-blue-200 border-2 border-blue-500' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {lang.code}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleActionClick}
        className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
      >
        {religions.find(r => r.religion === selectedReligion)?.actionText || "Continue"}
      </button>
    </div>
  );
}
