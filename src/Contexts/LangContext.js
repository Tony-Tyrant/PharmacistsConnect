import React, { useState, useContext } from 'react';

const LangContext = React.createContext();

export function LangProvider({ children }) {
    const [lang, setLang] = useState('zh'); // zh | en

    return (
        <LangContext.Provider value={[lang, setLang]}>
            {children}
        </LangContext.Provider>
    );
}

export const useLang = () => useContext(LangContext);