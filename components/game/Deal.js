import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Button, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import GameState from '../../js/GameState';
import Main from '../../js/Main';
import Calc from '../../js/Calc';
import Alert from '../main/Alert';

const Stocks = (props) => {   
    const { 
        type, 
        setTurnPhase, 
        refresh, 
        setRefresh, 
        navigation,
        
    } = props

    const [sharesOwned, setSharesOwned] = useState(0)
    const [sharePrice, setSharePrice] = useState(null)
    const [shareAmount, setShareAmount] = useState(0)
    const [purchaseType, setPurchaseType] = useState(null)
    const [split, setSplit] = useState(false)

    const stock = GameState.currentDeal;
    const player = GameState.players[GameState.currentPlayer];

    useEffect(() => {
        if (type === "Mutual Fund" || type === "Stock" || type === "Preferred Stock"){
            // Get total number of shares owned from player array
            let stockAssetsSearch = player.stockAssets.find(item => {
                if (item && item.symbol === stock.symbol){
                    GameState.currentDeal.sharesOwned = item.shares
                } 
            })

            if (GameState.currentDeal.sharesOwned && GameState.currentDeal.sharesOwned > 0){
                setSharesOwned(GameState.currentDeal.sharesOwned)
            }
           
            //check shares owned
            setSharePrice(GameState.currentDeal.price)
        }

        if ((type === "Stock Split" || type === "Reverse Split") && !split){
            let stockAssetsSearch = player.stockAssets.find(item => {
                if (item && item.symbol === GameState.currentDeal.symbol){
                    if (type === "Stock Split"){
                        item.shares = item.shares * 2
                        console.log('split successful')
                    }

                    if (type === "Reverse Split"){
                        console.log('reverse split successful')
                        item.shares = Math.floor(item.shares * .5)
                    }

                    setSplit(true)
                } 
            })
        }

    })

    if (type === "Stock Split" || type === "Reverse Split"){
        return (
            <View style={styles.stockContainer}>
                <View style={styles.stockTextContainer}>
                    <Text>{GameState.currentDeal.type}</Text>
                    <Text>{GameState.currentDeal.name}</Text>
                    <Text>{GameState.currentDeal.description}</Text>
                    <Text>{GameState.currentDeal.rule}</Text>
                </View>
                {split 
                    ? <Text>Split Done</Text>
                    : <View></View>}
                <View style={styles.btnContainer}>
                    <Pressable
                        style={styles.doneBtn}
                        onPress={() => {
                            GameState.turnPhase = 'end';
                            setTurnPhase('end')
                        }}>
                        <Text>Done</Text>
                    </Pressable>
                </View>
                
            </View>
        )
    } else {
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
                            GameState.stockPurchaseType = 'buy'
                            setPurchaseType('buy')
                            setRefresh(true)

                            navigation.navigate('Stock')
                        }}>
                        <Text>Buy</Text>
                    </Pressable>
                    {sharesOwned 
                    ? <Pressable style={styles.sellSharesBtn}
                        onPress={() => {
                            GameState.stockPurchaseType = 'sell'

                            setPurchaseType('sell')
                            setRefresh(true)

                            navigation.navigate('Stock')
                        }}>
                        <Text>Sell</Text>
                    </Pressable>
                    : <View></View>}
                    
                    <Pressable
                        style={styles.doneBtn}
                        onPress={() => {
                            GameState.turnPhase = 'end';
                            setTurnPhase('end')
                        }}>
                        <Text>Done</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
}

const RealEstate = (props) => {
    const { 
        type, 
        setRefresh,
        refresh,
        setTurnPhase,
    } = props

    const [propertyPurchased, setPropertyPurchased] = useState(false)
    const property = GameState.currentDeal;
    const player = GameState.players[GameState.currentPlayer];
    const [hasProperty, setHasProperty] = useState(false)
    const [propertyChecked, setPropertyChecked] = useState(false)
    const checkHasProperty = () => {
        var exists = false;

        let propertySearch = GameState.players[GameState.currentPlayer].realEstateAssets.find((item) => {
            if (item.type === "Real Estate"){
                console.log('player has property')
                exists =  true
            } else {
                console.log('player does not have property')
            }
        })
        
        return exists
    }

    useEffect(() => {
        if (type === "Property Damage" && !propertyChecked){
            setHasProperty(checkHasProperty())
            setPropertyChecked(true)
            console.log('checked if player owns property ')
        } 
    })
    
    if (GameState.alert && GameState.alertType === 'property purchase'){
        return(
            <Alert {...props} 
                title={'Real Estate Purchase'} 
                message={GameState.currentDeal.landType + ' purchased!'} 
                confirmBtnText={'Ok'} 
                returnBtnText={''}
                setRefresh={setRefresh}
                refresh={refresh}
                marginTop={20}
                btns={{
                    confirm: true,
                    return: false,
                }}
            />
        )
    } 

    if (type === "Property Damage"){
        return(
            <View style={styles.realEstateContainer}>
                <View style={styles.realEstateTextContainer}>
                    <Text>{property.name}</Text>
                    <Text>{property.description}</Text>
                    <Text>{property.rule}</Text>
                    <Text>Cost: ${Main.numWithCommas(property.cost)}</Text>
                </View>
                <View style={styles.btnContainer}>

                {hasProperty
                    ? <Pressable style={styles.doneBtn}
                        onPress={()=>{
                            if (player.cash >= property.cost){
                                player.cash -= property.cost;
                                GameState.turnPhase = 'end';
                                setTurnPhase('end')
                            } else {
                                console.log('cannot afford property damage')
                                // debt screen
                                GameState.debtScreen.cost = property.cost;
                                GameState.debtScreen.open = true;
                                setRefresh(true)
                            }
                        }}>
                        <Text style={{fontSize: 10}}>{player.cash < property.cost ? 'Borrow' : 'Pay'}</Text>
                    </Pressable>
                    : <Pressable style={styles.doneBtn}
                        onPress={()=>{
                            GameState.turnPhase = 'end';
                            setTurnPhase('end')
                        }}>
                        <Text style={{fontSize: 10}}>Done</Text>
                    </Pressable>
                }
                </View>
            </View>
        )
    }

    if (type === "Real Estate"){
        return (
            <View style={styles.realEstateContainer}>
                <View style={styles.realEstateTextContainer}>
                    <Text>{property.type}</Text>
                    <Text>{property.name}</Text>
                    <Text>{property.landType}</Text>
                    <Text>{property.description}</Text>
                    <Text>Cost: ${Main.numWithCommas(property.cost)}</Text>
                    <Text>Down Payment: ${Main.numWithCommas(property.downPayment)}</Text>
                    <Text>Mortgage: ${Main.numWithCommas(property.mortgage)}</Text>
                    <Text>Income: ${Main.numWithCommas(property.cashFlow)}</Text>
                </View>
                <View style={styles.btnContainer}>
                    {!propertyPurchased 
                        ? <Pressable style={styles.buyBtn}
                        onPress={() => {
                            
                            if (player.cash >= property.downPayment){
                                //console.log('buying real estate...')
                                Calc.buyRealEstate(property) 
                                GameState.alert = true
                                GameState.alertType = 'property purchase'
                                setPropertyPurchased(true)
                            } else {
                                console.log('Not enough to purchase property')
                            }
                        }}>
                            <Text>Buy</Text>
                        </Pressable>
                    : <View></View>}
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
}

const Coin = (props) => {
    const { 
        type, 
        setRefresh,
        refresh,
        setTurnPhase,
    } = props

    const coin = GameState.currentDeal;
    const player = GameState.players[GameState.currentPlayer];
    const [coinPurchased, setCoinPurchased] = useState(false)

    return (
        <View style={styles.coinContainer}>
                <View style={styles.coinTextContainer}>
                    <Text>{coin.title}</Text>
                    <Text>{coin.name}</Text>
                    <Text>{coin.description}</Text>
                    <Text>{coin.rule}</Text>
                    <Text>Cost: ${Main.numWithCommas(coin.cost)}</Text>
                    <Text>Amount: {coin.amount}</Text>
                </View>
                <View style={styles.btnContainer}>
                    {player.cash >= coin.cost && !coinPurchased
                        ? <Pressable style={styles.payBtn}
                            onPress={() => {
                                console.log('coin')

                                Calc.buyCoin(GameState.currentPlayer, coin)
                                setCoinPurchased(true)

                            }}>
                                <Text style={{fontSize: 10}}>Buy</Text>
                        </Pressable>
                        : <View></View>
                    }
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

const CertificateOfDeposit = (props) => {
    const { 
        type, 
        setTurnPhase, 
        refresh, 
        setRefresh, 
        navigation,
        
    } = props

    const [ownedAmount, setOwnedAmount] = useState(0)
    const [price, setPrice] = useState(null)
    const [purchaseType, setPurchaseType] = useState(null)

    const cd = GameState.currentDeal;
    const player = GameState.players[GameState.currentPlayer];

    useEffect(() => {
        // Get total number of owned cd's from player array
        let cdSearch = player.cdAssets.find(item => {
            if (item && item.symbol === cd.symbol){
                GameState.currentDeal.ownedAmount = item.amount;
                GameState.currentDeal.sharesOwned = item.amount;
            } 
        })

        // Set owned amount
        if (GameState.currentDeal.ownedAmount && GameState.currentDeal.ownedAmount > 0){
            setOwnedAmount(GameState.currentDeal.ownedAmount)
        }
        
        // Set price
        setPrice(GameState.currentDeal.price)
    })

    return (
        <View style={styles.stockContainer}>
            <View style={styles.stockTextContainer}>
                <Text>{cd.type}</Text>
                <Text>{cd.name}</Text>
                <Text>{cd.description}</Text>
                <Text>Cost: ${cd.price}</Text>
                <Text>Shares Owned: {GameState.currentDeal.ownedAmount}</Text>
            </View>

            <View style={styles.btnContainer}>
                <Pressable style={styles.buySharesBtn}
                    onPress={() => {
                        GameState.stockPurchaseType = 'buy'
                        setPurchaseType('buy')
                        setRefresh(true)

                        navigation.navigate('Sale')
                    }}>
                    <Text>Buy</Text>
                </Pressable>
                {ownedAmount > 0 
                ? <Pressable style={styles.sellSharesBtn}
                    onPress={() => {
                        GameState.stockPurchaseType = 'sell'

                        setPurchaseType('sell')
                        setRefresh(true)

                        navigation.navigate('Sale')
                    }}>
                    <Text>Sell</Text>
                </Pressable>
                : <View></View>}
                
                <Pressable
                    style={styles.doneBtn}
                    onPress={() => {
                        GameState.turnPhase = 'end';
                        setTurnPhase('end')
                    }}>
                    <Text>Done</Text>
                </Pressable>
            </View>
        </View>
    )
}

const Deal = (props) => {
    const { setTurnPhase , type, refresh, setRefresh } = props;
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

        if (refresh){
            setRefresh(false)
        }

        console.log('deal type: ', type)
    })

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {
                    type === "Mutual Fund" || 
                    type === "Stock" || 
                    type === "Preferred Stock" || 
                    type === "Stock Split" || 
                    type === "Reverse Split"
                        ? <Stocks type={type} navigation={navigation} {...props} /> 
                        : type === "Real Estate" || type === "Property Damage"
                            ? <RealEstate type={type} navigation={navigation} {...props} /> 
                            : type === "Coin"
                                ? <Coin type={type} navigation={navigation} {...props}/>
                                : type === "Certificate of Deposit"
                                    ? <CertificateOfDeposit type={type} navigation={navigation} {...props}/>
                                    : <View><Text>Deal - {type}</Text></View>
                            
                }
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
    realEstateContainer: {
        zIndex: 3,
    },
    stockTextContainer: {
        marginBottom: 15,
    },
    coinContainer: {

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
    
    buyBtn: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 22,
        elevation: 3,
        backgroundColor: 'white',
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