import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useUser } from "./UserContext";
import Footer from "./Footer";
import { Container, Toolbar } from "@mui/material";
import { Fab } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useRoute } from "./RouteContext";

function Layout() {
  const { settingDone } = useUser();
  const { openDrawer, setOpenDrawer } = useRoute();
  return (
    <>
      {settingDone ? (
        <div>
          <Navbar />
          <br />
          <Container maxWidth="xl">
            <Toolbar />
            <Fab
              variant="extended"
              color="primary"
              sx={{ position: "fixed", bottom: 16, right: 16 }}
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <EventNoteIcon sx={{ mr: 1 }} />
              일정 토글
            </Fab>
            <Outlet />
            <br />
          </Container>
          <Footer />
        </div>
      ) : (
        <div>불러오는중...</div>
      )}
    </>
  );
}

export default Layout;
