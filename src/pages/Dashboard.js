import React, { useState, useEffect } from "react";
import api from "../api";
import "./Dashboard.css";
import CourseForm from "./CourseForm";

import {
  FaUser,
  FaSchool,
  FaUsers,
  FaBook,
  FaCalendarAlt,
  FaQuestionCircle,
  FaRegFileAlt,
  FaClipboardList,
  FaThList,
} from "react-icons/fa";

const menu = [
  { label: "Dashboard", icon: <FaThList /> },
  { label: "Courses", icon: <FaBook /> },
  { label: "Groups", icon: <FaSchool /> },
  { label: "Teachers", icon: <FaUser /> },
  { label: "Students", icon: <FaUsers /> },
  { label: "Modules", icon: <FaClipboardList /> },
  { label: "Module Types", icon: <FaClipboardList /> },
  { label: "Feedback Schedules", icon: <FaCalendarAlt /> },
  { label: "Questions", icon: <FaQuestionCircle /> },
  { label: "Feedback Reports", icon: <FaRegFileAlt /> },
];

// Util to format datetime-local to 'YYYY-MM-DD HH:mm:ss'
function formatDateTime(dtLocal) {
  if (!dtLocal) return "";
  return dtLocal.replace("T", " ") + ":00";
}

function FeedbackScheduleForm({ onSubmit, onCancel, courses, modules, moduleTypes, groups }) {
  const [teacherName, setTeacherName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [moduleTypeId, setModuleTypeId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !teacherName.trim() ||
      !courseId ||
      !moduleId ||
      !moduleTypeId ||
      !groupId ||
      !startTime ||
      !endTime
    ) {
      alert("Please fill all fields.");
      return;
    }

    onSubmit({
      teacher_id: Number(teacherName),
      course_id: Number(courseId),
      module_id: Number(moduleId),
      module_type_id: Number(moduleTypeId),
      group_id: Number(groupId),
      start_time: formatDateTime(startTime),
      end_time: formatDateTime(endTime),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form" style={{ marginBottom: 20 }}>
      <label>
        Teacher ID:
        <input
          type="number"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          placeholder="Enter teacher ID"
          required
        />
      </label>

      <label>
        Group:
        <select value={groupId} onChange={(e) => setGroupId(e.target.value)} required>
          <option value="">Select group</option>
          {groups.map((g) => (
            <option key={g.group_id} value={g.group_id}>
              {g.group_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Course:
        <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
          <option value="">Select course</option>
          {courses.map((c) => (
            <option key={c.course_id} value={c.course_id}>
              {c.course_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Module:
        <select value={moduleId} onChange={(e) => setModuleId(e.target.value)} required>
          <option value="">Select module</option>
          {modules.map((m) => (
            <option key={m.module_id} value={m.module_id}>
              {m.module_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Module Type:
        <select value={moduleTypeId} onChange={(e) => setModuleTypeId(e.target.value)} required>
          <option value="">Select module type</option>
          {moduleTypes.map((mt) => (
            <option key={mt.module_type_id} value={mt.module_type_id}>
              {mt.module_type_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Start Time:
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </label>

      <label>
        End Time:
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </label>

      <div style={{ marginTop: 12 }}>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-secondary" style={{ marginLeft: 8 }} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Courses");

  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleTypes, setModuleTypes] = useState([]);

  const [activeFeedbacks, setActiveFeedbacks] = useState([]);
  const [inactiveFeedbacks, setInactiveFeedbacks] = useState([]);

  const [studentCount, setStudentCount] = useState(0);
  const [students, setStudents] = useState([]);

  const [teacherCount, setTeacherCount] = useState(0);
  const [teachers, setTeachers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    switch (activeSection) {
      case "Courses":
        fetchCourses();
        break;
      case "Groups":
        fetchGroups();
        break;
      case "Modules":
        fetchModules();
        break;
      case "Module Types":
        fetchModuleTypes();
        break;
      case "Feedback Schedules":
        fetchFeedbacks();
        break;
      case "Students":
        fetchStudents();
        fetchStudentCount();
        break;
      case "Teachers":
        fetchTeachers();
        fetchTeacherCount();
        break;
      default:
        break;
    }
  }, [activeSection]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get("/course/allCourses");
      setCourses(res.data.data || []);
    } catch {
      setCourses([]);
    }
    setLoading(false);
  };

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await api.get("/courseGroup/allCourseGroup");
      setGroups(res.data.data || []);
    } catch {
      setGroups([]);
    }
    setLoading(false);
  };

  const fetchModules = async () => {
    setLoading(true);
    try {
      const res = await api.get("/module/allModules");
      setModules(res.data.data || []);
    } catch {
      setModules([]);
    }
    setLoading(false);
  };

  const fetchModuleTypes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/moduleType/allModulesType");
      setModuleTypes(res.data.data || []);
    } catch {
      setModuleTypes([]);
    }
    setLoading(false);
  };

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const activeRes = await api.get("/feedbackSchedule/activeFeedback");
      const inactiveRes = await api.get("/feedbackSchedule/deActiveFeedback");
      setActiveFeedbacks(activeRes.data.data || []);
      setInactiveFeedbacks(inactiveRes.data.data || []);
    } catch {
      setActiveFeedbacks([]);
      setInactiveFeedbacks([]);
    }
    setLoading(false);
  };

  const fetchStudentCount = async () => {
    try {
      const res = await api.get("/student/studentCount");
      setStudentCount(res.data.data.count || 0);
    } catch {
      setStudentCount(0);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await api.get("/student/allStudents");
      setStudents(res.data.data || []);
    } catch {
      setStudents([]);
    }
  };

  const fetchTeacherCount = async () => {
    try {
      const res = await api.get("/teacher/teacherCount");
      setTeacherCount(res.data.data.count || 0);
    } catch {
      setTeacherCount(0);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teacher/allTeachers");
      setTeachers(res.data.data || []);
    } catch {
      setTeachers([]);
    }
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const handleDeleteCourse = async (course_id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete("/course/deleteCourse", { data: { course_id } });
      fetchCourses();
      alert("Deleted successfully");
    } catch {
      alert("Failed to delete course");
    }
  };

  const handleCourseFormSubmit = async (formData) => {
    try {
      if (editingCourse) {
        await api.put("/course/updateCourse", { course_id: editingCourse.id, ...formData });
      } else {
        await api.post("/course/insertCourse", formData);
      }
      setShowCourseForm(false);
      setEditingCourse(null);
      fetchCourses();
    } catch {
      alert("Failed to save");
    }
  };

  const handleFeedbackSubmit = async (formData) => {
    try {
      await api.post("/feedbackSchedule/createFeedback", {
        ...formData,
        teacher_id: Number(formData.teacher_id),
        course_id: Number(formData.course_id),
        module_id: Number(formData.module_id),
        module_type_id: Number(formData.module_type_id),
        group_id: Number(formData.group_id),
      });
      alert("Feedback created successfully");
      setShowFeedbackForm(false);
      fetchFeedbacks();
    } catch (error) {
      console.error(error);
      alert("Failed to create feedback");
    }
  };

  return (
    <div className="admin-root">
      <div className="sidebar">
        <div className="sidebar-header">Menu</div>
        {menu.map((item) => (
          <div
            key={item.label}
            className={`sidebar-item ${activeSection === item.label ? "active" : ""}`}
            onClick={() => setActiveSection(item.label)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="admin-content">
        <h1>Admin Dashboard</h1>

        {activeSection === "Courses" && (
          <div className="admin-table-card">
            <div className="admin-table-header">
              <span className="admin-table-title">Course List</span>
              {!showCourseForm && (
                <button className="table-btn add-btn" onClick={handleAddCourse}>
                  Add Course
                </button>
              )}
            </div>

            {showCourseForm && (
              <CourseForm
                initialData={editingCourse}
                onSubmit={handleCourseFormSubmit}
                onCancel={() => {
                  setShowCourseForm(false);
                  setEditingCourse(null);
                }}
              />
            )}

            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Modules</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4}>Loading...</td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course.id || course.course_id}>
                      <td>{course.id || course.course_id}</td>
                      <td>{course.name || course.course_name}</td>
                      <td>{course.modules || "-"}</td>
                      <td>
                        <button className="table-btn edit-btn" onClick={() => handleEditCourse(course)}>
                          Edit
                        </button>
                        <button
                          className="table-btn delete-btn"
                          onClick={() => handleDeleteCourse(course.id || course.course_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "Groups" && (
          <div className="admin-table-card">
            <div className="admin-table-title" style={{ marginBottom: 18 }}>
              Group List
            </div>

            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Group ID</th>
                  <th>Group Name</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={2}>Loading...</td>
                  </tr>
                ) : (
                  groups.map((group) => (
                    <tr key={group.group_id}>
                      <td>{group.group_id}</td>
                      <td>{group.group_name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "Modules" && (
          <div className="admin-table-card">
            <div className="admin-table-title" style={{ marginBottom: 18 }}>
              Module List
            </div>

            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Module ID</th>
                  <th>Module Name</th>
                  <th>Course Name</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3}>Loading...</td>
                  </tr>
                ) : (
                  modules.map((module) => (
                    <tr key={module.module_id}>
                      <td>{module.module_id}</td>
                      <td>{module.module_name}</td>
                      <td>{module.course_name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "Module Types" && (
          <div className="admin-table-card">
            <div className="admin-table-title" style={{ marginBottom: 18 }}>
              Module Types List
            </div>

            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Module Type ID</th>
                  <th>Module Type Name</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={2}>Loading...</td>
                  </tr>
                ) : (
                  moduleTypes.map((mt) => (
                    <tr key={mt.module_type_id}>
                      <td>{mt.module_type_id}</td>
                      <td>{mt.module_type_name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "Feedback Schedules" && (
          <div>
            {!showFeedbackForm && (
              <>
                <button
                  className="table-btn add-btn"
                  onClick={() => setShowFeedbackForm(true)}
                  style={{ marginBottom: 20 }}
                >
                  Create Feedback Schedule
                </button>

                <div style={{ marginBottom: 20 }}>
                  <strong>Active Feedbacks</strong>
                  {loading && <p>Loading...</p>}
                  {!loading && (
                    <ul>
                      {activeFeedbacks.length === 0 ? (
                        <p>No active feedback schedules.</p>
                      ) : (
                        activeFeedbacks.map((fb, i) => (
                          <li key={i}>
                            {fb.teacher_name || `${fb.first_name} ${fb.last_name}`} - {fb.module_name} (
                            {fb.course_name}) [From {new Date(fb.start_time).toLocaleString()} to{" "}
                            {new Date(fb.end_time).toLocaleString()}]
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>

                <div style={{ marginTop: 20 }}>
                  <strong>Inactive Feedbacks</strong>
                  {loading && <p>Loading...</p>}
                  {!loading && (
                    <ul>
                      {inactiveFeedbacks.length === 0 ? (
                        <p>No inactive feedback schedules.</p>
                      ) : (
                        inactiveFeedbacks.map((fb, i) => (
                          <li key={i}>
                            {fb.teacher_name || `${fb.first_name} ${fb.last_name}`} - {fb.module_name} (
                            {fb.course_name}) [From {new Date(fb.start_time).toLocaleString()} to{" "}
                            {new Date(fb.end_time).toLocaleString()}]
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
              </>
            )}

            {showFeedbackForm && (
              <FeedbackScheduleForm
                onSubmit={handleFeedbackSubmit}
                onCancel={() => setShowFeedbackForm(false)}
                courses={courses}
                modules={modules}
                moduleTypes={moduleTypes}
                groups={groups}
              />
            )}
          </div>
        )}

        {activeSection === "Students" && (
          <div className="admin-table-card">
            <div className="admin-table-title" style={{ marginBottom: 18 }}>
              Students - Total: {studentCount}
            </div>

            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>PRN No</th>
                  <th>Group ID</th>
                  <th>Course Name</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={7}>No students found.</td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.student_id}>
                      <td>{student.student_id}</td>
                      <td>{student.first_name}</td>
                      <td>{student.last_name}</td>
                      <td>{student.email}</td>
                      <td>{student.prn_no}</td>
                      <td>{student.group_id}</td>
                      <td>{student.course_name || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "Teachers" && (
          <div className="admin-table-card">
            <div className="admin-table-title" style={{ marginBottom: 18 }}>
              Teachers - Total: {teacherCount}
            </div>

            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Teacher ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                 
                </tr>
              </thead>
              <tbody>
                {teachers.length === 0 ? (
                  <tr>
                    <td colSpan={6}>No teachers found.</td>
                  </tr>
                ) : (
                  teachers.map((teacher) => (
                    <tr key={teacher.teacher_id}>
                      <td>{teacher.teacher_id}</td>
                      <td>{teacher.first_name}</td>
                      <td>{teacher.last_name}</td>
                      <td>{teacher.email || "-"}</td>
                      
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
