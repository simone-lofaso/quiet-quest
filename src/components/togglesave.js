import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function SaveRecommendedItem ({item, onToggleSave}){
    return(
        <View>
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => onToggleSave(item.id)}>
                <Text>{item.isFavorite ? 'Remove Saved Recommendation' : 'Add Saved Recommendation'}</Text>
            </TouchableOpacity>
        </View>
    );
}