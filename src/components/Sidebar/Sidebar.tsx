import React from "react";
import { Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={toggleSidebar}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          marginTop: 8,
        },
      }}
    >
      <Box
        sx={{ width: 240, height: "100%", bgcolor: "background.paper" }}
        role="presentation"
        onClick={toggleSidebar}
        onKeyDown={toggleSidebar}
      >
        <List>
          {[
            { text: "Dashboard", path: "/dashboard" },
            { text: "Income Tracker", path: "/incomes" },
            { text: "Expense Tracker", path: "/expenses" },
            { text: "Budget Management", path: "/budget" },
            { text: "Transaction History", path: "/transaction-history" },
          ].map(({ text, path }, index) => (
            <ListItem button key={text} component={Link} to={path}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
