import { create } from 'zustand';

interface AddEngravingBookModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAddEngravingBookModal = create<AddEngravingBookModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useAddEngravingBookModal;