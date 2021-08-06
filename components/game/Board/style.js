import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

    boardContainer: {
        width: '100%',
        justifyContent: 'center',
        marginVertical: 2,
        height: 60,
        flex: 1,

    },
    board1row1:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'center',
    },
    board1row2:{
        flexDirection:'row-reverse', 
        flexWrap:'wrap',
        justifyContent: 'center',
        
    },
    boardSpace: {
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 1,
        textAlign: 'center',
        justifyContent: 'center',
        
        height: 25,
        width: 25,

    },
    boardSpaceHighlight: {
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 1,
        textAlign: 'center',
        justifyContent: 'center',
        
        height: 25,
        width: 25,
    },
    boardSpaceText: {
        color: "#ffffff",
        fontSize: 8,
    },
    opportunitySpace:{
        backgroundColor: "green",
    },
    doodadSpace: {
        backgroundColor: "darkslategray", 
    },
    charitySpace: {
        backgroundColor: "aqua", 
    },
    paycheckSpace: {
        backgroundColor: "gold", 
    },
    offerSpace: {
        backgroundColor: "blue", 
    },
    childSpace: {
        backgroundColor: "orange", 
    },
    downsizeSpace: {
        backgroundColor: "red", 
    },
})

export default styles