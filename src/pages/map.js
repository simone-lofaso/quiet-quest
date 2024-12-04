import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { auth } from '../config/firebase';
import { doc, getDocFromServer, getFirestore, collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export default function MapPage() {
    const [locationsOfInterest, setLocationsOfInterest] = useState([]);

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

        const userPreferencesDoc = await getDocFromServer(doc(instance, `users/${uid}`));
        const userPreferences = userPreferencesDoc.exists() ? userPreferencesDoc.data() : null;

        let recommendationList = [];
        if (!userPreferences) {
            console.log("No preference data exists. Using all activities as recommendations.");
            recommendationList = activityList;
        } else {  
            //environment = crowded quiet = not 
            recommendationList = activityList.filter((activity) => 
            userPreferences.selectedInterests.includes(activity.interest) && 
            (userPreferences.selectedMood <= activity.EnvironmentIntensity) && //crowded
            (userPreferences.selectedMoodId <= activity.socialIntensity) //quiet
            )
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
          <Marker
            key={index}
            coordinate={item.location}
            title={item.title}
            description={item.description}
          />
        ))}
      </MapView>
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
  map: {
    width: '100%',
    height: '100%',
  },
});