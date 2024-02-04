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
} from "@/components/ui/select"
import { Button } from "@chakra-ui/react";
import { X } from "lucide-react";

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
    return (
        <Select 
            name={name} 
            onValueChange={(v) => onChange(name, v)} 
            disabled={disabled} 
            required={required}
            value={value}
        >
        {/* <X className="h-4 w-4 opacity-50 z-auto" onClick={() => onChange(name, '')} /> */}
            <SelectTrigger>
                <SelectValue placeholder={label} />
            </SelectTrigger>
                
            <SelectContent>
                <SelectGroup>
                {options}
                </SelectGroup>
            </SelectContent>
            
        </Select>
    )
}

export default Input;