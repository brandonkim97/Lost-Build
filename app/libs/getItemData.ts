export const getAccessoryTypes = () => {
    return {
        'NECKLACE': 'Necklace', 
        'EARRING': 'Earring', 
        'RING': 'Ring'
    };
}

export const getCombatStats = () => {
    return {
        'CRIT': 'Crit',
        'SPECIALIZATION': 'Specialization',
        'DOMINATION': 'Domination',
        'SWIFTNESS': 'Swiftness',
        'ENDURANCE': 'Endurance',
        'EXPERTISE': 'Expertise',
    }
}

export const getCombatStat = (stat: string) => {
    switch(stat) {
        case 'CRIT':
            return 'Crit';
            break;
        case 'SPECIALIZATION':
            return 'Specialization';
            break;
        case 'DOMINATION':
            return 'Domination';
            break;
        case 'SWIFTNESS':
            return 'Swiftness';
            break;
        case 'ENDURANCE':
            return 'Endurance';
            break;
        case 'EXPERTISE':
            return 'Expertise';
            break;
        default:
            return '';
            break;
    }
}

export const getReduction = (): { [key: string]: string }  => {
    return {
        "MOVE_SPEED_REDUCTION": "Move Speed Reduction",
        "ATTACK_SPEED_REDUCTION": "Attack Speed Reduction",
        "DEFENSE_REDUCTION": "Defense Reduction",
        "ATTACK_POWER_REDUCTION": "Attack Power Reduction",
    }
}

export const isReduction = (key: string) => {
    return key === 'MOVE_SPEED_REDUCTION' ||
        key === 'ATTACK_SPEED_REDUCTION' ||
        key === 'ATTACK_POWER_REDUCTION' ||
        key === 'DEFENSE_REDUCTION';
}
