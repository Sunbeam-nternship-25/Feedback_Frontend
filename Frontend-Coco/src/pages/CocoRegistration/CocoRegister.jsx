import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { register } from "../../service/coco";
import Navbar from "../navbar/navbar";
import { getCourses } from "../../service/course";
import { Navigate } from "react-router-dom";



function CocoRegister() {

    const[form, setForm] = useState ({
        first_name:'',
        last_name:'',
        course_name:'',
        email:'',
        password:''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };


      const [courses, setCourses] = useState([]);
      
      


  
  
  useEffect(() => {
    fetchCourses();
  }, []);




  const fetchCourses = async () => {
    try {
      const result = await getCourses();
      if (result["status"] === "success") {
        setCourses(result["data"]);
      } else {
        toast.error("Failed to load courses");
      }
    } catch (err) {
      toast.error("Error fetching courses", err);
    }
  };


    const onRegister = async() => {
    if ( !form.first_name || !form.last_name || ! form.email || !form.password) {
        toast.warn('please fill in all required fields')
        return
    }

    const result = await register(
        form.first_name,
        form.last_name,
        form.course_name,
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
                <h2 className="page-header"> Course Coordinator Registration </h2>
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
               <label>Course Name</label>
                 <select
                   name="course_name"
                   value={form.course_name}
                   onChange={handleChange}
                  >
                
                <option value="">-- Select Course --</option>
                 {courses.map((course, index) => (
               <option key={index} value={course.course_name}>
                  {course.course_name}
                </option>
                   ))}
                </select>
                </div>


                    <div className="input-container">
                        <button onClick={onRegister} className="btn btn-success">Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CocoRegister