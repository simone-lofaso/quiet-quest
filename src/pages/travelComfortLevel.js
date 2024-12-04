// src/TravelComfortScreen.js
import { getAuth } from 'firebase/auth';
import { doc, getDocFromServer, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
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
      await setDoc(doc(instance, `users/${uid}`), {
        ...user.data, 
        ...preferences, 
        selectedOption,
        isNewUser: false, // Mark as not a new user
      })
      setPreferences({})
    } catch (e) {
      console.error(e)
  }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
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
          //Map tab within the HomeTabs navigator (Tab.Navigator) to show nav bar at the bottom
          onPress={() => navigation.navigate('HomePage', { screen: 'Map' })}
        >
          <Text style={styles.navButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.nextButton} 
        onPress={async () => {
          await updateTravelComfortLevel();
          console.log('Good :)')  
          // navigation.navigate('MapPage')
          navigation.navigate('HomePage', { screen: 'Map' }); // Specify the tab name
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
    backgroundColor: '#FDF0D1',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  backButton: {
    marginTop: 50,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C3428', // Darker brown for consistency
    marginTop: 90,
    marginBottom: 20,
    textAlign: 'center',
  },

  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  
  optionButton: {
    backgroundColor: '#DFA878', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    width: '85%', // Consistent with other button sizes
    alignItems: 'center',
    shadowColor: '#000', // Subtle shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  selectedOptionButton: {
    backgroundColor: '#BA704F',
  },

  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black', // White text for contrast
    fontWeight: 'bold',
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
    backgroundColor: '#CEE6F3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
  },

  nextButton: {
    backgroundColor: '#CEE6F3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
  },

  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', 
  },

  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
