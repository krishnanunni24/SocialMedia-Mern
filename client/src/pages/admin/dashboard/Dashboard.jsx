import React, { useState } from "react";

import DashboardContent from "../../../components/admin/dashboard/DashboardContent";
import SideNav from "../../../components/admin/SideNav"; 
import PageWrapper from "../../../components/admin/PageWrapper";


const Dashboard = () => {
 
  return (
    <>
    <PageWrapper>
    <SideNav/>
    <DashboardContent/>
    </PageWrapper>
    
    </>
  );
};

export default Dashboard;