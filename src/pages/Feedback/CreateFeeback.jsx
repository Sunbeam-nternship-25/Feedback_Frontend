// import { useState, useEffect } from "react";
// import createFeedback from "../../service/feedbackSchedule";
// import { toast } from "react-toastify";
// import "./FeedbackSchedule.css";

// import { getTeacher } from "../../service/teacher";
// import { getModules } from "../../service/module";
// import { getModuleType } from "../../service/module";
// import {getGroupbycourse_name} from "../../service/group";
// import {getCourses} from "../../service/course";
// import Navbar from "./navbar";


// function CreateFeedback() {
//   const [form, setForm] = useState({
//     teacher_id: "",
//     module_id: "",
//     module_type_id: "",
//     group_id: "",
//     course_id: "",
//     start_time: "",
//     end_time: "",
//     is_active: 1, // ✅ default active
//   });

//   const [modules, setModules] = useState([]);
//   const [teachers, setTeacher] = useState([]);
//   const [module_type, setModuleTypes] = useState([]);
//   const [group, setGroups] = useState([]);
//   const [Course, setCourses] = useState([]);

//  const handleChange = (e) => {
//   const { name, value } = e.target;
//   setForm(prev => ({
//     ...prev,
//     [name]: value,
//     ...(name === "course_id" ? { group_id: "" } : {}) // reset group if course changes
//   }));
// };


//   // ✅ format datetime-local value for MySQL
//   function formatDateTime(datetime) {
//     if (!datetime) return null;
//     return datetime.replace("T", " ") + ":00";
//   }

//   useEffect(() => {
//     fetchModules();
//     fetchTeachers();
//     fetchCourses();
//     fetchModulesType();
//   }, []);

//   useEffect(() => {
//   if (!form.course_id) return; // only fetch if a course is selected

//   const fetchGroups = async () => {
//     try {
//       const result = await getGroupbycourse_name(form.course_id);
//       if (result.status === "success") setGroups(result.data);
//       else toast.error("Failed to load groups");
//     } catch (err) {
//       toast.error("Error fetching groups: " + err.message);
//     }
//   };

//   fetchGroups();
// }, [form.course_id]); // runs every time course_id changes

//   const fetchTeachers = async () => {
//     try {
//       const result = await getTeacher();
//       if (result["status"] === "success") {
//         setTeacher(result["data"]);
//       } else {
//         toast.error("Failed to load teacher");
//       }
//     } catch (err) {
//       toast.error("Error fetching teacher: " + err.message);
//     }
//   };

//   const fetchModules = async () => {
//     try {
//       const result = await getModules();
//       if (result["status"] === "success") {
//         setModules(result["data"]);
//       } else {
//         toast.error("Failed to load module");
//       }
//     } catch (err) {
//       toast.error("Error fetching module: " + err.message);
//     }
//   };

//   const fetchModulesType = async () => {
//     try {
//       const result = await getModuleType();
//       if (result["status"] === "success") {
//         setModuleTypes(result["data"]);
//       } else {
//         toast.error("Failed to load module type");
//       }
//     } catch (err) {
//       toast.error("Error fetching module type: " + err.message);
//     }
//   };

 

//   const fetchCourses = async () => {
//     try {
//       const result = await getCourses();
//       if (result["status"] === "success"){
//         setCourses(result["data"]);
//       } else {
//         toast.error("failed to load Courses");
//       }
//     } catch (err) {
//       toast.error("Error fetching courses:" + err.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ validation
//     if (!form.teacher_id || !form.module_id || !form.start_time || !form.end_time) {
//       toast.warning("Please fill all required fields");
//       return;
//     }
//     if (new Date(form.start_time) >= new Date(form.end_time)) {
//       toast.warning("End time must be after start time");
//       return;
//     }

//     try {
//       const payload = {
//         ...form,
//         start_time: formatDateTime(form.start_time),
//         end_time: formatDateTime(form.end_time),
//       };

//       await createFeedback(payload);
//       toast.success("Feedback schedule created successfully!");

//       setForm({
//         teacher_id: "",
//         module_id: "",
//         module_type_id: "",
//         group_id: "",
//         course_id: "",
//         start_time: "",
//         end_time: "",
//         is_active: 1,
//       });
//     } catch {
//       toast.error("Failed to create feedback");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <form className="input-container" onSubmit={handleSubmit}>
//         <h2 className="text-lg font-bold">Create Feedback Schedule</h2>

//         {/* Teacher */}
//         <div>
//           <label> Teacher Name </label>
//           <select
//             name="teacher_id"
//             value={form.teacher_id}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Teacher --</option>
//             {teachers.map((teacher) => (
//               <option key={teacher.teacher_id} value={teacher.teacher_id}>
//                 {teacher.teacher_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Module */}
//         <div>
//           <label> Module </label>
//           <select
//             name="module_id"
//             value={form.module_id}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Module --</option>
//             {modules.map((module) => (
//               <option key={module.module_id} value={module.module_id}>
//                 {module.module_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Module Type */}
//         <div>
//           <label> Module Type </label>
//           <select
//             name="module_type_id"
//             value={form.module_type_id}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Module Type --</option>
//             {module_type.map((mt) => (
//               <option key={mt.module_type_id} value={mt.module_type_id}>
//                 {mt.module_type_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Group ID */}
//         <div>
//           <label> Group  </label>
//           <select
//             name="group_id"
//             value={form.group_id}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Group --</option>
//             {group.map((g) => (
//               <option key={g.group_id} value={g.group_id}>
//                 {g.group_name}
//               </option>
//             ))}
          
//           </select>
//         </div>

//         {/* Course ID */}
//         <div>
//           <label> Course </label>
//           <select
//             name="course_id"
//             value={form.course_id}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Course --</option>
//              {Course.map((c) => (
//               <option key={c.course_id} value={c.course_id}>
//                 {c.course_name}
//               </option>
//              ))}

            
//           </select>
//         </div>

//         {/* Start Time */}
//         <label> Start Time </label>
//         <input
//           type="datetime-local"
//           name="start_time"
//           value={form.start_time}
//           onChange={handleChange}
//         />

//         {/* End Time */}
//         <label> End Time </label>
//         <input
//           type="datetime-local"
//           name="end_time"
//           value={form.end_time}
//           onChange={handleChange}
//         />

//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateFeedback;
import { useState, useEffect } from "react";
import createFeedback from "../../service/feedbackSchedule";
import { toast } from "react-toastify";
import "./FeedbackSchedule.css";

import { getTeacher } from "../../service/teacher";
import { getModules } from "../../service/module";
import { getModuleType } from "../../service/module";
import { getGroupbycourse_name } from "../../service/group";
import { getCourses } from "../../service/course";
import Navbar from "./navbar";

function CreateFeedback() {
  const [form, setForm] = useState({
    teacher_id: "",
    module_id: "",
    module_type_id: "",
    group_id: "",
    course_id: "",
    start_time: "",
    end_time: "",
    is_active: 1,
  });

  const [modules, setModules] = useState([]);
  const [teachers, setTeacher] = useState([]);
  const [module_type, setModuleTypes] = useState([]);
  const [group, setGroups] = useState([]);
  const [Course, setCourses] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle course selection and fetch groups dynamically
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setForm({ ...form, course_id: courseId, group_id: "" }); // reset group
    if (courseId) {
      getGroupbycourse_name(courseId)
        .then((result) => {
          if (result.status === "success") {
            setGroups(result.data);
          } else {
            setGroups([]);
            toast.error("Failed to load groups");
          }
        })
        .catch((err) => {
          setGroups([]);
          toast.error("Error fetching groups: " + err.message);
        });
    } else {
      setGroups([]);
    }
  };

  // Format datetime-local for MySQL
  function formatDateTime(datetime) {
    if (!datetime) return null;
    return datetime.replace("T", " ") + ":00";
  }

  // Fetch all initial data except groups
  useEffect(() => {
    fetchModules();
    fetchTeachers();
    fetchCourses();
    fetchModulesType();
  }, []);

  const fetchTeachers = async () => {
    try {
      const result = await getTeacher();
      if (result.status === "success") setTeacher(result.data);
      else toast.error("Failed to load teacher");
    } catch (err) {
      toast.error("Error fetching teacher: " + err.message);
    }
  };

  const fetchModules = async () => {
    try {
      const result = await getModules();
      if (result.status === "success") setModules(result.data);
      else toast.error("Failed to load module");
    } catch (err) {
      toast.error("Error fetching module: " + err.message);
    }
  };

  const fetchModulesType = async () => {
    try {
      const result = await getModuleType();
      if (result.status === "success") setModuleTypes(result.data);
      else toast.error("Failed to load module type");
    } catch (err) {
      toast.error("Error fetching module type: " + err.message);
    }
  };

  const fetchCourses = async () => {
    try {
      const result = await getCourses();
      if (result.status === "success") setCourses(result.data);
      else toast.error("Failed to load courses");
    } catch (err) {
      toast.error("Error fetching courses: " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.teacher_id || !form.module_id || !form.start_time || !form.end_time) {
      toast.warning("Please fill all required fields");
      return;
    }
    if (new Date(form.start_time) >= new Date(form.end_time)) {
      toast.warning("End time must be after start time");
      return;
    }

    try {
      const payload = {
        ...form,
        start_time: formatDateTime(form.start_time),
        end_time: formatDateTime(form.end_time),
      };

      await createFeedback(payload);
      toast.success("Feedback schedule created successfully!");

      setForm({
        teacher_id: "",
        module_id: "",
        module_type_id: "",
        group_id: "",
        course_id: "",
        start_time: "",
        end_time: "",
        is_active: 1,
      });
      setGroups([]);
    } catch {
      toast.error("Failed to create feedback");
    }
  };

  return (
    <div>
      <Navbar />
      <form className="input-container" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold">Create Feedback Schedule</h2>

        {/* Teacher */}
        <div>
          <label> Teacher Name </label>
          <select name="teacher_id" value={form.teacher_id} onChange={handleChange}>
            <option value="">-- Select Teacher --</option>
            {teachers.map((teacher) => (
              <option key={teacher.teacher_id} value={teacher.teacher_id}>
                {teacher.teacher_name}
              </option>
            ))}
          </select>
        </div>

        {/* Module */}
        <div>
          <label> Module </label>
          <select name="module_id" value={form.module_id} onChange={handleChange}>
            <option value="">-- Select Module --</option>
            {modules.map((module) => (
              <option key={module.module_id} value={module.module_id}>
                {module.module_name}
              </option>
            ))}
          </select>
        </div>

        {/* Module Type */}
        <div>
          <label> Module Type </label>
          <select name="module_type_id" value={form.module_type_id} onChange={handleChange}>
            <option value="">-- Select Module Type --</option>
            {module_type.map((mt) => (
              <option key={mt.module_type_id} value={mt.module_type_id}>
                {mt.module_type_name}
              </option>
            ))}
          </select>
        </div>

        {/* Course */}
        <div>
          <label> Course </label>
          <select name="course_id" value={form.course_id} onChange={handleCourseChange}>
            <option value="">-- Select Course --</option>
            {Course.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* Group */}
        <div>
          <label> Group </label>
          <select name="group_id" value={form.group_id} onChange={handleChange}>
            <option value="">-- Select Group --</option>
            {group.map((g) => (
              <option key={g.group_id} value={g.group_id}>
                {g.group_name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Time */}
        <label> Start Time </label>
        <input type="datetime-local" name="start_time" value={form.start_time} onChange={handleChange} />

        {/* End Time */}
        <label> End Time </label>
        <input type="datetime-local" name="end_time" value={form.end_time} onChange={handleChange} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}

export default CreateFeedback;

