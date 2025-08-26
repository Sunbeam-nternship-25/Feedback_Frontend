import React, { useState, useEffect } from "react";
import api from "../api";
import CourseForm from "./CourseForm";
import "./Dashboard.css";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [courseGroups, setCourseGroups] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleTypes, setModuleTypes] = useState([]);
  const [activeFeedbacks, setActiveFeedbacks] = useState([]);
  const [inactiveFeedbacks, setInactiveFeedbacks] = useState([]);
  const [error, setError] = useState("");

  // Course CRUD state
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchCourseGroups();
    fetchModules();
    fetchModuleTypes();
    fetchFeedbacks();
  }, []);

  // Fetch courses
  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const res = await api.get("/course/allCourses");
      setCourses(res.data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch courses");
    } finally {
      setLoadingCourses(false);
    }
  };

  // Fetch course groups
  const fetchCourseGroups = async () => {
    try {
      const res = await api.get("/courseGroup/allCourseGroup");
      setCourseGroups(res.data.data || []);
    } catch {
      setError("Failed to fetch course groups");
    }
  };

  // Fetch modules
  const fetchModules = async () => {
    try {
      const res = await api.get("/module/allModules");
      setModules(res.data.data || []);
    } catch {
      setError("Failed to fetch modules");
    }
  };

  // Fetch module types
  const fetchModuleTypes = async () => {
    try {
      const res = await api.get("/moduleType/allModulesType");
      setModuleTypes(res.data.data || []);
    } catch {
      setError("Failed to fetch module types");
    }
  };

  // Fetch feedback schedules
  const fetchFeedbacks = async () => {
    try {
      const activeRes = await api.get("/feedbackSchedule/activeFeedback");
      setActiveFeedbacks(activeRes.data.data || []);
      const inactiveRes = await api.get("/feedbackSchedule/deActiveFeedback");
      setInactiveFeedbacks(inactiveRes.data.data || []);
    } catch {
      setError("Failed to fetch feedback schedules");
    }
  };

  // Handle Add Course button
  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  // Handle Edit Course button sets editingCourse state and shows form
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  // Handle Delete Course button confirms and deletes then refreshes
  const handleDeleteCourse = async (course_id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete("/course/deleteCourse", { data: { course_id } });
      fetchCourses();
    } catch {
      alert("Failed to delete course");
    }
  };

  // Handle submission of course form for add or edit
  const handleCourseFormSubmit = async (formData) => {
    try {
      if (editingCourse) {
        await api.put("/course/updateCourse", { course_id: editingCourse.course_id, ...formData });
      } else {
        await api.post("/course/insertCourse", formData);
      }
      setShowCourseForm(false);
      setEditingCourse(null); // Clear editingCourse after submit
      fetchCourses();
    } catch {
      alert("Failed to save course");
    }
  };

  // Cancel form hides it and clears editingCourse state
  const handleCourseFormCancel = () => {
    setShowCourseForm(false);
    setEditingCourse(null);
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      {error && <div className="error">{error}</div>}

      {/* Courses Section */}
      <section className="dashboard-section">
        <h2>Courses</h2>
        {loadingCourses ? (
          <p>Loading courses...</p>
        ) : (
          <>
            {!showCourseForm && (
              <button onClick={handleAddCourse} className="btn btn-primary mb-2">
                Add New Course
              </button>
            )}

            {showCourseForm && (
              <CourseForm
                initialData={editingCourse}
                onSubmit={handleCourseFormSubmit}
                onCancel={handleCourseFormCancel}
              />
            )}

            <ul className="list">
              {courses.map((course) => (
                <li key={course.course_id} className="list-item">
                  {course.course_name}
                  <div>
                    <button onClick={() => handleEditCourse(course)} className="btn btn-sm btn-secondary mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCourse(course.course_id)} className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {/* Course Groups */}
      <section className="dashboard-section">
        <h2>Course Groups</h2>
        {courseGroups.length === 0 ? (
          <p>No course groups found.</p>
        ) : (
          <ul>
            {courseGroups.map((group, index) => (
              <li key={group.group_id || index}>{group.group_name}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Modules */}
      <section className="dashboard-section">
        <h2>Modules</h2>
        {modules.length === 0 ? (
          <p>No modules found.</p>
        ) : (
          <ul>
            {modules.map((module) => (
              <li key={module.module_id || module.id || module.moduleId}>
                {module.module_name} (Course: {module.course_name})
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Module Types */}
      <section className="dashboard-section">
        <h2>Module Types</h2>
        {moduleTypes.length === 0 ? (
          <p>No module types found.</p>
        ) : (
          <ul>
            {moduleTypes.map((type, index) => (
              <li key={type.module_type_id || index}>{type.module_type_name}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Feedback Schedules Active */}
      <section className="dashboard-section">
        <h2>Feedback Schedules - Active</h2>
        {activeFeedbacks.length === 0 ? (
          <p>No active feedback schedules.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Module</th>
                <th>Module Type</th>
                <th>Group</th>
                <th>Course</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {activeFeedbacks.map((fb, idx) => (
                <tr key={idx}>
                  <td>{fb.first_name} {fb.last_name}</td>
                  <td>{fb.module_name}</td>
                  <td>{fb.module_type_name}</td>
                  <td>{fb.group_name}</td>
                  <td>{fb.course_name}</td>
                  <td>{new Date(fb.start_time).toLocaleString()}</td>
                  <td>{new Date(fb.end_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Feedback Schedules Inactive */}
      <section className="dashboard-section">
        <h2>Feedback Schedules - Inactive</h2>
        {inactiveFeedbacks.length === 0 ? (
          <p>No inactive feedback schedules.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Module</th>
                <th>Module Type</th>
                <th>Group</th>
                <th>Course</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {inactiveFeedbacks.map((fb, idx) => (
                <tr key={idx}>
                  <td>{fb.first_name} {fb.last_name}</td>
                  <td>{fb.module_name}</td>
                  <td>{fb.module_type_name}</td>
                  <td>{fb.group_name}</td>
                  <td>{fb.course_name}</td>
                  <td>{new Date(fb.start_time).toLocaleString()}</td>
                  <td>{new Date(fb.end_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default Dashboard;