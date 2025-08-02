import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const EmergencyApp = () => {
  const [disasterAssistanceEnabled, setDisasterAssistanceEnabled] = useState(false);

  const router = useRouter();

  const [pressCount, setPressCount] = useState(0);
  const [lastPress, setLastPress] = useState(0);

  const handleEmergencyPress = () => {
    const time = new Date().getTime();
    const delta = time - lastPress;

    if (delta < 500) {
      router.push('/camera');
      setPressCount(0);
    } else {
      setPressCount(1);
    }

    setLastPress(time);
  };

  const handleMedicalHelp = () => {
    Alert.alert("Medical Help", "Connecting to medical assistance...");
  };

  const handleNearbyAlerts = () => {
    router.push('/posts');
  };

  const handleReportInjustice = () => {
    router.push('/report');
  };

  const handleTalkToCommunity = () => {
    Alert.alert("Community", "Connecting to community support...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Safety Status */}
        <View style={styles.safetyStatus}>
          <Ionicons name="shield-checkmark" size={20} color="#059669" />
          <Text style={styles.safetyText}>CURRENTLY SAFE</Text>
        </View>

        {/* Emergency Button */}
        <View style={styles.emergencySection}>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={handleEmergencyPress}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={40} color="white" />
            <Text style={styles.emergencyButtonText}>EMERGENCY</Text>
            <Text style={styles.emergencyHelpText}>HELP</Text>
          </TouchableOpacity>
        </View>

        {/* Medical Help */}
        {/* <TouchableOpacity 
          style={styles.medicalButton}
          onPress={handleMedicalHelp}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="heart" size={24} color="#3B82F6" />
            <Text style={styles.buttonText}>Request Medical Help</Text>
          </View>
        </TouchableOpacity> */}
        <View style={styles.disasterButton}>
          <View style={styles.buttonContent}>
            <Ionicons name="heart" size={24} color="#3B82F6" />
            <Text style={styles.buttonText}>Request Medical Help</Text>
          </View>
          
        </View>

        {/* Disaster Assistance */}
        <View style={styles.disasterButton}>
          <View style={styles.buttonContent}>
            <Ionicons name="warning" size={24} color="#F59E0B" />
            <Text style={styles.buttonText}>Disaster Assistance</Text>
            <Text style={styles.nearbyText}>Nearby</Text>
          </View>
          <Switch
            value={disasterAssistanceEnabled}
            onValueChange={setDisasterAssistanceEnabled}
            trackColor={{ false: '#E5E7EB', true: '#10B981' }}
            thumbColor={disasterAssistanceEnabled ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleNearbyAlerts}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="warning" size={24} color="#F59E0B" />
            </View>
            <Text style={styles.actionText}>Nearby</Text>
            <Text style={styles.actionSubText}>Alerts</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleReportInjustice}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="chatbox" size={24} color="#8B5CF6" />
            </View>
            <Text style={styles.actionText}>Report</Text>
            <Text style={styles.actionSubText}>Injustice</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleTalkToCommunity}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="chatbubbles" size={24} color="#10B981" />
            </View>
            <Text style={styles.actionText}>Talk to</Text>
            <Text style={styles.actionSubText}>Community</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  safetyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1FAE5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 40, // 40
  },
  safetyText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  emergencySection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  emergencyButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  emergencyHelpText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  medicalButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2, // Add this line
    borderColor: 'red',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disasterButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 12,
  },
  nearbyText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  actionSubText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default EmergencyApp;