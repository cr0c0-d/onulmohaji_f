import {
  Avatar,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import RouteIcon from "@mui/icons-material/Route";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RouteList({
  routeList,
  selectedDate,
  setSelectedDate,
}) {
  const history = useNavigate();
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
                  history(`/myRoute/list/${route.id}`);
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
                  secondary={
                    <Box>
                      <Typography variant="body1">{route.date}</Typography>
                      {route.memberList.length > 0 ? (
                        <Typography>
                          멤버 :{" "}
                          {route.memberList.map((memberName, index) => (
                            <Chip
                              label={memberName}
                              variant="outlined"
                              key={index}
                              sx={{ margin: "0px 2px" }}
                            />
                          ))}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </Box>
          ))
        : ""}
    </List>
  );
}
