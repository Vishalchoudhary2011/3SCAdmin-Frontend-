import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loader: true,
  errorMsg: '',
  ErrorCode: '',
  isEdit: false,
  selectedBU: null,
  teams: [],
}

export const TeamUnitSlice = createSlice({
  name: 'teams',
  initialState: initialState,
  reducers: {
    getAllTeamUnitSlice: (state, action) => {
      state.teams = action.payload
      state.loader = false
      return state
    },
    selectedBUSlice: (state, action) => {
      state.selectedBU = action.payload
      return state
    },
    createTeamUnitSlice: (state, action) => {
      state.teams = [action.payload]
      state.loader = false
      return state
    },
    editTeamSlice: (state, action) => {
      state.teams = state.teams.map((i) =>
        i.id === action.payload.id ? action.payload : i,
      )
      state.loader = false
      return state
    },

    teamCSVUploadInitiate: (state) => {
      state.csvUpload = false
      return state
    },
    teamCSVUploadComplete: (state, action) => {
      state.csvUpload = true
      state.csvUploadResponseData = action.payload
      return state
    },
    teamCSVUploadError: (state, action) => {
      state.csvUploadError = action.payload
      return state
    },
  },
})

export const {
  getAllTeamUnitSlice,
  selectedBUSlice,
  createTeamUnitSlice,
  editTeamSlice,
  teamCSVUploadInitiate,
  teamCSVUploadComplete,
  teamCSVUploadError,
} = TeamUnitSlice.actions

export default TeamUnitSlice.reducer
