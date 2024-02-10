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

export interface Book extends Stat {
    value: 3 | 6 | 9 | 12;
}

/** ACCESSORIES */

export interface Accessory {
    uid: number;
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
    [key: string]: Necklace | Accessory | Engraving | AbilityStone | undefined;
    necklace: Necklace;
    earringOne: Accessory;
    earringTwo: Accessory;
    ringOne: Accessory;
    ringTwo: Accessory;
    engravingBookOne: Engraving;
    engravingBookTwo: Engraving;
    abilityStone: AbilityStone;
}

/** Form Data */

export type AccessoryFormData = {
    combatOne: string,
    combatTwo: string,
    combatOneValue: number,
    combatTwoValue: number,
    engravingOne: string,
    engravingTwo: string,
    engravingOneValue: number,
    engravingTwoValue: number,
    reduction: string,
    reductionValue: number,
    quality: number,
    type: string,
}

