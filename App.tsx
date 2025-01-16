import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LandingPage from './src/screens/LandingScreen/LandingPage';
import OnboardingScreen from './src/screens/LandingScreen/OnboardingScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Landing: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Landing"
        options={{headerShown: false}}
        component={LandingPage}
      />
      <Stack.Screen
        name="Onboarding"
        options={{headerShown: false}}
        component={OnboardingScreen}
      />
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
