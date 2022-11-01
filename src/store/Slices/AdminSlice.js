import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: true,
  error: false,
  errorMsg: "",
  ErrorCode: "",
  isEdit: false,
  clientEdit: null,
  clients: [],
  selectedClient: null,
  clientConfiguration: null,
};

export const AdminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    getAllClientsSlice: (state, action) => {
      state.clients = action.payload;
      state.loader = false;
      return state;
    },

    addClientSlice: (state, action) => {
      state.clients = [action.payload, ...state.clients];
      state.loader = false;
      return state;
    },
    editClientSlice: (state, action) => {
      state.clients = state.clients.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
      state.loader = false;
      return state;
    },
    resetClientStateSlice: (state) => {
      state.clients = [];
      return state;
    },
    selectedClientSlice: (state, action) => {
      state.selectedClient = action.payload;
      return state;
    },
    getClientConfigSlice: (state, action) => {
      state.clientConfiguration = action.payload;
      state.loader = false;
      return state;
    },
    updateClientConfigSlice: (state, action) => {
      state.loader = false;
      return state;
    },
    getClientConfigError: (state, action) => {
      state.error = true;
      return state;
    },
    setLoaderTrue: (state) => {
      state.loader = true;
    },
  },
});

export const {
  getAllClientsSlice,
  resetClientStateSlice,
  addClientSlice,
  editClientSlice,
  selectedClientSlice,
  getClientConfigSlice,
  setLoaderTrue,
  getClientConfigError,
  updateClientConfigSlice,
} = AdminSlice.actions;

export default AdminSlice.reducer;
