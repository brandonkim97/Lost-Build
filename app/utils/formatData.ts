import { AddAccessoryData } from "../components/inputs/AddAccessory";

export function formatAccessories(acc: any) {
  if (!acc?.length || typeof acc === 'undefined') return [];

  if (acc?.type !== 'NECKLACE') {
    return acc.map((obj: AddAccessoryData) => {
        return {
          uid: obj.uid,
          combatOne: {
            name: obj.combatOne,
            value: obj.combatOneValue
          },
          engravingOne: {
            name: obj.engravingOne,
            value: obj.engravingOneValue
          },
          engravingTwo: {
            name: obj.engravingTwo,
            value: obj.engravingTwoValue
          },
          reduction: {
            name: obj.reduction,
            value: obj.reductionValue
          },
          quality: obj.quality,
          type: obj.type
        }
    });
  } 

  return acc.map((obj: AddAccessoryData) => {
    return {
      uid: obj.uid,
      combatOne: {
        name: obj.combatOne,
        value: obj.combatOneValue
      },
      combatTwo: {
        name: obj.combatTwo,
        value: obj.combatTwoValue
      },
      engravingOne: {
        name: obj.engravingOne,
        value: obj.engravingOneValue
      },
      engravingTwo: {
        name: obj.engravingTwo,
        value: obj.engravingTwoValue
      },
      reduction: {
        name: obj.reduction,
        value: obj.reductionValue
      },
      quality: obj.quality,
      type: obj.type
    }
  });
}
