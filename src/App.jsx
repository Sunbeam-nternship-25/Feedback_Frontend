
import StudentLogin from './pages/Studentlogin/studentlogin'
import CocoLogin from './pages/cocologin/cocologin'
import TeacherLogin from './pages/teacherlogin/teacherlogin'
import AdminLogin from './pages/adminlogin/adminlogin'
import { ToastContainer } from 'react-toastify'

import { Routes, Route } from 'react-router-dom'
import StudentRegister from './pages/StudentRegistration/StudentRegister'
import TeacherRegister from './pages/TeacherRegistration/TeacherRegister'
import CocoRegister from './pages/CocoRegistration/CocoRegister'
import CreateFeedback from './pages/Feedback/CreateFeedback'
import CocoDashboard from './pages/CocoDashboard/CocoDashboard'
import CocoStudentFeedback from './pages/Feedback/CocoStudentFeedbackStatus'





function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/cocologin" element={<CocoLogin />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/studentRegister" element={<StudentRegister/>} />
        <Route path="/teacherRegister" element={<TeacherRegister/>}/>
        <Route path="/CocoRegister" element={<CocoRegister/>}/>
        <Route path="/CreateFeedback" element={<CreateFeedback/>}/>
        <Route path="/CocoDashboard" element={<CocoDashboard/>}/>
        <Route path="/CocoStudentFeedbackStatus" element={<CocoStudentFeedback/>}/>
        <Route path='/students/:id' element={<CocoStudentFeedback/>}/>
       
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
