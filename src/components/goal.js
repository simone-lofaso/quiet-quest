import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const Goal = (props) =>{
    return(
        <View style={styles.goalContainer}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
           {/* <View style={styles.circular}></View>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    goalContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:20,
    },
    itemLeft:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
    },
    square:{
        width:24,
        height:24,
        backgroundColor:'#CCDAFD',
        opacity:0.8,
        borderRadius:6,
        marginRight:15,
    },
    itemText:{
        maxWidth:'100%',
    },
    /*
    circular:{
        width:12,
        height:12,
        borderColor:'#55BCF6',
        borderWidth:2,
        borderRadius:5,
    },*/
});

export default Goal;