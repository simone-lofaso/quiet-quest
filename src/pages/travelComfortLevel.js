// src/TravelComfortScreen.js
import { getAuth } from 'firebase/auth';
import { doc, getDocFromServer, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePreferencesContext } from '../services/usePreferences';

export default function TravelComfortScreen({navigation}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const { preferences, setPreferences } = usePreferencesContext();

  const options = [
    'Traveling Solo',
    'Traveling with one other person',
    'Traveling with Friends/Family',
  ];

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const updateTravelComfortLevel = async() => {
    const instance = getFirestore();
    const auth = getAuth()
    try {
      const { uid } = auth.currentUser;
      const user = await getDocFromServer(doc(instance, `users/${uid}`))
      await setDoc(doc(instance, `users/${uid}`), {...user.data, ...preferences, selectedOption})
      setPreferences({})
    } catch (e) {
      console.error(e)
  }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comfort Level when Traveling</Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOptionButton,
            ]}
            onPress={() => handleSelectOption(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
       <TouchableOpacity
          style={[styles.navButton, styles.skipButton]}
          onPress={() => navigation.navigate('MapPage')}
        >
          <Text style={styles.navButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.nextButton} 
        onPress={async () => {
          await updateTravelComfortLevel();
          console.log('Good :)')  
          navigation.navigate('MapPage')
        }
        }
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBCD',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C4A4A',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#D3A690',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: '#A56E50',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  selectedOptionText: {
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  skipButton: {
    backgroundColor: '#D3E4F6',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  nextButton: {
    backgroundColor: '#D3E4F6',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  footerText: {
    fontSize: 18,
    color: 'black',
  },
});
