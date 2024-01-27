import { AbilityStone, Accessory, Engraving } from "../types";

export default function getMockData() {
    const acc: Accessory[] = [
        {
            combatOne: {
                name: 'CRIT',
                value: 483,
            },
            combatTwo: {
                name: 'SPECIALIZATION',
                value: 499
            },
            engravingOne: {
                name: 'EMPRESS_GRACE',
                value: 5,
            },
            engravingTwo: {
                name: 'HIT_MASTER',
                value: 3,
            },
            reduction: {
                name: 'MOVE_SPEED_REDUCTION',
                value: 1,
            },
            quality: 91,
            type: 'NECKLACE'
        },
        {
            combatOne: {
                name: 'SPECIALIZATION',
                value: 287,
            },
            engravingOne: {
                name: 'RAID_CAPTAIN',
                value: 6,
            },
            engravingTwo: {
                name: 'ADRENALINE',
                value: 3,
            },
            reduction: {
                name: 'MOVE_SPEED_REDUCTION',
                value: 3,
            },
            quality: 78,
            type: 'EARRING'
        },
        {
            combatOne: {
                name: 'SPECIALIZATION',
                value: 1,
            },
            engravingOne: {
                name: 'RAID_CAPTAIN',
                value: 6,
            },
            engravingTwo: {
                name: 'CURSED_DOLL',
                value: 3,
            },
            reduction: {
                name: 'ATTACK_POWER_REDUCTION',
                value: 3,
            },
            quality: 80,
            type: 'EARRING'
        },
        {
            combatOne: {
                name: 'SPECIALIZATION',
                value: 1,
            },
            engravingOne: {
                name: 'CURSED_DOLL',
                value: 5,
            },
            engravingTwo: {
                name: 'RAID_CAPTAIN',
                value: 3,
            },
            reduction: {
                name: 'ATTACK_POWER_REDUCTION',
                value: 1,
            },
            quality: 100,
            type: 'RING'
        },
        {
            combatOne: {
                name: 'SPECIALIZATION',
                value: 1,
            },
            engravingOne: {
                name: 'HIT_MASTER',
                value: 5,
            },
            engravingTwo: {
                name: 'GRUDGE',
                value: 3,
            },
            reduction: {
                name: 'ATTACK_SPEED_REDUCTION',
                value: 2,
            },
            quality: 100,
            type: 'RING'
        },
    ];

    const engravingBooks: Engraving[] = [
        { name: 'ADRENALINE', value: 12 },
        { name: 'GRUDGE', value: 12 },
        { name: 'EMPRESS_GRACE', value: 12 },
        { name: 'RAID_CAPTAIN', value: 12 },
    ];

    const abilityStone: AbilityStone[] = [
        {
            engravingOne: {
                name: 'HIT_MASTER',
                value: 7,
            },
            engravingTwo: {
                name: 'CURSED_DOLL',
                value: 8,
            },
            reduction: {
                name: 'DEFENSE_REDUCTION',
                value: 2,
            }
        },
        {
            engravingOne: {
                name: 'HIT_MASTER',
                value: 9,
            },
            engravingTwo: {
                name: 'CURSED_DOLL',
                value: 6,
            },
            reduction: {
                name: 'MOVE_SPEED_REDUCTION',
                value: 2,
            }
        }
    ];

    return {
        accessories: acc,
        engravingBooks: engravingBooks,
        abilityStone: abilityStone,
    };
}