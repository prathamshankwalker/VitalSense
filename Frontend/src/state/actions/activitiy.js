import { authAxios } from "../../axios";

export const getActivity =
  (step, calory, distance) => async (dispatch) => {
    try {
      dispatch({
        type: "ActivityRequest",
      });

      const { data } = await authAxios.post(
        "api/activity/",
        { step, calory, distance },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "ActivitySuccess",
        payload: data.activity,
      });
    } catch (error) {
      dispatch({
        type: "ActivityError",
        payload: error.response.data,
      });
    }
  };
