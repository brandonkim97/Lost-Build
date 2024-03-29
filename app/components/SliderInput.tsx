'use client';
import { 
    Flex, 
    NumberDecrementStepper, 
    NumberIncrementStepper, 
    NumberInput, 
    NumberInputField, 
    NumberInputStepper, 
} from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider"

interface IParams {
    min?: number;
    max: number;
    name: string;
    value: any;
    onChange: (e: string, v: number) => void;
    noSlider?: boolean;
}

type SliderProps = React.ComponentProps<typeof Slider>

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
            min={min}
            max={max} 
            keepWithinRange={true} 
            value={value} 
            onChange={(v: any) => onChange(name, v)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {!noSlider &&
            <Slider
                value={[value]}
                onValueChange={(v: any) => onChange(name, v)}
                min={min}
                max={max}
                step={1}
            />
        }
      </Flex>
    )
}

export default SliderInput;