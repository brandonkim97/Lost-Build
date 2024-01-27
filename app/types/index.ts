/** ENGRAVINGS */
interface Stat {
    name: string;
    value: number;
}
  
export type Engraving = Stat;
export type CombatStat = Stat;  
export type Reduction = Stat & { 
    name: "MOVE_SPEED_REDUCTION" |
        "ATTACK_SPEED_REDUCTION" |
        "DEFENSE_REDUCTION" |
        "ATTACK_POWER_REDUCTION"
};

/** ACCESSORIES */

export interface Accessory {
    combatOne: CombatStat;
    combatTwo?: CombatStat;
    engravingOne: Engraving;
    engravingTwo: Engraving;
    reduction: Reduction;
    quality: number;
    type: "EARRING" | "RING" | "NECKLACE";
}

export type Necklace = Accessory;
export type Earring = Accessory;
export type Ring = Accessory;

/** STONE */

export interface AbilityStone {
    engravingOne: Engraving;
    engravingTwo: Engraving;
    reduction: Reduction;
}

/** BUILD */

export interface Build {
    necklace: Necklace;
    earringOne: Accessory;
    earringTwo: Accessory;
    ringOne: Accessory;
    ringTwo: Accessory;
    engravingBookOne: Engraving;
    engravingBookTwo: Engraving;
    abilityStone: any;
}

