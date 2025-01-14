import React, { createContext, useContext, useState, ReactNode } from "react";

type Currency = {
  abbreviation: string;
  name: string;
};

type CurrencyContextType = {
  fromCurrency: Currency | null;
  toCurrency: Currency | null;
  setFromCurrency: React.Dispatch<React.SetStateAction<Currency | null>>;
  setToCurrency: React.Dispatch<React.SetStateAction<Currency | null>>;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
}) => {
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);

  return (
    <CurrencyContext.Provider
      value={{ fromCurrency, toCurrency, setFromCurrency, setToCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
