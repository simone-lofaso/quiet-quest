import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { Marker, Callout} from 'react-native-maps';
import { auth } from '../config/firebase';
import { doc, getDocFromServer, getFirestore, collection, getDocs, firestore, addDoc} from 'firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { db } from '../config/firebase';


export default function MapPage({}) {
    const [locationsOfInterest, setLocationsOfInterest] = useState([]);
    const navigation = useNavigation();
    
    //saving recommendations
    const saveMarker = async (marker) =>{
      try{
        await addDoc(collection(db, "savedMarkers"),{
          index:item.index,
          title:item.title,
          description:item.description,
        });
        alert("Marker saved!");
        navigation.navigate("BookmarkPage");
      }
      catch(error){
        console.error("Error saving recommendation:", error);
      }
    };


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
        {locationsOfInterest.map((item, index, marker) => (
          <Marker
          key={index}
          coordinate={item.location}
          >
          <Callout>
            <View style={styles.callout} 
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Button style={styles.saveButton} title="Save Recommendation" onPress={() => saveMarker(marker)}/>
            </View>
          </Callout>
          
          {/*<Ionicons 
          name="bookmark-outline" 
          size={20} 
          color ="#6C3428" 
          style={styles.savedBookmarkIcon} 
          onPress={() => navigation.navigate('BookmarkPage')}
        />*/}
          </Marker>
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
  callout:{
    width:200,
  },
  title:{
    fontWeight:"bold",
    marginBottom:5,
  },
  description:{
    marginBottom:5,
  },
  saveButton:{
    justifyContent:'center',
    borderRadius:5,
  },
});