'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
            <SelectTrigger>
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                {options}
            </SelectContent>
        </Select>
    )
}

export default Input;