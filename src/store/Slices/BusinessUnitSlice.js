import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: true,
  errorMsg: null,
  ErrorCode: "",
  isEdit: false,
  selectedClient: null,
  businessUnits: [],
  createdBUs: 0,
};

export const BusinessUnitSlice = createSlice({
  name: "businessUnit",
  initialState: initialState,
  reducers: {
    getAllBusinessUnitSlice: (state, action) => {
      state.businessUnits = action.payload;
      state.loader = false;
      return state;
    },
    getByIdBusinessUnitSlice: (state, action) => {
      state.businessUnits = action.payload;
      state.loader = false;
      return state;
    },
    addBUSlice: (state, action) => {
      state.businessUnits = [...state.businessUnits, ...action.payload];
      state.loader = false;
      state.createdBUs = action.payload.length;
      return state;
    },
    resetCreatedBUs: (state) => {
      state.createdBUs = 0;
      return state;
    },
    addBUErrorSlice: (state) => {
      return state;
    },
    businessCSVUploadInitiate: (state) => {
      state.csvUpload = false;
      return state;
    },
    businessCSVUploadComplete: (state, action) => {
      state.csvUpload = true;
      state.csvUploadResponseData = action.payload;
      return state;
    },
    businessCSVUploadError: (state, action) => {
      state.csvUploadError = action.payload;
      return state;
    },
    selectedClientSlice: (state, action) => {
      state.selectedClient = action.payload;
      return state;
    },
  },
});

export const {
  getAllBusinessUnitSlice,
  getByIdBusinessUnitSlice,
  addBUSlice,
  businessCSVUploadError,
  businessCSVUploadComplete,
  businessCSVUploadInitiate,
  selectedClientSlice,
  addBUErrorSlice,
  resetCreatedBUs
} = BusinessUnitSlice.actions;

export default BusinessUnitSlice.reducer;
