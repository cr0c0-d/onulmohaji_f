import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import { useUser } from "./UserContext";
import { getPickersOutlinedInputUtilityClass } from "@mui/x-date-pickers";
import { useAuthAPI } from "./AuthAPI";
import { useSearchContext } from "./SearchContext";

const RouteContext = createContext();

export const useRoute = () => useContext(RouteContext);

export const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState(null);
  const [routeDate, setRouteDate] = useState(dayjs(new Date()));
  const [openDrawer, setOpenDrawer] = useState(false);
  const { userInfo, settingDone } = useUser();
  const { searchInfo } = useSearchContext();
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
    if (settingDone && userInfo.id !== undefined) {
      getRoute();
    }
  }, [userInfo, routeDate, settingDone]);

  useEffect(() => {
    if (searchInfo.date != null && searchInfo.date != routeDate) {
      setRouteDate(searchInfo.date);
    }
  }, [searchInfo]);

  const addRouteDetail = (placeId, type) => {
    AuthAPI({
      url: "/api/routeDetail",
      method: "POST",
      data: {
        placeId: placeId,
        placeType: type,
        date: routeDate.format("YYYY-MM-DD"),
      },
      success: () => {
        getRoute();
      },
      fail: () => {
        console.log("fail");
      },
    });
  };

  return (
    <RouteContext.Provider
      value={{
        route,
        setRoute,
        routeDate,
        setRouteDate,
        getRoute,
        openDrawer,
        setOpenDrawer,
        addRouteDetail,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};
