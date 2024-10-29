import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, FlatList, LayoutAnimation } from "react-native";
import MapView, {Marker} from "react-native-maps";
import { collection, query, where, getDocs } from "@react-native-firebase/firestore";
import { db } from "../../firebase";
import * as Location from 'expo-location';
import {ListItem, Avatar} from 'react-native-elements';

const SAN_JOSE_COORDINATES = {
    lattitude: 37.3382,
    longitude: -121.8863,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

const Maps = () =>{

    const [region, setRegion] = useState(SAN_JOSE_COORDINATES);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() =>{
       retrieveRecommendations();
    }, []);

    const retrieveRecommendations = async () => {
        try{
            const q = query(collection(db, 'recommendations'), where ('city', '==', 'San Jose'));
            const querySnapshot = await getDocs(q);
            const recommendationsData = querySnapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
            setRecommendations(recommendationsData);
        }
        catch(error){
            console.error('Error retrieving recommendations:', error);
        }
    };

    const onRegionChangeComplete = (newRegion) => {
        const maxLatitudeDelta = 0.5;
        const maxLongitudeDelta = 0.5;

        if(
            Math.abs(newRegion.latitude - SAN_JOSE_COORDINATES.latitude) > maxLatitudeDelta || Math.abs(newRegion.longitude - SAN_JOSE_COORDINATES.longitude) > maxLongitudeDelta ){
                setRegion(SAN_JOSE_COORDINATES);
            }
            else{
                setRegion(newRegion);
            }
    };

    const renderRecommendation = ({item}) => (
        <ListItem bottomDivider>
            <Avatar source = {{uri: item.image}}/>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.type}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );

    return(
        <View style = {styles.container}>
                <MapView style={styles.map} region = {region} onRegionChangeComplete={onRegionChangeComplete}>
                    {recommendations.map((recommendation) => (
                        <Marker key ={recommendation.id} coordinate={{
                            latitude: recommendation.latitude,
                            longitude: recommendation.longitude,
                        }}
                        title={recommendation.name}
                        description={recommendation.type}
                        />
                    ))}
                </MapView>
            <FlatList data={recommendations} renderItem={renderRecommendation} keyExtractor={item => item.id} style={styles.list}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    map:{
        flex:1,
    },
    list:{
        flex:1,
    },
});

export default Maps;