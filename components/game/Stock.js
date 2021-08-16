import React, { useEffect, useState } from 'react'
import { View, Text, Button, Pressable, StyleSheet, Dimensions } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import GameState from '../../js/GameState';
import Main from '../../js/Main';
import Calc from '../../js/Calc';
import Alert from '../main/Alert';

const Stock = (props) => {
    const player = GameState.players[GameState.currentPlayer];
    const { navigation } = props;
    const purchaseType = GameState.stockPurchaseType;
    const salePrice = GameState.currentDeal.price;

    const [refresh, setRefresh] = useState(false)
    const [amountToTrade, setAmountToTrade] = useState(0)
    const [sharesToTrade, setSharesToTrade] = useState(0)
    const [orderOption, setOrderOption] = useState('Shares')
    const [purchase, setPurchase] = useState(null)
    const [saleAmount, setSaleAmount] = useState(null)
    const [ownedShares, setOwnedShares] = useState(null)

    // alert fractional shares unavailable
    
    const addDigit = (digit)=>{
        // Make array out of purchase amount
        var amt;
        if (orderOption === 'Shares') {
            amt = String(sharesToTrade).split(' ')

            if (sharesToTrade === 0 || sharesToTrade === '0'){
                amt = digit
            } else if (amt.length < 7){
                // Add new digit
                amt.push(String(digit))

                amt = amt.join('')
            }

            setSharesToTrade(parseInt(amt))
            setAmountToTrade(parseInt(amt * GameState.currentDeal.price))
        } else {
            amt = String(amountToTrade).split(' ')

            if (amountToTrade === 0 || amountToTrade === '0'){
                amt = digit
            } else if (amt.length < 12){
                
                // Add new digit
                amt.push(String(digit))

                amt = amt.join('')
            }

            setSharesToTrade(Math.floor(parseInt(amt) / GameState.currentDeal.price))
            setAmountToTrade(parseInt(amt))
        }

        setRefresh(true)

        //return amt
    }

    const getMax = () => {
        var max = Math.floor(player.cash / GameState.currentDeal.price)

        setAmountToTrade(max * GameState.currentDeal.price)
        
        setSharesToTrade((player.cash / GameState.currentDeal.price) - (player.cash % GameState.currentDeal.price))

        setRefresh(true)

        console.log('max: ', max, sharesToTrade, amountToTrade)
    }

    const deleteValue = () => {
        var amt;

        if (orderOption === 'Shares') {
            amt = String(sharesToTrade).split('')

            if (sharesToTrade < 10){
                amt = 0
            } else {
                amt = amt.slice(0, -1).join('')
            }
        
            setSharesToTrade(parseInt(amt))
            setAmountToTrade(parseInt(amt * GameState.currentDeal.price))
        } else {
            amt = String(amountToTrade).split('')

            if (amountToTrade < 10){
                amt = 0
            } else {
                amt = amt.slice(0, -1).join('')
            }

            setSharesToTrade(Math.floor(parseInt(amt) / GameState.currentDeal.price))
            setAmountToTrade(parseInt(amt))
        }
        setRefresh(true)
    }

    useEffect(() => {
        if (refresh) {
            
            setRefresh(false)
        } 

        // get stock for currentDeal.symbol
    })

    return ( 
        <View style={styles.container}>
            {GameState.alert && GameState.stockPurchaseType === 'buy'
                ? <Alert {...props} 
                    title={'Stock Purchase'} 
                    message={'You purchased ' + purchase.shares + ' shares of ' + GameState.currentDeal.symbol + ' for $' + Main.numWithCommas(purchase.cost)} 
                    confirmBtnText={'Ok'} 
                    returnBtnText={'Done'}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    btns={{
                        confirm: true,
                        return: true,
                    }}
                />
                : <View></View>
            }
            {GameState.alert && GameState.stockPurchaseType === 'sell'
                ? <Alert {...props} 
                    title={'Stock Sale'} 
                    message={'You sold ' + purchase.shares + ' shares of ' + GameState.currentDeal.symbol + ' for $' + Main.numWithCommas(saleAmount)} 
                    confirmBtnText={'Ok'} 
                    returnBtnText={'Done'}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    btns={{
                        confirm: true,
                        return: true,
                    }}
                />
                : <View></View>
            }
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
            }}>
                <MaterialCommunityIcons name="close" color={'blue'} size={30}
                    onPress={() => navigation.goBack()}
                />
                <Pressable style={styles.orderOption}
                    onPress={() => {
                        if (orderOption === 'Shares') {
                            setAmountToTrade(0)
                            setOrderOption('Dollars')
                        } else {
                            setAmountToTrade(0)
                            setOrderOption('Shares')
                        }
                    }}>
                        <Text>{orderOption}</Text>
                        <MaterialCommunityIcons name="chevron-down" color={'blue'} size={20}
                            style={{marginLeft: 5,}}/>
                    </Pressable>
            </View>
            
            <View style={styles.amountContainer}>
                <View style={{
                    paddingVertical: 50,
                }}>  
                    <View style={styles.amtContainerRow}>
                        <Text style={[styles.amtContainerText, {
                            textAlign: 'center',
                            fontSize: 22,
                        }]}>
                            {
                                sharesToTrade === 0 || parseInt(amountToTrade) === 0
                                ? ''
                                : amountToTrade <= player.cash 
                                    ? 'Buy ' + sharesToTrade + ' shares for $' + Main.numWithCommas(parseInt(amountToTrade))
                                    : 'Not enough funds. $' + (Main.numWithCommas(parseInt(amountToTrade) - player.cash)) + ' required.'
                            }
                        </Text>
                    </View>
                    <View style={styles.amtContainerRow}>
                        <Text style={styles.amtContainerText}>Amount</Text>
                        <Text style={styles.amtContainerText}>
                            {
                                orderOption === 'Dollars' 
                                ? '$' + Main.numWithCommas(parseInt(amountToTrade))
                                : sharesToTrade
                            }
                        </Text>
                    
                    </View>
                    <View style={styles.amtContainerRow}>
                        <Text style={styles.amtContainerText}>Share Price</Text>
                        <Text style={styles.amtContainerText}>${GameState.currentDeal.price}</Text>
                    </View>
                    
                </View>
                
                {purchaseType === 'buy'
                    ? <View style={styles.saleBtnContainer}>
                        <Text>${Main.numWithCommas(player.cash)} available to buy {GameState.currentDeal.symbol}</Text>
                        <Pressable
                            style={styles.saleBtn}
                            onPress={() => {
                                if (sharesToTrade > 0 && player.cash >= (GameState.currentDeal.price * sharesToTrade)){
                                    Calc.buyStock( 
                                        GameState.currentPlayer, 
                                        GameState.currentDeal.type, 
                                        GameState.currentDeal.price, 
                                        sharesToTrade) 

                                    GameState.alert = true

                                    setPurchase({
                                        shares: sharesToTrade,
                                        cost: amountToTrade,
                                    })

                                    setSharesToTrade(0)
                                    setAmountToTrade(0)
                                    setRefresh(true)
                                } else {
                                    console.log('cannot afford stockpurchase')
                                }
                            }}>
                            <Text style={styles.saleBtnText}>Buy</Text>
                        </Pressable>
                    </View>
                    : <View></View>
                }
                {purchaseType === 'sell'
                    ? <View style={styles.saleBtnContainer}>
                         <Text>{GameState.currentDeal.sharesOwned} shares available to sell {GameState.currentDeal.symbol}</Text>
                        <Pressable style={styles.saleBtn}
                            onPress={() => {

                            }}>
                            <Text>Sell</Text>
                        </Pressable>
                    </View>
                    : <View></View>
                }
                
            </View>
            <View style={styles.numpadContainer}>
                <View style={styles.numberRow}>
                    <Pressable style={styles.numberContainer}
                        onPress={() => addDigit(1)}>
                        <Text style={styles.rowNum}>1</Text>
                    </Pressable>
                    <Pressable style={styles.numberContainer}
                        onPress={() => addDigit(2)}>
                        <Text style={styles.rowNum}>2</Text>
                    </Pressable>
                    <Pressable style={styles.numberContainer}
                        onPress={() => addDigit(3)}>
                        <Text style={styles.rowNum}>3</Text>
                    </Pressable>
                </View>
                <View style={styles.numberRow}>
                    <Pressable style={styles.numberContainer}
                        onPress={() => addDigit(4)}>
                        <Text style={styles.rowNum}>4</Text>
                    </Pressable>
                    <Pressable style={styles.numberContainer}
                        onPress={() => addDigit(5)}>
                        <Text style={styles.rowNum}>5</Text>
                    </Pressable>
                    <Pressable style={styles.numberContainer}
                        onPress={() => addDigit(6)}>
                        <Text style={styles.rowNum}>6</Text>
                    </Pressable>
                </View>
                <View style={styles.numberRow}>
                    <Pressable style={styles.numberContainer}
                        onPress={() => addDigit(7)}>
                        <Text style={styles.rowNum}>7</Text>
                    </Pressable>
                    <Pressable style={styles.numberContainer}
                        onPress={() => addDigit(7)}>
                        <Text style={styles.rowNum}>8</Text>
                    </Pressable>
                    <Pressable style={styles.numberContainer}
                        onPress={() => addDigit(7)}>
                        <Text style={styles.rowNum}>9</Text>
                    </Pressable>
                </View>
                <View style={styles.numberRow}>
                    <Pressable style={styles.numberContainer}
                        onPress={()=> getMax()}>
                        <Text style={styles.rowNum}>Max</Text>
                    </Pressable>
                    <Pressable style={styles.numberContainer}
                        onPress={() => addDigit(0)}>
                        <Text style={styles.rowNum}>0</Text>
                    </Pressable>
                    <Pressable style={styles.numberContainer}
                        onPress={() => {
                            deleteValue()
                            
                            console.log('delete')
                        }}>
                        <MaterialCommunityIcons name="arrow-left" color={'blue'} size={28}
                            style={styles.rowNum}
                            
                        />
                    </Pressable>
                   
                </View>
        
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        zIndex: 3,
        height: Dimensions.get('window').height * .95,
        
    },
    amountContainer: {
        width: '100%',
        height: 350,
        textAlign: 'center',
        marginTop: 50,
        justifyContent: 'flex-end',
        paddingVertical: 25,
        paddingHorizontal: 20,
        //marginVertical: 5,
        flex: 7,
    },
    amtContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    amtContainerText: {
        fontSize: 22,
    },
    purchaseAmt: {
        fontSize: 50,
    },
    numpadContainer: {
        width: '100%',
        height: '30%',
        flex: 5,
    },
    numberContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        
        flex: 3,
        height: 60,
    },
    numberRow: {
        justifyContent: 'center',

        flexDirection: 'row',
        flex: 1, 
    }, 
    rowNum: {
        textAlign: 'center',
        fontSize: 28,
    },
    orderOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saleBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    saleBtn: {
        width: 275,
        marginVertical: 7,
        backgroundColor: '#3dee02',
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',

    },
    saleBtnText: {
        color: '#ffffff',
        fontSize: 20,
        
    },

})

export default Stock

  /*

buy max




            <View style={styles.sharesBtnContainer}>
                {!buyBtns 
                ? <View></View> 
                : <View style={{
                    flexDirection: 'row',
                }}>
                    
                    <Pressable style={styles.buySharesBtn}
                        onPress={() => {
                            console.log(GameState.currentPlayer, type, sharePrice, shareAmount)

                            if (shareAmount > 0 && player.cash >= (sharePrice * shareAmount)){
                                Calc.buyStock( GameState.currentPlayer, type, sharePrice, shareAmount) 
                            } else {
                                console.log('cannot afford stockpurchase')
                            }

                            setBuyBtns(false)
                            setSellBtns(false)

                            setRefresh(true)
                        }}>
                        <Text>Purchase</Text>
                    </Pressable>
                </View>}    

                {!sellBtns 
                ? <View></View> 
                : <View style={{
                    flexDirection: 'row',
                }}>
                    

                    {
                        //map stock assets and display button for each 
                        player.stockAssets.map((item, i) => {

                            if (item && item.symbol === stock.symbol){
                                return (
                                    <Pressable style={styles.buySharesBtn}
                                        key={i}
                                        onPress={() => {
                                            console.log(GameState.currentPlayer, type, sharePrice, shareAmount)
                                            Calc.sellStock(GameState.currentPlayer, type, shareAmount, item.price, sharePrice,)
                                            
                                            setBuyBtns(false)
                                            setSellBtns(false)
    
                                            setRefresh(true)
                                        }}>
                                        <Text>Sell {shareAmount}x for {shareAmount * sharePrice}</Text>
                                    </Pressable>
                                )
                            } else {
                                return (<View></View>)
                            }
                        })
                    }
                </View>}
            </View>
            */