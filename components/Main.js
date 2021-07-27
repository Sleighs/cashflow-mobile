import React, { Component } from 'react'
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

const HomeStack = createStackNavigator();

function HomeStackScreen({ navigation }) {
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
        this.props.fetchData()
    }
    render() {
        const { currentUser, currentData } = this.props;
        
        console.log({
            currentUser: currentUser,
            currentData: currentData
        })

        return (
            <Tab.Navigator initialRouteName="Home" labeled={false}>
                <Tab.Screen 
                    name="Home"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26}/>
                        )
                    }}>
                    {() =>(
                        <HomeStack.Navigator>
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
                    )}
                </Tab.Screen>
                
                <Tab.Screen 
                    name="Profile" 
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                        )
                    }}/>
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
    currentUser: store.userState.currentUser,
    currentData: store.dataState.currentData,
    props: 555
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchData}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)
