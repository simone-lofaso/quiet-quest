import React, {useCallback} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { usePreferencesContext } from '../services/usePreferences';
import { useFocusEffect } from '@react-navigation/native';

export default function HomePage() {
  const { preferences } = usePreferencesContext();

  const [interests, setInterests] = React.useState(preferences?.selectedInterests || []);

  useFocusEffect(
    useCallback(() => {
      // Refresh interests when page is focused
      setInterests(preferences?.selectedInterests || []);
    }, [preferences])
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Home Page</Text>

      {interests.length > 0 ? (
        <View style={styles.interestsContainer}>
          <Text style={styles.subtitle}>Your Interests:</Text>
          <FlatList
            data={interests}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <Text style={styles.interestItem}>{item}</Text>
            )}
          />
        </View>
      ) : (
        <Text style={styles.noInterestsText}>No interests selected yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF0D1',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    color: '#6C3428',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  interestsContainer: {
    marginTop: 20,
    width: '100%',
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6C3428',
    marginBottom: 10,
  },

  interestItem: {
    fontSize: 16,
    color: '#6C3428',
    backgroundColor: '#DFA878',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

  noInterestsText: {
    fontSize: 16,
    color: '#6C3428',
    fontStyle: 'italic',
  },
});

