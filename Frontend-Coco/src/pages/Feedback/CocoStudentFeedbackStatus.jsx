// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./CocoStudentFeedback.css";
// import Navbar from "../Feedback/navbar";

// function CocoStudentFeedback() {
//   const { id: scheduleId } = useParams(); // get scheduleId from URL
//   const navigate = useNavigate();
//   const [feedbackData, setFeedbackData] = useState([]);
//   const [counts, setCounts] = useState({ submitted: 0, notSubmitted: 0 });
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     axios
//       .get("http://localhost:4003/feedbackSchedule/studentsFeedbackStatus", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         console.log("API Response:", res.data);
//         setFeedbackData(res.data.data.students); // flat array
//         setCounts(res.data.data.counts); // summary counts
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching feedback:", err);
//         setLoading(false);
//       });
//   }, [scheduleId]);

//   if (loading) return <p className="loading-text">Loading feedback...</p>;

//   // Apply filter
//   const filteredData =
//     filter === "All"
//       ? feedbackData
//       : feedbackData.filter((s) => s.status === filter);

//   return (
//     <div>
//       <Navbar />
//       <div className="feedback-container">
//         <h2 className="feedback-title">Student Feedback Status</h2>
//          <button onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>

//         {/* Summary counts */}
//         <div className="summary-box">
//           <p className="summary-submitted">
//             <strong>Submitted:</strong> {counts.submitted}
//           </p>
//           <p className="summary-not-submitted">
//             <strong>Not Submitted:</strong> {counts.notSubmitted}
//           </p>
//           <p className="summary-total">
//             <strong>Total:</strong> {counts.submitted + counts.notSubmitted}
//           </p>
//         </div>

//         {/* Filter dropdown */}
//         <div className="filter-box">
//           <label htmlFor="filter">Filter by status: </label>
//           <select
//             id="filter"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="All">All</option>
//             <option value="Submitted">Submitted</option>
//             <option value="Not Submitted">Not Submitted</option>
//           </select>
//         </div>

//         {/* Feedback table */}
//         <div className="feedback-box">
//           {filteredData.length > 0 ? (
//             <table className="feedback-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((student, index) => (
//                   <tr key={index}>
//                     <td>{student.student_id}</td>
//                     <td>
//                       {student.first_name} {student.last_name}
//                     </td>
//                     <td>{student.email}</td>
//                     <td
//                       className={
//                         student.status === "Submitted"
//                           ? "submitted"
//                           : "not-submitted"
//                       }
//                     >
//                       {student.status}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="no-data">No students found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CocoStudentFeedback;


// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./CocoStudentFeedback.css"; // import CSS file
// // import Navbar from "../Feedback/navbar";

// // function CocoStudentFeedback() {
// //   const [feedbackData, setFeedbackData] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");

// //     axios
// //       .get("http://localhost:4003/studentsFeedbackStatus", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => {
// //         setFeedbackData(res.data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching feedback:", err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) return <p className="loading-text">Loading feedback...</p>;

// //   return (
// //     <div>
// //     <Navbar/>
// //     <div className="feedback-container">
// //       <h2 className="feedback-title">Student Feedback Status</h2>

// //       <div className="feedback-box">
// //         {feedbackData.length > 0 ? (
// //           <table className="feedback-table">
// //             <thead>
// //               <tr>
// //                 <th>ID</th>
// //                 <th>Name</th>
// //                 <th>Email</th>
// //                 <th>Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {feedbackData.map((student, index) => (
// //                 <tr key={index}>
// //                   <td>{student.student_id}</td>
// //                   <td>{student.first_name} {student.last_name}</td>
// //                   <td>{student.email}</td>
// //                   <td className={student.status === "Submitted" ? "submitted" : "not-submitted"}>
// //                     {student.status || "Not Submitted"}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           <p className="no-data">No feedback data available</p>
// //         )}
// //       </div>
// //     </div>
// //     </div>
// //   );
// // }

// // export default CocoStudentFeedback;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Feedback/navbar";
import "./CocoStudentFeedback.css";

function CocoStudentFeedback() {
  const { id: scheduleId } = useParams(); // get scheduleId from URL
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState([]);
  const [counts, setCounts] = useState({ submitted: 0, notSubmitted: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:4003/feedbackSchedule/${scheduleId}/students`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { submitted, notSubmitted } = res.data.data;
        const allStudents = [
          ...submitted.map((s) => ({ ...s, status: "Submitted" })),
          ...notSubmitted.map((s) => ({ ...s, status: "Not Submitted" })),
        ];
        setFeedbackData(allStudents);
        setCounts({ submitted: submitted.length, notSubmitted: notSubmitted.length });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
        setLoading(false);
      });
  }, [scheduleId]);

  if (loading) return <p>Loading students...</p>;

  const filteredData =
    filter === "All"
      ? feedbackData
      : feedbackData.filter((s) => s.status === filter);

  return (
    <div>
      <Navbar />
      <div className="feedback-container">
        <h2>Student Feedback Status</h2>
        <button onClick={() => navigate("/CocoDashboard")}>← Back to Dashboard</button>

        {/* Summary */}
        <div className="summary-box">
          <p><strong>Submitted:</strong> {counts.submitted}</p>
          <p><strong>Not Submitted:</strong> {counts.notSubmitted}</p>
          <p><strong>Total:</strong> {counts.submitted + counts.notSubmitted}</p>
        </div>

        {/* Filter */}
        <div className="filter-box">
          <label>Filter by status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Submitted">Submitted</option>
            <option value="Not Submitted">Not Submitted</option>
          </select>
        </div>

        {/* Student Table */}
        <table className="feedback-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((s) => (
                <tr key={s.student_id}>
                  <td>{s.student_id}</td>
                  <td>{s.first_name} {s.last_name}</td>
                  <td>{s.email}</td>
                  <td className={s.status === "Submitted" ? "submitted" : "not-submitted"}>
                    {s.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CocoStudentFeedback;
