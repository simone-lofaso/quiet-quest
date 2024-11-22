import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MapPage({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Map Page</Text>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')}><Text>GO TO HOME DLETE LATER</Text></TouchableOpacity>
    </View>
  );
}

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
});
