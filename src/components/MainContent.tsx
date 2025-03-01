
'use client';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import TransactionWrapper from './TransactionWrapper';
import SelectionScreen from './SelectionScreen';

export default function MainContent() {
  const { isConnected, address } = useAccount();
  const [hasSelectedPreferences, setHasSelectedPreferences] = useState(false);
  const [selectedReligion, setSelectedReligion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleSelectionComplete = (religion: string, language: string) => {
    setSelectedReligion(religion);
    setSelectedLanguage(language);
    setHasSelectedPreferences(true);
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-lg">Please sign in to continue</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {!hasSelectedPreferences ? (
        <SelectionScreen onSelectionComplete={handleSelectionComplete} />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm">
            Selected: {selectedReligion} - {selectedLanguage}
          </p>
          {address && <TransactionWrapper address={address} />}
        </div>
      )}
    </div>
  );
}
