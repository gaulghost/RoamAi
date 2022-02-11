import axios from 'axios';
import React , {useEffect, useState} from 'react';
import {StyleSheet, Text, View, LogBox} from 'react-native';
import Roam from 'roam-reactnative';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

const RoamCallElement = (props) => {
    const [currentDate, setCurrentDate] = useState('');
    const [macAddress, setMacAddress] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const generateMacAddress = () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        setCurrentDate(date + '/' + month + '/' + year);
        DeviceInfo.getMacAddress().then((mac) => {
            setMacAddress(mac);
        });
    }

    useEffect(() => {
        generateMacAddress();
        setUserDescription(macAddress + '_' + currentDate)
        console.log("This is my User Description: ", userDescription)
        // 61f9fca7f933ac21a928e684
        Roam.getUser("61f9fca7f933ac21a928e684", success => {
        // Roam.createUser(userDescription, success => {
            // do something on success
            Roam.checkLocationPermission( status => {
                // do something with status
                console.log("This is my application success status: ",status)
                if(status != "GRANTED") Roam.requestLocationPermission();
            });
            Roam.checkBackgroundLocationPermission( Bstatus => {
                // do something with status
                console.log("This is my backend access status: ",Bstatus)
                if(Bstatus != "GRANTED") Roam.requestBackgroundLocationPermission();
            });
            Roam.enableAccuracyEngine(25);
        },
        error => {
            // do something on error
            console.log("This is my application error status: ",error)
        });
    }, []);   
    Roam.startTracking(Roam.TrackingMode.ACTIVE);
    //Update location based on distance between locations.
    Roam.startTrackingDistanceInterval(1, 10, Roam.DesiredAccuracy.HIGH);
    //Update location based on time interval.
    Roam.startTrackingTimeInterval(10, Roam.DesiredAccuracy.HIGH);
    // Roam.subscribe(BOTH, "userDescription");
    Roam.toggleListener(true, true, success => {
        // do something on success
        Roam.startListener("location", (location) => {
            // do something on location received
          });
       },
       error => {
       // do something on error
       });

       getUsers();
       getLocation();
       
    return(
        <></>
    );
}

export default RoamCallElement;
// //    Add or update User Description
//    Roam.setDescription("SET-USER-DESCRIPTION-HERE");

// //    Get previous user created
//    Roam.getUser("ROAM-USER-ID", success => {
//     // do something on success
//     },
//     error => {
//     // do something on error
//     });


const getUsers = () => {
    axios({
//             curl --location --request GET 'https://api.roam.ai/v1/api/user/?start_date=2021-06-01&end_date=2021-06-06' \
// --header 'Api-Key: 761f129e9d3a4de380baa6f4f0e7ab05'
        method: "GET",
        url: "https://api.roam.ai/v1/api/user/",
        headers: {
            "Content-Type":"application/json",
            "Api-Key":"c719c7b40c7b4a8b8339d5c38e96eb45"
        }
    })
    .then((response) => {
        // console.log(response.data)
        // console.log(response.data.data.users)
        
    })
    .catch((err) => {
        console.log(err);
    })
}

const getLocation = () => {
    axios({
        // curl --location --request GET 'https://api.roam.ai/v1/api/location/?user_id=60b90dd651efb079950db2e9&start_date=2021-06-03T00:00:00' \
        // --header 'Api-Key: 63598c5b3aa84f14914013709402bbc0'
        method: "GET",
        url: "https://api.roam.ai/v1/api/location/?user_id=61f9fca7f933ac21a928e684",
        headers: {
            "Content-Type":"application/json",
            "Api-Key":"c719c7b40c7b4a8b8339d5c38e96eb45"
        }
    })
    .then((response) => {
        // console.log(response.data)
        console.log(response)
    })
    .catch((err) => {
        console.log(err);
    })
}
