import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LandingPage from './src/screens/LandingScreen/LandingPage';
import OnboardingScreenUno from './src/screens/LandingScreen/OnboardingScreenUno';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Onboarding" component={OnboardingScreenUno} />
    </Stack.Navigator>
  );
}

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
