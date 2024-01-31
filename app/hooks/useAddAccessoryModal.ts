import { create } from 'zustand';

interface AddAccessoryModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAddAccessoryModal = create<AddAccessoryModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useAddAccessoryModal;