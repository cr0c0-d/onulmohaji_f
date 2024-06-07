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
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RouteDraggable from "./components/Route/RouteDraggable";
import { useRoute } from "./RouteContext";
import { useState } from "react";

export default function DrawerCmp() {
  const { openDrawer, setOpenDrawer } = useRoute();
  const [drawerWidth, setDrawerWidth] = useState(350);
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
        {/* <Route /> */}
        <RouteDraggable
          drawerWidth={drawerWidth}
          setDrawerWidth={setDrawerWidth}
        />

        {/* <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider /> */}
        {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      </Drawer>
    </Container>
  );
}
