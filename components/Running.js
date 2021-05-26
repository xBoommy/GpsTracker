import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as geolib from 'geolib';


const Running = (props) => {
    const latitude = props.latitude;
    const longitude = props.longitude;
    const goalDistance = props.goalDistance;

    const [positions, setPositions] = useState( () => { return [] } );
    const [previousLatitude, setPreviousLatitude] = useState (latitude);
    const [previousLongitude, setPreviousLongitude] = useState (longitude);
    const [currentLatitude, setCurrentLatitude] = useState (latitude);
    const [currentLongitude, setCurrentLongitude] = useState (longitude);
    const [currentDistance, setCurrentDistance] = useState (0);

    // Toggle tracking on
    const [promise, setPromise] = useState({});
    const subscribePosition = async() => {
        const options = {accuracy: 6,  timeInterval: 1000, distanceInterval: 3};
        /* Options:
            - accuracy (number): LocationAccuracy — Location manager accuracy. Pass one of LocationAccuracy enum values. For low accuracy the implementation can avoid geolocation providers that consume a significant amount of power (such as GPS).
                Accuracy.Lowest	            1	Accurate to the nearest three kilometers.
                Accuracy.Low	            2	Accurate to the nearest kilometer.
                Accuracy.Balanced	        3	Accurate to within one hundred meters.
                Accuracy.High	            4	Accurate to within ten meters of the desired target.
                Accuracy.Highest	        5	The best level of accuracy available.
                Accuracy.BestForNavigation	6	The highest possible accuracy that uses additional sensor data to facilitate navigation apps.
            - timeInterval (number) — Minimum time to wait between each update in milliseconds.
            - distanceInterval (number) — Receive updates only when the location has changed by at least this distance in meters.
            - mayShowUserSettingsDialog (boolean) — (Android only) Specifies whether to ask the user to turn on improved accuracy location mode which uses Wi-Fi, cell networks and GPS sensor. The dialog can be shown only when the location mode is set to Device only. Defaults to true.
        */

        try {
            console.log('GPS on')
            setPromise( await Location.watchPositionAsync( options, onPositionChange) )
        } catch (error) {
            console.log(error);
        }
    }

    // Toggle tracking off (NOT WORKING)
    const unsubscribePosition = () => {
        promise.remove()
        console.log('GPS off')
    }

    // Callback function on each update of position
    const onPositionChange = (position) => {
        // console.log(position.timestamp);
        // console.log(position.coords.latitude);
        // console.log(position.coords.longitude);
        setPositions((prevPositons) => [...prevPositons, position]);
    }

    const resetDistance = () => {
        setCurrentDistance(0);
    }

    useEffect( 
        () => {
            // console.log(positions)
            if (positions.length === 0) {
                //Set Current Position to Starting Position at first
                setPreviousLatitude(latitude);
                setPreviousLongitude(longitude);
                setCurrentLatitude(latitude);
                setCurrentLongitude(longitude);
            } else {
                console.log('updating..........');

                if (positions.length > 1) {
                    setPreviousLatitude( positions[positions.length -2].coords.latitude );
                    setPreviousLongitude( positions[positions.length -2].coords.longitude );
                }
                const prevPos = { latitude:previousLatitude, longitude:previousLongitude}
                
                setCurrentLatitude( positions[positions.length -1].coords.latitude );
                setCurrentLongitude( positions[positions.length -1].coords.longitude );
                const currPos = { latitude:currentLatitude, longitude:currentLongitude}
               
                console.log(positions);
                console.log('prevPos')
                console.log(prevPos)
                console.log('currPos')
                console.log(currPos)

                let distGain = geolib.getDistance (prevPos, currPos, 0.1)
                console.log('distGain')
                console.log(distGain)

                /* Limit orrection is to account for GPS floating
                    (number): set minimum distance gain in order to record movement
                    in terms of meters
                */
                const lowerLimit = 3;
                const lowerUpper= 20;
                if ( (lowerLimit < distGain) && (distGain < lowerUpper) ) {
                    setCurrentDistance((prevCurrentDistance) => (Math.round( (prevCurrentDistance + distGain)*100 ))  / 100)
                }
            }
        }, [positions, latitude, longitude ]
    );


    return (
        <SafeAreaView>
            <View style = {styles.container}>
                <TouchableOpacity style = {styles.button} onPress = {subscribePosition}>
                    <Text>On</Text>
                </TouchableOpacity>

                <View>
                    <Text>previous lat: {previousLatitude}</Text>
                    <Text>previous long: {previousLongitude}</Text>
                    <Text>current lat: {currentLatitude}</Text>
                    <Text>current long: {currentLongitude}</Text>
                </View>
                
                <TouchableOpacity style = {styles.button} onPress = {unsubscribePosition}>
                    <Text>Off</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style = {styles.complete}>
                    Completed: {currentDistance}m/{goalDistance}m
                </Text>
            </View>

            <View style = {styles.resetcontainer}>
                <TouchableOpacity style = {styles.resetbutton} onPress = {resetDistance}>
                        <Text>Reset</Text>
                </TouchableOpacity>
            </View>

            
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: 350,
        backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    button: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        padding: 20,
    },
    resetbutton: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        width: 60,
        padding: 8,
        alignItems: 'center',
    },
    resetcontainer: {
        justifyContent: 'center',
        alignItems:'center',
    },
    complete: {
        textAlign: 'center',
        padding: 10,
    },
})

export default Running;