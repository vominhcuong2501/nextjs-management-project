import { create } from "zustand";

interface StatusIsShowModal {
	isEditUser: boolean;
	updateIsEditUser: (value: boolean) => void;
	isCreateTask: boolean;
	updateIsCreateTask: (value: boolean) => void;
}

const useUpdateStatusModal = create<StatusIsShowModal>()((set) => ({
	isEditUser: false,
	updateIsEditUser: (value: boolean) => set({ isEditUser: value }),
	isCreateTask: false,
	updateIsCreateTask: (value: boolean) => set({ isCreateTask: value }),
}));

export default useUpdateStatusModal;
