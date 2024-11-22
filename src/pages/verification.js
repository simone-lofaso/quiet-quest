import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function VerificationEmailPage({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Image */}
      <Image 
            source={require('../../assets/verification.png')} 
            style={styles.logo}
            resizeMode="contain"
        />
        <Text style={styles.title}>Account Verification</Text>
    
      <Text style={styles.message}>
        A verification email has been sent to your email address. Please check your inbox to verify your account.
      </Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('LoginPage')}
      >
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF0D1',
    padding: 20,
  },

  logo: {
    width: 150, 
    height: 150,
    marginBottom: 100,
},

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C3428',
  },

  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6C3428',
    marginTop: 30
  },

  note: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6C3428',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#CEE6F3',
    padding: 15,
    borderRadius: 15,
    width: '50%',
    alignItems: 'center',
    marginTop: 50
  },

  buttonText: {
    color: '#6C3428',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
