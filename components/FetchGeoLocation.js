import React , {useEffect, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import ModalPopUp from './ModalPopUp';

const FetchGeo = (props) => {
    const [latitude, setLatitude] = useState(28)
    const [longitude, setLongitude] = useState(77)
    const [geoFenceLat, setGeoFenceLat] = useState()
    const [geoFenceLong, setGeoFenceLong] = useState()
    const [radius, setRadius] = useState("50")
    const [isInside, setIsInside] = useState(true)
    const makeFence = (props) => {
        setLocation(props);
        setGeoFenceLong(longitude);
        setGeoFenceLat(latitude);
    }
    const distance = Math.sqrt(Math.pow(geoFenceLat - latitude, 2) + Math.pow(geoFenceLong - longitude,2));
    const setLocation = (props) => {
        Geolocation.getCurrentPosition(info => {
            // console.log(info)
            setLatitude(info.coords.latitude)
            setLongitude(info.coords.longitude)
            if(distance > radius && isInside == true){
                setIsInside(false);
                return(<ModalPopUp text = "You have crossed past the GeoFence you had made" visible = "true"/>);
            }
            else if(distance <= radius && isInside == false){
                setIsInside(true);
                return(<ModalPopUp text = "You have entered the GeoFence Area" visible = "true"/>);
            }
        },
        error => {console.log(error);
            props.setLocationFound(false);
        },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        )
    }
    useEffect(() => {
        setLocation();
    }, [])
    return(
        <>
        <View style = {styles.mapContainer}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{flex: 1, ...StyleSheet.absoluteFillObject,}}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: (isNaN(parseFloat(radius)/30000) || parseFloat(radius) < 300)? 0.0122 : parseFloat(radius)/30000,
                    // latitudeDelta: (isNaN(parseFloat(radius)/30000))? 0.0122 : parseFloat(radius)/30000,
                    longitudeDelta: isNaN(parseFloat(radius)/30000)? 0.0061 : parseFloat(radius)/30000,
                    }}>
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}>
                </Marker>
                <MapView.Circle
                    // key = { (latitude + longitude).toString() }
                    center = { {latitude: (isNaN(geoFenceLat))? latitude : geoFenceLat, longitude: (isNaN(geoFenceLong))? longitude : geoFenceLong} }
                    radius = { isNaN(parseInt(radius))? 50 : parseInt(radius)}
                    strokeWidth = { 1 }
                    strokeColor = { '#1a66ff' }
                    fillColor = { 'rgba(230,238,255,0.5)' }
                    // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
                />
                {/* <MessageBar/> */}
            </MapView>
        </View>
        <TouchableOpacity onPress = {() => setLocation(props)} style = {styles.relocateButton} ><Text style = {styles.relocateButtonText}>Relocate me</Text></TouchableOpacity>
        <TouchableOpacity onPress = {() => makeFence(props)} style = {styles.relocateButton} ><Text style = {styles.relocateButtonText}>Make GeoFence around my current Location</Text></TouchableOpacity>
        <TextInput
            style={styles.radiusInput}
            onChangeText={setRadius}
            placeholder="Radius of GeoFence (Default : 50)"
            keyboardType="numeric"
        />
        </>
    );
}

const styles = StyleSheet.create({
    mapContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderColor: "#000",
        borderWidth: 0.2,
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').width - 20,
        margin: 10
    },
    relocateButton: {
        padding: 15,
        alignContent: 'center',
        borderColor: "#000",
        borderWidth: 0.2
    },
    relocateButtonText: {
        fontSize: 15,
        color: '#606060',
        fontWeight: '500'
    },
    radiusInput: {
        borderWidth: 1,
        padding: 15,
        alignContent: 'center',
        borderColor: "#000",
        borderWidth: 0.2,
        fontSize: 15,
        color: '#606060',
        fontWeight: '500'
      },
});

export default FetchGeo;