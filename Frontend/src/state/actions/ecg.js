import { authAxios } from "../../axios";

export const addEmergencyMember =
  (value, longitude, latitude) => async (dispatch) => {
    try {
      dispatch({
        type: "EcgRequest",
      });

      const { data } = await authAxios.post(
        "api/ecg-input/",
        { value, latitude, longitude },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      dispatch({
        type: "EcgSuccess",
        payload: data.message,
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: "EcgError",
        payload: error.response.data,
      });
    }
  };
