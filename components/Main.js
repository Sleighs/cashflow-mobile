import React, { Component, useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchData } from '../redux/actions'

import HomeScreen from './game/Home'
import GameSetupScreen from './game/GameSetup'
import GameScreen from './game/Game'
import ProfileScreen from './main/Profile'
import DebugScreen from './main/Debug'

import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

const HomeStack = createStackNavigator();

function HomeStackScreen({ navigation, route }) {
    /*
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'Game') {
            navigation.setOptions({tabBarVisible: false});
        }else {
            navigation.setOptions({tabBarVisible: true});
        }
    }, [navigation, route])
    */

  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="Game" 
        component={GameScreen} 
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="GameSetup" 
        component={GameSetupScreen} 
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () =>{
    return(null)
}

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser()
        //this.props.fetchData()
    }
    render() {
        const { currentUser, currentData } = this.props;
        
        /*console.log({
            //currentUser: currentUser,
            //currentData: currentData
        })*/

        return (
            <Tab.Navigator initialRouteName="Home" labeled={false}>
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
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)
