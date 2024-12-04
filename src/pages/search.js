import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { firebaseConfig } from '../config/firebase';
import { useFirebaseAuth } from '../services/useFirebaseAuth';
import { SearchBar } from 'react-native-screens';
import { MaterialIcons } from '@expo/vector-icons';


const GEOAPIFY_API_KEY = '9ae4bc67fc5a46a59a0bc17736ef8433';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useFirebaseAuth();

  const searchPlaces = async() => {
    if(!query.trim()){
      alert("Please enter a search term.");
      return;
    }
    setLoading(true);

    try{
      console.log(query)
      const url = `https://api.geoapify.com/v2/places?categories=entertainment,commercial.supermarket,commercial.marketplace,commercial.shopping_mall,commercial.department_store,commercial.outdoor_and_sport,commercial.hobby,commercial.books,commercial.gift_and_souvenir,commercial.stationery,commercial.clothing,commercial.bag,commercial.garden,commercial.art,commercial.antiques,commercial.video_and_music,commercial.toy_and_game,catering.restaurant,catering.fast_food,catering.cafe,catering.food_court,catering.bar,catering.ice_cream,education.library,entertainment.culture,entertainment.cinema,entertainment.aquarium,entertainment.miniature_golf,entertainment.bowling_alley,entertainment.theme_park,sport.ice_rink,activity,tourism.information,tourism.attraction,tourism.sights,tourism,catering,entertainment.escape_game,entertainment.museum,entertainment,leisure.park,national_park&filter=rect:-121.9484641932776,37.38092259456819,-121.83271780672268,37.29138979589054&limit=20&name=${query}&apiKey=${GEOAPIFY_API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if(data.features && data.features.length > 0){
        setPlaces(data.features);
      }
      else{
        alert("No places were found based on your search.");
        setPlaces([]);
      }
    }
    catch(error){
      console.error("Error fetching places:", error);
      setPlaces([]);
    }
    finally{
      setLoading(false);
    }
  };


  return(
    <View style={styles.container}>
      <Text style={styles.header}>Search Places in San Jose</Text>
      {user && <Text style={styles.greeting}>Welcome, {user.displayName || "User"}! </Text>}
      {/*<MaterialIcons name="search" style={styles.searchIcon} size={24} color="#433"/>*/}
      <TextInput 
        style={styles.input}
        placeholder='Search for Places...'
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchPlaces}/>
        {loading ? (
          <ActivityIndicator animating={true} size="large"/>
        ):(
          <FlatList
          data={places}
          keyExtractor={(item) => item.properties.place_id || item.properties.name}
          renderItem={({item}) => (
            <View style={styles.placeItem}>
              <Text style ={styles.placeText}>{item.properties.name || "Unnamed Place"}</Text>
              <Text style={styles.placeCategory}>Categories: {item.properties.categories?.join(", ")}</Text>
              <Text style={styles.placeLocation}>{item.properties.address_line1}, {item.properties.city}</Text>

            </View> 
          )}
          contentContainerStyle={styles.list}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:50,
    backgroundColor: '#FDF0D1',
  },
  header:{
    fontSize:32,
    textAlign: 'center',
    alignItems:'center',
    justifyContent:'center',
    color: '#5F8194',
    fontWeight:"bold",
    marginBottom:16,
  },
  greeting:{
    fontSizw:16,
    color:'#5F8194',
    marginBottom:8,
  },
  input:{
    height:50,
    backgroundColor:'#fff',
    borderRadius:8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth:1,
    borderColor:'#ccc',
  },
  searchIcon:{
    marginRight:0,
  },
  list:{
    paddingBottom:16,
  },
  placeItem:{
    padding:16,
    backgroundColor:'#FDF0D1',
    borderRadius:8,
    marginBottom:8,
    borderWidth:1,
    borderColor:'#6C3428',
  },
  placeText:{
    fontSize: 18,
    fontWeight:"bold",
    color: '#6C3428',
  },
  placeLocation:{
    fontSize: 14,
    fontWeight:"bold",
    color: '#6C3428',
  },
  placeCategory:{
    fontSize:14,
    color:'#BA704F',
  },
  text: {
    fontSize: 24,
    color: '#6C3428',
    fontWeight: 'bold',
  },
});

export default SearchPage;
