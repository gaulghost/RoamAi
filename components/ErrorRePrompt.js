import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {BackHandler} from 'react-native';

const giveUserPrompt = (props) => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
    })
    .then((data) => {
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
        props.setLocationFound(true)
    })
    .catch((err) => {
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
        props.setLocationFound(false)
    });
}

const ErrorPrompt = (props) => {
    return(
        <View style = {styles.errorBackground}>
            <View style = {styles.errorContainer}>
                <Text style = {styles.baseFont}>You will not be able to access the Geo-Fencing App until the location access is provided</Text>
                <TouchableOpacity onPress= {() => BackHandler.exitApp()}><Text style = {styles.baseFont}>Exit App</Text></TouchableOpacity>
                <TouchableOpacity onPress= {() => giveUserPrompt(props)}><Text style = {styles.baseFont}>Give Permissions</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    errorBackground:{
        backgroundColor: '#7f7f7f',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorContainer: {
        backgroundColor: '#e5e5e5',
        padding: 15
    },
    baseFont: {
        padding: 15,
        fontSize: 15,
        color: "#191919",
        fontWeight: "600",
        alignContent: 'center'
    }
})

export default ErrorPrompt;