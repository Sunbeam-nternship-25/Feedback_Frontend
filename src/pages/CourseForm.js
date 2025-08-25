import React, { useState, useEffect } from "react";

function CourseForm({ onSubmit, onCancel, initialData }) {
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    if (initialData) {
      setCourseName(initialData.course_name);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseName.trim()) {
      alert("Course name is required");
      return;
    }
    onSubmit({ course_name: courseName });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Course Name:
        <input
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter CourseName"
          required
        />
      </label>
      <div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </form>
  );
}

export default CourseForm;
