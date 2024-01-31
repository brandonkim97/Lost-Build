import { create } from 'zustand';

interface AddAbilityStoneModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAddAbilityStoneModal = create<AddAbilityStoneModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useAddAbilityStoneModal;