import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { connect, useStore, useSelector, useDispatch } from 'react-redux';

import GameState from '../../js/GameState';
import store from '../../redux/store';
import { getGameData, getPayCalc } from '../../redux/reducers/rootReducer';

const Summary = (props) => {
    const player = GameState.players[GameState.currentPlayer];
    

    return (
        <ScrollView style={{
            //flex: 3,
            height: 250,
        }}>
            <View style={styles.tabContainer}>
                <View>
                    <View style={styles.tableTile}>
                        <Text style={{fontSize: 20}}>Summary</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryText, {color: 'darkgreen'}]}>Cash</Text>
                        <Text> ${GameState.numWithCommas(player.cash)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryText}>Total Income</Text> 
                        <Text>${GameState.numWithCommas(GameState.totalIncome(player.key))}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryText}>Total Expenses</Text> 
                        <Text>${GameState.numWithCommas(GameState.totalExpenses(player.key))}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryText}>Payday</Text> 
                        <Text>${GameState.numWithCommas(player.payday)}</Text>
                    </View>
                               
                </View>
                <View>
                    <View style={styles.tableTile}>
                        <Text style={{fontSize: 20}}>Income</Text>
                    </View>
                    {player.income.map(item => 
                        <View key={item.type} style={styles.incomeRow}>
                            <Text style={styles.incomeName}>{item.type} </Text>
                            <Text style={styles.incomeAmount}>${GameState.numWithCommas(item.amount)}</Text>
                        </View>
                    )}
                </View>
                <Expenses {...props}/>

            </View>
        </ScrollView>
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
        <ScrollView style={{
            //flex: 3,
            height: 250,
        }}>
            <View style={styles.tabContainer}>
                <Text>Assets</Text>
            </View>
        </ScrollView>
    )
}

const Expenses = (props) => {
    const { paymentCalc, openPaymentCalc } = props;
    const player = GameState.players[GameState.currentPlayer];
    const dispatch = useDispatch()
    const stuff = useSelector(state => state.paymentCalc)

    return (
        <View style={styles.expensesContainer}>
            <View style={styles.tableTile}>
                <Text style={{fontSize: 20}}>Expenses:</Text>
            </View>
            <View style={styles.expensesRow}>
                <Text style={styles.expensesName}>Taxes</Text>
                <Text style={styles.expensesCost}>${GameState.numWithCommas(player.taxes)}</Text>
            </View>
            {player.expenses.map(item => 
                <View key={item.type} style={styles.expensesRow}>
                    <Text style={styles.expensesName}>{item.type}</Text>
                    <Text style={styles.expensesCost}>${GameState.numWithCommas(item.payment)}</Text>
                </View>
            )}
            {player.children > 0? 
                <View style={styles.expensesRow}>
                    <Text style={styles.expensesName}>Children {'(' + String(player.children) + 'x)'}</Text>
                    <Text style={styles.expensesCost}>${GameState.numWithCommas(player.childExpense)}</Text>
                </View> 
                : <View></View>
            }
            <View style={styles.summaryRow}>
                        <Text style={styles.summaryText}>Insurance</Text> 
                        <Text>${!player.hasInsurance ? '0' : GameState.numWithCommas(GameState.getInsuranceCost(GameState.currentPlayer))}</Text>
                    </View> 
            <View style={styles.expensesRow}>
                <Text style={styles.expensesName}>Other Expenses</Text>
                <Text style={styles.expensesCost}>${GameState.numWithCommas(player.otherExpenses)}</Text>
            </View>
            <View style={styles.tableTile}>
                <Text style={{fontSize: 20}}>Loans:</Text>
            </View>
            {player.expenses.map(item => 
                <TouchableOpacity
                    key={item.type}
                    name={item.type}
                    onPress={() => {
                        openPaymentCalc(true);
                        GameState.paymentCalc.open = true;
                        GameState.paymentCalc.type = item.type;
                        dispatch(getPayCalc(true))
                        //console.log('stuff', stuff)
                    }}
                    >
                    <View style={styles.expensesRow}>
                        <Text style={styles.expensesName}>{item.type}:</Text>
                        <Text style={styles.expensesCost}>${GameState.numWithCommas(item.cost)}</Text>
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
        initialRouteName="Summary"
        initialLayout={{ 
            width: '100%', 
        }}
    >
        <StatementTab.Screen 
            name="Summary"  
            children={() => <Summary {...props} />}
        />
        <StatementTab.Screen 
            name="Assets" 
            children={() => <Assets {...props} />}
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
    tableTile: {
        marginVertical: 5,
        
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

    // expenses table
    expensesContainer: {
        marginVertical: 5,
    },
    expensesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
    },
    expensesName: {
        textTransform: 'capitalize',
        fontSize: 16,
    },
    expensesCost: {
        fontSize: 16,
    },
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