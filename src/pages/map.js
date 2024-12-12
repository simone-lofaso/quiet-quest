import React, { useState } from 'react';
import { View, StyleSheet, Alert, Button, Text, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps';
import { auth, db } from '../config/firebase';
import { doc, getDocFromServer, getFirestore, collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export default function MapPage({navigation}) {
    const [locationsOfInterest, setLocationsOfInterest] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

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

  //saving recommendation from maps page
  const saveRecommendation = async () =>{
    try{
    await db.collection('recommendations').add(locationsOfInterest);
    Alert.alert('Location successfully saved!');
    setModalVisible(false);
    }
    catch(error){
      console.error('Error saving recommendation:', error);
      Alert.alert('Failed to save recommendation.');
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
          <Marker
            key={index}
            coordinate={item.location}
            
          >
          <Callout onPress={() =>setModalVisible(true)}>
            <View style={styles.calloutContainer}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
          </Callout>
          </Marker>
        ))}
      </MapView>

      <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity style={styles.button} onPress={saveRecommendation}>
          <Text style={styles.buttonText}>Save Recommendation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF0D1',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  calloutContainer:{
    alignItems:"center",
    padding:10,
  },
  titleText:{
    fontWeight:'bold',
    marginBottom:5,
  },
  descriptionText:{
    marginBottom:5,
  },
  button:{
    backgroundColor:'#CEE6F3',
    padding:10,
    borderRadius:10,
    marginTop:5,
  },
  buttonText:{
    color:'#6C3428',
    fontWeight:'bold',
  },
  buttonNavigation:{
    backgroundColor:'#CEE6F3',
    padding:10,
    borderRadius:10,
    marginTop:5,
  },
  buttonNavigationText:{
    color:'#6C3428',
    fontWeight:'bold',
  },
  modalContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff",
    
  },
  modalContent:{
    padding:10,
    borderRadius:10,
    alignItems:"center",
    height:300,
    width:300,
    justifyContent:"center",
  },
});