import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as geolib from 'geolib';


const Running = (props) => {
    // App State
    const status = props.status;
    const setStatus = props.setStatus;
    const [message, setMessage] = useState('')

    const goalDistance = props.goalDistance;

    const [startLatitude, setStartLatitude] = useState(0)
    const [startLongitude, setStartLongitude] = useState(0)
    const [positions, setPositions] = useState( () => { return [] } );
    const [previousLatitude, setPreviousLatitude] = useState (startLatitude);
    const [previousLongitude, setPreviousLongitude] = useState (startLongitude);
    const [currentLatitude, setCurrentLatitude] = useState (startLatitude);
    const [currentLongitude, setCurrentLongitude] = useState (startLongitude);
    const [currentDistance, setCurrentDistance] = useState (0);


    const getCurrentLocation = async() => {
        try {
            const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync()
            setStartLatitude(latitude)
            setStartLongitude(longitude)
            console.log('Getting current Location')
        } catch(error) {
            console.log(error)
        }
        
    }


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
        if ( Location.hasServicesEnabledAsync() ){
            try {
                setPromise( await Location.watchPositionAsync( options, onPositionChange) )
                console.log('GPS Tracking on')
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Toggle tracking off (NOT WORKING)
    const unsubscribePosition = () => {
        promise.remove()
        console.log('GPS Tracking off')
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

    const distanceUpdate = () => {
        // console.log(positions)
        if (positions.length === 0) {
            //Set Current Position to Starting Position at first
            setPreviousLatitude(startLatitude);
            setPreviousLongitude(startLongitude);
            setCurrentLatitude(startLatitude);
            setCurrentLongitude(startLongitude);
        } else {
            console.log('Position updating..........');

            if (positions.length > 1) {
                setPreviousLatitude( positions[positions.length -2].coords.latitude );
                setPreviousLongitude( positions[positions.length -2].coords.longitude );
            }
            const prevPos = { latitude:previousLatitude, longitude:previousLongitude}
            
            setCurrentLatitude( positions[positions.length -1].coords.latitude );
            setCurrentLongitude( positions[positions.length -1].coords.longitude );
            const currPos = { latitude:currentLatitude, longitude:currentLongitude}
           
            // console.log(positions);
            console.log('prevPos')
            console.log(prevPos)
            console.log('currPos')
            console.log(currPos)

            let distGain = geolib.getDistance (prevPos, currPos, 0.1)
            console.log('Distance Gained')
            console.log(distGain)

            /* Limit correction is to account for GPS floating
                (number): set minimum distance gain in order to record movement
                in terms of meters
            */
            const lowerLimit = 3;
            const lowerUpper= 20;
            if ( (lowerLimit < distGain) && (distGain < lowerUpper) ) {
                setCurrentDistance((prevCurrentDistance) => (Math.round( (prevCurrentDistance + distGain)*100 ))  / 100)
            }
        }
    }

    useEffect( 
        distanceUpdate
        , [positions, startLatitude, startLongitude]
    );

    useEffect( () => {
        if (status === 2) {
            getCurrentLocation()
            // Countdown
            setMessage('starting in 10')

            setTimeout( () => {
                setMessage('starting in 9')
            }, 1000)
            
            setTimeout( () => {
                setMessage('starting in 8')
                getCurrentLocation()
            }, 2000)

            setTimeout( () => {
                setMessage('starting in 7')
                getCurrentLocation()
            }, 3000)

            setTimeout( () => {
                setMessage('starting in 6')
            }, 4000)

            setTimeout( () => {
                setMessage('starting in 5')
            }, 5000)

            setTimeout( () => {
                setMessage('starting in 4')
            }, 6000)

            setTimeout( () => {
                setMessage('starting in 3')
            }, 7000)

            setTimeout( () => {
                setMessage('starting in 2')
            }, 8000)

            setTimeout( () => {
                setMessage('starting in 1')
            }, 9000)

            setTimeout( () => {
                setMessage('START')
            }, 10000)

            //Start
            
            setTimeout( () => {
                subscribePosition()
            }, 10000)
        }
        if (status === 3) {
            unsubscribePosition()
            setMessage('PAUSED')
        }
        if (status === 4) {
            unsubscribePosition()
            resetDistance()
            setStatus(1)
            setMessage('STOPPED')
            setTimeout( () => {
                setMessage('')
            }, 5000)

        }
    }, [status])

    useEffect( () => {}, [message])

    return (
        <SafeAreaView style = {styles.componentContainer}>

            {/* Header */}
            <View style = {styles.header}>
                <Text style = {styles.headerText}>Position</Text>
            </View>

            {/* Position Display */}
            <View style = {styles.positionDisplay}>
                    <Text>Prev Latitude: {previousLatitude}</Text>
                    <Text>Prev Longitude: {previousLongitude}</Text>
                    <Text></Text>
                    <Text>Curr Latitude: {currentLatitude}</Text>
                    <Text>Curr Longitude: {currentLongitude}</Text>
            </View>

            {/* Button Component */}
            <View style = {styles.buttonComponent}>
                <TouchableOpacity style = {styles.button} onPress = {() => setStatus(2)}>
                    <Text>Start</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                style = {styles.button} onPress = {() => setStatus(3)}>
                    <Text>Pause</Text>
                </TouchableOpacity>
            </View>

            {/* Distance Indicator */}
            <View style = {styles.distanceIndicator}>
                <Text>{message}</Text>
                <Text style = {styles.complete}>
                    Completed: {currentDistance}m/{goalDistance}m
                </Text>
            </View>

            {/* Reset/Stop Button */}
            <View style = {styles.resetcontainer}>
                <TouchableOpacity style = {styles.button} onPress = {() => setStatus(4)}>
                        <Text>Stop</Text>
                </TouchableOpacity>
            </View>

            
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        // backgroundColor: 'purple',
        alignItems: 'center',
    },
    header: {
        padding: 10,
    },
    headerText: {
        fontWeight: 'bold',
    },
    positionDisplay: {
        // backgroundColor: 'orange',
    },
    buttonComponent: {
        // backgroundColor: 'gray',
        padding: 20,
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    button: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    distanceIndicator: {
        // backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
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