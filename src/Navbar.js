import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Divider,
  ListItemIcon,
  Menu,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RouteIcon from "@mui/icons-material/Route";
import EditIcon from "@mui/icons-material/Edit";
import LoginIcon from "@mui/icons-material/Login";
import AddIcon from "@mui/icons-material/Add";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useUser } from "./UserContext";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DrawerCmp from "./DrawerCmp";
import { useRoute } from "./RouteContext";

export default function Navbar() {
  const { userInfo, logoutAPI } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const { openDrawer, setOpenDrawer } = useRoute();
  const history = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer" }}
            onClick={() => history("/")}
          >
            오늘뭐하지
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => history("/")}
            >
              검색
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => history("/customPlace/list")}
            >
              나만의 장소 관리
            </Button>
          </Box>

          <div>
            {userInfo.nickname ? (
              <div>
                <Button onClick={handleClick} variant="contained">
                  {userInfo.nickname}
                </Button>
              </div>
            ) : (
              <IconButton
                onClick={handleClick}
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
            {userInfo.nickname ? (
              <div>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    history("/myRoute/list");
                  }}
                >
                  <ListItemIcon>
                    <RouteIcon />
                  </ListItemIcon>
                  나의 일정
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    history("/myPage");
                  }}
                >
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  검색조건 기본값 설정
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => logoutAPI(true)}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  로그아웃
                </MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem onClick={() => history("/login")}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  로그인
                </MenuItem>
                <MenuItem onClick={() => history("/signup")}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  회원가입
                </MenuItem>
              </div>
            )}
          </Menu>
        </Toolbar>
      </AppBar>

      <DrawerCmp />
    </div>
  );
}
