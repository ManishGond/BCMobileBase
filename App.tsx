import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import LandingPage from './src/screens/ComponentScreen/LandingPage';
import OnboardingScreen from './src/screens/ComponentScreen/OnboardingScreen';
import {getItem} from './src/utils/asynStorage';
import {AuthProvider} from './src/context/AuthContext';
import LoginPage from './src/screens/LoginScreen/LoginPage';
import SignupPage from './src/screens/SignupScreen/SignupPage';
import SearchPage from './src/screens/ComponentScreen/SearchPage';

export type RootStackParamList = {
  Onboarding: undefined;
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Search: {query: string};
};

const Stack = createNativeStackNavigator();

function RootStack() {
  const [initialScreen, setInitialScreen] = useState<string | null>(null);

  useEffect(() => {
    checkInitialScreen();
  }, []);

  const checkInitialScreen = async () => {
    const onboarded = await getItem('onboarded');
    const loggedIn = await getItem('loggedIn');
    if (!onboarded) {
      setInitialScreen('Onboarding');
    } else if (loggedIn) {
      setInitialScreen('Landing');
    } else {
      setInitialScreen('Login');
    }
  };

  if (!initialScreen) {
    return null; // You can return a loader here
  }

  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName={initialScreen}>
        <Stack.Screen
          name="Onboarding"
          options={{headerShown: false}}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginPage}
        />
        <Stack.Screen
          name="Signup"
          options={{headerShown: false}}
          component={SignupPage}
        />
        <Stack.Screen
          name="Landing"
          options={{headerShown: false}}
          component={LandingPage}
        />
        <Stack.Screen
          name="Search" // Add the Search screen
          options={{
            headerShown: false, // Adjust this if you want a header
          }}
          component={SearchPage}
        />
      </Stack.Navigator>
    </AuthProvider>
  );
}

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
