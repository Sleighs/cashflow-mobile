import React, { Component, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import { connect, useDispatch } from 'react-redux'
import store from '../redux/store'
import { getUser } from '../redux/reducers/rootReducer'

import firebase from 'firebase'

import Home from './game/Home'
import GameSetup from './game/GameSetup'
import Game from './game/Game'
import Stock from './game/Stock'
import Sale from './game/Sale'

import HomeScreen from './game/Home'
import GameSetupScreen from './game/GameSetup'
import GameScreen from './game/Game'
import StockScreen from './game/Stock'
import ProfileScreen from './main/Profile'
import DebugScreen from './main/Debug'
import SaleScreen from './game/Sale'


const HomeStack = createStackNavigator();

function HomeStackScreen(props) {

  const navigation = useNavigation();

  useEffect(() => {
    //console.log('homestacknav: ', navigation)
})

  return (
    <HomeStack.Navigator 
        initialRouteName={Screens[0].name}
    >
      {
        Screens.map(screen => 
            <HomeStack.Screen
                key={screen.name}
                name={screen.name}
                options={{
                  headerShown: false,
                }}
                children={
                    screen.component === HomeScreen ? (()=> <Home {...props} navigation={navigation}/>) :
                    screen.component === GameSetupScreen ? (()=> <GameSetup {...props}/>) :
                    screen.component === GameScreen ? (()=> <Game {...props} navigation={navigation}/>) :  
                    screen.component === StockScreen ? (()=> <Stock {...props} navigation={navigation}/>) : 
                    screen.component === SaleScreen ? (()=> <Sale {...props} navigation={navigation}/>) :                                    
                        <Home {...props}/>
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
    {
        name:'Stock',
        iconType:'Material',
        iconName:'user-friends',
        component: StockScreen
    },
    {
        name:'Sale',
        iconType:'Material',
        iconName:'user-friends',
        component: SaleScreen
    },
]

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () =>{
    return(null)
}

const Main = (props) => {
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
            lazy={true}
        >
            <Tab.Screen 
                name="Home"
                children={() => <HomeStackScreen {...props} />}
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