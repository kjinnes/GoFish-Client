import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import {
  StyleSheet, Text, Button, View, Dimensions, TouchableOpacity, Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { submitLocation } from '../redux/actions/surveyActions';
import MyLocationMapMarker from '../components/maps/MyLocationMarker';
import LocationModal from '../components/maps/LocationModal';

const CustomMarker = () => (
  <View
    style={{
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: '#007bff',
      borderColor: '#eee',
      borderRadius: 5,
      elevation: 10,
    }}
  >
    <Text style={{ color: '#fff' }}>CM</Text>
  </View>
);

const getLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return false;
  return true;
};

export default function ProjectMap({ navigation }) {
  const dispatch = useDispatch();
  const [mapRegion, setMapRegion] = useState(null);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [modal, setModal] = useState({ visible: false, pinDropped: false });
  const [buttons, setButtons] = useState({
    addPin: false,
  });

  const setMapState = (dropPin = false) => {
    // accepts only one marker
    setMarkers([]);
    setModal((prev) => ({ ...prev, visible: false, pinDropped: dropPin }));
    setButtons((prevButtons) => ({
      ...prevButtons,
      addPin: dropPin,
    }));
  };

  const submitLocationHandler = async () => {
    // just a failsafe
    if (markers.length > 1) throw new Error('Too many map markers!');
    const loc = markers[0] || currentLocation;
    const coords = {
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
    };
    const result = await dispatch(submitLocation(coords));
    if (result && result.payload) {
      console.log('pay', result.payload);
      setMapState(); // resets map state
      navigation.navigate('Fish1');
    } else {
      throw new Error('Location could not be saved!');
    }
  };

  // gets permissions and initial location
  // eslint-disable-next-line no-unused-expressions
  useEffect(() => {
    const getLocPerm = async () => {
      const locPermission = await getLocationPermission();
      if (!locPermission) {
        setCurrentLocation('Permission to access location was denied');
      } else {
        setHasLocationPermissions(true);
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setCurrentLocation(loc);
        setMapRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        });
      }
    };
    if (hasLocationPermissions === null) getLocPerm();
  }),
  [];

  // if marker added, open modal
  useEffect(() => {
    if (markers.length) setModal((prev) => ({ ...prev, visible: true, pinDropped: true }));
  }, [markers]);

  // if 'add pin' has been clicked, add pin on map press
  const onMapPress = (e) => {
    if (buttons.addPin && !markers.length) {
      setMarkers(
        markers.concat({
          coordinate: e.nativeEvent.coordinate,
          key: markers[markers.length - 1] ? markers[markers.length - 1].key + 1 : 1,
        }),
      );
    }
  };

  const centerMap = async () => {
    setMapRegion((prevRegion) => ({
      ...prevRegion,
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    }));
  };

  // gets location from MyLocationMapMarker
  const locationFromChild = (data) => {
    console.log(data);
    setCurrentLocation(data);
  };

  return currentLocation ? (
    <View style={styles.container}>
      <LocationModal
        commands={modal}
        dropPin={setMapState}
        submitLocation={submitLocationHandler}
      />
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={(e) => onMapPress(e)}
        /* onRegionChange={onRegionChange} */
      >
        <MyLocationMapMarker dataToParent={locationFromChild} />

        {markers.map((marker) => (
          <Marker key={marker.key} coordinate={marker.coordinate} />
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => centerMap()}>
          <Image source={require('../assets/mapIcons/centerMap.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModal((prev) => ({ ...prev, visible: true }))}
        >
          <Image source={require('../assets/mapIcons/dropPin_60px.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ReferenceInfo')}
        >
          <Image source={require('../assets/mapIcons/fishIcon.png')} />
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <Text style={{ alignSelf: 'center', top: '50%' }}> Loading... </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '0%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#ff3399',
    borderRadius: 12,
    padding: 5,
    margin: 20,
    opacity: 0.7,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
});

ProjectMap.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

ProjectMap.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};
