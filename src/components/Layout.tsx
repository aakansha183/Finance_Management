
import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar/Sidebar";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (

    <Box sx={{ display: "flex", marginTop: 8 }}>

      <CssBaseline />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isSidebarOpen ? "240px" : "0",
          transition: "margin 0.3s ease",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
