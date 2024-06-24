import {
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  styled,
  Tab,
  Tabs,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RouteDraggable from "./components/Route/RouteDraggable";
import { useRoute } from "./RouteContext";
import { useState } from "react";
import CustomPlaceList from "./components/CustomPlace/CustomPlaceList";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function DrawerCmp() {
  const { openDrawer, setOpenDrawer } = useRoute();
  const [drawerWidth, setDrawerWidth] = useState(350);
  const [panelMode, setPanelMode] = useState("route");
  const { userInfo } = useUser();
  const history = useNavigate();

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Container maxWidth="xs" sx={{ zIndex: (theme) => theme.zIndex.drawer }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <Toolbar />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            sx={{ width: "auto" }}
            onClick={() => setOpenDrawer(false)}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {userInfo === null || userInfo.id === undefined ? (
          <Container>
            <br />
            <Typography>로그인 시 날짜별 계획을 관리할 수 있습니다.</Typography>
            <br />
            <Button variant="contained" onClick={() => history("/login")}>
              로그인
            </Button>
          </Container>
        ) : (
          <div>
            <Tabs
              value={panelMode}
              onChange={(event, newValue) => {
                setPanelMode(newValue);
              }}
            >
              <Tab value="route" label="일정 관리" />

              <Tab value="customPlace" label="나만의 장소 관리" />
            </Tabs>
            {panelMode === "route" ? (
              <RouteDraggable
                drawerWidth={drawerWidth}
                setDrawerWidth={setDrawerWidth}
              />
            ) : panelMode === "customPlace" ? (
              <CustomPlaceList />
            ) : (
              ""
            )}
          </div>
        )}
      </Drawer>
    </Container>
  );
}
