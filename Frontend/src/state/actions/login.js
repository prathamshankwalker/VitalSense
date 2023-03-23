import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequestEmail",
    });
    const { data } = await axios.post(
      "http://192.168.0.161:8000/api/login/",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    W
    localStorage.setItem("user", JSON.stringify({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5OTQzMTY4LCJpYXQiOjE2Nzk1OTc1NjgsImp0aSI6Ijc0NDM2MzRlMjEwNTQ0OTNiMTE3MmQ3MDE0ZTQ2MDU2IiwidXNlcl9pZCI6Ijk5NWRiMWRmLTM4MWYtNGU0Ny04ZTQzLTMyNzAzMWM5NzY1OCJ9.en33hi5SbK1d3FaWR9hJAfOLRSl7SMANlbDi3rsclWM" }));
    
    Wdispatch({
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
    const { data } = await axios.post(
      "http://192.168.0.161:8000/api/signup/",
      { email, password, name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    const { token } = JSON.parse(localStorage.getItem('user'));

    localStorage.setItem("user", JSON.stringify({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5OTQzMTY4LCJpYXQiOjE2Nzk1OTc1NjgsImp0aSI6Ijc0NDM2MzRlMjEwNTQ0OTNiMTE3MmQ3MDE0ZTQ2MDU2IiwidXNlcl9pZCI6Ijk5NWRiMWRmLTM4MWYtNGU0Ny04ZTQzLTMyNzAzMWM5NzY1OCJ9.en33hi5SbK1d3FaWR9hJAfOLRSl7SMANlbDi3rsclWM" }));

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
