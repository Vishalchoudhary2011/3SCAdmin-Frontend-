import { combineReducers } from "redux";
import AdminReducer from "../Slices/AdminSlice";
import BusinessUnitReducer from "../Slices/BusinessUnitSlice";
import TeamUnitReducer from "../Slices/TeamUnitSlice"


export const rootReducer = combineReducers({
  AdminReducer,
  BusinessUnitReducer,
  TeamUnitReducer
});
