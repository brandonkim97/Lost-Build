import { ChangeEvent, useCallback, useContext } from 'react';
import Input from './Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';
import { Flex } from '@chakra-ui/react';
import EngravingContext from '@/app/contexts/EngravingContext';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check } from 'lucide-react';

interface IParams {
    label: string;
    description: string;
    inputLabel: string;
    options: { [key: string]: string };
    selected: { [key: string]: string };
    handleChange: (e: string, v: string) => void;
    onClear: () => void;
}

const SelectBuild: React.FC<IParams> = ({
    label,
    description,
    options,
    inputLabel,
    selected,
    handleChange,
    onClear,
}) => {

    const getOptions = useCallback((e: string, func: () => { [key: string]: string | number }) => {
        const options = (
          <CommandGroup>
            <ScrollArea className={`${label === 'Choose engravings' ? 'h-[300px]' : ''}`}>
            {Object.entries(func()).map(([key, value]) => (
              <CommandItem
                key={key}
                value={key}
                onSelect={() => handleChange(e, key)}
                className='flex hover:cursor-pointer hover:bg-zinc-800 rounded-lg p-1 active:bg-zinc-800 focus:outline-none focus:bg-zinc-800'
              >
                <Check
                  className={`
                    mr-2 h-4 w-4
                    ${selected[e] === value ? "opacity-100" : "opacity-0"}
                  `}
                />
                {value}
              </CommandItem>
            ))}
            </ScrollArea>
          </CommandGroup>
        );
      
        return options;
    }, [handleChange, selected, label]);

    const output = Object.entries(selected).map(([key, value]) => (
          <Input
            label={inputLabel}
            key={key}
            name={key}
            options={getOptions(key, () => options)}
            onChange={(e: string, v: string) => handleChange(e, v)}
            value={options[value as string]}
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