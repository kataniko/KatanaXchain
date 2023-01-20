import React, { createContext,useContext,useState ,useEffect} from 'react'

const Crypto = createContext();


const CryptoContext = ({ children }) => {
  //hook da currency e do simbolo 
  const [currency, setCurrency ] = useState("EUR");
  const [symbol, setSymbol ] = useState("€");
  
  //sempre que a currency for alterada , dá trigger a este useEffect que verifica e altera se necessário o simbolo consoante a currency
  useEffect(() => {
    if (currency === "EUR") setSymbol("€");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    //return dos valores para toda a app da currency , symbol e setcurrency .
    <Crypto.Provider value={{currency,symbol,setCurrency}}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};