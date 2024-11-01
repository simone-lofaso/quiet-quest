import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Map Page</Text>
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
