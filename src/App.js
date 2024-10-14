import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import PlaceSearchMain from "./components/Place/SearchInfo/PlaceSearchMain";
import { UserProvider, useUser } from "./UserContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";
import PlaceDetail from "./components/Place/PlaceDetail";
import Signup from "./components/Member/Signup";
import Login from "./components/Member/Login";
import { RouteProvider } from "./RouteContext";
import { SearchProvider } from "./SearchContext";
import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
import PlaceListByType from "./components/Place/PlaceListByType";
import RoutePermission from "./components/Route/RoutePermission";
import CustomPlaceList from "./components/CustomPlace/CustomPlaceList";
import CustomPlaceView from "./components/CustomPlace/CustomPlaceView";
import MyRoute from "./components/Route/MyRoute";
import MyPage from "./components/Member/MyPage";
import FacilityList from "./components/Place/FacilityList";
import BookmarkPlaceList from "./components/Bookmark/BookmarkPlaceList";

const theme = createTheme({
  typography: {
    // 전역 폰트 설정
    fontFamily: [
      "NanumSquareRound",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <SearchProvider>
          <RouteProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route exact path="/" element={<PlaceSearchMain />} />
                    <Route
                      path="/festival"
                      element={<Navigate to="/festival/list" />}
                    />
                    <Route
                      path="/festival/:placeId"
                      element={<PlaceDetail placeType="festival" />}
                    />
                    <Route
                      path="/exhibition"
                      element={<Navigate to="/exhibition/list" />}
                    />
                    <Route
                      path="/exhibition/:placeId"
                      element={<PlaceDetail placeType="exhibition" />}
                    />
                    <Route
                      path="/popup"
                      element={<Navigate to="/popup/list" />}
                    />
                    <Route
                      path="/popup/:placeId"
                      element={<PlaceDetail placeType="popup" />}
                    />
                    <Route
                      path="/festival/list"
                      element={<PlaceListByType type="festival" />}
                    />
                    <Route
                      path="/exhibition/list"
                      element={<PlaceListByType type="exhibition" />}
                    />
                    <Route
                      path="/popup/list"
                      element={<PlaceListByType type="popup" />}
                    />
                    <Route
                      path="/facility/list/:subType"
                      element={<PlaceListByType type="facility" />}
                    />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/route/permission/:shareCode"
                      element={<RoutePermission />}
                    />
                    <Route
                      path="/customPlace/list"
                      element={<CustomPlaceView />}
                    />
                    <Route path="/myRoute/list/" element={<MyRoute />}>
                      <Route
                        path="/myRoute/list/:routeId"
                        element={<MyRoute />}
                      />
                    </Route>
                    <Route path="/myPage" element={<MyPage />} />
                    <Route
                      path="/bookmark/list"
                      element={<BookmarkPlaceList />}
                    />
                  </Route>
                </Routes>
              </BrowserRouter>
            </LocalizationProvider>
          </RouteProvider>
        </SearchProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
