import React from 'react'
import getPermission from '../../utils/permission'
import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { Text, View, Platform, StyleSheet, Image } from 'react-native'
import MapViewDirections from 'react-native-maps-directions'
const imageIcon = require("../../Assets/arrow.png")


const routeCoord = [{ latitude: 23.0736162, longitude: 72.5117588 }
  , { latitude: 23.0737200, longitude: 72.5118688 }
  , { latitude: 23.0738400, longitude: 72.5119788 }
  , { latitude: 23.0739500, longitude: 72.5122888 }
  , { latitude: 23.0741700, longitude: 72.5125988 }
  , { latitude: 23.0742800, longitude: 72.5129188 }
  , { latitude: 23.0746900, longitude: 72.5130288 }]

const coord = [
  {
    latitude: 37.3317876,
    longitude: -122.0054812,
  },
  {
    latitude: 37.771707,
    longitude: -122.4053769,
  },
]

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    latitude: 23.0736162,
    longitude: 72.5117588,
    routeCoordinates: [],
    prevLatLng: {},
    coordinate: new AnimatedRegion({
      latitude: 23.0736162,
      longitude: 72.5117588,
      latitudeDelta: 0,
      longitudeDelta: 0
    })
  }

  componentDidMount() {
    let permission = getPermission();
    if (permission) {
      const { coordinate } = this.state
      this.WatchID = navigator.geolocation.watchPosition((position) => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;
        const newCordinate = {
          latitude,
          longitude
        };
        console.log({ newCordinate });

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCordinate,
              500
            )
          }
        } else {
          coordinate.timing(newCordinate).start();
        }
        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCordinate]),
          prevLatLng: newCordinate
        });
      },
        (error) => {
          console.log(error)
        }
      );
    }
    else {
      alert('need to give permission');
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.WatchID)
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
  });

  render() {
    return (
      <View
        style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          followsUserLocation
          loadingEnabled
          region={this.getMapRegion()}>

          {/* put the routercoordinate here so latest line draw */}
          <Polyline coordinates={routeCoord} strokeWidth={5} />

          <Marker.Animated
            // image={imageIcon}  ---> put marker icon here
            pinColor='blue'
            // ref={marker =>{this.marker = marker}} 
            // coordinate={this.state.coordinate}
            coordinate={coord[0]}
          />
          <Marker.Animated
            // image={imageIcon}  ---> put marker icon here
            pinColor="yellow"
            // ref={marker =>{this.marker = marker}} 
            // coordinate={this.state.coordinate}
            coordinate={coord[1]}
          />

          <MapViewDirections
            origin={coord[0]}
            destination={coord[1]}
            strokeWidth={6}
            strokeColor="hotpink"
            apikey='your api key here' />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

export default Home;
