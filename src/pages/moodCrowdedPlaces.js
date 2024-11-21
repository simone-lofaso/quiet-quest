import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Emoji from 'react-native-emoji';

const MoodCrowdedPlace = ({navigation}) => {
  const [selectedMood, setSelectedMood] = useState(null);


  // List of moods with emojis
  const moods = [
    { id: 1, label: 'Happy', emoji: 'smiley' },
    { id: 2, label: 'Excited', emoji: 'heart_eyes' },
    { id: 3, label: 'Neutral', emoji: 'neutral_face' },
    { id: 4, label: 'Sad', emoji: 'sob' },
    { id: 5, label: 'Confused', emoji: 'confused' },
    { id: 6, label: 'Anxious', emoji: 'fearful' },
  ];

  const handleSelectMood = (moodId) => {
    setSelectedMood(moodId);
  };
  const updateMoodCrowded = async() => {
    await FirebaseFirestore.instance.collection('users')
    .doc(AuthService().currentUser?.uid)
    .collection('moodCrowded')
    .add(selectedOption)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood in Crowded Place</Text>
      <View style={styles.moodGrid}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.moodButton,
              selectedMood === mood.id && styles.moodButtonSelected,
            ]}
            onPress={() => handleSelectMood(mood.id)}
          >
            <Emoji name={mood.emoji} style={styles.emoji} />
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.navButton, styles.skipButton]}
          onPress={() => navigation.navigate('MoodCrowdedPage')}
        >
          <Text style={styles.navButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.nextButton} 
        onPress={() => {
          navigation.navigate('MoodCrowdedPage')
          updateMoodCrowded();
        }
        }
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBCD',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7c4d1b',
    textAlign: 'center',
    marginBottom: 20,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
    width: '30%',
    backgroundColor: '#e3b591',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  moodButtonSelected: {
    backgroundColor: '#bf7453',
  },
  emoji: {
    fontSize: 30,
    marginBottom: 10,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7c4d1b',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  navButton: {
    width: '45%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#c2dfea',
  },
  nextButton: {
    backgroundColor: '#c2dfea',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c4d1b',
  },
});

export default MoodCrowdedPlace;
