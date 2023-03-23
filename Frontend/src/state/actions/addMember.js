import axios from "axios";
import "../../axios";

export const addEmergencyMember =
  (name, phone, email, relation = null) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "MemberRequest",
      });
      const { data } = await axios.post(
        "api/add-member/",
        { name, phone, email, relation },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "MemberSuccess",
        payload: data.message,
      });
    } catch (error) {
      console.log(error.response.data, error.response.status);
      dispatch({
        type: "MemberError",
        payload: error.response.data.message,
      });
    }
  };
