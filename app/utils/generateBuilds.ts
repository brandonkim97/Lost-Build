import { isReduction } from "../libs/getItemData";
import { AbilityStone, Accessory, Build, Engraving, Favorites, Necklace } from "../types";
require('dotenv').config();

interface DataParams {
    accessories: Accessory[];
    engravingBooks: Engraving[];
    abilityStones: AbilityStone[];
    combatStats: { [key: string]: string };
    favorites: Favorites;
}

interface DesiredParams {
    engravingOne: string;
    engravingTwo: string;
    engravingThree: string;
    engravingFour: string;
    engravingFive: string;
    engravingSix: string;
}

type Count = { [key: string]: { [key: string]: number }};

interface EngravingLevels {
    levels: { [key: string]: number };
    build: Build;
}

export default async function generateBuild(data: DataParams, desiredEngravings: DesiredParams) {
    const {
        accessories,
        engravingBooks,
        abilityStones
    } = data;
    const builds: Build[] = [];

    //filter desired items
    const filteredBooks = engravingBooks.filter((value, index) => {
        return Object.values(desiredEngravings).includes(value.name);
    });
    const filteredStones = abilityStones.filter((value, index) => {
        return Object.values(desiredEngravings).includes(value.engravingOne.name) ||
            Object.values(desiredEngravings).includes(value.engravingTwo.name);
    });
    const filteredAccessories = accessories.filter((value, index) => {
        return Object.values(desiredEngravings).includes(value.engravingOne.name) ||
            Object.values(desiredEngravings).includes(value.engravingTwo.name)
    });
    //generate all engraving book pairs
    let bookPairs = generateBookPairs(filteredBooks);

    // console.log(bookPairs)
    const allStatReqs = getAllStatReqs(data.combatStats);

     //check favorites to see if it matches preferred combat stats
     if (!isFavoritesValid(data.favorites.accessory, allStatReqs)) {
        return {
            status: 'error',
            message: 'Your favorites do not match your preferred combat stats! Please try again.',
            data: [],
        };
     } 

    //create builds
    const unique = new Set<string>;
    for (const pair of bookPairs) {
        for (const stone of filteredStones) {
            await generateCombination(
                0,
                { ...allStatReqs },
                filteredAccessories,
                [],
                builds,
                unique,
                pair,
                stone
            );
        }
    }
    // console.log('builds: ', builds)
    //refactor builds
    const levels = getEngravingLevels(builds);
    // console.log('levels: ', levels);

    //get top 3 builds
    const top3 = getTopThreeBuilds(levels, desiredEngravings);
    if (!top3.length) {
        return {
            status: 'error',
            message: 'No builds could be created!',
            data: []
        }
    }
     return {
        status: 'success',
        message: 'Builds created!',
        data: top3,
    };
}

function generateCombination(
    index: number, 
    count: Count,
    accessories: Accessory[],
    currentBuild: Accessory[],
    builds: Build[],
    unique: Set<string>,
    pair: Engraving[],
    stone: AbilityStone,
) {
    if (hasAllAccessories(count)) {
        //push build to build array
        let key = (currentBuild.map(accessory => accessory.uid)).join('-');
        key += `-${pair[0].name}-${pair[1].name}-${stone.uid}`;
        if (!unique.has(key)) {
            builds.push(createBuild(currentBuild, pair, stone));
            unique.add(key);
        }
        return;
    }
    if (index >= accessories.length) return;

    //loop through accessories
    for (let i = index; i < accessories.length; i++) {
        const type = accessories[i].type, stat1 = accessories[i].combatOne.name;
        let stat2;

        //Check necklace
        if (type === 'NECKLACE') stat2 = accessories[i].combatTwo?.name;
        if (type === 'NECKLACE' && count[type][stat1] > 0 && count[type][stat2 as string] > 0) {
            currentBuild.push(accessories[i]);
            count[type][stat1]--;
            count[type][stat2 as string]--;
            generateCombination(i + 1, count, accessories, currentBuild, builds, unique, pair, stone);
            currentBuild.pop();
            count[type][stat1]++;
            count[type][stat2 as string]++;
        } else if (type !== 'NECKLACE' && count[type][stat1] > 0) { //Check earring, ring
            currentBuild.push(accessories[i]);
            count[type][stat1]--;
            generateCombination(i + 1, count, accessories, currentBuild, builds, unique, pair, stone);
            currentBuild.pop();
            count[type][stat1]++;
        }
    }
}

function generateBookPairs(b: Engraving[]) {
    const pairs = [];
    for (let i = 0; i < b.length; i++) {
        pairs.push([b[i], b[i]]);
        for (let j = i + 1; j < b.length; j++) {
            pairs.push([b[i], b[j]]);
        }
    }

    return pairs;
}

function createBuild(acc: Accessory[], pair: Engraving[], stone: AbilityStone) {
    const build: any = {};
    let earCount = 2, ringCount = 2;
    for (const a of acc) {
        switch (a.type) {
            case 'NECKLACE':
                build.necklace = a;
                break;
            case 'EARRING':
                if (earCount == 2) build.earringOne = a;
                else build.earringTwo = a;
                earCount--;
                break;
            case 'RING':
                if (ringCount == 2) build.ringOne = a;
                else build.ringTwo = a;
                ringCount--;
                break;
            default:
                break;
        }
    }
    build.engravingBookOne = pair[0];
    build.engravingBookTwo = pair[1];
    build.abilityStone = stone;
    return build as Build;
}

function getEngravingLevels(builds: Build[]) {
    const res: EngravingLevels[] = [];

    for (const build of builds) {
        let eng: EngravingLevels = { levels: {}, build: build};
        for (const key in build) {
            switch(key) {
                case 'engravingBookOne':
                case 'engravingBookTwo':
                    eng['levels'][build[key].name] = build[key].name in eng['levels'] ? 
                        eng['levels'][build[key].name] + build[key].value :
                        build[key].value;
                    break;
                default:
                    const bld = (build[key] as Accessory | AbilityStone | Necklace);

                    eng['levels'][bld.engravingOne.name] = 
                        bld.engravingOne.name in eng['levels'] ? 
                        eng['levels'][bld.engravingOne.name] + bld.engravingOne.value : 
                        bld.engravingOne.value;

                    eng['levels'][bld.engravingTwo.name] = 
                        bld.engravingTwo.name in eng['levels'] ? 
                        eng['levels'][bld.engravingTwo.name] + bld.engravingTwo.value : 
                        bld.engravingTwo.value;
                    eng['levels'][bld.reduction.name] =
                        bld.reduction.name in eng['levels'] ? 
                        eng['levels'][bld.reduction.name] + bld.reduction.value :
                        bld.reduction.value;

                    break;
            }
        }
        res.push(eng);
    }

    return res;
}

function getTopThreeBuilds(levels: EngravingLevels[], desiredEngravings: DesiredParams) {
    const map = new Map<number, EngravingLevels[]>();
    const res = [];
    let count = parseInt(process.env.NUM_BUILDS as string, 10);
    const maxNodes = parseInt(process.env.MAX_NODES as string, 10);
    // console.log(desiredEngravings)
    for (const data of levels) {
        let level1 = 0, level2 = 0, level3 = 0;
        for (const key in data.levels) {
            if (isReduction(key) || !Object.values(desiredEngravings).includes(key)) continue;
            if ((data['levels'][key] as number) >= 15) level3 += 15;
            else if ((data['levels'][key] as number) >= 10) level2 += 10;
            else if ((data['levels'][key] as number) >= 5) level1 += 5;
        }
        const total = level1 + level2 + level3;
        push(map, total, data);
    }
    // console.log(map);

    for (let i = maxNodes; i >= 0; i--) {
        if (map.has(i)) {
            const builds = map.get(i);
            for (const build of (builds as EngravingLevels[])) {
                if (!count) return res;
                res.push(build);
                count--;
            }
        }
    }

    return res;
}

function push(map: Map<number, EngravingLevels[]>, key: number, value: EngravingLevels) {
    if (map.has(key)) {
        map.get(key)?.push(value);
    } else {
        map.set(key, [value]);
    }
}

const isFavoritesValid = (
    favorites: { 
        necklace: Accessory | null, 
        earrings: Accessory[],
        rings: Accessory[],
    },
    count: Count
) => {
    let valid = true;
    //validate necklace
    if (favorites.necklace !== null && 
            favorites.necklace.combatTwo &&
                (count.NECKLACE[favorites.necklace.combatOne.name] === 0 ||
                    count.NECKLACE[favorites.necklace.combatTwo.name] === 0)
    ) valid = false;

    //validate earring
    favorites.earrings.forEach((item) => {
        console.log(item.combatOne.name, count.EARRING[item.combatOne.name], !count.EARRING[item.combatOne.name])
        if (count.EARRING[item.combatOne.name] === 0) {
            valid = false;
        }
    });

    //validate ring
    favorites.rings.forEach((item) => {
        console.log(item.combatOne.name, count.RING[item.combatOne.name], !count.RING[item.combatOne.name])
        if (count.RING[item.combatOne.name] === 0) valid = false;
    });

    //valid
    return valid;
}

const getAllStatReqs = (
    stats: { [key: string]: string }, 
) => {
    const res: { [key: string]: { [key: string]: number }} = {
        NECKLACE: {
            'CRIT': 0,
            'SPECIALIZATION': 0,
            'DOMINATION': 0,
            'ENDURANCE': 0,
            'SWIFTNESS': 0,
            'EXPERTISE': 0,
        },
        EARRING: {
            'CRIT': 0,
            'SPECIALIZATION': 0,
            'DOMINATION': 0,
            'ENDURANCE': 0,
            'SWIFTNESS': 0,
            'EXPERTISE': 0,
        },
        RING: {
            'CRIT': 0,
            'SPECIALIZATION': 0,
            'DOMINATION': 0,
            'ENDURANCE': 0,
            'SWIFTNESS': 0,
            'EXPERTISE': 0,
        }
    };

    for (const key in stats) {
        switch(key) {
            case 'necklaceOne':
            case 'necklaceTwo':
                res['NECKLACE'][stats[key]]++;
                break;
            case 'earringOne':
            case 'earringTwo':
                res['EARRING'][stats[key]]++;
                break;
            case 'ringOne':
            case 'ringTwo':
                res['RING'][stats[key]]++;
                break;
            default:
                break;
        }
    }

    return res;
}

const hasAllAccessories = (count: Count) => {
    for (const acc in count) {
        for (const stat in count[acc]) {
            if (count[acc][stat] > 0) return false;
        }
    }

    return true;
}

