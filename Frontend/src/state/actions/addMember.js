import axios from "axios";
import "../../axios";

export const addEmergencyMember =
  (name, phone, email, relation = null) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "MemberRequest",
      });

      const { token } = JSON.parse(localStorage.getItem('user'));
      
      const { data } = await axios.post(
        "api/add-member/",
        { name, phone, email, relation },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5OTQzMTY4LCJpYXQiOjE2Nzk1OTc1NjgsImp0aSI6Ijc0NDM2MzRlMjEwNTQ0OTNiMTE3MmQ3MDE0ZTQ2MDU2IiwidXNlcl9pZCI6Ijk5NWRiMWRmLTM4MWYtNGU0Ny04ZTQzLTMyNzAzMWM5NzY1OCJ9.en33hi5SbK1d3FaWR9hJAfOLRSl7SMANlbDi3rsclWM`,
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
