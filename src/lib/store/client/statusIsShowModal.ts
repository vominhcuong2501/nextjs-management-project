import { create } from 'zustand'

interface StatusIsShowModal {
	isEditUser: boolean
	updateIsEditUser: (value: boolean) => void
	isCreateTask: boolean
	updateIsCreateTask: (value: boolean) => void
	isEditTask: boolean
	updateIsEditTask: (value: boolean) => void
	isSearchProject: boolean
	updateIsSearchProject: (value: boolean) => void
}

const useUpdateStatusModal = create<StatusIsShowModal>()((set) => ({
	isEditUser: false,
	updateIsEditUser: (value: boolean) => set({ isEditUser: value }),
	isCreateTask: false,
	updateIsCreateTask: (value: boolean) => set({ isCreateTask: value }),
	isEditTask: false,
	updateIsEditTask: (value: boolean) => set({ isEditTask: value }),
	isSearchProject: false,
	updateIsSearchProject: (value: boolean) => set({ isEditTask: value })
}))

export default useUpdateStatusModal
