import axios from "axios";
import { config } from "./config";

// for Student module
export async function allCourse() {
  const url = `${config.studentServerBaseURL}/course/courses`;
  const response = await axios.get(url);
  return response.data;
}

// for CoCo module
export async function getCourses() {
  try {
    const url = `${config.cocoServerBaseURL}/course/courses`;
    const response = await axios.get(url);
    return response.data; // { status: 'success', data: [...] }
  } catch (err) {
    return { status: "error", error: err.message };
  }
}
