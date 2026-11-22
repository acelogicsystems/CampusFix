import { Routes, Route } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import RecentIssues from "./components/RecentIssues";
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';

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
    </Routes>
  );
}

export default App;