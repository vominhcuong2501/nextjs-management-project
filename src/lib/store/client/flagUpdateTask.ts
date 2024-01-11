import { create } from "zustand";

interface FlagUpdateTask {
	isChange: boolean;
	updateIsChange: (value: boolean) => void;
}

const useUpdateTaskDetail = create<FlagUpdateTask>()((set) => ({
	isChange: false,
	updateIsChange: (value: boolean) => set({ isChange: value }),
}));

export default useUpdateTaskDetail;
