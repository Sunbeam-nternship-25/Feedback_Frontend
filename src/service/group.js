import axios from "axios";
import { config } from "./config";


export async function getGroupbycourse_name(course_name) {

    const url = `${config.studentServerBaseURL}/group/groupbycourse/course_name`;

    const body = {course_name}

    const response = await axios.post(url,body);
    
    return response.data 
    
}