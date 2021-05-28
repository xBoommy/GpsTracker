import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Location from 'expo-location';

import Running from './Running';
import Timer from './Timer';

const GPS = () => {
  const [status, setStatus] = useState(5);
  /*  Used to monitor the state of the application:
        0: App Foreground Location Permission NOT granted
        1: READY/ App Foreground Location Permission granted
        2: [Start Run] GPS Location Tracking subscribed + Timer Start
        3: [Pause Run] GPS Location Tracking unsubscribed + Timer Paused
        4: [Stop Run] GPS Location Tracking unsubscribed + Timer Stopped => Data stored => Reset
  */
  const [statusMessage, setStatusMessage] = useState('')
  const [goalDistance, setGoalDistance] = useState(0)


  const forePermissionCheck = async() => {
    try {
      forePermissions = await Location.getForegroundPermissionsAsync()
      if (!forePermissions.granted){
        console.log('Foreground Permission Not Granted')
        forePermissionsrequest = await Location.requestForegroundPermissionsAsync()
        if(forePermissionsrequest.granted) {
          // backPermissionCheck()
          setStatus(1)
        } 
      } else {
        console.log('Foreground Permission already Granted')
        // backPermissionCheck()
        setStatus(1)
      }
    } catch (error) {
      console.log(error)
      console.log('foreground error')
    }
  }

  /*UNABLE TO REQUEST BACKGROUND LOCATION SERVICES
  Privacy Issue: Need to pay money???
  https://github.com/expo/expo/tree/master/packages/expo-location
  https://support.google.com/googleplay/android-developer/answer/9799150?hl=en
  */
  // const backPermissionCheck = async() => {
  //   try {
  //     backPermissions = await Location.getBackgroundPermissionsAsync()
  //     if (!backPermissions.granted){
  //       console.log('Background Permission Not Granted')
  //       backPermissionsrequest = await Location.requestBackgroundPermissionsAsync()
  //     } else {
  //       console.log('Background Permission already Granted')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     console.log('background error')
  //   }
  // }


  useEffect( () => {
    if (status === 0) {
      console.log ('Status : 0 - App Foreground Location Permission NOT granted')
      setStatusMessage('0 - App Foreground Location Permission NOT granted')
      forePermissionCheck()
     
    }
    if (status === 1) {
      console.log ('Status : 1 - READY/ Location Permission granted')
      setStatusMessage('1 - READY/ Location Permission granted')
    }
    if (status === 2) {
      console.log ('Status : 2 - GPS Tracking Start')
      setStatusMessage('2 - GPS Tracking Start')
    }
    if (status === 3) {
      console.log ('Status : 3 - GPS Tracking Pause')
      setStatusMessage('3 - GPS Tracking Pause')
    }
    if (status === 4) {
      console.log ('Status : 4 - GPS Tracking Stop/Reset')
      setStatusMessage('4 - GPS Tracking Stop/Reset')
    }
    if (status === 5) {
      setStatus(0)
      console.log('Status : 5 - App Start')
    }
    if (status === 6) {
      console.log('Status : 6 - Checking Services')
      setStatusMessage('6 - Checking Services')
    }
   }, [status] )

  return (
    <SafeAreaView style={styles.componentContainer}>

      {/* Header */}
      <View style = {styles.header}>
        <Text style = {styles.headerText}>GPS TRACKING DEMO</Text>
      </View>
        
      {/* Status Indicator */}
      <View style = {styles.statusIndicator}>
        <Text style = {styles.statusHeading}>Status:</Text>
        <Text>{statusMessage}</Text>
      </View>
      
      {/* GPS Permissions */}
      <View style = {styles.gpsPermissionsComponent}>
        <TouchableOpacity 
          style = {styles.gpsbutton} 
          onPress = {forePermissionCheck}>

          <Text>Allow GPS Positioning</Text>
          
        </TouchableOpacity>
      </View>


      {/* Goal Setting */}
      <View style = {styles.goalComponent}>
        <View>
          <Text>Target Distance: {goalDistance}m</Text>
        </View>
        <TextInput
          style = {styles.input}
          placeholder = 'Set Target Distance'
          onChangeText = {(val) => setGoalDistance(val)}
        />
      </View>
      
      {/* Starting Position Indicator
      <View>
        <Text>starting Position</Text>
        <Text>Lat: {startLatitude}</Text>
        <Text>Long: {startLongitude}</Text>
      </View> */}

      {/* Timer Component */}
      <View style = {styles.timerComponent}>
        <Timer
        status = {status}/>
      </View>

      {/* Running Component */}
      <View style = {styles.runningComponent}>    
        <Running 
        goalDistance = {goalDistance}
        status = {status}
        setStatus = {setStatus}/>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 45,
    paddingBottom:40,
    // backgroundColor: 'yellow',
  },
  header: {
    // backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusIndicator: {
    // backgroundColor: 'green',
    alignItems: 'center',
    padding: 10
  },
  statusHeading: {
    fontWeight: 'bold',
  },
  gpsPermissionsComponent: {
    padding: 10,
  },
  gpsbutton: {
    backgroundColor: '#999',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
  },
  goalComponent: {
    // backgroundColor: 'green',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    padding: 10,

  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    margin: 10,
    width: 150,
  },
  timerComponent: {
    // backgroundColor: 'pink',
    padding: 5,
  },
  runningComponent: {
    // borderColor: 'black', 
    // borderWidth: 1, 
    alignItems: 'center',
    padding: 5, 
  },
  
});

export default GPS;
