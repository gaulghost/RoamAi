import React, {useState, useEffect} from 'react';
import { AppRegistry, TextInput, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ModalPopUp from './ModalPopUp';


const RealTimeGeoLocation = (props) => {

    const [lats, setLats] = useState(28)
    const [longs, setLongs] = useState(77)
    const [geoFenceLat, setGeoFenceLat] = useState()
    const [geoFenceLong, setGeoFenceLong] = useState()
    const [radius, setRadius] = useState("50")
    const [isInside, setIsInside] = useState(true)
    const makeFence = (props) => {
        setLocation(props);
        setGeoFenceLong(longs);
        setGeoFenceLat(lats);
    }

    const {width, height} = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.0922
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

    const [initialPosition, setInitialPosition] = useState({
        latitude: 28,
        longitude: 77,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0477
    })

    const [markerPosition, setMarkerPosition] = useState({
        latitude: 28,
        longitude: 77
    })

    // watchID: ?number = null
    // watchId: number | null = null
    let watchID = null;

    const setLocation = (props) => {
        Geolocation.getCurrentPosition((position) => {
            const lat = parseFloat(position.coords.latitude)
            const long = parseFloat(position.coords.longitude)

            const distance = Math.sqrt(Math.pow(geoFenceLat - lat, 2) + Math.pow(geoFenceLong - long,2))
            if(distance > radius && isInside == true){
                setIsInside(false);
                alert(JSON.stringify("You have crossed past the GeoFence you had made"));
            }
            else if(distance <= radius && isInside == false){
                setIsInside(true);
                alert(JSON.stringify("You have entered the GeoFence Area"));
            }

            setLats(lat)
            setLongs(long)

            console.log(position)

            const initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }

            setInitialPosition(initialRegion)
            setMarkerPosition({latitude: lat, longitude: long})
        }, (error) => {
            // alert(JSON.stringify(error));
            props.setLocationFound(false);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge:2000
        })

        watchID = Geolocation.watchPosition((position) => {
            const lat = parseFloat(position.coords.latitude)
            const long = parseFloat(position.coords.longitude)

            const lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
            setInitialPosition(lastRegion)
            setMarkerPosition({latitude: lat, longitude: long})
        })
    }

    useEffect(() => {
        // componentDidMount events
        let isMounted = true;  
        setLocation(props);
        return () => {
        // componentWillUnmount events
        Geolocation.clearWatch(watchID)
        isMounted = false
        }
    }, []);

    return (
        <View style = {styles.container}>
            <MapView style={styles.map} region = {initialPosition} provider={PROVIDER_GOOGLE}>
                <MapView.Marker coordinate = {markerPosition}>
                    <View style = {styles.radius}>
                        <View style = {styles.marker}></View>
                    </View>
                </MapView.Marker>
                <MapView.Circle
                    center = { {latitude: (isNaN(geoFenceLat))? lats : geoFenceLat, longitude: (isNaN(geoFenceLong))? longs : geoFenceLong} }
                    radius = { isNaN(parseInt(radius))? 50 : parseInt(radius)}
                    strokeWidth = { 1 }
                    strokeColor = { '#1a66ff' }
                    fillColor = { 'rgba(230,238,255,0.5)' }
                />
            </MapView>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity style = {styles.buttonStyle} onPress = {() => makeFence(props)}><Text style = {styles.textCentering}>GeoFence Around Me</Text></TouchableOpacity>
                <View style = {styles.buttonStyle}>
                    <TextInput
                        style={styles.radiusInput}
                        onChangeText={setRadius}
                        placeholder="Fence Radius"
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style = {styles.buttonStyle} onPress = {() => setLocation(props)}><Text style = {styles.textCentering}>Relocate</Text></TouchableOpacity>
            </View>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    map: {
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        // position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 80,
    },
    radius:{
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 112, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20 / 2,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        width: Dimensions.get('window').width,
    },
    buttonStyle: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        paddingBottom: 30,
        width: Dimensions.get('window').width / 3,
        borderWidth: 0.1,
        borderColor: '#000'
    },
    textCentering: {
        textAlign: 'center',
        borderColor: '#000',
        borderWidth: 0.1,
    },
    radiusInput: {
        width: (Dimensions.get('window').width / 3) - 10
    }
})

export default RealTimeGeoLocation;



// const Component = () => {
//     useMemo(() => {
//       // componentWillMount events
//     },[]);
//     useEffect(() => {
//       // componentDidMount events
//       return () => {
//         // componentWillUnmount events
//       }
//     }, []);
//  };