import { AddAbilityStoneData } from "../components/inputs/AddAbilityStone";
import { AddAccessoryData } from "../components/inputs/AddAccessory";

export function formatAccessory(acc: any) {
  if (!acc || typeof acc === 'undefined') return [];

  if (acc?.type !== 'NECKLACE') {
      return {
        uid: acc.uid,
        combatOne: {
          name: acc.combatOne,
          value: acc.combatOneValue
        },
        engravingOne: {
          name: acc.engravingOne,
          value: acc.engravingOneValue
        },
        engravingTwo: {
          name: acc.engravingTwo,
          value: acc.engravingTwoValue
        },
        reduction: {
          name: acc.reduction,
          value: acc.reductionValue
        },
        quality: acc.quality,
        type: acc.type
      }
  } 

  return {
    uid: acc.uid,
    combatOne: {
      name: acc.combatOne,
      value: acc.combatOneValue
    },
    combatTwo: {
      name: acc.combatTwo,
      value: acc.combatTwoValue
    },
    engravingOne: {
      name: acc.engravingOne,
      value: acc.engravingOneValue
    },
    engravingTwo: {
      name: acc.engravingTwo,
      value: acc.engravingTwoValue
    },
    reduction: {
      name: acc.reduction,
      value: acc.reductionValue
    },
    quality: acc.quality,
    type: acc.type
  }
}

export function formatStones(stone: any) {
  return {
    engravingOne: {
      name: stone.engravingOne,
      value: stone.engravingOneValue
    },
    engravingTwo: {
      name: stone.engravingTwo,
      value: stone.engravingTwoValue
    },
    reduction: {
      name: stone.reduction,
      value: stone.reductionValue
    }
  }
}

export function formatLevels(data: any) {
  for (let i = 0; i < data.length; i++) {
    const res: { [key: string]: (string | number)[][] } = { three: [], two: [], one: [], zero: [] };
    for (const key in data[i].levels) {
      const value = data[i].levels[key];
      if (value >= 15) {
        res.three.push([key, value]);
      } else if (value >= 10) {
        res.two.push([key, value]);
      } else if (value >= 5) {
        res.one.push([key, value]);
      } else {
        res.zero.push([key, value]);
      }
    }
    data[i].levels = res;
  }

  return data;
}