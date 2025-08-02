import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert, TextInput, Button, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export default function ZoneMap() {
  const [markers, setMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [zoneType, setZoneType] = useState("safe"); // or "danger"
  const [comment, setComment] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "zones"), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setMarkers(data);
    });
    return () => unsub();
  }, []);

  const handleLongPress = (event) => {
    setSelectedCoords(event.nativeEvent.coordinate);
    setModalVisible(true);
  };

  const handleSave = async () => {
    await addDoc(collection(db, "zones"), {
      latitude: selectedCoords.latitude,
      longitude: selectedCoords.longitude,
      type: zoneType,
      comment: comment,
    });
    setModalVisible(false);
    setComment("");
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onLongPress={handleLongPress}
        initialRegion={{
          latitude: 27.7172,
          longitude: 85.3240,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={marker.type === "safe" ? "green" : "red"}
            title={marker.type === "safe" ? "Safe Zone" : "Danger Zone"}
            description={marker.comment}
          />
        ))}
      </MapView>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <TextInput
            placeholder="Comment (e.g. 'Flooded road')"
            value={comment}
            onChangeText={setComment}
            style={styles.input}
          />
          <Button title="Mark as Safe" color="green" onPress={() => {
            setZoneType("safe");
            handleSave();
          }} />
          <View style={{ marginTop: 10 }} />
          <Button title="Mark as Danger" color="red" onPress={() => {
            setZoneType("danger");
            handleSave();
          }} />
          <View style={{ marginTop: 10 }} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modal: {
    marginTop: 100,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
