
'use client';
import { useEffect, useState } from 'react';
import ReligionLanguageSelector from './ReligionLanguageSelector';
import LoginButton from './LoginButton';

export default function UserOnboarding() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const response = await fetch('/__replauthuser');
        if (response.ok) {
          const userData = await response.json();
          setIsLoggedIn(!!userData.id); // Set true if user ID exists
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-bold mb-4">Please log in to continue</h2>
        <LoginButton />
      </div>
    );
  }

  return <ReligionLanguageSelector />;
}
