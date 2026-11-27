import { Routes, Route } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import RecentIssues from "./components/RecentIssues";
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/auth/Register';
import ReportIssue from './pages/student/ReportIssue';
import MyIssues from './pages/student/MyIssues';
import IssueDetails from './pages/student/IssueDetails';
import AdminDashboard from './pages/admin/AdminDashboard';
import RoleRoute from './components/RoleRoute';

function Dashboard() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className='main-content'>
        <Header />
        <Stats />
        <RecentIssues />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
      } 
      />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register/>} />
      
      <Route path='/report-issue' element={
        <ProtectedRoute>
          <ReportIssue/>
        </ProtectedRoute>
      } />
      <Route path='/my-issues' element={
        <ProtectedRoute>
          <MyIssues/>
        </ProtectedRoute>
      }/>
      <Route path='/my-issues/:id' element={
        <ProtectedRoute>
          <IssueDetails/>
        </ProtectedRoute>
      } />
      <Route path='/admin' element={
        <RoleRoute allowedRoles={['Admin']}>
          <AdminDashboard/>
        </RoleRoute>
      }></Route>
    </Routes>
  );
}

export default App;