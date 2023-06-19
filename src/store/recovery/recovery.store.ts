import create from "zustand";

const useRecoveryStore = create((set) => ({
  createStep: 1,
  fetching: false,
  roleName: "",
  accountDetails: {},
  authDetails: {},
  safeId: '',
  chainId:  localStorage.getItem("chainId") ? parseInt(localStorage.getItem("chainId")!) : 84531,
  safeStatus: true,
  recoveryType: '',

  setRoleName: (name: string) => {
    set((state: any) => ({
      ...state,
      roleName: name,
    }));
  },

  setSafeId: (id: string) => {
    set((state: any) => ({
      ...state,
      safeId: id,
    }));
  },

  setChainId: (id: number) => {
    set((state: any) => ({
      ...state,
      chainId: id,
    }));
  },

  setSafeStatus: (status: boolean) => {
    set((state: any) => ({
      ...state,
      safeStatus: status,
    }));
  },

  setFetching: (status: boolean) => {
    set((state: any) => ({
      ...state,
      fetching: status,
    }));
  },
  setCreateStep: (step: any) =>
    set((state: any) => ({
      createStep: step,
    })),
  setRecoveryType: (type: any) =>
    set((state: any) => ({
      recoveryType: type,
    })),
  formData: {},
  setFormData: (data: object) =>
    set((state: any) => ({
      formData: data,
    })),

  

  setAccountDetails: (data: object) =>
    set((state: any) => ({
      accountDetails: data,
    })),
  setAuthDetails: (data: object) =>
    set((state: any) => ({
      authDetails: data,
    })),

  recoveryDetails: {},

  setRecoveryDetails: (data: object) =>
    set((state: any) => ({
      recoveryDetails: data,
    })),


}));
export default useRecoveryStore;
