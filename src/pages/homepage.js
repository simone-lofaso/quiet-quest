import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import GoalsList from '../components/goalslist';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.homeText}>How are you feeling today? Retake Quiz Below!</Text>
      {/*QUIZ*/}
      <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate("InterestPage")}>
        <Text style={styles.quizButtonText}>Quiz</Text>
      </TouchableOpacity>

      {/*GOAL CONTAINER*/}
      <View style={styles.goalContainer}>
      <GoalsList/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF0D1',
  },
  homeText:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    fontSize: 24,
    color: '#6C3428',
    fontWeight: 'bold',
  }, 
  text: {
    fontSize: 24,
    color: '#6C3428',
    fontWeight: 'bold',
  },
  quizButton: {
    backgroundColor: '#CEE6F3',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  goalContainer:{
    width: '80%',
    height:'40%',
    alignItems:'center',
    padding:10,
    marginBottom:20,
    backgroundColor:'#FBDF9D',
  },
  quizButtonText: {
    color: '#6C3428',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Text',
  },
  
});

