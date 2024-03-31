import { User } from "@/types";
import { create } from "zustand";

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setFirebaseUID: (firebaseUID: string) => void;
  logout: () => void;
  setUserId: (id: string) => void;
  setUserName: (fullName: string) => void;
  setUserEmail: (email: string) => void;
  setUserAge: (age: string) => void;
  setUserGender: (gender: string) => void;
  setUserBloodType: (bloodType: string) => void;
  setUserCity: (city: string) => void;
  setUserPinCode: (pinCode: string) => void;
  setActiveForDonation: (activeForDonation: boolean) => void;
  setUserAvatar: (avatar: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  logout: () => set({ user: null }),
  setPhoneNumber: (phoneNumber: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        phoneNumber,
      },
    }));
  },
  setFirebaseUID: (firebaseUID: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        firebaseUID,
      },
    }));
  },
  setUserId: (id: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        id,
      },
    }));
  },
  setUserName: (fullName: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        fullName,
      },
    }));
  },

  setUserEmail: (email: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        email,
      },
    }));
  },

  setUserAge: (age: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        age,
      },
    }));
  },

  setUserGender: (gender: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        gender,
      },
    }));
  },

  setUserBloodType: (bloodType: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        bloodType,
      },
    }));
  },

  setUserCity: (city: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        address: {
          ...state.user?.address!,
          city,
        },
      },
    }));
  },

  setUserPinCode: (pinCode: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        address: {
          ...state.user?.address!,
          zip: pinCode,
        },
      },
    }));
  },
  setActiveForDonation(active: boolean) {
    set((state) => ({
      user: {
        ...state.user!,
        activeForDonation: active,
      },
    }));
  },
  setUserAvatar: (avatar: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        avatar,
      },
    }));
  },
}));
