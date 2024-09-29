// src/InterestsScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function InterestsScreen() {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    { name: 'Hiking', icon: 'walk' },
    { name: 'Painting', icon: 'brush' },
    { name: 'Gaming', icon: 'game-controller' },
    { name: 'Soccer', icon: 'football' },
    { name: 'Skiing', icon: 'snow' },
    { name: 'Crocheting', icon: 'pricetag' },
    { name: 'Shopping', icon: 'bag' },
    { name: 'Snowboarding', icon: 'snowboard' }
  ];

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <View style={styles.container}>
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
            <Text style={styles.interestText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.footerText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.nextButton} 
        //onPress={() => navigation.navigate('NextScreen')}
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
    backgroundColor: '#FAEBCD',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C4A4A',
    marginBottom: 20,
    textAlign: 'center',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3A690',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    width: '45%',  // Adjust width as needed
    justifyContent: 'center',
  },
  selectedInterestButton: {
    backgroundColor: '#A56E50',
  },
  interestText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  skipButton: {
    backgroundColor: '#D3E4F6',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  nextButton: {
    backgroundColor: '#D3E4F6',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  footerText: {
    fontSize: 18,
    color: 'black',
  },
});
