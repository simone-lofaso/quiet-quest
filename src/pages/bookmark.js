import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../config/firebase';
import { doc, collection, getDocs, deleteDoc} from 'firebase/firestore';
import { Ionicons } from "@expo/vector-icons";

export default function BookmarkPage() {
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () =>{
    try{
      const querySnapshot = await getDocs(collection(db, 'recommendations'));
      const data = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setRecommendations(data);
    }
    catch(error){
      console.error('Error fetching saved recommendations:', error);
    }
  };

  useEffect(() =>{
    fetchRecommendations();
  }, []);

  //deletes recommendation off of the saved recommendations page
  const deleteRecommendation = async (recId) => {
    console.log(recId)
    await deleteDoc(doc(db, 'recommendations', recId));
    fetchRecommendations();
  }

  const renderItem = ({item}) => (
    <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Ionicons name="trash-outline" style={styles.deleteIcon} size={24} color='#EF4B4B' onPress={() => {deleteRecommendation(item.id)}}/>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
      <Text style={styles.header}>Saved Recommendations</Text>
      </View>
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
    color: '#6C3428',
  },
  description:{
    fontSize: 18,
    color: '#6C3428',
  },
  item:{
    padding:3,
    borderBottomWidth:3,
    borderColor:'#D5A572',
    color: '#6C3428',
  },
  fixedHeader: {
    backgroundColor: '#FDF0D1',
    marginTop: 15,
    marginBottom: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#FDF0D1',

  },
  header:{
    fontSize:30,
    textAlign: 'center',
    color: '#6C3428',
    fontWeight:"bold",
    marginBottom:16,
    marginTop:70,
    fontFamily: 'SF Pro Text',
  },
  deleteIcon:{
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },

});
