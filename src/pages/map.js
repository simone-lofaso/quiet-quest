import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Button,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import MapView, { Marker, Callout, CalloutSubview } from "react-native-maps";
import { auth, db } from "../config/firebase";
import {
  doc,
  getDocFromServer,
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

export default function MapPage({ navigation }) {
  const [locationsOfInterest, setLocationsOfInterest] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState();

  const fetchRecommendations = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("Guest mode: No user logged in");
        return;
      }

      const uid = user.uid;
      const instance = getFirestore();
      const activityList = [];

      const querySnapshot = await getDocs(collection(instance, "activity"));
      querySnapshot.forEach((doc) => {
        activityList.push(doc.data());
      });

      const userPreferencesDoc = await getDocFromServer(
        doc(instance, `users/${uid}`)
      );
      const userPreferences = userPreferencesDoc.exists()
        ? userPreferencesDoc.data()
        : null;

      let recommendationList = [];
      if (!userPreferences) {
        console.log(
          "No preference data exists. Using all activities as recommendations."
        );
        recommendationList = activityList;
      } else {
        //environment = crowded quiet = not
        recommendationList = activityList.filter(
          (activity) =>
            userPreferences.selectedInterests.includes(activity.interest) &&
            userPreferences.selectedMood <= activity.EnvironmentIntensity && //crowded
            userPreferences.selectedMoodId <= activity.socialIntensity //quiet
        );
        recommendationList = activityList;
      }

      const locations = recommendationList.map((activity) => ({
        title: activity.name,
        location: {
          latitude: activity.location.latitude,
          longitude: activity.location.longitude,
        },
        description: activity.description || "No description available",
      }));

      setLocationsOfInterest(locations);
      console.log("Updated locationsOfInterest:", locations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  //focus effect makes it so every view of the page calls and sends async fn
  useFocusEffect(
    React.useCallback(() => {
      fetchRecommendations();
    }, [])
  );

  //saving recommendation from maps page
  const saveBookmark = async () => {
    try {
      console.log(locationsOfInterest);
      const user = auth.currentUser;
      if (!user) {
        console.log("Guest mode: No user logged in");
        return;
      }

      const uid = user.uid;
      let newBookmark = locationsOfInterest[selectedLocationIndex];
      newBookmark.userId = uid;
      //getting recommendation to save from the one recommendation instead of all
      await addDoc(collection(db, "bookmarks"), newBookmark);
      Alert.alert("Location successfully saved!");
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving recommendation:", error);
      Alert.alert("Failed to save recommendation.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.33939,
          longitude: -121.89496,
          latitudeDelta: 0.07,
          longitudeDelta: 0.04,
        }}
      >
        {locationsOfInterest.map((item, index) => (
          <Marker key={index} coordinate={item.location}>
            <Callout
              onPress={() => {
                setModalVisible(true);
                setSelectedLocationIndex(index);
              }}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {/*POP UP FOR ASKING USERS IF THEY WANT TO SAVE A RECOMMENDATION TO BOOKMARK PAGE OR CANCEL ACTION*/}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.saveButton} onPress={saveBookmark}>
              <Text style={styles.saveButtonText}>Bookmark Recommendation</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDF0D1",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  calloutContainer: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)", //transparent white
    borderRadius: 10,
  },

  titleText: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  descriptionText: {
    marginBottom: 5,
  },

  saveButton: {
    backgroundColor: "#CEE6F3",
    padding: 13,
    borderRadius: 10,
    marginTop: 5,
    alignSelf: "center",
    alignItems: "center",
  },

  saveButtonText: {
    color: "#6C3428",
    fontWeight: "bold",
    fontFamily: "SF Pro Text",
    fontSize: 15,
  },

  cancelButton: {
    backgroundColor: "#CEE6F3",
    padding: 13,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#6C3428",
    fontWeight: "bold",
    fontFamily: "SF Pro Text",
    fontSize: 15,
  },

  buttonNavigation: {
    backgroundColor: "#CEE6F3",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonNavigationText: {
    color: "#6C3428",
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    padding: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    backgroundColor: "rgba(50, 50, 50, 0.9)",
  },
});
