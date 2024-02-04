import { ChangeEvent } from 'react';
import Input from './Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';
import { Flex } from '@chakra-ui/react';

interface IParams {
    label: string;
    description: string;
    inputLabel: string;
    options: any;
    selected: {};
    handleChange: (e: string, v: string) => void;
    onClear: () => void;
}

const SelectBuild: React.FC<IParams> = ({
    label,
    description,
    inputLabel,
    options,
    selected,
    handleChange,
    onClear,
}) => {

    const output = Object.entries(selected).map(([key, value]) => (
          <Input
            label={inputLabel}
            key={key}
            name={key}
            options={options}
            onChange={(e: string, v: string) => handleChange(e, v)}
            value={value}
            required
        />
    ));

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>{label}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Flex flexDirection='column' gap={4}>
                    {output}
                </Flex>
            </CardContent>
            <CardFooter className='grow top-0 content-end flex-wrap justify-end'>
                <ClearButton label='Clear' onClick={onClear} />
            </CardFooter>
        </Card>
    )
}

export default SelectBuild;