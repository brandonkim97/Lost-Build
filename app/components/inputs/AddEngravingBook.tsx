import { Button, FormControl } from "@chakra-ui/react";
import Input from "./Input";
import { ChangeEvent, useState } from "react";
import { bookLevels } from "@/app/libs/getEngravingData";

interface AddEngravingBookProps  {
    engravingOptions: {};
    setItemData: (e: any) => void;
}

const AddEngravingBook: React.FC<AddEngravingBookProps> = ({
    engravingOptions,
    setItemData,
}) => {
    const dataInitialState = {
        name: '',
        value: 0,
    }
    const [book, setBook] = useState(dataInitialState)

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const parsed = name === 'value' ? parseInt(value, 10) : value;

        setBook({
            ...book,
            [name]: parsed,
        });
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
        <option key={key} value={key}>{value}</option>
      ));

    return (
        <FormControl>
            <Input
                label="Select engraving book"
                name="name"
                options={engravingOptions}
                onChange={handleChange}
                value={book.name}
                required
            />
            <Input
                label="Select level"
                name="value"
                options={bookLevelOptions}
                onChange={handleChange}
                value={book.value}
                required
            />
            <Button colorScheme='' size='sm' variant="outline" onClick={handleSubmit}>
                Add engraving book
            </Button>
        </FormControl>
    )
}

export default AddEngravingBook;