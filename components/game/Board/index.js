import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import BoardSpaces from '../../../js/BoardSpaces';
import GameState from '../../../js/GameState'
import styles from "./style";

const Board = ({ gs, positions }) => {
    const [playerObj, setPlayerObj] = useState(null);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [spaces, setSpaces] = useState(null)
    

    console.log('positions:', positions)

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

    /*
    // Add players to board
    if (GameState.turnCount === 1 && spaces === null) {
        if (GameState.players.length > 0){
            for (var a = 0; a < GameState.players.length; a++) {
                BoardSpaces.space1.players.push(GameState.players[a])
            }
            
            // for single player
            //spacesArr.space1.players.push(gs.players[0].name)
        }
        
        setSpaces(BoardSpaces)

        console.log('BoardSpaces after players turn 1: ', BoardSpaces)
    }
    */

    
    // Update event viewer when spaces are pressed
    const updateSelection = (e) => {
        GameState.event = e;
        setSelectedSpace(e);
    }
    
    // Render board
    return(
        <View style={styles.boardContainer}>
            <View style={styles.board1row1}>
                <TouchableOpacity key={1} style={[styles.opportunitySpace, (!BoardSpaces.checkOccupied(BoardSpaces.space1) ? styles.boardSpace : styles.boardSpaceHighlight)]}
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

export default Board