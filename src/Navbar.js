import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RouteIcon from "@mui/icons-material/Route";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useUser } from "./UserContext";
import { Logout } from "@mui/icons-material";

export default function Navbar() {
  const { userInfo, logoutAPI } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          오늘뭐하지
        </Typography>
        <div>
          {userInfo.nickname ? (
            <div>
              <Button onClick={handleClick} variant="contained">
                {userInfo.nickname}
              </Button>
            </div>
          ) : (
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <RouteIcon />
            </ListItemIcon>
            나의 일정
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            정보 수정
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => logoutAPI()}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            로그아웃
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
