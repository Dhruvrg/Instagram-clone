import {create} from 'zustand';

interface useShowNavbarContentStore {
  isLogin: boolean;
  logIn: () => void;
  logOut: () => void;
}

const useShowNavbarContent = create<useShowNavbarContentStore>(set => ({
  isLogin: true,
  logIn: () => set({isLogin: true}),
  logOut: () => set({isLogin: false}),
}));

export default useShowNavbarContent;
