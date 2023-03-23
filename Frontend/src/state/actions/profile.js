import axios from "axios";
import "../../axios";

export const addUserProfile =
  (height, weight, dob, gender) => async (dispatch) => {
    try {
      dispatch({
        type: "ProfileRequest",
      });
      const { data } = await axios.post(
        "api/add-personal-data/",
        { height, weight, dob, gender },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "ProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      console.log(error.response.data, error.response.status);
      dispatch({
        type: "ProfileFailure",
        payload: error.response.data.message,
      });
    }
  };
