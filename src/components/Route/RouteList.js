import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import RouteIcon from "@mui/icons-material/Route";
import dayjs from "dayjs";

export default function RouteList({
  routeList,
  selectedDate,
  setSelectedDate,
}) {
  return (
    <List>
      <Divider component="li" />
      {routeList
        ? routeList.map((route, index) => (
            <Box>
              <ListItem
                key={index}
                onClick={() => {
                  setSelectedDate(dayjs(route.date));
                }}
                sx={{ cursor: "pointer" }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <RouteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    route.title || dayjs(route.date).format("M월 D일의 일정")
                  }
                  secondary={route.date}
                />
              </ListItem>
              <Divider component="li" />
            </Box>
          ))
        : ""}
    </List>
  );
}
