import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput, Keyboard, ScrollView, Platform } from 'react-native';
import Goal from '../components/goal';

export default function GoalsList() {

    const [goal, setGoal] = useState();
    const [goalItems, setGoalItems] = useState([]);

    {/*ADD GOAL TO LIST*/}
    const handleAddGoal = () => {
        Keyboard.dismiss();
        setGoalItems([...goalItems, goal]);
        setGoal(null);
    };

    const completeGoal = (index) =>{
        let itemsCopy = [...goalItems];
        itemsCopy.splice(index, 1);
        setGoalItems(itemsCopy);
    };

    return (
      <View style={styles.container}>
        <ScrollView
        contentContainerStyle={{
            flexGrow:1,
        }}
        keyboardShouldPersistTaps='handled'
        >

            {/*TODAYS GOALS*/}
            <View style={styles.goalWrapper}>
                <Text style={styles.sectionTitle}>Today's Goals</Text>
                <View style={styles.goalListed}>{
                    goalItems.map((item, index) =>{
                        return(
                            <TouchableOpacity key={index} onPress={() => completeGoal(index)}>
                                <Goal text={item}/>
                            </TouchableOpacity>
                        )
                    })
                    }

                </View>
            </View>

        </ScrollView>

        {/*WRITE GOAL*/}
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeGoalWrapper}
        >
            <TextInput style={styles.input} placeholder={'Write todays goals'} value={goal} onChangeText={text => setGoal(text)}/>
                <TouchableOpacity onPress={() => handleAddGoal()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    goalWrapper:{
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
      paddingHorizontal: 20,
    }, 
    sectionTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        color: '#6C3428',
        fontWeight: 'bold',
    },
    item: {
      marginTop: 10,
    },
    writeGoalWrapper: {
      position: 'absolute',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      marginTop:50,
    },
    input:{
      paddingVertical:10,
      paddingHorizontal:10,
      backgroundColor:'#fff',
      borderRadius:20,
      borderColor:'#CCDAFD',
      borderWidth:2,
      width:250,
    },
    addWrapper:{
        width:30,
        height:30,
        backgroundColor:'#CCDAFD',
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#6C3428',
        borderWidth:1,
    },
    addText:{},
  });
  
  