import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import GameState from './GameState';


const Board = ({ gs }) => {
    const [playerObj, setPlayerObj] = useState(null);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [spaces, setSpaces] = useState(null)
    var spacesArr= {
        space1: {
            key: 1,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space2: {
            key: 2,
            field: 'LIABILITY',
            style: styles.liabilitySpace,
            players: [],
        },
        space3: {
            key: 3,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space4: {
            key: 4,
            field: 'CHARITY',
            style: styles.charitySpace,
            players: [],
        },
        space5: {
            key: 5,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space6: {
            key: 6,
            type: 'TouchableOpacity',
            field: 'PAYCHECK',
            style: styles.paycheckSpace,
            players: [],
        },
        space7: {
            key: 7,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space8: {
            key: 8,
            field: 'OFFER',
            style: styles.offerSpace,
            players: [],
        },
        space9: {
            key: 9,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space10: {
            key: 10,
            field: 'LIABILITY',
            style: styles.liabilitySpace,
            players: [],
        },
        space11: {
            key: 11,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space12: {
            key: 12,
            field: 'CHILD',
            style: styles.childSpace,
            players: [],
        },
        space13: {
            key: 13,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space14: {
            key: 14,
            field: 'PAYCHECK',
            style: styles.paycheckSpace,
            players: [],
        },
        space15: {
            key: 15,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space16: {
            key: 16,
            field: 'OFFER',
            style: styles.offerSpace,
            players: [],
        },
        space17: {
            key: 17,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space18: {
            key: 18,
            field: 'LIABILITY',
            style: styles.liabilitySpace,
            players: [],
        },
        space19: {
            key: 19,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space20: {
            key: 20,
            field: 'DOWNSIZE',
            style: styles.downsizeSpace,
            players: [],
        },
        space21: {
            key: 21,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space22: {
            key: 22,
            field: 'PAYCHECK',
            style: styles.paycheckSpace,
            players: [],
        },
        space23: {
            key: 23,
            field: 'OPPORTUNITY',
            style: styles.opportunitySpace,
            players: [],
        },
        space24: {
            key: 24,
            field: 'OFFER',
            style: styles.offerSpace,
            players: [],
        },
    }

    // Get player object (single player)
    const getPlayer = () => {
        if (!playerObj && GameState.players[0]){
            setPlayerObj(GameState.players[0])
        }
    }

    if (!playerObj){
        getPlayer()
    }

    //console.log(spacesArr)

    // Add players to board
    if (GameState.turnCount === 1 && spaces === null) {
        if (GameState.players.length > 0){
            for (var a = 0; a < GameState.players.length; a++) {
                /*console.log({
                    gs: gs,
                    gamestate: GameState,
                    spaces: spaces,
                    spacesArr: spacesArr,
                })*/
                spacesArr.space1.players.push(GameState.players[a])
            }
            
            // for single player
            //spacesArr.space1.players.push(gs.players[0].name)
        }
        
        setSpaces(spacesArr)

        console.log('spacesArr: ', spacesArr)
    }

    
    // Update event viewer when spaces are pressed
    const updateSelection = (e) => {
        GameState.event = e;
        setSelectedSpace(e);
    }
    
    // Render board
    return(
        <View>
            <View style={styles.board1row1}>
                <TouchableOpacity key={1} style={[styles.opportunitySpace, styles.boardSpace]}
                    onPress={() => {
                }}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={2} style={[styles.liabilitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>LIABILITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={3} style={[styles.opportunitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={4} style={[styles.charitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>CHARITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={5} style={[styles.opportunitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={6} style={[styles.paycheckSpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>PAYCHECK</Text>
                </TouchableOpacity>
                <TouchableOpacity key={7} style={[styles.opportunitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={8} style={[styles.offerSpace, styles.boardSpace]}>
                <Text style={styles.boardSpaceText}>OFFER</Text>
                </TouchableOpacity>
                <TouchableOpacity key={9} style={[styles.opportunitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={10} style={[styles.liabilitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>LIABILITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={11} style={[styles.opportunitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={12} style={[styles.childSpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>CHILD</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.board1row2}>
                <TouchableOpacity key={13} style={[styles.opportunitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={14} style={[styles.paycheckSpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>PAYCHECK</Text>
                </TouchableOpacity>
                <TouchableOpacity key={15} style={[styles.opportunitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={16} style={[styles.offerSpace, styles.boardSpace]}>    
                    <Text style={styles.boardSpaceText}>OFFER</Text>
                </TouchableOpacity>
                <TouchableOpacity key={17} style={[styles.opportunitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={18} style={[styles.liabilitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>LIABILITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={19} style={[styles.opportunitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={20} style={[styles.downsizeSpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>DOWNIZE</Text>
                </TouchableOpacity>
                <TouchableOpacity key={21} style={[styles.opportunitySpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={22} style={[styles.paycheckSpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>PAYCHECK</Text>
                </TouchableOpacity>
                <TouchableOpacity key={23} style={[styles.opportunitySpace, styles.boardSpace]}>
                <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={24} style={[styles.offerSpace, styles.boardSpace]}>
                    <Text style={styles.boardSpaceText}>OFFER</Text>
                </TouchableOpacity>
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    board1row1:{
        flexDirection:'row',
        flexWrap:'wrap',
        height: 40,
    },
    board1row2:{
        flexDirection:'row-reverse', 
        flexWrap:'wrap',
        height: 40,
    },
    boardSpace: {
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 4,
        textAlign: 'center',
        justifyContent: 'center',
    },
    boardSpaceText: {
        color: "#ffffff",
        fontSize: 8,
    },
    opportunitySpace:{
        backgroundColor: "green", 
        flex: 0.2,
        
    },
    liabilitySpace: {
        backgroundColor: "darkslategray", 
        flex: 0.2,
    },
    charitySpace: {
        backgroundColor: "aqua", 
        flex: 0.2,
    },
    paycheckSpace: {
        backgroundColor: "gold", 
        flex: 0.2,
    },
    offerSpace: {
        backgroundColor: "blue", 
        flex: 0.2,
    },
    childSpace: {
        backgroundColor: "orange", 
        flex: 0.2,
    },
    downsizeSpace: {
        backgroundColor: "red", 
        flex: 0.2,
    },
})

export default Board