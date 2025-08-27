import React, { useState, useEffect } from "react";
import api from "../api";
import CourseForm from "./CourseForm";
import "./Dashboard.css";

// Helper function to parse MySQL datetime to JS Date safely
function parseMySqlDateTime(dt) {
  if (!dt) return "";
  return new Date(dt.replace(" ", "T"));
}

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [courseGroups, setCourseGroups] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleTypes, setModuleTypes] = useState([]);
  const [activeFeedbacks, setActiveFeedbacks] = useState([]);
  const [inactiveFeedbacks, setInactiveFeedbacks] = useState([]);
  const [error, setError] = useState("");

  // Dropdown selections
  const [selectedCourseGroup, setSelectedCourseGroup] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedModuleType, setSelectedModuleType] = useState("");

  // Course CRUD states
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

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const res = await api.get("/course/allCourses");
      setCourses(res.data.data || []);
      setError("");
    } catch {
      setError("Failed to fetch courses");
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchCourseGroups = async () => {
    try {
      const res = await api.get("/courseGroup/allCourseGroup");
      setCourseGroups(res.data.data || []);
    } catch {
      setError("Failed to fetch course groups");
    }
  };

  const fetchModules = async () => {
    try {
      const res = await api.get("/module/allModules");
      setModules(res.data.data || []);
    } catch {
      setError("Failed to fetch modules");
    }
  };

  const fetchModuleTypes = async () => {
    try {
      const res = await api.get("/moduleType/allModulesType");
      setModuleTypes(res.data.data || []);
    } catch {
      setError("Failed to fetch module types");
    }
  };

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

  // Course CRUD handlers unchanged
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
    } catch {
      alert("Failed to delete course");
    }
  };

  const handleCourseFormSubmit = async (formData) => {
    try {
      if (editingCourse) {
        await api.put("/course/updateCourse", { course_id: editingCourse.course_id, ...formData });
      } else {
        await api.post("/course/insertCourse", formData);
      }
      setShowCourseForm(false);
      setEditingCourse(null);
      fetchCourses();
    } catch {
      alert("Failed to save course");
    }
  };

  const handleCourseFormCancel = () => {
    setShowCourseForm(false);
    setEditingCourse(null);
  };

  // Find selected objects for dropdowns
  const selectedGroupObj = courseGroups.find(g => g.group_id === Number(selectedCourseGroup));
  const selectedModuleObj = modules.find(m => m.module_id === Number(selectedModule));
  const selectedModuleTypeObj = moduleTypes.find(t => t.module_type_id === Number(selectedModuleType));

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

      {/* Course Groups Dropdown */}
      <section className="dashboard-section">
        <h2>Course Groups</h2>
        <select value={selectedCourseGroup} onChange={e => setSelectedCourseGroup(e.target.value)}>
          <option value="">Select Course Group</option>
          {courseGroups.map(group => (
            <option key={group.group_id} value={group.group_id}>
              {group.group_name}
            </option>
          ))}
        </select>
        {selectedGroupObj && (
          <div className="detail-card">
            <p><b>Group Name:</b> {selectedGroupObj.group_name}</p>
          </div>
        )}
      </section>

      {/* Modules Dropdown */}
      <section className="dashboard-section">
        <h2>Modules</h2>
        <select value={selectedModule} onChange={e => setSelectedModule(e.target.value)}>
          <option value="">Select Module</option>
          {modules.map(module => (
            <option key={module.module_id} value={module.module_id}>
              {module.module_name}
            </option>
          ))}
        </select>
        {selectedModuleObj && (
          <div className="detail-card">
            <p><b>Module Name:</b> {selectedModuleObj.module_name}</p>
            <p><b>Course:</b> {selectedModuleObj.course_name}</p>
          </div>
        )}
      </section>

      {/* Module Types Dropdown */}
      <section className="dashboard-section">
        <h2>Module Types</h2>
        <select value={selectedModuleType} onChange={e => setSelectedModuleType(e.target.value)}>
          <option value="">Select Module Type</option>
          {moduleTypes.map(type => (
            <option key={type.module_type_id} value={type.module_type_id}>
              {type.module_type_name}
            </option>
          ))}
        </select>
        {selectedModuleTypeObj && (
          <div className="detail-card">
            <p><b>Module Type Name:</b> {selectedModuleTypeObj.module_type_name}</p>
          </div>
        )}
      </section>

      {/* Feedback Schedules Active */}
      <section className="dashboard-section">
        <h2>Feedback Schedules - Active</h2>
        {activeFeedbacks.length === 0 ? (
          <p>No active feedback schedules.</p>
        ) : (
          <div className="feedback-cards">
            {activeFeedbacks.map((fb, idx) => (
              <div key={idx} className="feedback-detail-card">
                <p><b>Teacher:</b> {fb.first_name} {fb.last_name}</p>
                <p><b>Module:</b> {fb.module_name}</p>
                <p><b>Module Type:</b> {fb.module_type_name}</p>
                <p><b>Group:</b> {fb.group_name}</p>
                <p><b>Course:</b> {fb.course_name}</p>
                <p><b>Start Time:</b> {parseMySqlDateTime(fb.start_time).toLocaleString()}</p>
                <p><b>End Time:</b> {parseMySqlDateTime(fb.end_time).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Feedback Schedules Inactive */}
     <section className="dashboard-section">
  <h2>Feedback Schedules - Inactive</h2>
  {inactiveFeedbacks.length === 0 ? (
    <p>No inactive feedback schedules.</p>
  ) : (
    <div className="feedback-cards"> {/* Make sure this div has this class */}
      {inactiveFeedbacks.map((fb, idx) => (
        <div key={idx} className="feedback-detail-card">
          <p><b>Teacher:</b> {fb.first_name} {fb.last_name}</p>
          <p><b>Module:</b> {fb.module_name}</p>
          <p><b>Module Type:</b> {fb.module_type_name}</p>
          <p><b>Group:</b> {fb.group_name}</p>
          <p><b>Course:</b> {fb.course_name}</p>
          <p><b>Start Time:</b> {parseMySqlDateTime(fb.start_time).toLocaleString()}</p>
          <p><b>End Time:</b> {parseMySqlDateTime(fb.end_time).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )}
</section>

    </div>
  );
}

export default Dashboard;
