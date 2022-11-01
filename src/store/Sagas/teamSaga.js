import { put, takeEvery } from 'redux-saga/effects'
import { getAllTeamUnitAPI, createTeamUnitAPI, editTeamAPI } from '../../apis'
import {
  getAllTeamUnitSlice,
  createTeamUnitSlice,
  editTeamSlice,
} from '../Slices/TeamUnitSlice'
import { BU_GET_TEAMS_UNIT, CREATE_TEAMS_UNIT, EDIT_TEAM_UNIT } from '../Types'
import { toast } from 'react-toastify'

export function* getTeamSaga(action) {
  try {
    const teams = yield getAllTeamUnitAPI(action.payload)
    yield put(getAllTeamUnitSlice(teams.data))
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

export function* createTeamSaga(action) {
  try {
    const response = yield createTeamUnitAPI(action.payload)
    yield put(createTeamUnitSlice(response.data))
    toast.success('Team Unit(s) Added Sucessfully')
    const teams = yield getAllTeamUnitAPI(action.payload)
    yield put(getAllTeamUnitSlice(teams.data))
  } catch (error) {
    console.log(error.message)
    toast.error(`${error.message}, Please try after sometime`)
  }
}

export function* editTeamSaga(action) {
  yield editTeamAPI(action.payload)
  yield put(editTeamSlice(action.payload))
  toast.success('Team Unit(s) Update Sucessfully')
}

export function* watchTeamSaga() {
  yield takeEvery(BU_GET_TEAMS_UNIT, getTeamSaga)
  yield takeEvery(CREATE_TEAMS_UNIT, createTeamSaga)
  yield takeEvery(EDIT_TEAM_UNIT, editTeamSaga)
}
