import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  FaHome,
  FaBook,
  FaUsers,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaThLarge,
  FaClipboardList,
  FaQuestion,
  FaChartBar,
} from "react-icons/fa";

const Dashboard = () => {
  const [courseCount, setCourseCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [scheduleCount, setScheduleCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch Courses
    axios
      .get("http://localhost:4000/course/allCourses")
      .then((res) => {
        setCourses(res.data);
        setCourseCount(res.data.length);
      })
      .catch((err) => console.error("Error fetching courses:", err));

    // Fetch Students
    axios
      .get("http://localhost:4000/student/allStudents")
      .then((res) => setStudentCount(res.data.length))
      .catch((err) => console.error("Error fetching students:", err));

    // Fetch Feedback Schedules
    axios
      .get("http://localhost:4000/schedule/allSchedules")
      .then((res) => setScheduleCount(res.data.length))
      .catch((err) => console.error("Error fetching schedules:", err));

    // Fetch Feedback Reports
    axios
      .get("http://localhost:4000/report/allReports")
      .then((res) => setReportCount(res.data.length))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Admin</h2>
        <ul className="menu">
          <li><FaHome /> Dashboard</li>
          <li><FaBook /> Courses</li>
          <li><FaUsers /> Groups</li>
          <li><FaChalkboardTeacher /> Teachers</li>
          <li><FaUserGraduate /> Students</li>
          <li><FaThLarge /> Modules</li>
          <li><FaClipboardList /> Module Types</li>
          <li><FaClipboardList /> Feedback Schedules</li>
          <li><FaQuestion /> Questions</li>
          <li><FaChartBar /> Feedback Reports</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Admin Dashboard</h1>

        Top Stats
        <div className="stats">
          <div className="stat-box">
            <h2>{courseCount}</h2>
            <p>Courses</p>
          </div>
          <div className="stat-box">
            <h2>{studentCount}</h2>
            <p>Students</p>
          </div>
          <div className="stat-box">
            <h2>{scheduleCount}</h2>
            <p>Feedback Schedules</p>
          </div>
          {/* <div className="stat-box">
            <h2>{reportCount}</h2>
            <p>Feedback Reports</p>
          </div> */}
        </div> 

        {/* Course List Table */}
        <section className="course-list">
          <h2>Course List</h2>
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Modules</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.course_id}>
                  <td>{course.course_id}</td>
                  <td>{course.course_name}</td>
                  <td>{course.modules || "N/A"}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
