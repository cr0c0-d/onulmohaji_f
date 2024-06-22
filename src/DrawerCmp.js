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
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RouteDraggable from "./components/Route/RouteDraggable";
import { useRoute } from "./RouteContext";
import { useState } from "react";
import CustomPlaceList from "./components/CustomPlace/CustomPlaceList";

export default function DrawerCmp() {
  const { openDrawer, setOpenDrawer } = useRoute();
  const [drawerWidth, setDrawerWidth] = useState(350);
  const [panelMode, setPanelMode] = useState("route");
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
      </Drawer>
    </Container>
  );
}
