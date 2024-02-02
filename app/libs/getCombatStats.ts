import React from 'react'
import { Build } from '../types';
import { getCombatStat } from './getItemData';

export default function getCombatStats(build: Build) {
    if (!build || !Object.keys(build).length) return null;

    const res: { [key: string]: number } = {};
    for (const key in build) {
            if (key === 'necklace'){
                let combatOne = build[key]?.combatOne, combatTwo = build[key]?.combatTwo;
                let formatOne = getCombatStat(combatOne.name);
                res[formatOne] = 
                    formatOne in res ? 
                    res[formatOne] + combatOne.value :
                    combatOne.value;

                if (combatTwo !== undefined) {
                    let formatTwo = getCombatStat(combatTwo.name);
                    const name = combatTwo.name;
                    const value = combatTwo.value;
                    res[formatTwo] = 
                    formatTwo in res ? 
                    res[formatTwo] + value :
                    value;
                }
            } else if (
                key === 'earringOne' ||
                key === 'earringTwo' ||
                key === 'ringOne' ||
                key === 'ringTwo' 
            ) {
                const combatOne = build[key]?.combatOne, combatTwo = build[key]?.combatTwo;
                const formatOne = getCombatStat(combatOne.name);
                res[formatOne] = 
                    formatOne in res ? 
                    res[formatOne] + combatOne.value :
                    combatOne.value;
            }
    }

    return res;
}
