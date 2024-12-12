import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {collection, getDocs} from 'firebase/firestore';
import { db } from '../config/firebase';
import MapPage from './map';

export default function BookmarkPage() {
  const [savedRecommendations, setSavedRecommendations] = useState([]);

  useEffect(() =>{
    loadSavedItems();
  }, []);

  useEffect(() =>{
    const fetchSavedRecommendations = async () => {
      try{
        const querySnapshot = await getDocs(collection(db, 'savedRecommendations'));
        const markers = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        setSavedRecommendations(markers);
    }
    catch(error){
      console.error("Error fetching saved recommendations:", error);
    }
  };
  fetchSavedRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Recommendations</Text>
      <FlatList
      data={savedRecommendations}
      keyExtractor={(item) => item.index}
      renderItem={({item}) =>(
        <View style={styles.item}>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      )}
      />
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
  header:{
    justifyContent:"center",
    alignItems:"center",
    color:"#6C3428",
    fontWeight:"bold",
    fontSize:24,
  },
  locationText: {
    fontSize: 24,
    color: '#6C3428',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 24,
    color: '#6C3428',
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 24,
    color: '#6C3428',
    fontWeight: 'bold',
  },
});
