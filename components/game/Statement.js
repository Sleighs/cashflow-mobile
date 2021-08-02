import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { connect, useStore, useSelector, useDispatch } from 'react-redux';

import GameState from '../../js/GameState';
import store from '../../redux/store';
import { getGameData, getPayCalc } from '../../redux/reducers/rootReducer';

const Stats = (props) => {
    const player = GameState.players[GameState.currentPlayer];

    return (
        <View style={styles.tabContainer}>
            <View>
                <View>
                    <Text style={{fontSize: 20}}>Summary</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={[styles.summaryText, {color: 'darkgreen'}]}>Cash:</Text>
                    <Text> ${GameState.numWithCommas(player.cash)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Insurance:</Text> 
                    <Text>{!player.hasInsurance ? 'None' : 'Insured'}</Text>
                </View>            
            </View>
            <View>
                <View>
                    <Text style={{fontSize: 20}}>Income:</Text>
                </View>
                {player.income.map(item => 
                    <TouchableOpacity
                        key={item.type}
                        name={item.type}
                        onPress={() => {

                        }}
                        >
                        <View style={styles.incomeRow}>
                            <Text style={styles.incomeName}>{item.type}: </Text>
                            <Text style={styles.incomeAmount}>${GameState.numWithCommas(item.amount)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const Assets = (props) => {
    const player = GameState.players[GameState.currentPlayer];
    /* tab navigator
        - property
            - developed land
            - undeveloped land
            - coins
            - cd
        - stocks
            - mutuals
            - preferred
            - stock
        - businesses
            - company
            - limited partnership
            - automated business


    */

    return (
        <View style={styles.tabContainer}>
            <Text>Assets</Text>
        </View>
    )
}

const Liabilities = (props) => {
    const { paymentCalc, openPaymentCalc } = props;
    const player = GameState.players[GameState.currentPlayer];
    const dispatch = useDispatch()
    const stuff = useSelector(state => state.paymentCalc)

    return (
        <View style={styles.tabContainer}>
            {player.liabilities.map(item => 
                <TouchableOpacity
                    key={item.type}
                    name={item.type}
                    onPress={() => {
                        openPaymentCalc(true);
                        GameState.paymentCalc.open = true;
                        GameState.paymentCalc.type = item.type;
                        dispatch(getPayCalc(true))
                        console.log('stuff', stuff)

                    }}
                    >
                    <View style={styles.liabilitiesRow}>
                        <Text style={styles.liabilitiesName}>{item.type}:</Text>
                        <Text style={styles.liabilitiesCost}>${GameState.numWithCommas(item.cost)}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
}

const StatementTab = createMaterialTopTabNavigator();

function StatementTabs(props) {
  return (
    <StatementTab.Navigator
        initialRouteName="Stats"
        initialLayout={{ 
            width: '100%', 
        }}
    >
        <StatementTab.Screen 
            name="Stats"  
            children={() => <Stats {...props} />}
        />
        <StatementTab.Screen 
            name="Assets" 
            children={() => <Assets {...props} />}
         />
        <StatementTab.Screen 
            name="Liabilities" 
            children={() => <Liabilities {...props} />}
        />
    </StatementTab.Navigator>
  );
}

const Statement = (props) => {
    const { data, setData } = props;

    const [loaded, setLoaded] = useState(false)

    const player = GameState.players[GameState.currentPlayer];
    
    const dispatch = useDispatch();
    
    if (!loaded){
        //dispatch(getGameData(GameState))
        //setLoaded(true)
        //console.log('statement props', props)
        //setData(GameState)
    }


    return(
        <View style={styles.statementContainer}>            
            <StatementTabs {...props}/>
        </View>    
    )
}

const styles = StyleSheet.create({
    statementContainer: {
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        flex: 3,
        
        maxWidth: Dimensions.get('window').width,
        width: '100%',
        marginTop: 30,
        borderRadius: 15,
    },
    statementHeader: {
        backgroundColor: '#f2f1f7',
        height: 25,
        width: 100,
        borderRadius: 12,
        fontSize: 16,
    },
    tabContainer: {
        //maxWidth: Dimensions.get('window').width,
        paddingHorizontal: 15,
        paddingVertical: 10,
        
    },

    // summary table
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        //borderBottomColor: '#ffffff',
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
    },
    summaryText: {
        textTransform: 'capitalize',
        fontSize: 16,
    },
    
    // income table
    incomeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        //borderBottomColor: '#ffffff',
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
    },
    incomeName: {
        textTransform: 'capitalize',
        fontSize: 16,
    },
    incomeAmount: {
        fontSize: 16,
    },
    // assets

    // liabilities table
    liabilitiesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        //borderBottomColor: '#ffffff',
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
    },
    liabilitiesName: {
        textTransform: 'capitalize',
        fontSize: 16,
    },
    liabilitiesCost: {
        fontSize: 16,
    },
})

export default Statement