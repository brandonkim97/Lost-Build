import { ChangeEvent } from 'react';
import Input from './Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';
import { Flex } from '@chakra-ui/react';

interface IParams {
    engravingOptions: any;
    combatOptions: any;
    desiredEngravings: {};
    desiredStats: {};
    handleEngravingChange: (e: string, v: string) => void;
    handleStatChange: (e: string, v: string) => void;
    onClear: () => void;
    onSubmit: () => void;
}

const SelectBuild: React.FC<IParams> = ({
    engravingOptions,
    combatOptions,
    desiredEngravings,
    desiredStats,
    handleEngravingChange,
    handleStatChange,
    onClear,
    onSubmit,
}) => {

    const desiredEngravingOutput = Object.entries(desiredEngravings).map(([key, value]) => (
          <Input
            label="Select engraving"
            key={key}
            name={key}
            options={engravingOptions}
            onChange={(e: string, v: string) => handleEngravingChange(e, v)}
            value={value}
            required
        />
    ));

    const desiredStatOutput = Object.entries(desiredStats).map(([key, value]) => (
          <Input
            label="Select combat stat"
            key={key}
            name={key}
            options={combatOptions}
            onChange={(e: string, v: string) => handleStatChange(e, v)}
            value={value}
            required
        />
    ));

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Choose engravings</CardTitle>
                <CardDescription>Select the engravings/combat stats for your final build.</CardDescription>
            </CardHeader>
            <CardContent>
                <Flex flexDirection="column" gap="4">
                    {desiredEngravingOutput}
                    {desiredStatOutput}
                </Flex>
            </CardContent>
            <CardFooter className='justify-between'>
                <ClearButton label='Clear' onClick={onClear} />
                <SubmitButton label='Generate' onClick={onSubmit} variant='destructive' />
            </CardFooter>
        </Card>
    )
}

export default SelectBuild;