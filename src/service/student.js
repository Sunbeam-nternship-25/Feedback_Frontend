import axios from 'axios';
import { config } from './config';


export async function login(email,password){
    
    try {
    
        const url = `${config.studentServerBaseURL}/student/login`

        const body = {email,password}
        console.log(email)
        const response = await axios.post(url,body)
         
        return response.data
    }
    catch(ex){
        console.log(`Exception :`,ex)
    }
}

export async function register(first_name, last_name, email, password, prn_no, group_id, course_id){
 try{
    const response = await axios.post("http://localhost:4002/student/register", {
        first_name,
        last_name,
        email,
        password,
        prn_no,
        group_id,
        course_id
    });
    return response.data;
 } catch (err) {
    return {
        status: "error",
        error:err.response?.data?.error || err.message
    };
 }
}


