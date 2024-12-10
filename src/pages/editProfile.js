import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';
import { updateProfile } from 'firebase/auth';

export default function editProfile() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    //const [pronouns, setPronouns] = useState('');
    //const { user, updateUser } = useUser();

    const handleSave = async () => {
      const user = auth.currentUser;
  
      if (user) {
        // Update the user's display name
        try {
          await updateProfile(user, { displayName: name }); // Save the new username
          Alert.alert('Success', 'Username updated successfully!');
          navigation.goBack(); // Return to the ProfilePage
        } catch (error) {
          console.error("Error updating profile: ", error);
          Alert.alert('Error', 'Failed to update username. Please try again.');
        }
      }
    };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#6C4A4A" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

       {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF0D1',
  },
  
  header: {
    flexDirection: 'row',
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#FAEBCD',
    paddingBottom: 10,
  },

  backButton: {
    marginRight: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6C4A4A',
    textAlign: 'center',
    flex: 1,
  },

  inputContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },

  label: {
    fontSize: 16,
    color: '#6C3428',
    marginBottom: 5,
  },

  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 20,
    fontSize: 16,
  },

  saveButton: {
    marginTop: 25,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#CEE6F3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
  },

  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',     
  },
});