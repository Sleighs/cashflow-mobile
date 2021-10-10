import React from 'react';
import { Text, View, Button } from 'react-native'


function Landing({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: '5%'  }}>
            <Button 
                title="Register"
                onPress={()=> navigation.navigate("Register")}
            />
            <Button 
                title="Login"
                onPress={()=> navigation.navigate("Login")}
            />
        </View>
    )
}

export default Landing;
