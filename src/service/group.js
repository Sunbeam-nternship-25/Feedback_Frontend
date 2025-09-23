import axios from "axios";
import { config } from "./config";

// Fetch groups by course_id
export async function getGroupbycourse_name(course_id) {
  try {
    const url = `${config.cocoServerBaseURL}/group/groupbycourse`;
    const body = { course_id };
    const response = await axios.post(url, body);
    return response.data; // { status: 'success', data: [...] }
  } catch (err) {
    return { status: "error", error: err.message };
  }
}
