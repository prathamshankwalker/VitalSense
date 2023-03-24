import axios from "axios";
import { authAxios } from "../../axios";

export const addUserProfile =
  (height, weight, dob, gender) => async (dispatch) => {
    try {
      dispatch({
        type: "ProfileRequest",
      });

      const { data } = await authAxios.post(
        "api/add-personal-data/",
        { height, weight, dob, gender },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);

      dispatch({
        type: "ProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      // console.log(error.response.status);
      dispatch({
        type: "ProfileFailure",
        payload: error.response.status,
      });
    }
  };
