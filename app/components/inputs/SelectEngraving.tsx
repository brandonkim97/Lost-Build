import { ChangeEvent } from 'react';
import Input from './Input';

interface IParams {
    options: any;
    name: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

const SelectEngraving: React.FC<IParams> = ({
    options,
    name,
    onChange,
    value,
}) => {
    return (
        <>
            <Input 
                label="Select engraving"
                name={name}
                options={options}
                onChange={onChange}
                value={value}
                required
            />
        </>
    )
}

export default SelectEngraving;