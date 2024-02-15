import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import React, { useCallback } from 'react'
import Input from '../inputs/Input'
import useOptions from '@/app/hooks/useOptions';

interface IParams {
  control: any;
  name: string;
  label: string;
  value: string | number | undefined;
  handleChange: (e: string, v: string) => void;
  getOptions: () => any;
  getValue: { [key: string]: string } | ((v: string) => any) | string | number;
}

const FormInput: React.FC<IParams> = ({
  control,
  name,
  label,
  value,
  handleChange,
  getOptions,
  getValue,
}) => {
  const options = useOptions(name, value, getOptions, handleChange);
  const func = (v: string) => {
    if (typeof getValue === 'function') {
      return getValue(v);
    } else if (typeof getValue === 'object') {
      return getValue[v];
    }
    return v;
  }

  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input 
                label={label}
                name={field.name}
                options={options}
                value={func(field.value)}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />
  )
}

export default FormInput;

