import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const EmergencyContactsApp = () => {
  const [personalContacts, setPersonalContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [newContactType, setNewContactType] = useState('');

  const emergencyServices = [
    {
      id: 1,
      name: 'Police',
      number: '911',
      description: 'Emergency police services',
      icon: 'shield-outline',
      color: '#FF4444',
    },
    {
      id: 2,
      name: 'Ambulance',
      number: '911',
      description: 'Medical emergency services',
      icon: 'medical-outline',
      color: '#FF4444',
    },
    {
      id: 3,
      name: 'Fire Department',
      number: '911',
      description: 'Fire and rescue services',
      icon: 'flame-outline',
      color: '#FF4444',
    },
    {
      id: 4,
      name: 'Poison Control',
      number: '1-800-222-1222',
      description: '24/7 poison emergency helpline',
      icon: 'warning-outline',
      color: '#FF4444',
    },
  ];

  const makeCall = (number) => {
    const phoneNumber = `tel:${number}`;
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneNumber);
        } else {
          Alert.alert('Error', 'Phone calls are not supported on this device');
        }
      })
      .catch((err) => Alert.alert('Error', 'An error occurred while trying to make the call'));
  };

  const addPersonalContact = () => {
    if (newContactName.trim() && newContactNumber.trim()) {
      const newContact = {
        id: Date.now(),
        name: newContactName.trim(),
        number: newContactNumber.trim(),
        description: newContactType.trim() || 'Personal contact',
        icon: 'person-outline',
        color: '#4A90E2',
      };
      
      setPersonalContacts([...personalContacts, newContact]);
      setNewContactName('');
      setNewContactNumber('');
      setNewContactType('');
      setModalVisible(false);
    } else {
      Alert.alert('Error', 'Please fill in both name and phone number');
    }
  };

  const deletePersonalContact = (id) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPersonalContacts(personalContacts.filter(contact => contact.id !== id));
          },
        },
      ]
    );
  };

  const ContactCard = ({ contact, isPersonal = false }) => (
    <View style={styles.contactCard}>
      <View style={styles.contactInfo}>
        <View style={[styles.iconContainer, { backgroundColor: `${contact.color}15` }]}>
          <Ionicons name={contact.icon} size={24} color={contact.color} />
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactNumber}>{contact.number}</Text>
          <Text style={styles.contactDescription}>{contact.description}</Text>
        </View>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity
          style={[styles.callButton, { backgroundColor: contact.color }]}
          onPress={() => makeCall(contact.number)}
        >
          <Ionicons name="call" size={20} color="white" />
        </TouchableOpacity>
        {isPersonal && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deletePersonalContact(contact.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#FF4444" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Emergency Contacts</Text>
          <Text style={styles.subtitle}>Quick access to important numbers</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Services</Text>
          <View style={styles.sectionContent}>
            {emergencyServices.map((service) => (
              <ContactCard key={service.id} contact={service} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Contacts</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.sectionContent}>
            {personalContacts.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="person-add-outline" size={48} color="#C7C7CC" />
                <Text style={styles.emptyStateText}>No personal contacts added</Text>
                <Text style={styles.emptyStateSubtext}>Tap the + button to add your emergency contacts</Text>
              </View>
            ) : (
              personalContacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} isPersonal={true} />
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add Contact Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Emergency Contact</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Contact Name *</Text>
              <TextInput
                style={styles.input}
                value={newContactName}
                onChangeText={setNewContactName}
                placeholder="Enter contact name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number *</Text>
              <TextInput
                style={styles.input}
                value={newContactNumber}
                onChangeText={setNewContactNumber}
                placeholder="Enter phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Relationship/Type</Text>
              <TextInput
                style={styles.input}
                value={newContactType}
                onChangeText={setNewContactType}
                placeholder="e.g., Family, Doctor, Friend"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={addPersonalContact}
              >
                <Text style={styles.saveButtonText}>Add Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  contactNumber: {
    fontSize: 15,
    fontWeight: '500',
    color: '#007AFF',
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 13,
    color: '#8E8E93',
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF444415',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#8E8E93',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 15,
    color: '#C7C7CC',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#1C1C1E',
    backgroundColor: '#FAFAFA',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
  },
  saveButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default EmergencyContactsApp;