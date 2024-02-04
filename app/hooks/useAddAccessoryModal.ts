import { create } from 'zustand';
import { Accessory } from '../types';

interface AddAccessoryModalStore {
    isOpen: boolean;
    isEdit?: boolean;
    onOpen: () => void;
    onClose: () => void;
    onEdit: (e: Accessory, index: number) => void;
    item?: Accessory | null;
    index?: number;
}

const useAddAccessoryModal = create<AddAccessoryModalStore>((set) => ({
    isOpen: false,
    isEdit: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false, isEdit: false, item: null }),
    onEdit: (selectedItem: Accessory, index: number) => set({ isOpen: true, isEdit: true, item: selectedItem, index: index }),
}))

export default useAddAccessoryModal;