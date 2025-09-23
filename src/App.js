import React from 'react';
import TeacherRegister from './components/TeacherRegister.js';
import TeacherLogin from './components/TeacherLogin.js';
import './App.css';

function App() {
  return (
    <div>
      <TeacherRegister />
      <hr />
      <TeacherLogin />
    </div>
  );
}

export default App;
