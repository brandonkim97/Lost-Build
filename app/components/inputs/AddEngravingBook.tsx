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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ZodType, z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import FormInput from '../form/FormInput';
import updateFavorites from "@/app/utils/updateFavorites";
import { Book, Favorites } from "@/app/types";

interface AddEngravingBookProps  {
    setItemData: (e: any) => void;
    setFavorite: (e: any) => void;
}

type DataType = {
    [key: string]: string | number | undefined;
}

const FormSchema: ZodType<DataType> = z.object({
    uid: z.number().optional(),
    name: z.string({
      required_error: "Please select an engraving book.",
    }),
    value: z.number({
      required_error: "Please select a value.",
    }),
});

const AddEngravingBook: React.FC<AddEngravingBookProps> = ({
    setItemData,
    setFavorite
}) => {
    const engravingOptions = useContext(EngravingContext);
    const addEngravingBookModal = useAddEngravingBookModal();
    const { isEdit, item, index } = addEngravingBookModal;
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<DataType>({
        resolver: zodResolver(FormSchema)
    });

    useEffect(() => {
        setIsLoading(true);
        const loadData = async () => {
          const load = async () => {
            if (item && typeof item !== 'undefined') {
              form.setValue('name', item.name);
              form.setValue('value', item.value);
              form.setValue('uid', item.uid)
            }
          }
          await load()
          .then(() => {
            setIsLoading(false);
          });
        }
    
        loadData();
      }, [item, form]);

    const handleChange = useCallback((e: any, v: any) => {
        const parsed = e === 'value' ? parseInt(v, 10) : v;
        form.setValue(e, parsed);
    }, [form]);

    const handleClear = () => {
        form.reset();
    }

    const handleClose = () => {
        handleClear();
        addEngravingBookModal.onClose();
    }

    const onSubmit = (d: any) => {
        setIsLoading(true);
        if (!isEdit) d.uid = Date.now();
        const bookString = localStorage.getItem('engraving-book');
        const bookArray = bookString ? JSON.parse(bookString) : [];
        const formattedArray = formatBook(d);

        if (isEdit) {
            bookArray[index as number] = formattedArray;
            const favorites = localStorage.getItem('favorites');
            const favoritesObj = favorites ? JSON.parse(favorites) : null;
            const updatedFavorites = updateFavorites(favoritesObj, formattedArray as Book, 'BOOK');
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorite(updatedFavorites);
        } else {
            bookArray.push(formattedArray);
        }

        localStorage.setItem('engraving-book', JSON.stringify(bookArray));
        setItemData(bookArray);
        if (isEdit) addEngravingBookModal.onClose();
        handleClear();
        setIsLoading(false);
    }

    const values = form.watch();

    const bodyContent = (
        <Card>
            <CardHeader>
                <CardDescription>All your engraving books will be considered in the final builds.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Flex gap="4" flexDirection="column">
                            <FormInput 
                                control={form.control}
                                name='name'
                                label='Select engraving book'
                                value={values.name}
                                handleChange={handleChange}
                                getOptions={() => engravingOptions}
                                getValue={engravingOptions}
                            />
                            <FormInput 
                                control={form.control}
                                name='value'
                                label='Select value'
                                value={values.value}
                                handleChange={handleChange}
                                getOptions={() => bookLevels}
                                getValue={values.value as number}
                            />
                        </Flex>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
    
    const action = addEngravingBookModal.isEdit ? 'Edit' : 'Add';

    return (
        <Modal
            isOpen={addEngravingBookModal.isOpen}
            onClose={handleClose}
            onSubmit={form.handleSubmit(onSubmit)}
            actionLabel="Submit"
            secondaryAction={handleClear}
            secondaryActionLabel='Clear'
            title={`${action} engraving book`}
            body={bodyContent}
        />
    )
}

export default AddEngravingBook;