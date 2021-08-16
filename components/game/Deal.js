import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Button, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import GameState from '../../js/GameState';
import Main from '../../js/Main';
import Calc from '../../js/Calc';

const Stocks = (props) => {   
    const { type, setTurnPhase, setRefresh, navigation } = props

    const [sharesOwned, setSharesOwned] = useState(0)
    const [sharePrice, setSharePrice] = useState(null)
    const [shareAmount, setShareAmount] = useState(0)
    const [buyBtns, setBuyBtns] = useState(false)
    const [sellBtns, setSellBtns] = useState(false)
    const [buyStockScreen, setBuyStockScreen] = useState(false)
    const [sellStockScreen, setSellStockScreen] = useState(false)
    const [purchaseType, setPurchaseType] = useState(null)

    const stock = GameState.currentDeal;
    const player = GameState.players[GameState.currentPlayer];

    useEffect(() => {
        if (type === "Mutual Fund" || type === "Stock" || type === "Preferred Stock"){
            
            // Get total number of shares owned from player array
            let stockAssetsSearch = player.stockAssets.find(item => {
                if (item && item.type === type /*&& item.price === GameState.currentDeal.price*/){
                    GameState.currentDeal.sharesOwned = item.shares

                } 
            })
            console.log('stock search', GameState.currentDeal.sharesOwned )

            if (GameState.currentDeal.sharesOwned ){
                setSharesOwned(GameState.currentDeal.sharesOwned)
            }
           
            //check shares owned
            setSharePrice(GameState.currentDeal.price)
        }
    })

    return (
        <View style={styles.stockContainer}>
            <View style={styles.stockTextContainer}>
                <Text>{stock.type}</Text>
                <Text>{stock.name}</Text>
                <Text>{stock.description}</Text>
                <Text>Cost: ${stock.price}</Text>
                <Text>Trading Range: {stock.range}</Text>
                <Text>Shares Owned: {sharesOwned}</Text>
            </View>

            <View style={styles.btnContainer}>
                <Pressable style={styles.buySharesBtn}
                    onPress={() => {
                        console.log(GameState.currentPlayer, type, sharePrice, shareAmount)
                        
                        GameState.stockPurchaseType = 'buy'

                        navigation.navigate('Stock')
                        setPurchaseType('buy')

                        setRefresh(true)
                    }}>
                    <Text>Buy</Text>
                </Pressable>

                {sharesOwned 
                ? <Pressable style={styles.sellSharesBtn}
                    onPress={() => {

                        console.log(GameState.currentPlayer, type, sharePrice, shareAmount)
                        
                        GameState.stockPurchaseType = 'sell'

                        navigation.navigate('Stock')
                        setPurchaseType('sell')

                        setRefresh(true)
                    }}>
                    <Text>Sell</Text>
                </Pressable>
                : <View></View>}
                
                <Pressable
                    style={styles.doneBtn}
                    onPress={()=>{
                        GameState.turnPhase = 'end';
                        setTurnPhase('end')
                    }}>
                    <Text>Done</Text>
                </Pressable>
            </View>
        </View>
    )
}

const RealEstate = (props) => {
    const { type } = props

    /*
    type
    name
    description
    rule
    roi
    cost
    downpayment
    mortgage
    cashflow
    tag
    landtype

    
    */

    return (
        <View>
            <Text>{type}</Text>

            <View style={styles.btnContainer}>
                <Pressable style={styles.buyBtn}
                    onPress={() => {
                        
                    }}>
                    <Text>Buy</Text>
                </Pressable>
                <Pressable style={styles.doneBtn}
                    onPress={()=>{
                        GameState.turnPhase = 'end';
                        setTurnPhase('end')
                    }}>
                    <Text style={{fontSize: 10}}>Done</Text>
                </Pressable>
            </View>
        </View>
    )
}

const Deal = (props) => {
    const { setTurnPhase , type } = props;
    const navigation = useNavigation();

    useEffect(()=>{
        
        /*
        mutual
        
        type
        name
        description
        rule
        symbol
        price
        range
        divend
        id
        shares

        types
            mutual
            stock
            stock split
            reverse split
            preferred stock
            real estate
            property damage
            coin
            cd
            company

        */

        console.log('deal type: ', type)
    })

    // 

    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {type === "Mutual Fund" || type === "Stock" 
                    ? <Stocks type={type} {...props} navigation={navigation} /> 
                    : type === "Real Estate" 
                        ? <RealEstate type={type} {...props} /> 
                        : <View>
                            <Text>Deal - {type}</Text>
                        </View>}
            </View>
        </View>
    )
}

export default Deal


const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: 'center',
        width: '100%',
        marginVertical: 5,
    },
    container: {
        //backgroundColor: "#ffffff",
        height: 300,
        paddingHorizontal: 30,
        paddingVertical: 20,
        justifyContent: 'space-between'
    },
    cardTitle: {
        textTransform: 'capitalize',
        fontSize: 26,
        fontWeight: "500",
        marginBottom: 15,
    },
    textContainer: {

    },
    stockTextContainer: {
        marginBottom: 15,
    },
    cardDescription: {

    },

    diceAmount: {
        fontSize: 20,
        marginRight: 15,
        
    },
    btnContainer: {
        flexDirection: 'row',
        //flex: 1,
        justifyContent: 'space-between',
        height: 60,

    },
    sharesBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 60,
    },
    // Buttons
    buySharesBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 22,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        color: 'darkgreen',
    },
    buySharesOnBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'green',
        color: 'white',
    },
    sellSharesBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 22,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
        color: 'darkgreen',
    },
    sellSharesOnBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'green',
        color: 'white',
    },
    payBtn: {
        
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },
    doneBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 32,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
    },

    // Stock 
    stockContainer: {

    },

})