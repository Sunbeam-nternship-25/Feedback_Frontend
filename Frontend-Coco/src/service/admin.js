import axios from 'axios';
import { config } from './config';

// 🔹 Admin login 

export async function login(email,password){
    try {
        const url = `${config.adminServerBaseURL}/admin/login`

        const body = {email,password}
        console.log(email)
        const response = await axios.post(url,body)
        
        console.log(response)
        return response.data

    }
    catch(ex){
        console.log(`Exception :`,ex)
    }
}