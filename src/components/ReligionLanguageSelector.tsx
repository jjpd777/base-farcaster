
'use client';
import { useState } from 'react';

// Define the religion options
const religionOptions = [
  { religion: "Christianity", emoji: "✝️", prompt: "", actionText: "Daily Bible" },
  { religion: "Orthodox", emoji: "☦️", prompt: "", actionText: "Daily Bible" },
  { religion: "Judaism", emoji: "✡️", prompt: "", actionText: "Daily Torah" },
  { religion: "Islam", emoji: "☪️", prompt: "", actionText: "Daily Quran" },
  { religion: "Hinduism", emoji: "🕉️", prompt: "", actionText: "Daily Bhagavad Gita" },
  { religion: "Sikhism", emoji: "🪯", prompt: "", actionText: "Daily Adi Granth" },
  { religion: "Buddhism", emoji: "☸️", prompt: "", actionText: "Daily Buddhist Lesson" },
  { religion: "Atheism", emoji: "⚛️", prompt: "", actionText: "Daily Science Lesson" },
];

// Define the language options
const languageOptions = ["ENG", "SPN"];

export default function ReligionLanguageSelector() {
  // Set Christianity as default
  const [selectedReligion, setSelectedReligion] = useState(religionOptions[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-md mx-auto my-6">
      <h2 className="text-2xl font-bold mb-4">Select Your Preferences</h2>
      
      {/* Religion Selection */}
      <div className="w-full mb-6">
        <h3 className="text-lg font-medium mb-2">Select your religion:</h3>
        <div className="grid grid-cols-4 gap-3">
          {religionOptions.map((option) => (
            <button
              key={option.religion}
              className={`text-3xl p-2 rounded-md ${
                selectedReligion.religion === option.religion 
                  ? 'bg-blue-100 ring-2 ring-blue-500' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedReligion(option)}
              aria-label={option.religion}
            >
              {option.emoji}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Selected: {selectedReligion.religion}
        </p>
      </div>
      
      {/* Language Selection */}
      <div className="w-full mb-6">
        <h3 className="text-lg font-medium mb-2">Select your language:</h3>
        <div className="flex gap-4">
          {languageOptions.map((language) => (
            <button
              key={language}
              className={`py-2 px-4 rounded-md ${
                selectedLanguage === language 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedLanguage(language)}
            >
              {language}
            </button>
          ))}
        </div>
      </div>
      
      {/* Action Button */}
      <button 
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        {selectedReligion.actionText}
      </button>
    </div>
  );
}
