import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import BoardSpaces from '../../../js/BoardSpaces';
import GameState from '../../../js/GameState'
import styles from "./style";

const Board = (props) => {
    const { selectedSpace, setSelectedSpace } = props;
    const { currentSpace, setCurrentSpace } = props;

    const player = GameState.players[GameState.currentPlayer];

    useEffect(() => {
        if (GameState.turnPhase === 'middle' && player.moved){
            setCurrentSpace(BoardSpaces[player.currentSpace - 1].field)
            
            BoardSpaces.forEach(item => {
                if (GameState.checkOccupiedSpaces(item)){
                    //console.log(player.name + ' landed on ' + item.field)
                    updateSelection(player.name + ' landed on ' + item.field);
                }
            })
        }
        
    })

    
    // Update event viewer when spaces are pressed
    const updateSelection = (text) => {
        GameState.events.push(text)
        setSelectedSpace(text)
    }

    // Render board
    return(
        <View style={styles.boardContainer}>
            <View style={styles.board1row1}>
                <TouchableOpacity key={1} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[0]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={2} style={[styles.doodadSpace, (!GameState.checkOccupiedSpaces(BoardSpaces[1]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>{BoardSpaces[1].field}</Text>
                </TouchableOpacity>
                <TouchableOpacity key={3} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[2]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={4} style={[styles.charitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[3]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>CHARITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={5} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[4]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={6} style={[styles.paycheckSpace, (!GameState.checkOccupiedSpaces(BoardSpaces[5]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>PAYCHECK</Text>
                </TouchableOpacity>
                <TouchableOpacity key={7} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[6]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={8} style={[styles.offerSpace, (!GameState.checkOccupiedSpaces(BoardSpaces[7]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                <Text style={styles.boardSpaceText}>OFFER</Text>
                </TouchableOpacity>
                <TouchableOpacity key={9} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[8]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={10} style={[styles.doodadSpace, (!GameState.checkOccupiedSpaces(BoardSpaces[9]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>{BoardSpaces[9].field}</Text>
                </TouchableOpacity>
                <TouchableOpacity key={11} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[10]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={12} style={[styles.childSpace, (!GameState.checkOccupiedSpaces(BoardSpaces[11]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>CHILD</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.board1row2}>
                <TouchableOpacity key={13} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[12]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={14} style={[styles.paycheckSpace, (!GameState.checkOccupiedSpaces(BoardSpaces[13]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>PAYCHECK</Text>
                </TouchableOpacity>
                <TouchableOpacity key={15} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[14]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={16} style={[styles.offerSpace, (!GameState.checkOccupiedSpaces(BoardSpaces[15]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>    
                    <Text style={styles.boardSpaceText}>OFFER</Text>
                </TouchableOpacity>
                <TouchableOpacity key={17} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[16]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={18} style={[styles.doodadSpace, (!GameState.checkOccupiedSpaces(BoardSpaces[17]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>{BoardSpaces[17].field}</Text>
                </TouchableOpacity>
                <TouchableOpacity key={19} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[18]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={20} style={[styles.downsizeSpace, (!GameState.checkOccupiedSpaces(BoardSpaces[19]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>DOWNIZE</Text>
                </TouchableOpacity>
                <TouchableOpacity key={21} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[20]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={22} style={[styles.paycheckSpace, (!GameState.checkOccupiedSpaces(BoardSpaces[21]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>PAYCHECK</Text>
                </TouchableOpacity>
                <TouchableOpacity key={23} style={[styles.opportunitySpace, (!GameState.checkOccupiedSpaces(BoardSpaces[22]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                <Text style={styles.boardSpaceText}>OPPORTUNITY</Text>
                </TouchableOpacity>
                <TouchableOpacity key={24} style={[styles.offerSpace, (!GameState.checkOccupiedSpaces(BoardSpaces[23]) ? styles.boardSpace : styles.boardSpaceHighlight)]}>
                    <Text style={styles.boardSpaceText}>OFFER</Text>
                </TouchableOpacity>
            </View>
       </View>
    )
}

export default Board