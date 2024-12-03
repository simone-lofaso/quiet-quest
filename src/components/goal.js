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
    goalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 15,
      marginVertical: 5,
      backgroundColor: 'rgba(233, 168, 120, 0.25)',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },

    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    square: {
      width: 20,
      height: 20,
      backgroundColor: '#CEE6F3',
      borderRadius: 5,
      marginRight: 10,
    },

    itemText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#6C3428',
    },
});

export default Goal;