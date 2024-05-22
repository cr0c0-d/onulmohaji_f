import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Main from "./components/Main";
import { UserProvider } from "./UserContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";
import PlaceDetail from "./components/PlaceDetail";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { RouteProvider } from "./RouteContext";

function App() {
  return (
    <UserProvider>
      <RouteProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route exact path="/" element={<Main />} />
                <Route
                  path="/exhibition/:placeId"
                  element={<PlaceDetail placeType="exhibition" />}
                />
                <Route
                  path="/popup/:placeId"
                  element={<PlaceDetail placeType="popup" />}
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </RouteProvider>
    </UserProvider>
  );
}

export default App;
