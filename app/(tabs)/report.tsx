import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const CommunityHelpBoard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Question');
  const [selectedUserType, setSelectedUserType] = useState('Local Resident');

  const categories = [
    { id: 'question', label: 'Question', icon: '❓' },
    { id: 'problem', label: 'Problem', icon: '⚠️' },
    { id: 'suggestion', label: 'Suggestion', icon: '💡' },
  ];

  const userTypes = [
    { id: 'local', label: 'Local Resident', icon: '🏠' },
    { id: 'visitor', label: 'Visitor/Traveller', icon: '✈️' },
  ];

  const handleSubmit = () => {
    console.log({
      title,
      description,
      category: selectedCategory,
      userType: selectedUserType,
    });
    // Handle form submission here
  };

  const CategoryOption = ({ category, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.categoryOption,
        isSelected && styles.categoryOptionSelected,
      ]}
      onPress={onPress}
    >
      <View style={styles.categoryContent}>
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <Text
          style={[
            styles.categoryText,
            isSelected && styles.categoryTextSelected,
          ]}
        >
          {category.label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const UserTypeOption = ({ userType, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.userTypeOption,
        isSelected && styles.userTypeOptionSelected,
      ]}
      onPress={onPress}
    >
      <View style={styles.userTypeContent}>
        <Text style={styles.userTypeIcon}>{userType.icon}</Text>
        <Text
          style={[
            styles.userTypeText,
            isSelected && styles.userTypeTextSelected,
          ]}
        >
          {userType.label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>📋</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Community Help Board</Text>
          <Text style={styles.headerSubtitle}>Connect, share, and solve together</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Share Your Voice Section */}
        <View style={styles.shareSection}>
          <Text style={styles.shareSectionTitle}>Share Your Voice</Text>
          <Text style={styles.shareSectionSubtitle}>
            Ask questions, report issues, or share suggestions
          </Text>
        </View>

        <View style={styles.formContainer}>
          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Brief, descriptive title..."
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Provide more details..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Category Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Category</Text>
            <View style={styles.optionsContainer}>
              {categories.map((category) => (
                <CategoryOption
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.label}
                  onPress={() => setSelectedCategory(category.label)}
                />
              ))}
            </View>
          </View>

          {/* User Type Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>I am a...</Text>
            <View style={styles.optionsContainer}>
              {userTypes.map((userType) => (
                <UserTypeOption
                  key={userType.id}
                  userType={userType}
                  isSelected={selectedUserType === userType.label}
                  onPress={() => setSelectedUserType(userType.label)}
                />
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>✈️ Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerIconText: {
    fontSize: 20,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
  },
  shareSection: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  shareSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  shareSectionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  inputGroup: {
    marginTop: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  optionsContainer: {
    gap: 8,
  },
  categoryOption: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryOptionSelected: {
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    color: '#6B7280',
  },
  categoryTextSelected: {
    color: '#6366F1',
    fontWeight: '500',
  },
  userTypeOption: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userTypeOptionSelected: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  userTypeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTypeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  userTypeText: {
    fontSize: 16,
    color: '#6B7280',
  },
  userTypeTextSelected: {
    color: '#10B981',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CommunityHelpBoard;