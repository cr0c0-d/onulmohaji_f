import { useEffect, useState } from "react";
import { useAuthAPI } from "../../AuthAPI";
import { useUser } from "../../UserContext";
import { DatePicker, PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Badge, Box, Container, Divider, Grid, Stack } from "@mui/material";
import RouteDraggable from "./RouteDraggable";
import PlaceInfoSmall from "../Place/PlaceInfoSmall";
import RouteList from "./RouteList";
import RouteDetail from "./RouteDetail";
import { useParams } from "react-router-dom";

export default function MyRoute() {
  const AuthAPI = useAuthAPI();

  const { userInfo } = useUser();
  let paramRouteId = useParams().routeId;

  const [routeList, setRouteList] = useState();

  const [scheduledDays, setScheduledDays] = useState([]);

  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

  const [route, setRoute] = useState(null);

  const findRouteDateList = () => {
    AuthAPI({
      url: `/api/route/dateList/${userInfo.id}`,
      method: "GET",
      data: null,
      success: (response) => {
        setScheduledDays(response.data);
        if (response.data !== null && response.data.length > 0) {
          setSelectedDate(dayjs(response.data[0]));
        }
      },
      fail: () => {
        setScheduledDays([]);
      },
    });
  };

  const findRouteList = () => {
    AuthAPI({
      url: `/api/route/list/${userInfo.id}`,
      method: "GET",
      data: null,
      success: (response) => {
        setScheduledDays(response.data);
        if (response.data !== null && response.data.length > 0) {
          setRouteList(response.data);
        }
      },
      fail: () => {
        setRouteList(null);
      },
    });
  };

  useEffect(() => {
    findRouteDateList();
    findRouteList();

    if (paramRouteId) {
      findRouteById(paramRouteId);
    }
  }, [paramRouteId]);

  const findRoute = () => {
    AuthAPI({
      url: `/api/route?userId=${userInfo.id}&date=${selectedDate.format(
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

  const findRouteById = (routeId) => {
    AuthAPI({
      url: `/api/route/${routeId}`,
      method: "GET",
      data: null,
      success: (response) => {
        setRoute(response.data);
        setSelectedDate(dayjs(response.data.routeDate));
      },
      fail: () => {
        setRoute(null);
      },
    });
  };

  useEffect(() => {
    if (!paramRouteId) {
      findRoute();
    }
  }, [selectedDate]);

  function ScheduledDays(props) {
    const { scheduledDays = [], day, outsideCurrentMonth, ...other } = props;
    //console.log(props.day.date());
    // const isSelected =
    //   !props.outsideCurrentMonth &&
    //   highlightedDays.indexOf(props.day.date()) >= 0;
    const isSelected =
      scheduledDays.indexOf(props.day.format("YYYY-MM-DD")) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "✅" : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          disabled={!isSelected}
        />
      </Badge>
    );
  }

  return (
    <Container>
      <br />
      <Stack spacing={3}>
        <DatePicker
          label="날짜"
          format="YYYY-MM-DD"
          value={dayjs(selectedDate)}
          // minDate={today}
          onChange={(newValue) => setSelectedDate(newValue)}
          sx={{ maxWidth: "160px" }}
          slots={{ day: ScheduledDays }}
          slotProps={{
            day: {
              scheduledDays,
            },
          }}
        />
        <Grid
          sx={{
            display: "inline-flex",
            justifyItems: "flex-start",
          }}
          spacing={2}
        >
          <Grid item sx={{ display: "flex" }}>
            <RouteList
              routeList={routeList}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid item sx={{ display: "flex" }}>
            {route !== null ? <RouteDetail route={route} /> : ""}
            {/* <Box>
              {route !== null
                ? route.routeDetailList.map((routeDetail, index) => (
                    <PlaceInfoSmall placeDetail={routeDetail} key={index} />
                  ))
                : ""}
            </Box> */}
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
