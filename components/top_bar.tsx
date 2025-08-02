import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      {/* Left side: Logo + Title */}
      <View style={styles.left}>
        <Image source={require('../assets/images/shield.png')} style={styles.logo} />
        <View style={styles.textBox}>
          <Text style={styles.title}>SafeCircle</Text>
          <Text style={styles.tagline}>Your Community Guardian</Text>
        </View>
      </View>

      {/* Right side: Search + Menu */}
      <View style={styles.right}>
        <TouchableOpacity>
          <Image source={require('../assets/images/more.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textBox: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  tagline: {
    fontSize: 10,
    color: '#555',
  },
  right: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 12,
    tintColor: '#333',
  },
});

export default Navbar;
