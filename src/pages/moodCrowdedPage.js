import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Emoji from 'react-native-emoji';
import { usePreferencesContext } from '../services/usePreferences';

const MoodCrowdedPage = ({ navigation }) => {
    const [selectedMood, setSelectedMood] = useState(null);
    const { preferences, setPreferences } = usePreferencesContext();

    // List of moods with emojis
    const moods = [
        { id: 1, label: 'Happy', emoji: 'smiley' },
        { id: 2, label: 'Excited', emoji: 'heart_eyes' },
        { id: 3, label: 'Neutral', emoji: 'neutral_face' },
        { id: 4, label: 'Sad', emoji: 'sob' },
        { id: 5, label: 'Confused', emoji: 'confused' },
        { id: 6, label: 'Anxious', emoji: 'fearful' },
    ];

    const handleSelectMood = (moodId) => {
        setSelectedMood(moodId);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mood in Crowded Place</Text>
            <View style={styles.moodGrid}>
                {moods.map((mood) => (
                    <TouchableOpacity
                        key={mood.id}
                        style={[
                            styles.moodButton,
                            selectedMood === mood.id && styles.moodButtonSelected,
                        ]}
                        onPress={() => handleSelectMood(mood.id)}
                    >
                        <Emoji name={mood.emoji} style={styles.emoji} />
                        {/* <Text style={styles.moodLabel}>{mood.label}</Text> */}
                        <Text
                            style={[
                            styles.moodLabel,
                            selectedMood === mood.id && styles.selectedMoodLabel, 
                            ]}
                        >
                            {mood.label}
                        </Text>
                        
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.navButton, styles.skipButton]}
                    onPress={() => navigation.navigate('TravelComfortPage')}
                >
                    <Text style={styles.navButtonText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={async () => {
                        setPreferences({ ...preferences, selectedMood });
                        navigation.navigate('TravelComfortPage')
                    }}
                >
                    <Text style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF0D1', // Matches app theme
        paddingHorizontal: 20,
        paddingVertical: 30,
    },

    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6C3428', // Darker brown for consistency
        marginTop: 90,
        marginBottom: 20,
        textAlign: 'center',
    },

    moodGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    moodButton: {
        width: '30%',
        backgroundColor: '#DFA878', // Beige button color
        paddingVertical: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: '#000', // Subtle shadow for elevation
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    moodButtonSelected: {
        backgroundColor: '#BA704F',
    },

    emoji: {
        fontSize: 40,
        marginBottom: 10,
    },

    moodLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // Dark brown for unselected text
    },

    selectedMoodLabel: {
        color: 'white', 
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
    },

    navButton: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    skipButton: {
        backgroundColor: '#CEE6F3',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 20,
    },

    nextButton: {
        backgroundColor: '#CEE6F3',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 20,
    },

    navButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default MoodCrowdedPage;
