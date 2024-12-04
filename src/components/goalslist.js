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
          contentContainerStyle={{flexGrow:1,}}
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
      width: '100%',
      backgroundColor: '#FDF0D1',
      borderRadius: 20,
    },

    goalWrapper: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 100,
    },

    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#6C3428',
      textAlign: 'center',
      marginBottom: 10,
    },
    goalListed: {
      marginTop: 10,
    },
    writeGoalWrapper: {
      position: 'absolute',
      bottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
    },
    input: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 20,
      borderColor: '#6C3428',
      borderWidth: 1,
      padding: 10,
      marginRight: 10,
    },
    addWrapper: {
      width: 40,
      height: 40,
      backgroundColor: '#CEE6F3',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#6C3428',
      borderWidth: 2,
    },
    addText: {
      fontSize: 18,
      color: '#6C3428',
      fontWeight: 'bold',
    },
  });
  
  