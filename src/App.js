import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Main from "./components/Main";
import { UserProvider, useUser } from "./UserContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";
import PlaceDetail from "./components/PlaceDetail";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { RouteProvider } from "./RouteContext";
import { SearchProvider } from "./SearchContext";
import { useState } from "react";

function App() {
  const [settingDone, setSettingDone] = useState();
  return (
    <UserProvider settingDone={settingDone} setSettingDone={setSettingDone}>
      {settingDone === true ? (
        <SearchProvider>
          <RouteProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route exact path="/" element={<Main />} />
                    <Route
                      path="/festival/:placeId"
                      element={<PlaceDetail placeType="festival" />}
                    />
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
        </SearchProvider>
      ) : (
        ""
      )}
    </UserProvider>
  );
}

export default App;
