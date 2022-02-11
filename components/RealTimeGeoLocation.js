import React, {useState, useEffect} from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';



const RealTimeGeoLocation = (props) => {

    const {width, height} = Dimensions.get('window')
    const SCREEN_HEIGHT = height
    const SCREEN_WIDTH = width
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.0922
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

    const [initialPosition, setInitialPosition] = useState({
        latitude: 28,
        longitude: 77,
        longitudeDelta: 0,
        latitudeDelta: 0
    })

    const [markerPosition, setMarkerPosition] = useState({
        latitude: 28,
        longitude: 77
    })

    // watchID: ?number = null
    // watchId: number | null = null
    var watchID = null;

    // useMemo(() => {
    //     // componentWillMount events
    // },[]);
    useEffect(() => {
        // componentDidMount events
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = parseFloat(position.coords.latitude)
            const long = parseFloat(position.coords.longitude)

            const initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }

            setInitialPosition(initialRegion)
            setMarkerPosition({latitude: lat, longitude: long})
        }, (error) => alert(JSON.stringify(error)),
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge:1000
        })

        watchID = navigator.geolocation.watchPosition((position) => {
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
        return () => {
        // componentWillUnmount events
        navigator.geolocation.clearWatch(this.watchID)
        }
    }, []);

    // componentDidMount() {
        
    // }

    // componentWillUnmount() {
        
    // }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       latitude: LATITUDE,
    //       longitude: LONGITUDE,
    //       routeCoordinates: [],
    //       distanceTravelled: 0,
    //       prevLatLng: {},
    //       coordinate: new AnimatedRegion({
    //        latitude: LATITUDE,
    //        longitude: LONGITUDE
    //       })
    //     };
    //   }

    //   componentDidMount() {
    //     this.watchID = navigator.geolocation.watchPosition(
    //       position => {
    //         const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
    //         const { latitude, longitude } = position.coords;
            
    //         const newCoordinate = {
    //           latitude,
    //           longitude
    //         };
    //         if (Platform.OS === "android") {
    //           if (this.marker) {
    //             this.marker._component.animateMarkerToCoordinate(
    //               newCoordinate,
    //               500
    //             );
    //            }
    //          } else {
    //            coordinate.timing(newCoordinate).start();
    //          }
    //          this.setState({
    //            latitude,
    //            longitude,
    //            routeCoordinates: routeCoordinates.concat([newCoordinate]),
    //            distanceTravelled:
    //            distanceTravelled + this.calcDistance(newCoordinate),
    //            prevLatLng: newCoordinate
    //          });
    //        },
    //        error => console.log(error),
    //        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     );
    //   }

    //   if (Platform.OS === "android") {
    //     if (this.marker) {
    //     this.marker._component.animateMarkerToCoordinate(
    //       newCoordinate,
    //       500
    //      );
    //     }
    //   } else {
    //     coordinate.timing(newCoordinate).start();
    //   }

    //   this.setState({
    //     latitude,
    //     longitude,
    //     routeCoordinates: routeCoordinates.concat([newCoordinate]),
    //     distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
    //     prevLatLng: newCoordinate
    //   });

    //   getMapRegion = () => ({
    //     latitude: this.state.latitude,
    //     longitude: this.state.longitude,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA
    //   });

    return (
        <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}
            >
            <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
            <Marker.Animated
                ref={marker => {
                this.marker = marker;
                }}
                coordinate={this.state.coordinate}
            />
        </MapView>
    );
}
 
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