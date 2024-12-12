import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout} from 'react-native-maps';
import { auth } from '../config/firebase';
import { doc, getDocFromServer, getFirestore, collection, getDocs, firestore, addDoc} from 'firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
//import { Ionicons } from "@expo/vector-icons";
import { db } from '../config/firebase';
//npx expo install @react-native-async-storage/async-storage
import {AsyncStorage} from 'react-native';


export default function MapPage({}) {
    const [locationsOfInterest, setLocationsOfInterest] = useState([]);
    const navigation = useNavigation();

    const [savedItem, setSavedItem] = useState([]);
    
    {/*//saving recommendations
    const handleSaveRecommendation = async () =>{
      try{
        await addDoc(collection(db, "savedMarkers"),{
          index:item.index,
          title:item.title,
          description:item.description,
        });
        Alert.alert("Marker saved!");
        navigation.navigate("BookmarkPage");
      }
      catch(error){
        console.error("Error saving recommendation:", error);
      }
    };*/}

    const loadSavedItems = async () => {
      try{
        const storedSavedItems = await AsyncStorage.getItem('savedItem');
        if(storedSavedItems){
          setSavedItem(JSON.parse(storedSavedItems));
        }
      }
      catch(error){
        console.error('Error loading saved item:', error);
      }
    };

    const toggleSavedItem = async (itemId) => {
      const updatedSavedItems = savedItem.map((item) => {
        if(item.id === itemId){
          return{...item, isFavorite: !item.isFavorite };
        }
        return item;
      });
      setSavedItem(updatedSavedItems);

      try{
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedSavedItems));
      }
      catch(error){
        console.error('Error saving recommended item:', error);
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
        <View style={styles.calloutContainer}>
        {locationsOfInterest.map((item, index) => (
          <Marker
          key={index}
          coordinate={item.location}
          >
          <Callout tooltip={false}>
            <View style={styles.callout} 
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <TouchableOpacity style={styles.saveButton} onPress={() => {
                handleSaveRecommendation;
                navigation.navigate('BookmarkPage');
                }}>
              <Text style={styles.saveButtonText}>Save Recommendation</Text>
              </TouchableOpacity>
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
        </View>
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
    justifyContent:"center",
    alignItems:"center",
  },
  title:{
    fontWeight:"bold",
    marginBottom:5,
    marginTop: 5,
    justifyContent:"center",
    alignItems:"center",
  },
  description:{
    marginBottom:5,
    justifyContent:"center",
    alignItems:"center",
  },
  saveButton:{
    justifyContent:'center',
    alignContent:"center",
    backgroundColor: "#CEE6F3",
    padding:10,
    borderRadius:10,
  },
  saveButtonText:{
    justifyContent:"center",
    alignItems:"center",
    color:"#6C3428",
    fontWeight:"bold",
    padding:2,
  },
  calloutContainer:{
    width:"20%",
    height:"20%",
  },
});