import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db, collection } from '../config/firebase';
import { doc } from 'firebase/firestore';

export default function BookmarkPage() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() =>{
    const fetchRecommendations = async () =>{
      try{
        const querySnapshot = await db.collection('recommendations').get();
        const data = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setRecommendations(data);
      }
      catch(error){
        console.error('Error fetching saved recommendations:', error);
      }
    };
    fetchRecommendations();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
          <Text >{`Lat: ${item.latitude}, Long: ${item.longitude}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
      data ={recommendations}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF0D1',
  },
  text: {
    fontSize: 24,
    color: '#6C3428',
    fontWeight: 'bold',
  },
  title:{
    fontSize: 18,
    fontWeight:"bold",
  },
  item:{
    padding:15,
    borderBottomWidth:1,
    borderColor:'#ccc',
  },
});
