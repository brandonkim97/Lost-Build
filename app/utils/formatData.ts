import { AddAbilityStoneData } from "../components/inputs/AddAbilityStone";
import { AddAccessoryData } from "../components/inputs/AddAccessory";
import { Accessory } from "../types";

export function formatAccessory(acc: any): Accessory | false {
  if (!acc || typeof acc === 'undefined') return false;

  if (acc?.type !== 'NECKLACE') {
      return {
        uid: acc.uid,
        combatOne: {
          name: acc.combatOne,
          value: acc.combatOneValue
        },
        engravingOne: {
          name: acc.engravingOne,
          value: parseInt(acc.engravingOneValue, 10),
        },
        engravingTwo: {
          name: acc.engravingTwo,
          value: parseInt(acc.engravingTwoValue, 10),
        },
        reduction: {
          name: acc.reduction,
          value: parseInt(acc.reductionValue, 10),
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
      value: parseInt(acc.engravingOneValue, 10),
    },
    engravingTwo: {
      name: acc.engravingTwo,
      value: parseInt(acc.engravingTwoValue, 10),
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
    uid: stone.uid,
    engravingOne: {
      name: stone.engravingOne,
      value: parseInt(stone.engravingOneValue, 10)
    },
    engravingTwo: {
      name: stone.engravingTwo,
      value: parseInt(stone.engravingTwoValue, 10)
    },
    reduction: {
      name: stone.reduction,
      value: stone.reductionValue
    }
  }
}

export function formatBook(book: any) {
  return {
    uid: book.uid,
    name: book.name,
    value: parseInt(book.value, 10),
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