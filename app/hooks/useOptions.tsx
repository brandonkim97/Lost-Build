import { CommandGroup, CommandItem } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useCallback } from 'react'
import { AddAccessoryData } from '../components/inputs/AddAccessory';
import { Check } from 'lucide-react';

const useOptions = (
    key: string,
    value: string | number | undefined,
    func: () => { [key: string]: string | number },
    handleChange: (e: any, v: any) => void,
    field?: any,
) => {
    const getOptions = useCallback((e: string, func: () => { [key: string]: string | number }, field?: any) => {
        const options = (
          <CommandGroup>
            <ScrollArea className={`${e === 'engravingOne' || e === 'engravingTwo' ? 'h-[300px]' : ''}`}>
            {Object.entries(func()).map(([key, v]) => (
              <CommandItem
                key={key}
                value={v as string}
                onSelect={() => handleChange(e, key)}
                className='flex hover:cursor-pointer hover:bg-zinc-800 rounded-lg p-1 active:bg-zinc-800 focus:outline-none focus:bg-zinc-800'
              >
                <Check
                  className={`
                    mr-2 h-4 w-4
                    ${value === v ? "opacity-100" : "opacity-0"}
                  `}
                />
                {v}
              </CommandItem>
            ))}
            </ScrollArea>
          </CommandGroup>
        );
      
        return options;
      }, [handleChange, value]);
      
    return getOptions(key, func, field);
}

export default useOptions;
