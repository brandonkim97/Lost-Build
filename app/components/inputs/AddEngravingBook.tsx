import { Button, FormControl } from "@chakra-ui/react";
import Input from "./Input";
import { ChangeEvent, useState } from "react";
import { engravingLevels } from "@/app/libs/getEngravingData";

interface AddEngravingBookProps  {
    engravingOptions: {};
}

const AddEngravingBook: React.FC<AddEngravingBookProps> = ({
    engravingOptions,
}) => {
    const [book, setBook] = useState({
        name: '',
        value: 0,
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const parseValue = typeof value !== 'number' ? parseFloat(value) : value;

        setBook({
            ...book,
            [name]: value,
        });
    }

    const handleSubmit = () => {
        console.log('submitting...')
        const bookString = localStorage.getItem('engraving-book');
        const bookArray = bookString ? JSON.parse(bookString) : [];
        bookArray.push(book);
        localStorage.setItem('engraving-book', JSON.stringify(bookArray));
        console.log(bookArray)
    }

    const levelOptions = Object.entries(engravingLevels).map(([key, value]) => (
        <option key={key} value={value}>{value}</option>
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
                options={levelOptions}
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

export default  AddEngravingBook;