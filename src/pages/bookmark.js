import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db, auth } from "../config/firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("Guest mode: No user logged in");
        return;
      }

      const uid = user.uid;

      //create a query to fetch documents where userId equals uid
      const bookmarksRef = collection(db, "bookmarks");
      const q = query(bookmarksRef, where("userId", "==", uid));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookmarks(data);
    } catch (error) {
      console.error("Error fetching saved bookmarks:", error);
    }
  };

  // useEffect(() =>{
  //   fetchRecommendations();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  //deletes recommendation off of the saved recommendations page
  const deleteBookmark = async (bookmarkId) => {
    console.log(recId);
    await deleteDoc(doc(db, "bookmarks", bookmarkId));
    fetchBookmarks();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {/* <Ionicons name="trash-outline" style={styles.deleteIcon} size={24} color='#EF4B4B' onPress={() => {deleteRecommendation(item.id)}}/> */}
      </View>
      <TouchableOpacity onPress={() => deleteBookmark(item.id)}>
        <Ionicons
          name="trash-outline"
          size={24}
          color="#EF4B4B"
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Text style={styles.header}>Bookmarked Recommendations</Text>
      </View>
      {bookmarks.length === 0 ? (
        <Text style={styles.emptyMessage}>You have no bookmarks.</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF0D1",
  },

  fixedHeader: {
    backgroundColor: "#FDF0D1",
    marginTop: 15,
    marginBottom: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#FDF0D1",
  },

  header: {
    fontSize: 30,
    textAlign: "center",
    color: "#6C3428",
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 70,
    fontFamily: "SF Pro Text",
  },

  list: {
    padding: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(233, 168, 120, 0.25)",
    justifyContent: "space-between",
    borderRadius: 15,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 18,
    marginTop: 10,
    borderColor: "#6C3428",
    borderWidth: 1,
    padding: 20,
  },

  cardContent: {
    flex: 1,
    marginRight: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6C3428",
  },

  description: {
    fontSize: 14,
    color: "#6C3428",
    marginTop: 5,
  },

  deleteIcon: {
    paddingHorizontal: 10,
  },

  emptyMessage: {
    marginTop: 50,
    fontSize: 18,
    color: "#6C3428",
    textAlign: "center",
  },
});
