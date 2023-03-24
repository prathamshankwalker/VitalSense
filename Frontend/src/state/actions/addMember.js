import axios from "axios";
import { authAxios } from "../../axios";

export const addEmergencyMember =
  (name, phone, email, relation = null) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "MemberRequest",
      });

      const { data } = await authAxios.post(
        "api/add-member/",
        { name, phone, email, relation },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      dispatch({
        type: "MemberSuccess",
        payload: data.message,
      });
      console.log(data);
      
    } catch (error) {
      dispatch({
        type: "MemberError",
        payload: "Members not saved",
      });
    }
  };
