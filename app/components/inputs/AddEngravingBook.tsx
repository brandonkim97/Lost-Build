import Input from "./Input";
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { bookLevels } from "@/app/libs/getEngravingData";
import { SelectItem } from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flex } from "@chakra-ui/react";
import useAddEngravingBookModal from "@/app/hooks/useAddEngravingBookModal";
import Modal from "../modals/Modal";
import { formatBook } from "@/app/utils/formatData";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import EngravingContext from "@/app/contexts/EngravingContext";

interface AddEngravingBookProps  {
    setItemData: (e: any) => void;
}

type DataType = {
    [key: string]: string | number | undefined;
}

const AddEngravingBook: React.FC<AddEngravingBookProps> = ({
    setItemData,
}) => {
    const engravingOptions = useContext(EngravingContext);
    const addEngravingBookModal = useAddEngravingBookModal();
    const { isEdit, item, index } = addEngravingBookModal;
    const dataInitialState = useMemo(() => {
        return !isEdit && {
            name: '',
            value: '',
        }
            ||
        {
            name: item?.name,
            value: item?.value.toString(),
        }
    }, [item, isEdit]);
    const [book, setBook] = useState<DataType>(dataInitialState)

    useEffect(() => {
        setBook(dataInitialState);
      }, [dataInitialState]);

    const handleChange = useCallback((e: string, v: string) => setBook({ ...book, [e]: v }), [book]);

    const handleClear = () => {
        setBook({
            name: '',
            value: '',
        });
    }

    const handleSubmit = () => {
        const bookString = localStorage.getItem('engraving-book');
        const bookArray = bookString ? JSON.parse(bookString) : [];
        const formattedArray = formatBook(book);

        if (isEdit) {
            bookArray[index as number] = formattedArray;
        } else {
            bookArray.push(formattedArray);
        }

        localStorage.setItem('engraving-book', JSON.stringify(bookArray));
        setItemData(bookArray);
        setBook(dataInitialState);
        if (isEdit) addEngravingBookModal.onClose();
        handleClear();
    }

    const bookLevelOptions = useCallback(() => {
        const options = (
            <CommandGroup>
              {Object.entries(bookLevels).map(([key, value]) => (
                    <CommandItem 
                        key={key} 
                        value={key}
                        onSelect={() => handleChange('value', key)}
                        className='flex hover:cursor-pointer hover:bg-zinc-800 rounded-lg p-1 active:bg-zinc-800 focus:outline-none focus:bg-zinc-800'
                    >
                        <Check
                        className={`
                            mr-2 h-4 w-4
                            ${book['value'] === value ? "opacity-100" : "opacity-0"}
                        `}
                        />
                        {value}
                    </CommandItem>
                ))}
            </CommandGroup>
          );
        return options;
    }, [book, handleChange]);

    const getOptions = useCallback((e: string, func: () => { [key: string]: string | number }) => {
        const options = (
          <CommandGroup>
            <ScrollArea className={`h-[300px]`}>
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
                    ${book[e] === value ? "opacity-100" : "opacity-0"}
                  `}
                />
                {value}
              </CommandItem>
            ))}
            </ScrollArea>
          </CommandGroup>
        );
      
        return options;
    }, [book, handleChange]);


    const bodyContent = (
        <Card>
            <CardHeader>
                <CardDescription>All your engraving books will be considered in the final builds.</CardDescription>
            </CardHeader>
            <CardContent>
                <Flex gap="4" flexDirection="column">
                    <Input
                        label="Select engraving book"
                        name="name"
                        options={getOptions('name', () => engravingOptions)}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={engravingOptions[book.name as string]}
                        required
                    />
                    <Input
                        label="Select level"
                        name="value"
                        options={bookLevelOptions()}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={book.value}
                        required
                    />
                </Flex>
            </CardContent>
        </Card>
    );
    
    const action = addEngravingBookModal.isEdit ? 'Edit' : 'Add';

    return (
        <Modal
            isOpen={addEngravingBookModal.isOpen}
            onClose={addEngravingBookModal.onClose}
            onSubmit={handleSubmit}
            actionLabel="Submit"
            secondaryAction={handleClear}
            secondaryActionLabel='Clear'
            title={`${action} engraving book`}
            body={bodyContent}
        />
    )
}

export default AddEngravingBook;