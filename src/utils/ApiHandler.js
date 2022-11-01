/*
For API Handling ( Login, GET, POST, PUT, PATCH, DELETE )
--  For API request preparation
--  For API response handling
*/

import axios from "axios";
import sha1 from "sha1";
import constKeys from "../constant/constant";

var date = new Date();
var iso = date.getTime();

const apiAccessControlOrigin = "Access-Control-Allow-Origin";
const apiAccessAllOrigin = "*";
const apiIpPort = process.env.REACT_APP_API_ENDPOINT;
const apiBaseUrl = process.env.REACT_APP_API_BASEURL;


// API To generate a security token
const generateSecurityToken = (url) => {
  var secret = constKeys.API_SECRET;
  return sha1(`${url}${iso}1${secret}`);
};

// API Call For POST Login and get user's access token
export function loginRequest(apiUrl, data) {
  const url = apiIpPort + apiBaseUrl + apiUrl;
  const sha = generateSecurityToken(apiBaseUrl + apiUrl);
  const header = {
    AppAuthenticationToken: sha,
    timestamp: iso,
    apiAccessControlOrigin: apiAccessAllOrigin,
  };
  console.log("header=", header);
  return axios({
    method: constKeys.API_METHOD_POST,
    url: url,
    data: data,
    headers: header,
  });
}

// API Call for Post Request
export function postRequest(apiUrl, data) {
  const url = apiIpPort + apiBaseUrl + apiUrl;
  const sha = generateSecurityToken(apiBaseUrl + apiUrl);
  const header = {
    Authorization: localStorage.getItem("userToken"),
    apiAccessControlOrigin: apiAccessAllOrigin,
    AppAuthenticationToken: sha,
    timestamp: iso,
  };
  return axios({
    method: constKeys.API_METHOD_POST,
    url: url,
    data: data,
    headers: header,
  });
}

// API Call for PUT Request (for Update)
export function putRequestFile(apiUrl, data) {
  const url = apiIpPort + apiBaseUrl + apiUrl;
  const sha = generateSecurityToken(apiBaseUrl + apiUrl);
  const header = {
    Authorization: localStorage.getItem("userToken"),
    apiAccessControlOrigin: apiAccessAllOrigin,
    AppAuthenticationToken: sha,
    timestamp: iso,
    "Content-Type": "application/json",
  };
  return axios({
    method: constKeys.API_METHOD_PUT,
    url: url,
    data: data,
    headers: header,
  });
}

// Api Call for Reset Password
export function postResetPass(apiUrl, data, token) {
  const url = apiIpPort + apiBaseUrl + apiUrl;
  const sha = generateSecurityToken(apiBaseUrl + apiUrl);
  const header = {
    resetPasswordToken: token,
    "content-Type": "application/json",
    AppAuthenticationToken: sha,
    timestamp: iso,
    apiAccessControlOrigin: apiAccessAllOrigin,
  };
  return axios({
    method: constKeys.API_METHOD_POST,
    url: url,
    data: data,
    headers: header,
  });
}

// API to Generate New access token
export function postGenerateToken(apiUrl, data) {
  const url = apiIpPort + apiBaseUrl + apiUrl;
  const sha = generateSecurityToken(apiBaseUrl + apiUrl);
  const header = {
    "content-Type": "application/json",
    AppAuthenticationToken: sha,
    timestamp: iso,
    apiAccessControlOrigin: apiAccessAllOrigin,
  };
  return axios({
    method: constKeys.API_METHOD_POST,
    url: url,
    data: data,
    headers: header,
  });
}

// API Call for GET Request (fetch data from server)
export function getRequest(apiUrl) {
  const url = apiUrl;
  const sha = generateSecurityToken(apiUrl);
  const header = {
    Authorization: localStorage.getItem("userToken"),
    AppAuthenticationToken: sha,
    timestamp: iso,
    apiAccessControlOrigin: apiAccessAllOrigin,
  };

  return axios({
    method: constKeys.API_METHOD_GET,
    url: url,
    headers: header,
  });
}

// API Call for GET Request (fetch data from server)
export function getRequestWithoutHeader(apiUrl) {
  return axios({
    method: constKeys.API_METHOD_GET,
    url: apiUrl,
    headers: "",
  });
}

// API fr PUT Request (Data updation)
export function putRequest(apiUrl, data) {
  const url = apiIpPort + apiBaseUrl + apiUrl;
  const sha = generateSecurityToken(apiBaseUrl + apiUrl);
  const header = {
    Authorization: localStorage.getItem("userToken"),
    AppAuthenticationToken: sha,
    timestamp: iso,
    apiAccessControlOrigin: apiAccessAllOrigin,
  };
  return axios({
    method: constKeys.API_METHOD_PUT,
    data: data,
    url: url,
    headers: header,
  });
}

// API To DELETE a entry from server database
export function deleteRequest(apiUrl, data) {
  const url = apiIpPort + apiBaseUrl + apiUrl;
  const sha = generateSecurityToken(apiBaseUrl + apiUrl);
  const header = {
    Authorization: localStorage.getItem("userToken"),
    AppAuthenticationToken: sha,
    timestamp: iso,
    apiAccessControlOrigin: apiAccessAllOrigin,
  };
  return axios({
    method: constKeys.API_METHOD_DELETE,
    data: data,
    url: url,
    headers: header,
  });
}

// To download a file from server
export function getRequestFileDownload(apiUrl) {
  const url = apiIpPort + apiBaseUrl + apiUrl;
  const sha = generateSecurityToken(apiBaseUrl + apiUrl);
  const header = {
    Authorization: localStorage.getItem("userToken"),
    AppAuthenticationToken: sha,
    timestamp: iso,
    apiAccessControlOrigin: apiAccessAllOrigin,
  };
  return axios({
    responseType: "arraybuffer",
    method: constKeys.API_METHOD_GET,
    url: url,
    headers: header,
  });
}

// To get Location from server
export function getRequestLocation(apiUrl) {
  const url = apiIpPort + apiUrl;
  const sha = generateSecurityToken(apiUrl);
  const header = {
    Authorization: localStorage.getItem("userToken"),
    AppAuthenticationToken: sha,
    timestamp: iso,
    apiAccessControlOrigin: apiAccessAllOrigin,
  };

  return axios({
    method: constKeys.API_METHOD_GET,
    url: url,
    headers: header,
  });
}
