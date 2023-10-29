import {create} from 'zustand';

interface useCheckAuthStore {
  isLogin: boolean;
  logIn: () => void;
  logOut: () => void;
}

const useCheckAuth = create<useCheckAuthStore>(set => ({
  isLogin: false,
  logIn: () => set({isLogin: true}),
  logOut: () => set({isLogin: false}),
}));

export default useCheckAuth;
