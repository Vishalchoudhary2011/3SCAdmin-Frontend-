/*
  CookieHandler the place where all core functions are stored
*/

//Manage token given from api For Login Purpose

import {getCookie} from '../utils/CookieHandler';

class TokenManager {
  static addToken(token, val=1) {
    if (val) {
      document.cookie = `USER_TOKEN=${token}`;
    } 
  }

  static addAuth(data) {
    document.cookie = `AUTH_DATA=${data}`;
  }

  static addDate(date) {
    document.cookie = `DTE=${date}`;
  }

  static addName(data) {
    document.cookie = `AUTH_NAME=${data}`;
  }
  
  static addRole(data) {
    document.cookie = `AUTH_ROLE=${data}`;
  }
  
  static updateUsername(username) {
    document.cookie = `USER_NAME=${username}`;
  }
  
  static getDate() {
    return getCookie("DTE");
  }

  static getUsername() {
    return getCookie("USER_NAME");
  }

  static addUserDetails(data) {
    document.cookie = `USER=${JSON.stringify(data)}`;
  }

  static getUserDetails() {
    if (JSON.parse(getCookie("USER")) == null) {
      return { permissions: [], user_id: "" };
    }
    return JSON.parse(getCookie("USER"));
  }

  static getToken() {
    return getCookie("MY_TOKEN");
  }

  static getAuth() {
    return getCookie("AUTH_DATA");
  }

  static getName() {
    return getCookie("AUTH_NAME");
  }

  static getRole() {
    return getCookie("AUTH_ROLE");
  }

  static getToken() {
    return getCookie("MY_TOKEN");
  }

  static getAuth() {
    return getCookie("AUTH_DATA");
  }

  static getName() {
    return getCookie("AUTH_NAME");
  }

  static getRole() {
    return getCookie("AUTH_ROLE");
  }

  // static removeToken() {
  //   localStorage.removeItem("MY_TOKEN");
  // }

  // static removeAll() {
  //   localStorage.removeItem("USER_NAME");
  //   localStorage.removeItem("USER");
  //   localStorage.removeItem("DTE");
  // }  

}
export default TokenManager;
