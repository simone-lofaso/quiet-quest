// src/InterestsScreen.js
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePreferencesContext } from '../services/usePreferences';

export default function InterestsScreen({navigation}) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { setPreferences } = usePreferencesContext();

  const interests = [
    { name: 'Hiking', icon: 'walk' },
    { name: 'Painting', icon: 'brush' },
    { name: 'Gaming', icon: 'game-controller' },
    { name: 'Soccer', icon: 'football' },
    { name: 'Skiing', icon: 'snow' },
    { name: 'Crocheting', icon: 'pricetag' },
    { name: 'Shopping', icon: 'bag' },
    { name: 'Snowboarding', icon: 'snow' }
  ];

  const toggleInterest = (interest) => {
    console.log(`interest ${interest}`)
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Pick Your Interests</Text>
      <View style={styles.interestsContainer}>
        {interests.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.interestButton,
              selectedInterests.includes(item.name) && styles.selectedInterestButton
            ]}
            onPress={() => toggleInterest(item.name)}
          >
            <Ionicons name={item.icon} size={20} color="black" />
            {/* <Text style={styles.interestText}>{item.name}</Text> */}
            <Text
              style={[
                styles.interestText,
                selectedInterests.includes(item.name) && styles.selectedInterestText, 
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, styles.skipButton]}
          onPress={() => navigation.navigate('MoodQuietPage')}
        >
        <Text style={styles.navButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.nextButton} 
        onPress={() => {  
          setPreferences({ selectedInterests });
          navigation.navigate('MoodQuietPage')
        }
        }
        >
          <Text style={styles.footerText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF0D1', // Matches app theme
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

  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  interestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFA878', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    width: '45%', // Consistent with other button sizes
    justifyContent: 'center',
    shadowColor: '#000', // Subtle shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  selectedInterestButton: {
    backgroundColor: '#BA704F', // Highlighted selection in dark brown
  },

  interestText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black', // White text for contrast
    fontWeight: 'bold',
  },

  selectedInterestText: {
    color: 'white', // White text for selected items
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
    // color: '#6C3428', 
  },
});

