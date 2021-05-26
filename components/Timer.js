import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

const Timer = () => {
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
    }

    useEffect( () => {
        console.log('handling')
        timeHandler()
    }, [second, minute, hour])

    return (
        <SafeAreaView style = {styles.container}>
            <View>
                <Text style = {styles.header}>
                    {hour}:{minute}:{second}
                </Text>
            </View>

            <View style = {styles.timerButtons}>
                <TouchableOpacity style = {styles.buttons} onPress ={() => {startTimer()} }>
                    <Text style = {styles.header}>START</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttons} onPress ={() => {stopTimer()} }>
                    <Text style = {styles.header}>STOP</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style = {styles.buttons} onPress ={() => {resetTimer()} }>
                <Text style = {styles.header}>RESET</Text>
            </TouchableOpacity>
            
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 200,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    header: {
        textAlign: 'center',
    },
    timerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttons: {
        backgroundColor: 'red',
        padding: 10,

    }
});

export default Timer