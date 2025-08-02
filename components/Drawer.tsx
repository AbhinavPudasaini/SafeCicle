import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Landing from '@/app/(tabs)/Landing_Page';
import CommunityHelpBoard from '../app/(tabs)/report';
import CommunityPosts from '../app/(tabs)/posts';
import ZoneMap from '../app/(tabs)/ZoneMap';
import LocationMap from '../app/(tabs)/Locationmap';
import EmergencyApp from '../app/(tabs)/Help';

const DrawerNav = createDrawerNavigator();

export default function Drawer() {
  return (
    <DrawerNav.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff', // Drawer background
          width: 240,              // Drawer width
        },
        drawerActiveTintColor: '#D30A0A', // Active item color
        drawerInactiveTintColor: '#333',  // Inactive item color
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen name="Emergency" component={EmergencyApp} />
        <Drawer.Screen name="Map" component={LocationMap} />
        <Drawer.Screen name="Posts" component={CommunityPosts} />
        <Drawer.Screen name="Report" component={CommunityHelpBoard} />
        <Drawer.Screen name="ZoneMap" component={ZoneMap} />
    </DrawerNav.Navigator>
  );
}