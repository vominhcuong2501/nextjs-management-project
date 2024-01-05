import { InformationUser } from "@/app/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface DataUser {
  userInfo: InformationUser;
  updateUser: (value: InformationUser | undefined) => void;
  updateStatusAuth: (value: boolean) => void;
  isAuth: boolean;
}

const useDataUser = create<DataUser>()(
  persist(
    (set) => ({
      isAuth: false,
      userInfo: {} as InformationUser,
      updateUser: (value: InformationUser | undefined) =>
        set({ userInfo: value }),
      updateStatusAuth: (value: boolean) => set({ isAuth: value }),
    }),
    {
      name: "user-info",
    }
  )
);
export default useDataUser;
