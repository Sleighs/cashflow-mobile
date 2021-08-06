import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import Chart from '../game/Chart'

export default function Profile(props) {
    const [testRefresh, setTestRefresh] = useState(false)

    useEffect(()=>{
        
        if (!testRefresh) {
            setTestRefresh(true)
        } 
    }, [testRefresh])
    return (
        <View style={{
            paddingTop: 55,
            paddingHorizontal: 15,
        }}>
            <Pressable
                onPress={()=>{
                    if (!testRefresh) {
                        setTestRefresh(true)
                    } else {
                        setTestRefresh(false)
                    }
                    
                }}
                >
                <Text>Refresh</Text>
            </Pressable>
        </View>
    )
}
