import React, { Component, useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchData } from '../redux/actions'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  import { getHeaderTitle } from '@react-navigation/elements';


import HomeScreen from './game/Home'
import GameSetupScreen from './game/GameSetup'
import GameScreen from './game/Game'

import ProfileScreen from './main/Profile'
import DebugScreen from './main/Debug'

import DrawerHeader from './game/DrawerHeader'

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
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
    <HomeStack.Navigator initialRouteName={Screens[0].name}>
      {
        Screens.map(screen => 
            <HomeStack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
                options={{
                  headerShown: false,
                }}
            />)
        }
    </HomeStack.Navigator>
  );
}
function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Help" onPress={() => alert('Link to help')} />
      </DrawerContentScrollView>
    );
  }

const Screens = [
    {
        name:'Home',
        iconType:'Material',
        iconName:'user-friends',
        component: HomeScreen,
    },
    {
        name:'Game',
        iconType:'Material',
        iconName:'user-friends',
        component: GameScreen,
    },
    {
        name:'GameSetup',
        iconType:'Material',
        iconName:'user-friends',
        component: GameSetupScreen,
    },
]

function DrawerNav(){
    return(
        <Drawer.Navigator 
          drawerType="permanent"
          initialRouteName="Home"
          swipeEnabled="true"
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: { marginVertical: 10 },
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          {
            Screens.map(drawer => 
                <Drawer.Screen
                    key={drawer.name}
                    name={drawer.name}
                    component={drawer.component}
                    options={{
                        headerShown: true,
                        header: () => <DrawerHeader screen={drawer.name}/> ,
                        drawerIcon:({focused})=>
                            <MaterialCommunityIcons 
                                name={'face-profile'}
                                size={24} 
                                color={"black"} 
                            />,
                    }}
                />)
            }
        </Drawer.Navigator>
    )
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
