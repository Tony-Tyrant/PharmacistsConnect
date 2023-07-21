import React, { useState, useContext } from 'react';

const InfoContext = React.createContext();

export function InfoProvider({ children }) {
    const [infoLocation, setInfoLocation] = useState(null);

    return (
        <InfoContext.Provider value={[infoLocation, setInfoLocation]}>
            {children}
        </InfoContext.Provider>
    );
}

export const useInfo = () => useContext(InfoContext);