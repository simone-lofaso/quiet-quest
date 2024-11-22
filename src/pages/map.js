import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {getDatabase, ref, set} from 'firebase/database';
import { initializeApp, getApps } from 'firebase/app';
import {firebaseConfig} from '../config/firebase';
//npx expo install expo-location
//expo install react-native-maps
//npx expo install firebase

if (getApps().length === 0){
  initializeApp(firebaseConfig);
}

export default function MapPage() {

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
          console.error('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);

        //saves user location to firebase
        const db = getDatabase();
        set(ref(db, 'userLocations/' + Date.now()), {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
      catch (error){
        console.error('Error:', error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
       <MapView
            style={styles.map} 
            mapType='standard'
            initialRegion={{
                latitude: 37.33939,
                longitude: -121.89496,
                latitudeDelta: 0.07,
                longitudeDelta: 0.04
                }}>
            {userLocation && (
              <Marker coordinate={{
                latitude: 37.33939,
                longitude: -121.89496,
            }}
            title = "You are here"
            pinColor='red'
            description='This is a marker in San Jose, California'
            />
          )}
            </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  map: {
    width: '100%',
    height: '%100',
  },
});
