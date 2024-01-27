import { AbilityStone, Accessory, Engraving } from "../types";

interface IParams {
    accessories: Accessory[];
    engravingBooks: Engraving[];
    abilityStone: AbilityStone[];
}

export default async function generateBuild(data: IParams) {
    console.log('data is:', data.accessories[0].combatOne);
}

