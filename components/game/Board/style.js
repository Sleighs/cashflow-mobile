import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

    boardContainer: {
        width: '100%',
        justifyContent: 'center',

    },
    board1row1:{
        flexDirection:'row',
        flexWrap:'wrap',
        height: 40,
        flex: 1,
    },
    board1row2:{
        flexDirection:'row-reverse', 
        flexWrap:'wrap',
        height: 40,
        flex: 1,
    },
    boardSpace: {
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 4,
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    boardSpaceHighlight: {
        borderColor: 'gold',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 4,
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    boardSpaceText: {
        color: "#ffffff",
        fontSize: 8,
    },
    opportunitySpace:{
        backgroundColor: "green", 
    },
    liabilitySpace: {
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