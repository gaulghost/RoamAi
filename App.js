/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import StartPage from './components/CheckLocationEnabled';
 import RoamCallElement from './components/roamCallNative';
 import ModalPopUp from './components/ModalPopUp';
 import RealTimeGeoLocation from './components/RealTimeGeoLocation';
 
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   LogBox
 } from 'react-native';
  
 LogBox.ignoreAllLogs(); //Ignore all log notifications

 const App = () => {
   return(
     <ScrollView style = {styles.container}>
       <StartPage/>
       {/* <RealTimeGeoLocation/> */}
     </ScrollView>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex : 1,
     backgroundColor: '#ececec'
   }
 });
 
 export default App;
 