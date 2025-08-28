import React, { useEffect, useState } from "react";
import StudentNavbar from "../studentNavbar/navbar";


const StudentDashboard = () => {
 

 
  

  return (
    <>
      <StudentNavbar />
      <div className="container">
        <div className="user-profile">
          <h2>User Profile</h2>
          {student ? (
            <>
              <p>
                <strong>Name:</strong> {student.first_name} {student.last_name}
              </p>
              <p>
                <strong>PRN:</strong> {student.prn_no}
              </p>
              <p>
                <strong>Email:</strong> {student.email}
              </p>
            </>
          ) : (
            <p>Loading student info...</p>
          )}
        </div>

        <h2>Feedback</h2>

        {hasSubmitted ? (
          <div className="submitted-message">
            <p>✅ You have already submitted the feedback.</p>
          </div>
        ) : noSchedule ? (
          <div className="no-schedule">
            <p>🚫 No active feedback schedule is available right now.</p>
          </div>
        ) : feedbackInfo ? (
          <>
            <p className="subtitle">
              Please complete the feedback by answering required questions
            </p>

            <div className="feedback-info">
              <div>
                <strong>Type</strong>
                <br />
                {feedbackInfo.module_type_name}
              </div>
              <div>
                <strong>Module</strong>
                <br />
                {feedbackInfo.module_name}
              </div>
              <div>
                <strong>Faculty</strong>
                <br />
                {feedbackInfo.first_name} {feedbackInfo.last_name}
              </div>
              <div>
                <strong>Course</strong>
                <br />
                {feedbackInfo.course_name} ({feedbackInfo.group_name})
              </div>
            </div>

            <h2>Questions</h2>

            <div className="question">
              <label>Faculty initiative ...</label>
              <div className="options">
                <label>
                  <input
                    type="radio"
                    name="q1"
                    value="1"
                    onChange={handleChange}
                  />{" "}
                  Excellent
                </label>
                <label>
                  <input
                    type="radio"
                    name="q1"
                    value="2"
                    onChange={handleChange}
                  />{" "}
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    name="q1"
                    value="3"
                    onChange={handleChange}
                  />{" "}
                  Satisfactory
                </label>
                <label>
                  <input
                    type="radio"
                    name="q1"
                    value="4"
                    onChange={handleChange}
                  />{" "}
                  Unsatisfactory
                </label>
              </div>
            </div>

            <div className="question">
              <label>Faculty preparation for lectures ...</label>
              <div className="options">
                <label>
                  <input
                    type="radio"
                    name="q2"
                    value="1"
                    onChange={handleChange}
                  />{" "}
                  Excellent
                </label>
                <label>
                  <input
                    type="radio"
                    name="q2"
                    value="2"
                    onChange={handleChange}
                  />{" "}
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    name="q2"
                    value="3"
                    onChange={handleChange}
                  />{" "}
                  Satisfactory
                </label>
                <label>
                  <input
                    type="radio"
                    name="q2"
                    value="4"
                    onChange={handleChange}
                  />{" "}
                  Unsatisfactory
                </label>
              </div>
            </div>

            <div className="question">
              <label>Communication and presentation skills ...</label>
              <div className="options">
                <label>
                  <input
                    type="radio"
                    name="q3"
                    value="1"
                    onChange={handleChange}
                  />{" "}
                  Excellent
                </label>
                <label>
                  <input
                    type="radio"
                    name="q3"
                    value="2"
                    onChange={handleChange}
                  />{" "}
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    name="q3"
                    value="3"
                    onChange={handleChange}
                  />{" "}
                  Satisfactory
                </label>
                <label>
                  <input
                    type="radio"
                    name="q3"
                    value="4"
                    onChange={handleChange}
                  />{" "}
                  Unsatisfactory
                </label>
              </div>
            </div>

            <div className="question">
              <label>Ability to clear doubts and provide guidance ...</label>
              <div className="options">
                <label>
                  <input
                    type="radio"
                    name="q4"
                    value="1"
                    onChange={handleChange}
                  />{" "}
                  Excellent
                </label>
                <label>
                  <input
                    type="radio"
                    name="q4"
                    value="2"
                    onChange={handleChange}
                  />{" "}
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    name="q4"
                    value="3"
                    onChange={handleChange}
                  />{" "}
                  Satisfactory
                </label>
                <label>
                  <input
                    type="radio"
                    name="q4"
                    value="4"
                    onChange={handleChange}
                  />{" "}
                  Unsatisfactory
                </label>
              </div>
            </div>

            <div className="question">
              <label>Coverage of syllabus and pace of teaching ...</label>
              <div className="options">
                <label>
                  <input
                    type="radio"
                    name="q5"
                    value="1"
                    onChange={handleChange}
                  />{" "}
                  Excellent
                </label>
                <label>
                  <input
                    type="radio"
                    name="q5"
                    value="2"
                    onChange={handleChange}
                  />{" "}
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    name="q5"
                    value="3"
                    onChange={handleChange}
                  />{" "}
                  Satisfactory
                </label>
                <label>
                  <input
                    type="radio"
                    name="q5"
                    value="4"
                    onChange={handleChange}
                  />{" "}
                  Unsatisfactory
                </label>
              </div>
            </div>

            <div className="question">
              <label>Comments and Suggestions:</label>
              <textarea
                name="suggestion"
                value={formData.suggestion}
                onChange={handleChange}
                placeholder="Write your feedback here..."
              ></textarea>
            </div>

            <div className="btn-container">
              <button className="btn-submit" onClick={handleSubmit}>
                Submit Feedback
              </button>
            </div>
          </>
        ) : (
          <p>Loading feedback data...</p>
        )}
      </div>
    </>
  );
};

export default StudentDashboard;
