import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Define the shape of the user and the context
interface User {
  token: string;
}

interface AuthContextProps {
  user: User | null;
  isAuthReady: boolean;
}

// Create the context with an initial null value
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// A simple provider that sets up a mock user
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    // Simulate an async authentication check, like checking a local storage token
    const mockAuthCheck = () => {
      // Placeholder: In a real app, this would check for a stored token or make an API call
      const mockToken = "mock-jwt-token-for-development";
      setUser({ token: mockToken });
      setIsAuthReady(true);
    };

    // Simulate a small delay for a more realistic loading state
    setTimeout(mockAuthCheck, 500);
  }, []); // Run only once on component mount

  const value = { user, isAuthReady };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};