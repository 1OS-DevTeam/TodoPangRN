import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { loadingManager } from '../../api/utils/loadingManager';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  incrementLoading: () => void;
  decrementLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const removeListener = loadingManager.addListener((loading: boolean) => {
      setIsLoading(loading);
    });
    
    return removeListener;
  }, []);
  
  const setLoading = (loading: boolean) => {
    if (loading) {
      loadingManager.incrementLoading();
    } else {
      loadingManager.decrementLoading();
    }
  };
  
  const incrementLoading = () => {
    loadingManager.incrementLoading();
  };
  
  const decrementLoading = () => {
    loadingManager.decrementLoading();
  };

  const value: LoadingContextType = {
    isLoading,
    setLoading,
    incrementLoading,
    decrementLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}; 