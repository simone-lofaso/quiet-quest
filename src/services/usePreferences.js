// import { createContext, useContext, useState } from "react";

// const PreferencesContext = createContext();

// export const usePreferencesContext = () => useContext(PreferencesContext);

// export const PreferenceProvider = ({ children }) => {
//     const [preferences, setPreferences] = useState({});

//     return <PreferencesContext.Provider value={{preferences, setPreferences}}>{children}</PreferencesContext.Provider>
// }


import { createContext, useContext, useState } from "react";
import { auth, db } from "../config/firebase"; // Import Firebase
import { doc, setDoc, getDoc } from "firebase/firestore";

const PreferencesContext = createContext();

export const usePreferencesContext = () => useContext(PreferencesContext);

export const PreferenceProvider = ({ children }) => {
    const [preferences, setPreferences] = useState({});

    const savePreferencesToFirebase = async (newPreferences) => {
        const user = auth.currentUser;
        if (user) {
            try {
                const userDocRef = doc(db, "users", user.uid);
                await setDoc(userDocRef, { preferences: newPreferences }, { merge: true });
                console.log("Preferences saved to Firebase.");
            } catch (error) {
                console.error("Error saving preferences to Firebase:", error);
            }
        } else {
            console.warn("User is not logged in. Preferences not saved to Firebase.");
        }
    };

    const updatePreferences = (newPreferences) => {
        setPreferences((prev) => {
            const updated = { ...prev, ...newPreferences };
            savePreferencesToFirebase(updated); // Save to Firebase
            return updated;
        });
    };

    return (
        <PreferencesContext.Provider value={{ preferences, setPreferences: updatePreferences }}>
            {children}
        </PreferencesContext.Provider>
    );
};
