import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useUser } from "./UserContext";
import Footer from "./Footer";
function Layout() {
  //const { settingDone } = useUser();
  return (
    <>
      {
        //settingDone
        true ? (
          <div>
            <Navbar />
            <div>
              <Outlet />
              <br />
            </div>
            <Footer />
          </div>
        ) : (
          ""
        )
      }
    </>
  );
}

export default Layout;
