
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Profile = ({}) => {

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          //source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image URL
        />
        <Text style={styles.name}>Ishie Eswar</Text>
      </View>
      
      <View style={styles.hobbiesContainer}>
        <View style={styles.hobbyItem}><Ionicons name="walk" size={20} color="black" /><Text style={styles.hobbyText}>Hiking</Text></View>
        <View style={styles.hobbyItem}><Ionicons name="snow" size={20} color="black" /><Text style={styles.hobbyText}>Skiing</Text></View>
        <View style={styles.hobbyItem}><Ionicons name="game-controller" size={20} color="black" /><Text style={styles.hobbyText}>Gaming</Text></View>
        <View style={styles.hobbyItem}><Ionicons name="brush" size={20} color="black" /><Text style={styles.hobbyText}>Painting</Text></View>
        <View style={styles.hobbyItem}><Ionicons name="snow" size={20} color="black" /><Text style={styles.hobbyText}>Snowboarding</Text></View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="person" size={20} color="#6C3428" />
          <Text style={styles.actionText}>My Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#6C3428" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="settings" size={20} color="#6C3428" />
          <Text style={styles.actionText}>Setting</Text>
          <Ionicons name="chevron-forward" size={20} color="#6C3428" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="log-out" size={20} color="#6C3428" />
          <Text style={styles.actionText}>Log out</Text>
          <Ionicons name="chevron-forward" size={20} color="#6C3428" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          
          <Text style={styles.deleteText}>Delete account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBCD',
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C4A4A',
    marginTop: 10,
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  hobbyItem: {
    backgroundColor: '#D3A690',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2}, // Shadow offset
    shadowOpacity: .25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Elevation for Android
  },
  hobbyText: {
    fontSize: 16,
    marginLeft: 5,
    
  },
  actionsContainer: {
    width: '80%',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7E7CE',
    padding: 20,
    borderRadius: 20,
    marginVertical: 5,
    justifyContent: 'space-between',
    shadowColor: '#736b5f', // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Elevation for Android
   
  },
  actionText: {
    fontSize: 18,
    color: '#6C3428',
    fontWeight: 'bold',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7E7CE',
    padding: 20,
    borderRadius: 20,
    marginVertical: 5,
    justifyContent: 'center',
    shadowColor: '#736b5f', // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Elevation for Android
  
  },
  deleteText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Profile;
