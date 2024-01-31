import { create } from 'zustand';

const useFormStore = create((set) => ({
  form: null,
  setForm: (form) => {
    console.log("Actualizando formStore con:", form);
    set({ form });
  },
}));

export default useFormStore;

