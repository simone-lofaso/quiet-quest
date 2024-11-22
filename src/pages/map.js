import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//npm install react-native-maps
//npx pod-install
import MapView, {Marker} from 'react-native-maps';
//credit: https://www.youtube.com/watch?v=xcn-0LyX6JY&t=1153s

//first marker
let locationsOfInterest = [
  {
    title: "San Jose State University",
    location:{
      latitude: 37.3352,
      longitude: -121.8811
    },
    description: "San Jose State University"
  }
]


export default function MapPage() {
  const onRegionChange = (region) =>{
    console.log(region);
  };

  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) =>{
      return(
        <Marker
        key={index}
        coordinate={item.location}
        title={item.title}
        description={item.description}
        >

        </Marker>
      )
    })
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      onRegionChange={onRegionChange}
      initialRegion={{
        latitude: 37.33939,
        longitude: -121.89496,
        latitudeDelta: 0.07,
        longitudeDelta: 0.04,
      }}
      >
        {showLocationsOfInterest()}
      </MapView>
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
  map:{
    width:'100%',
    height:'100%',
  },
});
