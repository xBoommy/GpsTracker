import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ScrollView} from 'react-native';
import GPS from './components/GPS';



const App = () => {
  return (
    <SafeAreaView style = {styles.application}>
      {/* <View style = {styles.header}>
        <Text>APP</Text>
      </View> */}
      
      <View style = {styles.gps}>
        <GPS/>
      </View>

      {/* <View style = {styles.maps}>
        <Mapping/>
      </View> */}

      {/* <View style = {styles.buffer}></View> */}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  application: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    // borderWidth: 1,
    // borderColor: 'purple',
  },
  gps: {
    // flex: 2,
    // borderWidth: 1,
    // borderColor: 'purple',
  },

});

export default App;
