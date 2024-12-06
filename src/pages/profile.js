import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, FlatList, Modal } from 'react-native';
import { deleteUser, signOut } from 'firebase/auth';
import { auth, db, firestore } from '../config/firebase';
import { usePreferencesContext } from '../services/usePreferences';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function ProfilePage({ navigation }) {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(require('../../assets/default-profile.png'))
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [interests, setInterests] = React.useState(preferences?.selectedInterests || []);
  const { preferences } = usePreferencesContext();

  useEffect(() => {
    if (preferences?.selectedInterests) {
      setInterests(preferences.selectedInterests);
    } else {
      const fetchPreferencesFromFirebase = async () => {
        const user = auth.currentUser;
        if (user) {
          try {
            const userDocRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              setInterests(data.preferences?.selectedInterests || []);
            }
          } catch (error) {
            console.error("Error fetching preferences from Firebase:", error);
          }
        }
      };
  
      fetchPreferencesFromFirebase();
    }
  }, [preferences]);

  // Predefined profile images
  const predefinedImages = [
    require('../../assets/profile1.png'),
    require('../../assets/profile2.png'),
    require('../../assets/profile3.png'),
    require('../../assets/profile4.png'),
  ];

  // Handle selecting a profile image
  const selectProfileImage = (image) => {
    setProfileImage(image);
    setIsModalVisible(false);
    Alert.alert('Profile Updated', 'Your profile image has been updated.');
  };

  
  // Fetch the user's display name when the component mounts
  useFocusEffect(React.useCallback(() => {
    const fetchProfileImage = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.profileImage) {
              setProfileImage({ uri: data.profileImage });
            }
          }
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      } else {
        setUsername("Guest");
      } 
    };

    fetchProfileImage();
  }, [])
);

  // Fetch the user's display name when the component mounts
  useFocusEffect(React.useCallback(() => {
    const user = auth.currentUser;
    if (user) {
      setUsername(user.displayName || "Guest");
    } else {
      setUsername("Guest");
    }
  }, [])
  );
  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Logged Out", "You have been logged out.");
        // Navigate the user back to the login page
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginPage' }],
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Logout Error", errorMessage);
      });
  };

  const handleDeleteAccount = () => {
    Alert.alert (
      "Delete Account", "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const user = auth.currentUser;
            if(user) {
              deleteUser(user) .then(() => {
                Alert.alert("Your account has been deleted.")
                navigation.reset({
                  index: 0,
                  routes: [{name: 'LoginPage' }]
                })
              })
              .catch((error) => {
                Alert.alert("Error", error.message)
              });
            }
          },
         }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Image source={profileImage} style={styles.profileImage} />
        {/* Edit Button */}
        <TouchableOpacity style={styles.editProfileButton} onPress={() => console.log('Edit Profile')}>
            <Ionicons name="pencil" size={20} color="#6C3428" />
          </TouchableOpacity>
        </TouchableOpacity>

      {/* Username */}
      <Text style={styles.usernameText}>{username}</Text>

      {interests.length > 0 ? (
        <View style={styles.interestsContainer}>
          <FlatList
            data={interests}
            keyExtractor={(item, index) => `${item}-${index}`}
            numColumns={2} // Display items in two columns
            contentContainerStyle={{
              alignItems: 'center', // Center items vertically
              justifyContent: 'center', // Center items horizontally
            }}
            renderItem={({ item }) => (
            <View style={styles.interestItem}>
              <Text style={styles.interestText}>{item}</Text>
            </View>
            )}
          />
        </View>
      ) : (
        <Text style={styles.noInterestsText}>No interests selected yet.</Text>
      )}

      {/* Buttons */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('editProfile')} // Navigate to EditProfile
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>


      {/* Modal for selecting profile image */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Choose a Profile Image</Text>
          <FlatList
            data={predefinedImages}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectProfileImage(item)}>
                <Image source={item} style={styles.modalImage} />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF0D1',
    paddingVertical: 20,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#6C3428', // Border color for the profile image
  },

  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C3428',
  },

  editButton: {
    backgroundColor: '#CEE6F3',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  
  editProfileButton: {
    position: 'absolute',
    right: 2, // Adjust the position to appear at the top-right of the image
    top: 5,   // Adjust the position to appear at the top-right of the image
    backgroundColor: '#FDF0D1',
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#6C3428',
    elevation: 3,
  },

  editButtonText: {
    color: '#6C3428',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Text',
  },

  logoutButton: {
    backgroundColor: '#CEE6F3',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  logoutButtonText: {
    color: '#6C3428',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Text',
  },

  deleteButton: {
    backgroundColor: '#CEE6F3',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  deleteButtonText: {
    color: '#EF4B4B',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Text',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    marginTop: 180,
  },

  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },

  closeButton: {
    backgroundColor: '#CEE6F3',
    padding: 15,
    borderRadius: 15,
    marginBottom: 250,
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center'
  },

  closeButtonText: {
    color: '#6C3428',
    fontSize: 16,
    fontWeight: 'bold',
  },

  interestsContainer: {
    width: '100%', 
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    alignSelf: 'center', 
    marginTop: 15, 
    marginBottom: 70, 
  },

  interestItem: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#D5A572', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 17, 
    margin: 5,
  },
  
  interestText: {
    fontSize: 13,
    color: 'black', 
    fontWeight: 'bold',
  },

  noInterestsText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 20,
    marginBottom: 70,
  },  
});

