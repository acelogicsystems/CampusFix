import {
    LayoutDashboard,
    ClipboardList,
    PlusCircle,
    Settings,
    HelpCircle,
    LogOut
} from 'lucide-react';

import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Sidebar() {

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">
                <h2>CampusFix</h2>
                <span>Campus Maintenance</span>
            </div>

            <nav className="sidebar-nav">

                <p className="nav-label">MENU</p>

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `nav-link ${isActive ? 'active' : ''}`
                    }
                >
                    <LayoutDashboard size={19} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/my-issues"
                    className={({ isActive }) =>
                        `nav-link ${isActive ? 'active' : ''}`
                    }
                >
                    <ClipboardList size={19} />
                    <span>My Issues</span>
                </NavLink>

                <NavLink
                    to="/report-issue"
                    className={({ isActive }) =>
                        `nav-link ${isActive ? 'active' : ''}`
                    }
                >
                    <PlusCircle size={19} />
                    <span>Report an Issue</span>
                </NavLink>

                <div className="nav-divider"></div>

                <p className="nav-label">GENERAL</p>

                <a href="#" className="nav-link">
                    <Settings size={19} />
                    <span>Settings</span>
                </a>

                <a href="#" className="nav-link">
                    <HelpCircle size={19} />
                    <span>Help & Support</span>
                </a>

            </nav>

            <button
                className="nav-link logout-link"
                onClick={handleLogout}
            >
                <LogOut size={19} />
                <span>Logout</span>
            </button>

        </aside>
    );
}

export default Sidebar;