import axios from "axios";
import { config } from "./config";


export async function getGroupbycourse_name(course_id) {

    const url = `${config.studentServerBaseURL}/group/groupbycourse`;
    const body = {course_id}
    const response = await axios.post(url,body);
    return response.data 
    
}