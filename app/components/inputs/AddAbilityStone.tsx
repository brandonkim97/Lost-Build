import Input from "./Input";
import { ChangeEvent, useState } from "react";
import { stoneLevels } from "@/app/libs/getEngravingData";
import { getReduction } from "@/app/libs/getItemData";
import SliderInput from "../SliderInput";
import { formatStones } from "@/app/utils/formatData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ClearButton from "../buttons/ClearButton";
import SubmitButton from "../buttons/SubmitButton";
import { SelectItem } from "@/components/ui/select";
import { Flex } from "@chakra-ui/react";
import useAddAbilityStoneModal from "@/app/hooks/useAddAbilityStoneModal";
import Modal from "../modals/Modal";

interface AddAbilityStoneProps  {
    engravingOptions: {};
    setItemData: (e: any) => void;
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
    setItemData
}) => {
    const addAbilityStoneModal = useAddAbilityStoneModal();
    const dataInitialState = {
        engravingOne: '',
        engravingOneValue: '',
        engravingTwo: '',
        engravingTwoValue: '',
        reduction: '',
        reductionValue: 0,
    }
    const [stone, setStone] = useState(dataInitialState)

    // const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     const parsed = parseString(name, value);

    //     setStone({
    //         ...stone,
    //         [name]: parsed,
    //     });
    // }
    
    const handleChange = (e: string, v: string) => setStone({ ...stone, [e]: v});

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

    const handleClear = () => {
        setStone(dataInitialState);
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
        setItemData(stoneArray);
        setStone(dataInitialState);
    }

    const levelOptions = Object.entries(stoneLevels).map(([key, value]) => {
        return (
            <SelectItem key={key} value={key}>{value}</SelectItem>
        )
    });
    
    const reduction = Object.entries(getReduction()).map(([key, value]) => {
        return (
            <SelectItem key={key} value={key}>{value}</SelectItem>
        )
    });

    const bodyContent = (
        <Card className="">
            <CardHeader>
                <CardTitle>Add ability stone</CardTitle>
                <CardDescription>All your stones will be considered in the final builds.</CardDescription>
            </CardHeader>
            <CardContent>
                <Flex gap="4" flexDirection="column">
                    <Input
                        label="Select engraving"
                        name="engravingOne"
                        options={engravingOptions}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={stone.engravingOne}
                        required
                    />
                    <Input
                        label="Select level"
                        name="engravingOneValue"
                        options={levelOptions}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={stone.engravingOneValue}
                        required
                    />
                    <Input
                        label="Select engraving"
                        name="engravingTwo"
                        options={engravingOptions}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={stone.engravingTwo}
                        required
                    />
                    <Input
                        label="Select level"
                        name="engravingTwoValue"
                        options={levelOptions}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={stone.engravingTwoValue}
                        required
                    />
                    <Input
                        label="Select reduction"
                        name="reduction"
                        options={reduction}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={stone.reduction}
                        required
                    />
                    <SliderInput
                        min={0} 
                        max={10} 
                        name="reductionValue"
                        value={stone.reductionValue}
                        onChange={(e: any) => handleSliderChange(e, 'reductionValue')} 
                    />
                </Flex>
            </CardContent>
        </Card>
    )

    return (
        <Modal
            isOpen={addAbilityStoneModal.isOpen}
            onClose={addAbilityStoneModal.onClose}
            onSubmit={handleSubmit}
            actionLabel="Submit"
            secondaryAction={handleClear}
            secondaryActionLabel='Clear'
            title="Add ability stone"
            body={bodyContent}
        />
    )
}

export default AddAbilityStone;