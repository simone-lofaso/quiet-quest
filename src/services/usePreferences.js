import { createContext, useContext, useState } from "react";

const PreferencesContext = createContext();

export const usePreferencesContext = () => useContext(PreferencesContext);

export const PreferenceProvider = ({ children }) => {
    const [preferences, setPreferences] = useState({});

    return <PreferencesContext.Provider value={{preferences, setPreferences}}>{children}</PreferencesContext.Provider>
}