import axios from "axios";
import { publicAxios } from "../../axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequestEmail",
    });

    localStorage.removeItem("user");

    const { data } = await publicAxios.post(
      `api/login/`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);

    localStorage.setItem("user", JSON.stringify({ token: data.token }));

    dispatch({
      type: "LoginSuccessEmail",
      payload: data.message,
    });
  } catch (error) {
    console.log(error.response.data, error.response.status);
    dispatch({
      type: "LoginFailureEmail",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: "LogoutRequest",
  });
  localStorage.removeItem("user");
  dispatch({
    type: "LogoutSuccess",
    payload: "User Logged Out",
  });
};

export const signUpUser = (email, password, name) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });
    const { data } = await publicAxios.post(
      `api/signup/`,
      { email, password, name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
      
    dispatch({
      type: "RegisterSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.log(error.response.data, error.response.status);
    dispatch({
      type: "RegisterFailure",
      payload: error.response.data.message,
    });
  }
};
