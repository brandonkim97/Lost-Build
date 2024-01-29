'use client';
import { 
    Flex, 
    NumberDecrementStepper, 
    NumberIncrementStepper, 
    NumberInput, 
    NumberInputField, 
    NumberInputStepper, 
    Slider, 
    SliderFilledTrack, 
    SliderThumb, 
    SliderTrack 
} from "@chakra-ui/react";
import { useState } from "react";

interface IParams {
    min?: number;
    max: number;
    name: string;
    value: number;
    onChange: (e: number, v: string) => void;
    noSlider?: boolean;
}

const SliderInput: React.FC<IParams> = ({
    min,
    max,
    name,
    value,
    onChange,
    noSlider
}) => {
  
    return (
      <Flex>
        <NumberInput 
            maxW='100px' 
            mr='2rem' 
            max={max} 
            keepWithinRange={true} 
            value={value} 
            onChange={(e: any) => onChange(e, name)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {!noSlider &&
            <Slider
                flex='1'
                focusThumbOnChange={false}
                value={value}
                onChange={(e: any) => onChange(e, name)}
                min={min}
                max={max}
                >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize='sm' boxSize='32px'>
                    {value}
                </SliderThumb>
            </Slider>
        }
      </Flex>
    )
}

export default SliderInput;