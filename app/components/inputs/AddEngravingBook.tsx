import Input from "./Input";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
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

interface AddEngravingBookProps  {
    engravingOptions: {};
    setItemData: (e: any) => void;
}

const AddEngravingBook: React.FC<AddEngravingBookProps> = ({
    engravingOptions,
    setItemData,
}) => {
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
    const [book, setBook] = useState(dataInitialState)

    useEffect(() => {
        setBook(dataInitialState);
      }, [dataInitialState]);

    const handleChange = (e: string, v: string) => setBook({ ...book, [e]: v });

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

    const bookLevelOptions = Object.entries(bookLevels).map(([key, value]) => (
        <SelectItem key={key} value={key}>{value}</SelectItem>
    ));

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
                        options={engravingOptions}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={book.name}
                        required
                    />
                    <Input
                        label="Select level"
                        name="value"
                        options={bookLevelOptions}
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