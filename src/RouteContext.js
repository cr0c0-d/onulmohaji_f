import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import { useUser } from "./UserContext";
import { getPickersOutlinedInputUtilityClass } from "@mui/x-date-pickers";
import { useAuthAPI } from "./AuthAPI";

const RouteContext = createContext();

export const useRoute = () => useContext(RouteContext);

export const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState(null);
  const [routeDate, setRouteDate] = useState(dayjs(new Date()));
  const { userInfo, settingDone } = useUser();
  const AuthAPI = useAuthAPI();

  const getRoute = () => {
    AuthAPI({
      url: `/api/route?userId=${userInfo.id}&date=${routeDate.format(
        "YYYY-MM-DD"
      )}`,
      method: "GET",
      data: null,
      success: (response) => {
        setRoute(response.data);
      },
      fail: () => {
        setRoute(null);
      },
    });
  };

  useEffect(() => {
    if (settingDone && userInfo !== null) {
      getRoute();
    }
  }, [userInfo, routeDate, settingDone]);

  return (
    <RouteContext.Provider
      value={{ route, setRoute, routeDate, setRouteDate, getRoute }}
    >
      {children}
    </RouteContext.Provider>
  );
};
