import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, FlatList, Modal } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, firestore } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';


export default function ProfilePage({ navigation }) {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(require('../../assets/default-profile.png'))
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Image source={profileImage} style={styles.profileImage} />
      </TouchableOpacity>

      {/* Username */}
      <Text style={styles.usernameText}>{username}</Text>

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
      <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate('InterestPage')}>
        <Text style={styles.quizButtonText}>Quiz</Text>
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
    marginBottom: 100,
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

  quizButton: {
    backgroundColor: '#CEE6F3',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  quizButtonText: {
    color: '#6C3428',
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
});

//   return (
//     <View style={styles.container}>
//       {/* Display Username */}
//       <View style={styles.usernameContainer}>
//         <Text style={styles.usernameText}>{username}</Text>
//       </View>
//       <TouchableOpacity 
//         style={styles.editButton}
//         onPress={() => navigation.navigate('editProfile')}  // Navigate to EditProfile
//         >
//          <Text style={styles.editButtonText}>Edit</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutButtonText}>Logout</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate("InterestPage")}>
//         <Text style={styles.quizButtonText}>Quiz</Text>
//       </TouchableOpacity>
      


//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: "center",
//     backgroundColor: "#FDF0D1",
//     paddingVertical: 20,
//   },

//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#6C3428',
//     fontFamily: 'SF Pro Text',
//     marginBottom: 30,
//   },

//   logoutButton: {
//     backgroundColor: '#CEE6F3',
//     padding: 15,
//     borderRadius: 15,
//     marginTop: 20,
//     marginBottom: 20,
//     width: '40%',
//     alignSelf: 'center',
//     alignItems: 'center',
//   },

//   logoutButtonText: {
//     color: '#6C3428',
//     fontSize: 18,
//     fontWeight: 'bold',
//     fontFamily: 'SF Pro Text',
//   },

//   quizButton: {
//     backgroundColor: '#CEE6F3',
//     padding: 15,
//     borderRadius: 15,
//     marginTop: 20,
//     marginBottom: 20,
//     width: '40%',
//     alignSelf: 'center',
//     alignItems: 'center',
//   },

//   quizButtonText: {
//     color: '#6C3428',
//     fontSize: 18,
//     fontWeight: 'bold',
//     fontFamily: 'SF Pro Text',
//   },

//   editButton: {
//     backgroundColor: '#CEE6F3',
//     padding: 15,
//     borderRadius: 15,
//     marginTop: 20,
//     marginBottom: 20,
//     width: '40%',
//     alignSelf: 'center',
//     alignItems: 'center',
//   },

//   editButtonText: {
//     color: '#6C3428',
//     fontSize: 18,
//     fontWeight: 'bold',
//     fontFamily: 'SF Pro Text',
//   },

//   usernameContainer: {
//     position: 'absolute',
//     top: 150, // Adjust positioning for the top of the page
//     alignSelf: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//     zIndex: 10,
//   },

//   usernameText: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: '#6C3428',
//     fontFamily: 'SF Pro Text',
//     marginBottom: 30,
//   },
// });

