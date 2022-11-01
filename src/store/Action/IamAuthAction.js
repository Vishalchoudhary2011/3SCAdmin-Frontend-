import { loginRequest } from "../../Helper/Helper";

import * as actionTypes from "./Actiontypes";
import jwt_decode from "jwt-decode";

export const getSignIn = (formData) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_INITIAL });
    loginRequest("/signIn", {
      email: formData.email,
      password: formData.password,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.statusCode === 0) {
            let decoded = jwt_decode(res.headers.authorization);
            localStorage.setItem("userToken", res.headers.authorization);
            localStorage.setItem("userRole", decoded.AUTHORITIES_KEY);
            return dispatch({
              type: actionTypes.LOGIN_SUCCESS,
              payload: true,
              role: decoded.AUTHORITIES_KEY,
            });
          } else {
            return dispatch({
              type: actionTypes.LOGIN_FAIL,
              payload: res.data.responseData.message,
              ErrorCode: res.data.responseData.errorCode,
            });
          }
        } else {
          return dispatch({
            type: actionTypes.LOGIN_FAIL,
            payload: res.data.responseData.message,
            ErrorCode: res.data.responseData.errorCode,
          });
        }
      })
      .catch((error) => {
        console.log("si error=", error);
        return dispatch({
          type: actionTypes.LOGIN_FAIL,
          payload: "Server Error,Try Again",
        });
      });
  };
};
