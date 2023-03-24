import { authAxios } from "../../axios";

export const getHypertensionData = (bs, hr) => async (dispatch) => {
  try {
    dispatch({
      type: "HyperRequest",
    });

    const { data } = await authAxios.post(
      "api/hypertension/",
      { bs, hr },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "HyperSuccess",
      payload: data.hypertension,
    });
  } catch (error) {
    dispatch({
      type: "HyperError",
      payload: error.response.data,
    });
  }
};
