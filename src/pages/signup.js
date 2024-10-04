import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { auth } from "../config/firebase";
import { Ionicons } from "@expo/vector-icons";

export default function SignupPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Alert.alert("Successfully Signup!", `Welcome ${user.email}`);
      // After successful signup, navigate to LoginPage
      navigation.navigate('LoginPage');
    })
    .catch((error) => {
      if(error.code === 'auth/email-already-in-use') {
        Alert.alert("Login Error", "Email already exists!");
      } else {
        Alert.alert("Signup Error!", error.message);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Quiet Quest</Text>
        </View>

        {/* Logo Image */}
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input with Visible Icon*/}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
           />

          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons 
              name={isPasswordVisible ? 'eye' : 'eye-off'} 
              size={24}
              color="gray"
             />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input with Visible Icon*/}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
           />

          <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
            <Ionicons 
              name={isConfirmPasswordVisible ? 'eye' : 'eye-off'} 
              size={24}
              color="gray"
             />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Signup</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginPage')}>
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDF0D1",
    paddingVertical: 20,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  logo: {
    width: 150, 
    height: 150,
  },

  logoText: {
    fontSize: 30,
    color: '#6C3428',
    fontFamily: 'SF Pro Text', 
    fontWeight: 'bold'
  },

  formContainer: {
    width: "85%",
    padding: 20,
    backgroundColor: 'rgba(233, 168, 120, 0.25)', 
    borderRadius: 20,
    marginTop: 20,
   // marginBottom: 30,
  },

  title: {
    fontSize: 24,
    color: '#6C3428',
    fontFamily: 'SF Pro Text', 
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#FDF0D1",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#6C3428', 
  },

  signupButton: {
    backgroundColor: '#CEE6F3',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
    width: '50%',            
    alignSelf: 'center',      
    alignItems: 'center', 
  },

  signupButtonText: {
    color: '#6C3428',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Text',
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: "#FDF0D1",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#6C3428',
  },

  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#6C3428',
  },

  loginText: {
    textAlign: "center",
    fontFamily: 'SF Pro Text', 
    fontWeight: 'semibold',
    marginTop: 10,
    fontSize: 14,
    color: "#9A6240",
  },

  loginLink: {
    color: "#0000EE", 
    fontWeight: "semibold",
  },
});
