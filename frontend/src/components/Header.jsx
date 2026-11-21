import { Search, Bell, UserRound } from 'lucide-react';

function Header() {
    return (
        <header className='dashboard-header'>
            <div className='header-title'>
                <p>OVERVIEW</p>
                <h1>Dashboard</h1>
                <span>Welcome back! Here's what's happening on campus.</span>
            </div>

            <div className='header-actions'>
                <button className='search-button'>
                    <Search size={18} />
                </button>

                <button className='notification-button'>
                    <Bell size={19}/>
                    <span className='notification-dot'></span>
                </button>
                
                <div className='user-profile'>
                    <div className='user-avatar'>BK</div>
                    <div className='user-details'>
                        <strong>Brian Karani</strong>

                        <span>Student</span>
                    </div>
                    <UserRound size={17}/>
                </div>

            </div>
        </header>
    );
}

export default Header;