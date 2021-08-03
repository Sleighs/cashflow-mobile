import React, { Component, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';

import { connect, useDispatch } from 'react-redux'
import store from '../redux/store'
import { getUser } from '../redux/reducers/rootReducer'

import firebase from 'firebase'

import Home from './game/Home'
import GameSetup from './game/GameSetup'
import Game from './game/Game'

import HomeScreen from './game/Home'
import GameSetupScreen from './game/GameSetup'
import GameScreen from './game/Game'
import ProfileScreen from './main/Profile'
import DebugScreen from './main/Debug'
import DrawerHeader from './game/DrawerHeader'

const HomeStack = createStackNavigator();

function HomeStackScreen(props) {
  return (
    <HomeStack.Navigator 
        initialRouteName={Screens[0].name}
    >
      {
        Screens.map(screen => 
            <HomeStack.Screen
                key={screen.name}
                name={screen.name}
                //component={screen.component}
                options={{
                  headerShown: false,
                }}
                children={
                    screen.component === HomeScreen ? (()=> <Home {...props}/>) :
                        screen.component === GameSetupScreen ? (()=> <GameSetup {...props}/>) :
                            screen.component === GameScreen ? (()=> <Game {...props}/>) : <Home {...props}/>
                }
            />)
        }
    </HomeStack.Navigator>
  );
}

const Screens = [
    {
        name:'Home',
        iconType:'Material',
        iconName:'user-friends',
        component: HomeScreen
    },
    {
        name:'Game',
        iconType:'Material',
        iconName:'user-friends',
        component: GameScreen
    },
    {
        name:'GameSetup',
        iconType:'Material',
        iconName:'user-friends',
        component: GameSetupScreen
    },
]

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () =>{
    return(null)
}

const Main = () => {
    const dispatch = useDispatch()
    const [userCheck, setUserCheck] = useState(false);

    function fetchUser() {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists){
                    //console.log({ fetchUser: snapshot.data() })
                    dispatch(getUser(snapshot.data()))
                } else {
                    console.log('user does not exist')
                }
            })
    }

    useEffect(()=>{
        if (!userCheck){
            fetchUser()
            setUserCheck(true)
        }
    })

    return (
        <Tab.Navigator 
            initialRouteName="Home" 
            labeled={false}
            screenOptions={{
                tabBarStyle: { 
                    backgroundColor: 'gray', 
                },
              }}
        >
            <Tab.Screen 
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    )
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    )
                }}
            />
            <Tab.Screen 
                name="Debug" 
                component={DebugScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="tools" color={color} size={26}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Main