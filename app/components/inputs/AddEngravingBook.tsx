import Input from "./Input";
import { ChangeEvent, useState } from "react";
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

interface AddEngravingBookProps  {
    engravingOptions: {};
    setItemData: (e: any) => void;
}

const AddEngravingBook: React.FC<AddEngravingBookProps> = ({
    engravingOptions,
    setItemData,
}) => {
    const addEngravingBookModal = useAddEngravingBookModal();
    const dataInitialState = {
        name: '',
        value: '',
    }
    const [book, setBook] = useState(dataInitialState)

    const handleChange = (e: string, v: string) => setBook({ ...book, [e]: v === 'value' ? parseInt(v, 10): v });

    const handleClear = () => {
        setBook(dataInitialState);
    }

    const handleSubmit = () => {
        const bookString = localStorage.getItem('engraving-book');
        const bookArray = bookString ? JSON.parse(bookString) : [];
        bookArray.push(book);
        localStorage.setItem('engraving-book', JSON.stringify(bookArray));
        setItemData(bookArray);
        setBook(dataInitialState);
    }

    const bookLevelOptions = Object.entries(bookLevels).map(([key, value]) => (
        <SelectItem key={key} value={key}>{value}</SelectItem>
    ));

    const bodyContent = (
        <Card>
            <CardHeader>
                <CardTitle>Add engraving book</CardTitle>
                <CardDescription>Add your engraving books from your characters.</CardDescription>
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
    )

    return (
        <Modal
            isOpen={addEngravingBookModal.isOpen}
            onClose={addEngravingBookModal.onClose}
            onSubmit={handleSubmit}
            actionLabel="Submit"
            secondaryAction={handleClear}
            secondaryActionLabel='Clear'
            title="Add engraving book"
            body={bodyContent}
        />
    )
}

export default AddEngravingBook;