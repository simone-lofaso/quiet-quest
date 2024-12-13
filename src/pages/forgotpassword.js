import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

export default function ForgotPasswordPage({ navigation }) {
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Password Reset Email Sent",
          "A password reset link has been sent to your email address."
        );
        navigation.navigate("LoginPage"); // Redirect to login page after success
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          Alert.alert("Error", "Invalid email address.");
        } else if (error.code === "auth/user-not-found") {
          Alert.alert("Error", "No user found with this email.");
        } else {
          Alert.alert("Error", error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Your Password?</Text>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handlePasswordReset}
        >
          <Text style={styles.resetButtonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Remember your password?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("LoginPage")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDF0D1",
    paddingVertical: 20,
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 40,
  },

  logoText: {
    fontSize: 30,
    color: "#6C3428",
    fontFamily: "SF Pro Text",
    fontWeight: "bold",
  },

  formContainer: {
    width: "85%",
    padding: 20,
    backgroundColor: "rgba(233, 168, 120, 0.25)",
    borderRadius: 20,
    marginBottom: 80,
  },

  title: {
    fontSize: 22,
    color: "#6C3428",
    fontFamily: "SF Pro Text",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#FDF0D1",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#6C3428",
  },

  resetButton: {
    backgroundColor: "#CEE6F3",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
    width: "60%",
    alignSelf: "center",
    alignItems: "center",
  },

  resetButtonText: {
    color: "#6C3428",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "SF Pro Text",
  },

  loginText: {
    textAlign: "center",
    fontFamily: "SF Pro Text",
    fontWeight: "semibold",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: "#9A6240",
  },

  loginLink: {
    color: "#0000EE",
    fontWeight: "semibold",
  },
});
