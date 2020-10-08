import Axios from "axios";
import { URL, LOGIN, LOG_OUT, REGISTER, LOGIN_ERROR, GET_PROFILE } from "./helpers";

export const SignIn = (body) => {
  return async (dispatch) => {
    try {
      const res = await Axios.post(URL + "/login", body);
      // console.log(res);

      // save token into local storage
      // console.log(`data token : `, res.data.token);
      localStorage.setItem("id", res.data.id_users); //id_users sesuai database
      localStorage.setItem("token", res.data.token);

      dispatch({ type: LOGIN, payload: res.data });
    } catch (err) {
      // console.log(err)
      console.log(err.response ? err.response.data : err);
      dispatch({ type: LOGIN_ERROR, payload: err.response.data });
    }
  };
};

export const KeepLogin = () => {
  return async (dispatch) => {
    try {
      // get token from local storage
      const token = localStorage.getItem("token");
      // console.log(`token : `, token);

      // get user data using url keep login
      const res = await Axios.post(URL + "/keeplogin", { token });
      // console.log(res.data);

      dispatch({ type: LOGIN, payload: res.data }); //typenya harus sama dengan yg di helpers
    } catch (err) {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      dispatch({ type: LOG_OUT });
      // console.log(err ? "Error KeepLogin: " + err.response.data : err);
    }
  };
};

export const LogOut = () => {
  return async (dispatch) => {
    dispatch({ type: LOG_OUT });
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  };
};

export const signUp = (body) => {
  return async (dispatch) => {
    try {
      //add data
      const res = await Axios.post(URL + "/register", body); //alamatnya samakan di userRouter
      console.log(res.data);
      
      // save token into local storage
      console.log(`data token : `, res.data.token);
      localStorage.setItem("id", res.data.id_users); //id_users sesuai database
      localStorage.setItem("token", res.data.token);

      dispatch({ type: REGISTER, payload: res.data });
    } catch (err) {
      console.log(err ? "Error signUp: " + err.response.data : err);
    }
  };
};

export const upload = (data) => {
  return async (dispatch) => {
    try {
      const option = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await Axios.post(URL + "/profile/upload/" + localStorage.getItem("id"), data, option)
      const getProfile = await Axios.get(URL + '/profile/' + localStorage.getItem('id'))

      dispatch({ type: GET_PROFILE, payload: getProfile.data})
      console.log(res.data);
      console.log(getProfile.data);
    } catch (err) {
      console.log(err ? err.response.data : err);
    }
  };
};
