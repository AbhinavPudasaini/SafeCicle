import { StyleSheet, Text, View, ImageBackground, TextInput, Pressable, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Number = () => {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const handleContinue = ()=>{
    router.push('/Help')
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        {/* Background Image Section */}
        <View style={styles.imageContainer}>
          <ImageBackground 
            source={require('../../assets/images/safeCircle.png')}
            style={styles.backgroundImage}
            resizeMode="contain"
          >
            <View style={styles.overlay} />
          </ImageBackground>
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Header Text */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Enter Your Phone Number</Text>
            <Text style={styles.subText}>
              We'll send you a verification code to confirm your identity
            </Text>
          </View>

          {/* Phone Input Container */}
          <View style={styles.inputContainer}>
            <View style={[
              styles.phoneInputWrapper,
              isFocused && styles.phoneInputWrapperFocused
            ]}>
              {/* Country Code */}
              <View style={styles.countryCodeContainer}>
                <Text style={styles.countryCodeText}>🇳🇵</Text>
                <Text style={styles.countryCodeNumber}>+977</Text>
              </View>
              
              {/* Separator */}
              <View style={styles.separator} />
              
              {/* Phone Number Input */}
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter phone number"
                placeholderTextColor="#9CA3AF"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <Pressable
            onPress={handleContinue}
              style={({ pressed }) => [
                styles.continueButton,
                pressed && styles.continueButtonPressed,
                phoneNumber.length < 10 && styles.continueButtonDisabled
              ]}
              disabled={phoneNumber.length < 10}
            >
              {({ pressed }) => (
                <View style={styles.buttonContent}>
                  <Text style={[
                    styles.buttonText,
                    phoneNumber.length < 10 && styles.buttonTextDisabled
                  ]}>
                    Continue
                  </Text>
                  <Text style={[
                    styles.buttonArrow,
                    phoneNumber.length < 10 && styles.buttonTextDisabled
                  ]}>
                    →
                  </Text>
                </View>
              )}
            </Pressable>
          </View>

          {/* Footer Text */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Number

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardAvoid: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backgroundImage: {
    width: width * 0.8,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginBottom: 32,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 34,
  },
  subText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 32,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    paddingVertical: 4,
  },
  phoneInputWrapperFocused: {
    borderColor: '#10B981',
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  countryCodeText: {
    fontSize: 20,
    marginRight: 8,
  },
  countryCodeNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginRight: 16,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    paddingVertical: 16,
    paddingRight: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonPressed: {
    backgroundColor: '#059669',
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0.1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'Black',
    marginRight: 8,
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
  buttonArrow: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  footerContainer: {
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  linkText: {
    color: '#10B981',
    fontWeight: '600',
  },
});