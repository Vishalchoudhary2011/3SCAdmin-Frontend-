import { put, takeEvery } from "redux-saga/effects";
import {
  getAllBusinessUnitsAPI,
  getByIdBusinessUnitsAPI,
  createBUAPI,
  uploadCSVDataAPI,
  editBUAPI,
} from "../../apis";
import {
  getAllBusinessUnitSlice,
  getByIdBusinessUnitSlice,
  addBUSlice,
  businessCSVUploadError,
  addBUErrorSlice,
} from "../Slices/BusinessUnitSlice";

import {
  GET_ALL_BUSINESS_UNITS,
  CREATE_BUSINESSUNIT,
  EDIT_BUSINESSUNIT,
  UPLOAD_Business_CSV_DATA,
} from "../Types";
import { toast } from "react-toastify";

export function* getBusinessUnitSaga(action) {
  try {
    const business = yield getAllBusinessUnitsAPI(action.payload);
    yield put(getAllBusinessUnitSlice(business.data));
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}

export function* getByIdBusinessUnitSaga(action) {
  try {
    const business = yield getByIdBusinessUnitsAPI(action.payload);
    yield put(getByIdBusinessUnitSlice(business.data));
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}

export function* createBUSaga(action) {
  try {
    const response = yield createBUAPI(action.payload);
    yield put(addBUSlice(response.data));
    toast.success("Business Unit(s) Added Sucessfully");
  } catch (error) {
    console.log(error);
    toast.error(`${error.message}, Please try after sometime`);
    yield addBUErrorSlice(error);
  }
}

export function* editBUSaga(action) {
  try {
    const response = yield editBUAPI(action.payload);
    toast.success("Business Unit Updated Sucessfully");
  } catch (error) {
    console.log(error.response.status);
    toast.error(`${error.message}, Please try after sometime`);
  }
}

export function* uploadBusinessCSVSaga(action) {
  try {
    const res = yield uploadCSVDataAPI(action.payload);
    console.log(res);
  } catch (error) {
    console.log(error.response.data);
    yield put(businessCSVUploadError(error.response.data.responseData));
  }
}

export function* watchBusinessUnitSaga() {
  yield takeEvery(GET_ALL_BUSINESS_UNITS, getBusinessUnitSaga);
  yield takeEvery(CREATE_BUSINESSUNIT, createBUSaga);
  yield takeEvery(EDIT_BUSINESSUNIT, editBUSaga);
  yield takeEvery(UPLOAD_Business_CSV_DATA, uploadBusinessCSVSaga);
}
