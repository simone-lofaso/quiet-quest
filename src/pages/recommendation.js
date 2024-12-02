import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import * as Linking from 'expo-linking'; //npx expo install expo-linking
import axios from 'axios'; //npm i axios

const Recommendation = ({route, navigation}) => {
    const {answers} = route.params;
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRecommendation = async () => {
            try{
                const searchTerm = answers.join('');

                //yelp fusion API request
                const respone = await axios.get('',{
                    headers:{
                        Authorization: `Bearer YOUR_YELP_API_KEY`,
                    },
                    params:{
                        term:searchTerm,
                        location: 'San Jose',
                        limit:1,
                    },
                });

                if (response.data.businesses && response.data.businesses.length > 0){
                    const business = response.data.business[0];
                    setRecommendation({
                        name: business.name,
                        latitude: business.coordinates.latitude,
                        longitude: business.coordinates.longitude,
                    });
                }
                else{
                    setError('No Recommendation Found');
                }
            }
            catch(err){
                setError('Error Fetching Recommendation');
                console.error(err);
            }
            finally{
                setLoading(false);
            }
        };

        getRecommendation();
    }, [answers]);

    const openMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${recommendation.latitude}, ${recommendation.longitude}`;
        Linking.openURL(url);
    };
    if (loading) return <ActivityIndicator size="large" color= "#333"/>;
    if (error) return <Text style = {styles.error}>{error}</Text>;
    if (!recommendation) return <Text>No recommendation available</Text>;

    return(
        <View style={styles.container}>
            <Text style = {styles.recommendation}>We recommend: {recommendation.name}</Text>
            <TouchableOpacity style={styles.button} onPress={openMaps}>
                <Text style={styles.buttonText}>Open in Maps</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
        padding:20,
    },
    button:{
        backgroundColor:
    }
})