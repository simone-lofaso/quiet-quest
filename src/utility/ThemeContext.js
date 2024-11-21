import React, {createContext, useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) =>{
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try{
            const value = await AsyncStorage.getItem('isDarkMode');
            if (value !== null){
                setIsDarkMode(JSON.parse(value));
            }
        }
        catch(error){
            console.error('Error loading theme preference:', error);
        }
    };

    const toggleTheme = useCallback(async () => {
        try{
            const newTheme = !isDarkMode;
            setIsDarkMode(newTheme);
            await AsyncStorage.setItem('isDarkMode', JSON.stringify(newTheme));
        }
        catch(error){
            console.error('Error saving theme preference:', error);
        }
    }, [isDarkMode]);

    return(
        <ThemeContext.Provider value ={{ isDarkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};