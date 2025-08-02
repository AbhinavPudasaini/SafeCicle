import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [location, setLocation] = useState(null);
  const [mapExpanded, setMapExpanded] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const mapStyle = mapExpanded ? styles.mapExpanded : styles.mapCollapsed;

  function handleDirections() {
    if (location) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
      Linking.openURL(url);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing} 
      />
      <View style={styles.buttonContainer}>
        <Button title="Flip Camera" onPress={toggleCameraFacing} />
      </View>
      <TouchableOpacity 
        style={mapStyle}
        onPress={() => setMapExpanded(!mapExpanded)}
      >
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.latitude || 27.7172,
            longitude: location?.longitude || 85.3240,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You are here"
            />
          )}
        </MapView>
        {mapExpanded && (
          <>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMapExpanded(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.directionsButton}
              onPress={handleDirections}
            >
              <Text style={styles.textStyle}>Directions</Text>
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
  },
  camera: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  mapCollapsed: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  mapExpanded: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  directionsButton: {
    position: 'absolute',
    top: 90,
    right: 20,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});