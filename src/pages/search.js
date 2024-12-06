import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { firebaseConfig } from '../config/firebase';
import { SearchBar } from 'react-native-screens';
import { Ionicons } from "@expo/vector-icons";


const GEOAPIFY_API_KEY = '9ae4bc67fc5a46a59a0bc17736ef8433';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPlaces = async() => {
    if(!query.trim()){
      alert("Please enter a category to search.");
      return;
    }
    setLoading(true);

    try{
      console.log(query);
      //API takes in different categories from San Jose, CA and provides the different searches to the user
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
      <View style={styles.fixedHeader}>
        <Text style={styles.header}>Search Places in San Jose</Text>

      {/*SEARCH TEXT INPUT AND ICON*/}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.input}
          placeholder='Search a Category...'
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchPlaces}/>
          <Ionicons name="search" style={styles.searchIcon} size={24} color="#gray"/>
        </View>
      </View>

      {/* Result List */}
      <View style={styles.resultsContainer}>
        {loading ? (
          <ActivityIndicator style={styles.activity} animating={true} size="large"/>
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
            showsVerticalScrollIndicator={false} // Optional: hide scroll bar
          /> 
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF0D1',
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

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(233, 168, 120, 0.25)',
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
    // borderColor: '#6C3428',
    borderColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
    color: 'black',
  },

  searchIcon: {
    color: '#6C3428',
  },

  resultsContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
  },

  list: {
    paddingBottom: 16,
  },

  placeItem: {
    padding: 16,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    borderColor: '#BA704F',
    elevation: 3,
  },

  placeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },

  placeCategory: {
    fontSize: 14,
    color: '#BA704F',
    marginBottom: 4,
  },

  placeLocation: {
    fontSize: 14,
    color: '#6C3428',
  },

  activity: {
    marginTop: 20,
    color: '#5F8194',
  },
});

export default SearchPage;
