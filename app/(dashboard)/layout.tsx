"use client"
import React, { useState } from 'react';
import Sidenav from "./_components/SideNav";
import TopHeader from "./_components/TopHeader";
import Footer from "../_components/Footer"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      {/* Sidebar */}
      <div className={`bg-gray-950 h-full md:w-60 fixed inset-y-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidenav  onTrigger={toggleSidebar}/>
      </div>
      
      {/* Content */}
      <div className='md:ml-64'>
        <TopHeader onTrigger={toggleSidebar} />
        {children}
      </div>
    </div>
  );
}
