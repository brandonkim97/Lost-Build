'use client';
import { Select } from '@chakra-ui/react'
import { ChangeEvent } from 'react';

interface InputProps {
    label: string;
    name?: string;
    options: any;
    onChange: (e: any) => void;
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
            placeholder={label} 
            onChange={onChange} 
            name={name} 
            isRequired={required}
            isDisabled={disabled}
            value={value ?? ''}
        >
            {options}
        </Select>
    )
}

export default Input;