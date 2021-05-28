import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

const Timer = (props) => {
    // App State
    const status = props.status;

    const [time, setTime] = useState ({hours:0, minutes:0, seconds:0});
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [interv, setInterv] = useState();

    const timeHandler = () => {
        if (second === 60) {
            setMinute( (prevMinute) => prevMinute + 1 )
            setSecond(0)
        }
        if (minute === 60) {
            setHour( (prevHour) => prevHour + 1 )
            setMinute(0)
        }
    }

    const ticking = () => {
        setSecond( (preSecond) => preSecond + 1 )
    }

    const startTimer = () => {
        setInterv( setInterval( ticking, 1000 ) )
        console.log('Timer Start')
    } 

    const stopTimer = () => {
        clearInterval( interv )
        console.log('Timer Stop')
    }

    const resetTimer = () => {
        setSecond(0);
        setMinute(0);
        setHour(0);
        console.log('Timer Reset')
    }

    useEffect( () => {
        //console.log('+1 sec')
        timeHandler()
    }, [second, minute, hour])

    useEffect( () => {
        if (status == 2) {
            setTimeout( () => {
                startTimer()
            }, 10000)
            
        } else if (status == 3) {
            stopTimer()
        } else if (status == 4) {
            stopTimer()
            resetTimer()
        }
    }, [status])

    return (
        <SafeAreaView style = {styles.componentContainer}>
            
            {/* Header */}
            <View style = {styles.header}>
                <Text style = {styles.headerText}>Stopwatch</Text>
            </View>
            
            {/* Clock */}
            <View style = {styles.clockComponent}>
                <Text style = {styles.header}>
                    {hour} h :{minute} m :{second} s
                </Text>
            </View>

            {/* <View style = {styles.buttonComponent}>
                <TouchableOpacity style = {styles.buttons} onPress ={() => {startTimer()} }>
                    <Text style = {styles.header}>START</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttons} onPress ={() => {stopTimer()} }>
                    <Text style = {styles.header}>STOP</Text>
                </TouchableOpacity>
            </View> */}

            {/* <TouchableOpacity style = {styles.buttons} onPress ={() => {resetTimer()} }>
                <Text style = {styles.header}>RESET</Text>
            </TouchableOpacity> */}
            
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    componentContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    header: {
        padding: 10,
    },
    headerText: {
        fontWeight: 'bold',
    },
    clockComponent: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
    buttonComponent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
});

export default Timer