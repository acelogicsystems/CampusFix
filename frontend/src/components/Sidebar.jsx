import {
    LayoutDashboard,
    ClipboardList,
    PlusCircle,
    Settings,
    HelpCircle
} from 'lucide-react';

function Sidebar() {
    return (
        <aside className='sidebar'>
            <div className='sidebar-brand'>
                <h2>CampusFix</h2>
                <span>Campus Maintenance</span>
            </div>

            <nav className='sidebar-nav'>
                <p className='nav-label'> MENU</p>
                <a href='#' className='nav-link active'>
                    <LayoutDashboard size={19} />

                    <span>Dashboard</span>
                </a>
                <a href="#" className="nav-link">
                    <ClipboardList size={19}/>
                    <span>My Issues</span>
                </a>
                <a href='#' className='nav-link'>
                    <PlusCircle size={19} />
                    <span>Report an Issue</span>
                </a>

                <div className='nav-divider'></div>

                <p className='nav-label'>GENERAL</p>

                <a href='#' className='nav-link'>
                    <Settings size={19} />

                    <span>Settings</span>
                </a>

                <a href='#' className='nav-link'>
                    <HelpCircle size={19} />
                    <span>Help & Support</span>
                </a>
            </nav>
        </aside>
    );
}

export default Sidebar;