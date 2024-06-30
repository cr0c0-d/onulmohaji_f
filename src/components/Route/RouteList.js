import { useEffect, useState } from "react";
import { useAuthAPI } from "../../AuthAPI";
import { useUser } from "../../UserContext";
import { DatePicker, PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Badge, Container, Stack } from "@mui/material";
import RouteDraggable from "./RouteDraggable";
import PlaceInfoSmall from "../Place/PlaceInfoSmall";

export default function RouteList() {
  const AuthAPI = useAuthAPI();
  const { userInfo } = useUser();

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
          setSelectedDate(dayjs(response.data[response.data.length - 1]));
        }
      },
      fail: () => {
        setScheduledDays([]);
      },
    });
  };

  //   const getRouteList = () => {
  //     AuthAPI({
  //       url: `/api/route/list/${userInfo.id}`,
  //       method: "GET",
  //       data: null,
  //       success: (response) => {
  //         setRouteList(response.data);
  //       },
  //       fail: () => {
  //         setRouteList(null);
  //       },
  //     });
  //   };

  useEffect(() => {
    findRouteDateList();
  }, []);

  const getRoute = () => {
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

  useEffect(() => {
    console.log(selectedDate);
    getRoute();
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

        {route !== null
          ? route.routeDetailList.map((routeDetail, index) => (
              <PlaceInfoSmall placeDetail={routeDetail} />
            ))
          : ""}
      </Stack>
    </Container>
  );
}
