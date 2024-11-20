import { create } from "zustand";
type PasswordStore = {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeUppercase: boolean;
  includeLowercase: boolean;
  generatedPassword: string;

  setLength: (length: number) => void;
  toggleNumbers: () => void;
  toggleSymbols: () => void;
  toggleUppercase: () => void;
  toggleLowercase: () => void;
  generatePassword: () => void;
};

const usePasswordStore = create<PasswordStore>((set) => ({
  length: 12,
  includeNumbers: true,
  includeSymbols: false,
  includeUppercase: true,
  includeLowercase: true,
  generatedPassword: "",

  setLength: (length) => set({ length }),

  toggleNumbers: () =>
    set((state) => ({ includeNumbers: !state.includeNumbers })),

  toggleSymbols: () =>
    set((state) => ({ includeSymbols: !state.includeSymbols })),

  toggleUppercase: () =>
    set((state) => ({
      includeUppercase: !state.includeUppercase,
    })),

  toggleLowercase: () =>
    set((state) => ({
      includeLowercase: !state.includeLowercase,
    })),

  generatePassword: () =>
    set((state) => {
      const numbers = Math.floor(Math.random() * 10);
      const symbols = "!@#$%^&*()_{}[],";
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      let characters = "";

      if (state.includeNumbers) characters += numbers;
      if (state.includeSymbols) characters += symbols;
      if (state.includeUppercase) characters += uppercase;
      if (state.includeLowercase) characters += lowercase;

      let password = "";

      for (let i = 0; i < state.length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
      }

      return { generatedPassword: password };
    }),
}));

export default usePasswordStore;