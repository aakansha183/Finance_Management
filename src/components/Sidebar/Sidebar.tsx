import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "../../utils/MenuItems/SidebarMenuItems";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();

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
          height: "calc(100% - 64px)",
          left: isOpen ? "0" : "-240px",
          transition: "left 1s ease",
        },
      }}
    >
      <Box
        sx={{ width: 240, height: "100%", bgcolor: "background.paper" }}
        role="presentation"
        onClick={toggleSidebar}
        onKeyDown={toggleSidebar}
        className="sidebar"
      >
        <List>
          {menuItems.map(({ text, path }) => (
            <ListItem
              key={text}
              component={Link}
              to={path}
              sx={{
                backgroundColor:
                  currentPath === path
                    ? theme.palette.primary.main
                    : "transparent",
                color:
                  currentPath === path
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                "&:hover": {
                  backgroundColor:
                    currentPath === path
                      ? "rgba(0, 0, 0, 0.12)"
                      : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
