import React, { useState } from 'react'

import firebaseKey from './firebaseKey'
import firebase from 'firebase'

import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux'

import store from './redux/store'

const firebaseConfig = {
  apiKey: firebaseKey.key,
  authDomain: "cashflow-app-cf187.firebaseapp.com",
  projectId: "cashflow-app-cf187",
  storageBucket: "cashflow-app-cf187.appspot.com",
  messagingSenderId: "588417739734",
  appId: firebaseKey.appId,
  measurementId: "G-95VLD1F8GB"
};

if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    //console.log({user: user})
    if(!user){
      setLoaded(true);
      setLoggedIn(false);
    } else {
      setLoaded(true);
      setLoggedIn(true);
    }
  })

  if (!loaded){
    return(
      <View style={{ 
        flex: 1,
        justifyContent: 'center', 
        backgroundColor: '#dbddc3', 
        textAlign: 'center', 
        alignItems: 'center' 
      }}>
        <Text style={{ 
          fontSize: 30, 
          color: 'gray' 
        }}>
          Loading...
        </Text>
      </View>
    );
  }
  if (!loggedIn){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return(
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen 
              name="Main" 
              component={MainScreen} 
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  )
}
