import { useState, useEffect } from "react";
import createFeedback from "../../service/feedbackSchedule";
import { toast } from "react-toastify";
import "./FeedbackSchedule.css";

import { getTeacher } from "../../service/teacher";
import { getModules } from "../../service/module";
import { getModuleType } from "../../service/module";






function CreateFeeback() {
  const [form, setForm] = useState({
    teacher_id: "",
    module_id: "",
    module_type_id: "",
    group_id: "",
    course_id: "",
    start_time: "",
    end_time: "",
  });
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


        
        const [modules, setModules] = useState([]);
        const [teachers, setTeacher] = useState([]);
        const [module_type,setModuleTypes] = useState([]);
        
  
  
    
    
    useEffect(() => {
      
      fetchModules();
      fetchTeachers();
      fetchModulesType();
    }, []);
  
  
     const fetchTeachers = async () => {
      try {
        const result = await getTeacher();
        if (result["status"] === "success") {
          setTeacher(result["data"]);
        } else {
          toast.error("Failed to load teacher");
        }
      } catch (err) {
        toast.error("Error fetching teacher", err);
      }
    };
  

        const fetchModules = async () => {
      try {
        const result = await getModules();
        if (result["status"] === "success") {
          setModules(result["data"]);
        } else {
          toast.error("Failed to load module");
        }
      } catch (err) {
        toast.error("Error fetching module", err);
      }
    };

        const fetchModulesType = async () => {
      try {
        const result = await getModuleType();
        if (result["status"] === "success") {
          setModuleTypes(result["data"]);
        } else {
          toast.error("Failed to load module");
        }
      } catch (err) {
        toast.error("Error fetching module", err);
      }
    };
    
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFeedback(form);   
      toast.success("Feedback schedule created successfully!");
      setForm({
        teacher_id: "",
        module_id: "",
        module_type_id: "",
        group_id: "",
        course_id: "",
        start_time: "",
        end_time: "",
      });
    } catch {
      toast.error("Failed to create feedback");
    }
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold">Create Feedback Schedule</h2>
                  
               <div>
                <label> Teacher Name</label>
                <select 
                name="teacher_id"
                value={form.teacher_id}
                onChange={handleChange}
                >

                <option value="">-- Select Teacher --</option>
                {teachers.map((teacher,index) => (
                   <option key={index} value={teacher.teacher_id}>
                  {teacher.teacher_name}
                </option>

                ))}
                </select>
               </div>



                <div>
                <label> Module </label>
                <select
                name="module_id"
                value={form.module_id}
                onChange={handleChange}
                >

                <option value = "">-- Select Module --</option>
                {modules.map((module, index) => (
                  <option key={index} value={module.module_id}>
                
                    {module.module_name}
                  </option>
                ))}
              </select>
               </div>

               
               <div>
                <label> Module Type </label>
                <select
                name="module_type_id"
                value={form.module_type_id}
                onChange={handleChange}
                >

                <option value = "">-- Select Module Type--</option>
                {module_type.map((module_types, index) => (
                  <option key={index} value={module_types.module_type_id}>
                
                    {module_types.module_type_name}
                  </option>
                ))}
                </select>
               </div>

               <label> Start time </label>
               <input 
               className="input-container" 
               type="datetime-local" 
               name="start_time" 
               value={form.start_time} 
               onChange={handleChange}/>
               
               <label> End Time </label>
               <input
                className="input-container" 
                type="datetime-local" 
                name="end_time" 
                value={form.end_time} 
                onChange={handleChange}/>

              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Create
              </button>
    </form>
  );
}


export default CreateFeeback

