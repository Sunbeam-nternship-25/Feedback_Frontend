import Navbar from '../navbar/navbar';
import './cocologin.css';
import { useState } from 'react';
import { login } from '../../service/coco.js'
import { toast } from 'react-toastify';
import { Link, useNavigate} from 'react-router-dom';


function CocoLogin(){

  const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const navigate = useNavigate()
;    
      const onLogin = async() =>{
        if(email.length === 0){
          toast.warn('Please enter email')
    
      }else if (password.length === 0){
        toast.warn('Please enter password')
      }
      else{
        const result = await login(email,password)
        if (result?.status === "success") {
      toast.success("Successfully Logged in");
      localStorage.setItem("token", result.token); 
      navigate("/createFeedback");
    } else {
      toast.error(result?.error || "Invalid Email or Password");
    }
  }
};
      

      return (
        <div>
        <Navbar />
         
      <h2 className='page-header'>Course Coordinator Login</h2>
      <div>
        <div className='input-container'>
          <label htmlFor=''>Email</label>
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            
          />
       
          <label htmlFor=''>Password</label>
          <input
            type='password'
             onChange={(e) => setPassword(e.target.value)}
            
          />
       
        
          <div style={{ marginBottom: 20, color: '#6a6a6a' }}>
            Don't have account yet? <Link to ="/cocoRegister">Register here</Link>
          </div>
          <button
             onClick={onLogin}
            className='btn btn-success'
          >
            Login
          </button>
        </div>
      </div>
    </div>
   
    )
}

export default CocoLogin;