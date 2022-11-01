import { put, takeEvery } from "redux-saga/effects";
import {
  getClientsAPI,
  createClientAPI,
  editClientAPI,
  getClientConfigAPI,
  updateClientConfigAPI,
} from "../../apis";
import {
  getAllClientsSlice,
  addClientSlice,
  editClientSlice,
  getClientConfigSlice,
  getClientConfigError,
} from "../Slices/AdminSlice";
import {
  GET_ALL_CLIENTS,
  CREATE_CLIENT,
  EDIT_CLIENT,
  GET_CLIENT_CONFIG,
  UPDATE_CLIENT_CONFIG,
} from "../Types";
import { toast } from "react-toastify";

export function* getClientsSaga() {
  try {
    const clients = yield getClientsAPI();
    yield put(getAllClientsSlice(clients.data));
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}

export function* createClientSaga(action) {
  try {
    const response = yield createClientAPI(action.payload);
    yield put(addClientSlice(response.data));
    toast.success("Client Added Sucessfully");
  } catch (error) {
    console.log(error);
    toast.error(`${error.message}, Please try after sometime`);
  }
}

export function* editClientSaga(action) {
  yield editClientAPI(action.payload);
  yield put(editClientSlice(action.payload));
}

export function* getClientConfig(action) {
  try {
    const response = yield getClientConfigAPI(action.payload);
    yield put(getClientConfigSlice(response.data.responseData.response));
  } catch (error) {
    yield getClientConfigError();
    toast.error(`${error.message}, Please try after sometime`);
  }
}

export function* updateClientConfig(action) {
  try {
    yield updateClientConfigAPI(action.payload);
    toast.success(
      `The ${action.payload.config} configuration updated successfully !!`
    );
  } catch (error) {
    yield getClientConfigError();
    toast.error(`${error.message}, Please try after sometime`);
  }
}

export function* watchClientSaga() {
  yield takeEvery(GET_ALL_CLIENTS, getClientsSaga);
  yield takeEvery(CREATE_CLIENT, createClientSaga);
  yield takeEvery(EDIT_CLIENT, editClientSaga);
  yield takeEvery(GET_CLIENT_CONFIG, getClientConfig);
  yield takeEvery(UPDATE_CLIENT_CONFIG, updateClientConfig);
}
