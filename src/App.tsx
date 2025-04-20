import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppSettings from "./assets/pages/AppSettings";
import ProAppStudyPlanner from "./assets/pages/ProAppStudyPlanner";
import StudyNotesManagement from "./assets/pages/StudyNotesManagement";
import TaskManagementDashboard from "./assets/pages/TaskManagementDashboard";
import TasksCalendarView from "./assets/pages/TasksCalendarView";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<ProAppStudyPlanner />} />
      <Route path="/StudyNotes" element={<StudyNotesManagement />} />
      <Route path="/settings" element={<AppSettings />} />
      <Route path="/tasks" element={<TaskManagementDashboard />} />
      <Route path="/calender" element={<TasksCalendarView />} />
      {/* <Route path="/task" element={<TasksManagementPage />} /> */}
    </Routes>
  );
}

export default App;
