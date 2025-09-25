import React, { useEffect, useState } from "react";
import StudentNavbar from "../studentNavbar/navbar";

import "./dashbord.css";
import { countSubmitted, feedbackInfo, remainingCountURL  } from "../../service/teacher";


function TeacherDashboard() {
  const [info, setInfo] = useState({});
  const[count,setCount] = useState("")
  const[remainingCount,setremaininfCount] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const result = await feedbackInfo()
      if (result.status === "success" && result.data.length > 0) {
        setInfo(result.data[0]); 
      }
    };
    fetchData();
  }, []);
   

  useEffect(() => {
    const fetchCount = async () => {
      const result = await countSubmitted()  
      if (result.status === "success") {
        setCount(result.data[0].count); 
      }
    };
    fetchCount();
  }, []);


    useEffect(() => {
    const remainingCountofStudent = async () => {
      const result = await remainingCountURL()
      if (result.status === "success") {
        console.log(result.data)
        setremaininfCount(result.data); 
      }
    };
    remainingCountofStudent();
  }, []);

  

  

  return (
    <>
      <StudentNavbar />
      <div className="container">
        <div className="header">
          <h2 className="page-header">Feedback Report</h2>
          <button className="btn-success">Export</button>
        </div>

        <div className="report-card">
          <div className="report-grid">
            <div>
              <p className="label">Module Type</p>
              <p>{info.module_type_name}</p>
            </div>
            <div>
              <p className="label">Course</p>
              <p>{info.course_name}</p>
            </div>
            <div>
              <p className="label">Date</p>
              <p>
                {new Date(info.start_time).toLocaleDateString()} to{" "}
                {new Date(info.end_time).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="label">Module</p>
              <p>{info.module_name}</p>
            </div>
            <div>
              <p className="label">#Feedback Submitted</p>
              <p>{count}</p>
            </div>
            <div>
              <p className="label">#Feedback Remaining</p>
              <p>{remainingCount}</p>
            </div>
          </div>
        </div>

        <div className="report-card">
          <div className="card-content">
            <div className="header">
              <h2 className="subtitle">Faculty feedback summary</h2>
              <p className="label">
                Rating: <span className="highlight">3.44</span>
              </p>
            </div>
            <p className="label">Name: {info.first_name} {info.last_name}</p>

            <div className="table-container">
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Excellent</th>
                    <th>Good</th>
                    <th>Satisfactory</th>
                    <th>Unsatisfactory</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Faculty initiative ...</td>
                    <td>7</td>
                    <td>3</td>
                    <td>0</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Faculty preparation for lectures ...</td>
                    <td>8</td>
                    <td>2</td>
                    <td>0</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Communication and presentation skills ...</td>
                    <td>7</td>
                    <td>3</td>
                    <td>0</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Ability to clear doubts and provide guidance ...</td>
                    <td>6</td>
                    <td>4</td>
                    <td>0</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Coverage of syllabus and pace of teaching ...</td>
                    <td>6</td>
                    <td>3</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
