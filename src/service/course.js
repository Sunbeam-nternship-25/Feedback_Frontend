import axios from "axios";
import { config } from "./config";


export async function allCourse() {

    const url = `${config.studentServerBaseURL}/course/allCourses`;

    const response = await axios.get(url);
    
    return response.data 
    
}