import axios from 'axios';
import { config } from './config';


export async function login(email,password){
    try {
        const url = `${config.teacherServerBaseURL}/teacher/login`

        const body = {email,password}
        console.log(email)
        const response = await axios.post(url,body)
         
        return response.data
    }
    catch(ex){
        console.log(`Exception :`,ex)
    }
}


export async function register(first_name,last_name,email,password){
     try{
    const response = await axios.post("http://localhost:4002/teacher/register", {
        first_name,
        last_name,
        email,
        password,
        
    });
    return response.data;
 } catch (err) {
    return {
        status: "error",
        error:err.response?.data?.error || err.message
    };
 }
}

export async function getTeacher() {
  const token = localStorage.getItem("token");
  const url = `${config.cocoServerBaseURL}/teacher/teacher_name`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`, // <-- add Bearer
    },
  });

  return response.data;
}


export async function getTeacherById() {
  const token = localStorage.getItem("token");
  const url = `${config.cocoServerBaseURL}/teacher/teacherbyid`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
