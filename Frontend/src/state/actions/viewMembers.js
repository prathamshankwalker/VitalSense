import { authAxios } from "../../axios";

export const getViewMember =() => async (dispatch) => {
    try {
      dispatch({
        type: "ViewMemberRequest",
      });

      const { data } = await authAxios.get('api/get-members/')
      dispatch({
        type: "ViewMemberSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ViewMemberError",
        payload: error.response.data,
      });
    }
  };
