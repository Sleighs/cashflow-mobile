import { Navigation } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import GameState from '../../js/GameState'

const Alert = (props) => {
    const { 
        message, 
        title, 
        confirmBtnText, 
        returnBtnText,
        btns,
        setRefresh, 
        navigation 
    } = props

    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>{message}</Text>
                </View>
                <View style={styles.btnContainer}>
                    {btns.return 
                        ? <Pressable 
                            style={styles.returnBtn}
                            onPress={() => {
                                console.log('alert done')
                                GameState.alert = false
                                setRefresh(true)
                                navigation.goBack()
                            }}>
                            <Text>{returnBtnText}</Text>
                        </Pressable>
                        : <View></View>}
                    {btns.confirm 
                        ?<Pressable 
                            style={styles.confirmBtn}
                            onPress={() => {
                                console.log('alert confirmed')
                                GameState.alert = false
                                setRefresh(true)
                            }}>
                            <Text>{confirmBtnText}</Text>
                        </Pressable>
                        : <View></View>}
                </View>
            </View>
        </View>
    )
}

//dim screen
// get dimensions

const styles = StyleSheet.create({
    page: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        zIndex: 5,
        //opacity: .2,
        //backgroundColor: 'gray',
        backgroundColor: 'transparent',
    },
    container: {
        marginVertical: '40%',
        width: '90%',
        height: 275,
        justifyContent: 'center',
        zIndex: 10,
        textAlign: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        alignContent: 'center',
        
        paddingBottom: 20,
        flex: 1,
    },
    titleContainer: {
        width: '100%',
        flex: 2,
        backgroundColor: '#446c30',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        marginHorizontal: 10,
        color: 'white',
        
    },
    messageContainer: {
        flex: 4,
        justifyContent: 'center',
        marginVertical: 10,
        paddingHorizontal: 25,
    },  
    message: {
        fontSize: 16
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        flex: 2,
    },
    confirmBtn: {
        width: 100,
        height: 40,
        backgroundColor: 'gold',
        justifyContent: 'center',
        borderRadius: 5,
    },
    returnBtn: {
        width: 100,
        height: 40,
        backgroundColor: 'gold',
        justifyContent: 'center',
        borderRadius: 5,
    },
})
export default Alert