import styles from "../components/game/Board/style"

var BoardSpaces= {
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
    checkOccupied: (space)=>{
        if (space.players.length > 0){
            return true
        } else {
            return false
        }
    }
}

export default BoardSpaces