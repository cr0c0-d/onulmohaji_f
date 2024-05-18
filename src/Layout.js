import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useUser } from "./UserContext";
import Footer from "./Footer";
import { Container } from "@mui/material";
function Layout() {
  const { settingDone } = useUser();
  return (
    <>
      {settingDone ? (
        <div>
          <Navbar />
          <br />
          <Container maxWidth="xl">
            <Outlet />
            <br />
          </Container>
          <Footer />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Layout;
