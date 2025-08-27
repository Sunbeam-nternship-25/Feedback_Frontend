import { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../../service/teacher";
import Navbar from "../navbar/navbar";


function TeacherRegister() {
    const[form, setForm] = useState ({
        first_name:'',
        last_name:'',
        email:'',
        password:''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const onRegister = async() => {
    if ( !form.first_name || !form.last_name || ! form.email || !form.password) {
        toast.warn('please fill in all required fields')
        return
    }

    const result = await register(
        form.first_name,
        form.last_name,
        form.email,
        form.password
    );

    if (result.status === 'success'){
        toast.success('Registration successful')
        setForm({ first_name: '', last_name :'', email:'', password:''})
    } else {
        toast.error(result.error || 'Registration failed')
    }
    }


    return(
        <div>
            <Navbar/>
            <div className="container">
                <h2 className="page-header"> Teacher Registration </h2>
                <div className="login-form-container">
                    {['first_name', 'last_name','email','password'].map ((field) =>(
                    <div className='input-container' key={field}>
                        <label>{field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase() )}</label>
                        <input
                        type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text' }
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        />
                    </div>
                    ))}
                    <div className="input-container">
                        <button onClick={onRegister} className="btn btn-success">Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherRegister