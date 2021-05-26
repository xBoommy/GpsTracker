import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Location from 'expo-location';
import Running from './Running';

const GPS = () => {
  const [goalDistance, setGoalDistance] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  
  const positionHandler = async() => {
    permissions = await Location.requestForegroundPermissionsAsync()

    if (permissions.granted) {
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync();
      //console.log(latitude)
      //console.log(longitude)
      console.log('GPS Foreground Allowed')
      setLatitude(latitude);
      setLongitude(longitude);
    } else {
      Alert.alert(
        "Couldn't get your location", "Ensure that your have allowed location services", 
        [ { text: 'Understood', onPress: () => console.log ('alert closed') } ]
      )
    };
  }

  useEffect( () => {

   }, [] )

  return (
    <SafeAreaView style={styles.container}>
      <Text>HELLO WELCOME TO MY APP</Text>
      <Text>Goal Distance: {goalDistance}m</Text>
      <TextInput
        style = {styles.input}
        placeholder = 'Set Distance Goal'
        onChangeText = {(val) => setGoalDistance(val)}
      />
      <TouchableOpacity style = {styles.gpsbutton} onPress = {positionHandler}>
        <Text>Allow GPS Positioning</Text>
      </TouchableOpacity>

      <Text>starting Position</Text>
      <Text>Lat: {latitude}</Text>
      <Text>Long: {longitude}</Text>


      <View style = {{borderColor: 'black', borderWidth: 1, paddingTop: 20, width: 310, alignItems: 'center', }}>
        <Text>Tracking</Text>
      

        <Running latitude = {latitude} longitude = {longitude} goalDistance = {goalDistance}/>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'pink',
  },
  input: {
    borderWidth: 1,
    borderBottomColor: '#777',
    padding: 8,
    margin: 10,
    width: 150,
  },
  gpsbutton: {
    backgroundColor: 'blue',
    padding: 10,
  }
});

export default GPS;
