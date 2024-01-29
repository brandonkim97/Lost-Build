import { Button, FormControl } from "@chakra-ui/react";
import Input from "./Input";
import { ChangeEvent, useState } from "react";
import { stoneLevels } from "@/app/libs/getEngravingData";
import { getReduction } from "@/app/libs/getItemData";
import SliderInput from "../SliderInput";
import { formatStones } from "@/app/utils/formatData";

interface AddAbilityStoneProps  {
    engravingOptions: {};
}

export interface AddAbilityStoneData {
  engravingOne: string,
  engravingTwo: string,
  engravingOneValue: number,
  engravingTwoValue: number,
  reduction: string,
  reductionValue: number,
}

const AddAbilityStone: React.FC<AddAbilityStoneProps> = ({
    engravingOptions,
}) => {
    const dataInitialState = {
        engravingOne: '',
        engravingOneValue: null,
        engravingTwo: '',
        engravingTwoValue: null,
        reduction: '',
        reductionValue: 0,
    }
    const [stone, setStone] = useState(dataInitialState)

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const parsed = parseString(name, value);

        setStone({
            ...stone,
            [name]: parsed,
        });
    }
    
    const handleSliderChange = (value: any, name: string) => {
        const parsed = parseString(name, value);
        setStone({
          ...stone,
          [name]: parsed,
        });
    }

    const parseString = (e: any, v: any) => {
        let res;
        switch(e) {
          case 'engravingOneValue':
          case 'engravingTwoValue':
          case 'reductionValue':
            res = parseInt(v, 10);
            break;
          default:
            res = v;
            break;
        }
        return res;
    }

    const isValid = () => {
        return stone.engravingOne &&
            stone.engravingOneValue && 
            stone.engravingTwo &&
            stone.engravingTwoValue &&
            stone.reduction
        ;
    }

    const handleSubmit = () => {
        //add validation
        if (!isValid()) return;
        const stoneString = localStorage.getItem('ability-stones');
        const stoneArray = stoneString ? JSON.parse(stoneString) : [];
        const formattedStone = formatStones(stone)
        stoneArray.push(formattedStone);
        localStorage.setItem('ability-stones', JSON.stringify(stoneArray));
        setStone(dataInitialState);
    }

    const levelOptions = Object.entries(stoneLevels).map(([key, value]) => {
        return (
            <option key={key} value={key}>{value}</option>
        )
    });
    
    const reduction = Object.entries(getReduction()).map(([key, value]) => {
        return (
            <option key={key} value={key}>{value}</option>
        )
    });

    return (
        <FormControl>
            <Input
                label="Select engraving"
                name="engravingOne"
                options={engravingOptions}
                onChange={handleChange}
                value={stone.engravingOne}
                required
            />
            <Input
                label="Select level"
                name="engravingOneValue"
                options={levelOptions}
                onChange={handleChange}
                value={stone.engravingOneValue}
                required
            />
            <Input
                label="Select engraving"
                name="engravingTwo"
                options={engravingOptions}
                onChange={handleChange}
                value={stone.engravingTwo}
                required
            />
            <Input
                label="Select level"
                name="engravingTwoValue"
                options={levelOptions}
                onChange={handleChange}
                value={stone.engravingTwoValue}
                required
            />
            <Input
                label="Select reduction"
                name="reduction"
                options={reduction}
                onChange={handleChange}
                value={stone.reduction}
                required
            />
            <SliderInput
                min={1} 
                max={3} 
                name="reductionValue"
                value={stone.reductionValue}
                onChange={(e: any) => handleSliderChange(e, 'reductionValue')} 
            />
            <Button colorScheme='' size='sm' variant="outline" onClick={handleSubmit}>
                Add ability stone
            </Button>
        </FormControl>
    )
}

export default AddAbilityStone;