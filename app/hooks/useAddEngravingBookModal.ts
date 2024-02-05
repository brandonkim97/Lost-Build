import { create } from 'zustand';
import { Book } from '../types';

interface AddEngravingBookModalStore {
    isOpen: boolean;
    isEdit?: boolean;
    onOpen: () => void;
    onClose: () => void;
    onEdit: (e: Book, index: number) => void;
    item?: Book | null;
    index?: number;
}

const useAddEngravingBookModal = create<AddEngravingBookModalStore>((set) => ({
    isOpen: false,
    isEdit: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false, isEdit: false, item: null }),
    onEdit: (selectedItem: Book, index: number) => set({ isOpen: true, isEdit: true, item: selectedItem, index: index }),
}))

export default useAddEngravingBookModal;