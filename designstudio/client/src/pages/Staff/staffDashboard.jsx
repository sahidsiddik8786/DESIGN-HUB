import React, { useState } from 'react';
import './Staff.css';
import StaffHeader from './StaffHeader';
import Sidebar from './Sidebar';
import MyChartComponent from './MyChartComponent';

const StaffHome = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <div className='grid-container'>
            <StaffHeader OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
       
        </div>
    );
};

export default StaffHome;
