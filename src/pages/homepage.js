import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import GoalsList from "../components/goalslist";
import { auth } from "../config/firebase";

export default function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.homeText}>How are you feeling today?</Text>
        {/*RETAKE QUIZ SECTION*/}
        <Text style={styles.homeText2}>Retake Quiz Below!</Text>

        {/*QUIZ*/}
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate("InterestPage")}
        >
          <Text style={styles.quizButtonText}>Quiz</Text>
        </TouchableOpacity>
      </View>

      {/*GOAL CONTAINER*/}
      <View style={styles.goalContainer}>
        <GoalsList />
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
    padding: 20,
  },

  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "rgba(233, 168, 120, 0.25)",
    borderRadius: 20,
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  homeText: {
    fontSize: 24,
    color: "#6C3428",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  homeText2: {
    fontSize: 18,
    color: "#6C3428",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },

  text: {
    fontSize: 24,
    color: "#6C3428",
    fontWeight: "bold",
  },

  quizButton: {
    backgroundColor: "#CEE6F3",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
    width: "40%",
    alignSelf: "center",
    alignItems: "center",
  },

  goalContainer: {
    width: "95%",
    height: "55%",
    padding: 10,
    backgroundColor: "rgba(233, 168, 120, 0.25)",
    borderRadius: 20,
    marginTop: 40,
  },

  quizButtonText: {
    color: "#6C3428",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "SF Pro Text",
  },
});
