'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Check } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronsDown, X } from "lucide-react";
import { useEffect, useState } from "react";

//https://ui.shadcn.com/docs/components/combobox

interface InputProps {
    label: string;
    name: string;
    options: any;
    onChange: (e: string, v: any) => void;
    required: boolean;
    value: any;
    disabled?: boolean;
    errors?: any;
}

const Input: React.FC<InputProps> = ({
    label,
    name,
    options,
    onChange,
    required,
    value,
    disabled,
    errors
}) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(false);
    }, [value]);

    return (
        // <Select 
        //     name={name} 
        //     onValueChange={(v) => onChange(name, v)} 
        //     disabled={disabled} 
        //     required={required}
        //     value={value}
        // >
        // {/* <X className="h-4 w-4 opacity-50 z-auto" onClick={() => onChange(name, '')} /> */}
        //     <SelectTrigger>
        //         <SelectValue placeholder={label} />
        //     </SelectTrigger>
                
        //     <SelectContent>
        //         <SelectGroup>
        //         {options}
        //         </SelectGroup>
        //     </SelectContent>
            
        // </Select>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            >
                {value
                    ? value
                    : label
                }
            <ChevronsDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2">
            <Command>
                <CommandInput placeholder={label} />
                <CommandEmpty>No results found.</CommandEmpty>
                {options}
            </Command>
        </PopoverContent>
        </Popover>
    )
}

export default Input;