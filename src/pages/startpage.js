import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function StartPage() {
    return (
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Quiet Quest</Text>
        </View>

        {/* Logo Image */}
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
  
        {/* Buttons */}
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
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

    logo: {
      width: 250, 
      height: 250,
      marginBottom: 60,
    },

    logoContainer: {
      alignItems: 'center',
      marginBottom: 0,
    },

    logoText: {
      fontSize: 36,
      color: '#6C3428',
      fontFamily: 'SF Pro Text', 
      fontWeight: 'bold'
    },

    buttonContainer: {
        width: '45%',
    },

    button: {
      backgroundColor: '#CEE6F3',
      paddingVertical: 20,
      borderRadius: 10,
      marginBottom: 30,
      alignItems: 'center',
    },

    buttonText: {
      color: '#6C3428',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'SF Pro Text',
    },
  });