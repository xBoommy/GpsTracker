import React, {useState, useEffect} from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const Mapping = (props) => {
  const startLatitude = props.startLatitude
  const startLongitude = props.startLongitude
  const currentLatitude = props.currentLatitude
  const currentLongitude = props.currentLongitude
  const status = props.status

  const [currPos, setCurrPos] = useState({latitude: startLatitude, longitude: startLongitude})
  const [mapPositions, setMapPositions] = useState([])

  useEffect( () => {
  }, [startLatitude])

  useEffect( () => {
    if (status === 2) {
      setMapPositions( (prevMapPositions) => [...prevMapPositions, {latitude:currentLatitude, longitude:currentLongitude}] )
      //console.log('Mappositions')
      //console.log(mapPositions)
      console.log('polylining')
    }
  }, [currentLatitude])

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        region = {{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        >
          <Polyline
            coordinates = {mapPositions}
            strokeWidth = {5}
            strokeColor = {'orange'}
          />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300,
  },
});

export default Mapping