import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StatusIsShowModal {
	isEditUser: boolean;
	updateIsEditUser: (value: boolean) => void;
	isCreateTask: boolean;
	updateIsCreateTask: (value: boolean) => void;
}

const useUpdateStatusModal = create<StatusIsShowModal>()(
	persist(
		(set) => ({
			isEditUser: false,
			updateIsEditUser: (value: boolean) => set({ isEditUser: value }),
			isCreateTask: false,
			updateIsCreateTask: (value: boolean) => set({ isCreateTask: value }),
		}),
		{
			name: "status-form",
		}
	)
);
export default useUpdateStatusModal;
