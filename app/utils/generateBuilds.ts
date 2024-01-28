import { AbilityStone, Accessory, Build, Engraving, Necklace } from "../types";
require('dotenv').config();

interface DataParams {
    accessories: Accessory[];
    engravingBooks: Engraving[];
    abilityStones: AbilityStone[];
}

interface DesiredParams {
    engravingOne: string;
    engravingTwo: string;
    engravingThree: string;
    engravingFour: string;
    engravingFive: string;
}

interface Count {
    NECKLACE: number;
    EARRING: number;
    RING: number;
}

interface EngravingLevels {
    [key: string]: number | Build;
}

export default async function generateBuild(data: DataParams, desiredEngravings: Required<DesiredParams>) {
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

    //create builds
    const unique = new Set<string>;
    for (const pair of bookPairs) {
        for (const stone of filteredStones) {
            await generateCombination(
                0,
                { NECKLACE: 1, EARRING: 2, RING: 2},
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
    const top3 = getTopThreeBuilds(levels);
    // console.log(top3)
    return top3;
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
    if (!(count.NECKLACE || count.EARRING || count.RING)) {
        //push build to build array
        let key = (currentBuild.map(accessory => accessory.uid)).join('-');
        key += `-${pair[0].name}-${pair[1].name}-${stone.engravingOne.name}-${stone.engravingOne.value}-${stone.engravingTwo.name}-${stone.engravingTwo.value}`;
        if (!unique.has(key)) {
            builds.push(createBuild(currentBuild, pair, stone));
            unique.add(key);
        }
        return;
    }
    if (index >= accessories.length) return;

    //loop through accessories
    for (let i = index; i < accessories.length; i++) {
        const type = accessories[i].type;
        if (count[type] > 0) {
            currentBuild.push(accessories[i]);
            count[type]--;
            generateCombination(i + 1, count, accessories, currentBuild, builds, unique, pair, stone);
            currentBuild.pop();
            count[type]++;
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
    return {
        ...build,
        engravingBookOne: pair[0],
        engravingBookTwo: pair[1],
        abilityStone: stone,
    } as Build;
}

function getEngravingLevels(builds: Build[]) {
    const res: EngravingLevels[] = [];

    for (const build of builds) {
        let eng: EngravingLevels = {};
        for (const key in build) {
            switch(key) {
                case 'engravingBookOne':
                case 'engravingBookTwo':
                    (eng[build[key].name] as number) += build[key].value;
                    break;
                default:
                    const bld = (build[key] as Accessory | AbilityStone | Necklace);

                    eng[bld.engravingOne.name] = 
                        bld.engravingOne.name in eng ? 
                        (eng[bld.engravingOne.name] as number) + bld.engravingOne.value : 
                        bld.engravingOne.value;

                    eng[bld.engravingTwo.name] = 
                        bld.engravingTwo.name in eng ? 
                        (eng[bld.engravingTwo.name] as number) + bld.engravingTwo.value : 
                        bld.engravingTwo.value;

                    break;
            }
        }
        eng['build'] = build;
        res.push(eng);
    }

    return res;
}

function getTopThreeBuilds(levels: EngravingLevels[]) {
    const map = new Map<number, Build[]>();
    const res = [];
    let count = parseInt(process.env.NUM_BUILDS as string, 10);
    const maxNodes = parseInt(process.env.MAX_NODES as string, 10);

    for (const build of levels) {
        let level1 = 0, level2 = 0, level3 = 0;
        for (const key in build) {
            if (key === "build") continue;
            if ((build[key] as number) >= 15) level3 += 15;
            else if ((build[key] as number) >= 10) level2 += 10;
            else if ((build[key] as number) >= 5) level1 += 5;
        }
        const total = level1 + level2 + level3;
        push(map, total, (build.build as Build));
    }
    // console.log(map);

    for (let i = maxNodes; i >= 0; i--) {
        if (map.has(i)) {
            const builds = map.get(i);
            for (const build of (builds as Build[])) {
                if (!count) return res;
                res.push(build);
                count--;
            }
        }
    }

    return res;
}

function push(map: Map<number, Build[]>, key: number, value: Build) {
    if (map.has(key)) {
        map.get(key)?.push(value);
    } else {
        map.set(key, [value]);
    }
}

