import { ChangeEvent, useCallback, useContext } from 'react';
import Input from './Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';
import { Box, Flex } from '@chakra-ui/react';
import EngravingContext from '@/app/contexts/EngravingContext';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ZodError, ZodRecord, ZodType, z } from "zod"
import { Form } from "@/components/ui/form"
import FormInput from '../form/FormInput';

interface IParams {
    label: string;
    description: string;
    inputLabel: string;
    options: { [key: string]: string };
    selected: { [key: string]: string };
    handleChange: (e: string, v: string) => void;
    onClear: () => void;
    form: any;
    values: { [key: string]: string };
    type: 'desiredEngravings' | 'desiredStats';
}

const SelectBuild: React.FC<IParams> = ({
    label,
    description,
    options,
    inputLabel,
    selected,
    handleChange,
    onClear,
    form,
    values,
    type,
}) => {

    const output = Object.entries(selected).map(([key, value]) => (
        <Box key={key}>
          <FormInput
            control={form.control}
            name={`${type}.${key}`}
            label={inputLabel}
            value={values[key]}
            handleChange={handleChange}
            getOptions={() => options}
            getValue={options}
          />
      </Box>
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