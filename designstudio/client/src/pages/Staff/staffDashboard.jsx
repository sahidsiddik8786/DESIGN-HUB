import React, { useState } from 'react';
import './Staff.css';
import StaffHeader from './StaffHeader';
import Sidebar from './Sidebar';
import MyChartComponent from './MyChartComponent';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';

const StaffHome = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [auth, , loading] = useAuth(); // Destructure loading state from useAuth hook

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    // Render loading indicator while authentication state is being fetched
   
    // Check if user is authenticated before rendering
    if (!auth.user) {
        // Redirect to login or handle unauthorized access
        return <Link to="/Login-staff" />;
    }

    return (
        <div className='grid-container'>
            <StaffHeader OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            {/* Your other components */}
        </div>
    );
};

export default StaffHome;
