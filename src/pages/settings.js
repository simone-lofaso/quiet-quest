import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../utility/ThemeContext";

const SettingsPage = () => {
    const navigation = useNavigation();
    const [pushNotifications, setPushNotifications] = useState(false);
    /*const auth = getAuth();
    const db = getFirestore();*/
    const {isDarkMode, toggleTheme} = useContext(ThemeContext);

    useEffect(() => {
        loadNotificationSetting();
    }, []);

    const loadNotificationSetting = async () => {
        try{
            const value = await AsyncStorage.getItem('pushNotifications');
            setPushNotifications(value === 'true');
        }
        catch(error){
            console.error('Error loading notification setting:', error);
        }
    };

    const togglePushNotifications = async (value) =>{
        setPushNotifications(value);
        try{
            await AsyncStorage.setItem('pushNotifications', value.toString());
            if (value){
                await registerForPushNotificationsAsync();
            }
            else{
                await Notifications.setNotificationHandler(null);
            }
        }
        catch (error){
            console.error('Error saving notification setting:', error);
        }
    };

   /* if (isDarkMode === undefined){
        return null; //handles when the context isn't initialized yet
    }*/

    /*const togglePushNotifications = async () => {
        setPushNotifications(!pushNotifications);
        //update user settings in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(useRef, {pushNotifications: !pushNotifications});
    };*/

    {/*THEME STYLE*/}
    const styles = StyleSheet.create ({
        container:{
            flex:1,
            paddingTop: 20,
            backgroundColor: isDarkMode ? '#121212' : '#FAEBCD',
        },
        topBar:{
            flexDirection: 'row',
            alignItems: 'center',
            padding:16,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#555' : '#ccc',
        },
        title:{
            fontSize:18,
            fontWeight:'bold',
            flex:1,
            textAlign:'center',
            color: isDarkMode ? '#6C3428' : '#000',
        },
        section:{
            padding:16,
            borderBottomWidth:1,
            borderBottomColor: isDarkMode ? '#6C3428' : '#6C3428',
        },
        sectionTitle:{
            fontSize:18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: isDarkMode ? '#6C3428' : '#000',
        },
        settingRow:{
            flexDirection:'row',
            justifyContent: 'space-between',
            alignItems:'center',
            paddingVertical:8,
        },
        text:{
            color: isDarkMode ? '#fff' : '#000',
        },
    });

    return(
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#6C3428'} />
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
            </View>

            {/*ACTUAL SETTINGS*/}
            <View style ={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <View style={styles.settingRow}>
                    <Text style = {styles.text}>Push Notifications</Text>
                    <Switch value ={pushNotifications} onValueChange={togglePushNotifications}/>
                </View>
            </View>

            {/*DARK MODE VS. LIGHT MODE*/}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Appearance</Text>
                <View style={styles.settingRow}>
                    <Text style={styles.text}>Dark Mode</Text>
                    <Switch value={isDarkMode} onValueChange={toggleTheme}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
      marginRight:16,
    },
  
  });
  
  export default SettingsPage;