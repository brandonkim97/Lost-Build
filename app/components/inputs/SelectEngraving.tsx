import { ChangeEvent } from 'react';
import Input from './Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';
import { Flex } from '@chakra-ui/react';

interface IParams {
    engravingOptions: any;
    desiredEngravings: {};
    handleChange: (e: string, v: string) => void;
    onClear: () => void;
    onSubmit: () => void;
}

const SelectEngraving: React.FC<IParams> = ({
    engravingOptions,
    desiredEngravings,
    handleChange,
    onClear,
    onSubmit,
}) => {

    const desiredEngravingOutput = Object.entries(desiredEngravings).map(([key, value]) => (
          <Input
            label="Select engraving"
            key={key}
            name={key}
            options={engravingOptions}
            onChange={(e: string, v: string) => handleChange(e, v)}
            value={value}
            required
        />
    ));
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Choose engravings</CardTitle>
                <CardDescription>Select the engravings you prefer in your final build.</CardDescription>
            </CardHeader>
            <CardContent>
                <Flex flexDirection="column" gap="4">
                    {desiredEngravingOutput}
                </Flex>
            </CardContent>
            <CardFooter className='justify-between'>
                <ClearButton label='Clear' onClick={onClear} />
                <SubmitButton label='Generate' onClick={onSubmit} variant='destructive' />
            </CardFooter>
        </Card>
    )
}

export default SelectEngraving;