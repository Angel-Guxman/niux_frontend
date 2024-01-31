import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import SideBar_Dash from '../Components/Dashboard/SideBar_Dash';
import Header_Dash from '../Components/Dashboard/Header_Dash';
import { useAuthStore } from '../stores/Auth/authStore';

const Dashboard = () => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuth = useAuthStore((state) => state.checkAuthStatus);
  // console.log({ token })
  // console.log({ authStatus });
  if (authStatus === 'pending') {
    checkAuth();
    return <div>Loading...</div>;
  }

  if (authStatus === 'unauthorized') {
    return <Navigate to="/login" />;
  }
  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
      <SideBar_Dash />
      <div className="xl:col-span-5">
        <Header_Dash />
        <div className="bg-gray-300 h-[90vh] overflow-y-scroll p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
