import React, { useEffect, useState } from 'react'
import { View, Text, Button, Pressable, StyleSheet, Dimensions } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import GameState from '../../js/GameState';
import Main from '../../js/Main';
import Calc from '../../js/Calc';
import Alert from '../main/Alert';

const RealEstate = (props) => {
    const player = GameState.players[GameState.currentPlayer];
    const { navigation } = props;

    const [refresh, setRefresh] = useState(false)
    const [purchaseType, setPurchaseType] = useState('real estate purchase')

    useEffect(() => {
        if (refresh) {
            setRefresh(false)
        } 
    }, [refresh])

    if (GameState.alert && purchaseType === 'real estate purchase'){
        return(
            <Alert {...props} 
                title={'Real Estate Purchase'} 
                message={'You purchased property'} 
                confirmBtnText={''} 
                returnBtnText={'Ok'}
                setRefresh={setRefresh}
                refresh={refresh}
                btns={{
                    confirm: player.cash >= GameState.currentDeal.price
                        ? true
                        : false
                    ,
                    return: true,
                }}
            />
        )
    } 

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
            }}>
                <MaterialCommunityIcons name="close" color={'blue'} size={30}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <Text>Real Estate</Text>
        </View>
    )
}

export default RealEstate