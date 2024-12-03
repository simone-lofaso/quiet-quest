import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function StartPage({ navigation }) {
    return (
      <View style={styles.container}>
        {/* Logo Image */}
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
  
        {/* Buttons */}
        <View style={styles.buttonContainer}>
            {/* Guest Mode Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePage', {isGuest: true, initialRouteName: 'Map' })}>
              <Text style={styles.buttonText}>Guest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignupPage')}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
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
      marginBottom: 100,
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
      padding: 20,
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