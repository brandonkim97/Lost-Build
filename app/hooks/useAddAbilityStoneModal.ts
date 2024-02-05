import { create } from 'zustand';
import { AbilityStone } from '../types';

interface AddEngravingBookModalStore {
    isOpen: boolean;
    isEdit?: boolean;
    onOpen: () => void;
    onClose: () => void;
    onEdit: (e: AbilityStone, index: number) => void;
    item?: AbilityStone | null;
    index?: number;
}

const useAddEngravingBookModal = create<AddEngravingBookModalStore>((set) => ({
    isOpen: false,
    isEdit: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false, isEdit: false, item: null }),
    onEdit: (selectedItem: AbilityStone, index: number) => set({ isOpen: true, isEdit: true, item: selectedItem, index: index }),
}))

export default useAddEngravingBookModal;