// src/service/group.js
import axios from "axios";
import {config} from "../service/config";

export const getGroupbycourse_name = async (course_id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${config.cocoServerBaseURL}/group/groupbycourse`,
      { course_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching groups:", err);
    return { status: "error", error: err.message };
  }
};


