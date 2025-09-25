import axios from 'axios';
import { config } from './config';


export async function login(email,password){
    try {
        const url = `${config.cocoServerBaseURL}/coco/login`

        const body = {email,password}
        console.log(email)
        const response = await axios.post(url,body)
         
        return response.data
    }
    catch(ex){
        console.log(`Exception :`,ex)
    }
}