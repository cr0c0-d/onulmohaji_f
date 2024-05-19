import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import RouteIcon from "@mui/icons-material/Route";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { useAuthAPI } from "../AuthAPI";
import { useUser } from "../UserContext";
import { useRoute } from "../RouteContext";

export default function Route() {
  /********************************************* 상태관리, 변수 선언 ***************************************************/
  // route 정보
  const { route, setRoute, routeDate, setRouteDate, getRoute } = useRoute();
  const { userInfo } = useUser();

  return (
    <Container>
      <Stack>
        {userInfo === null ? (
          <Typography>로그인 시 날짜별 계획을 관리할 수 있습니다.</Typography>
        ) : (
          <Card>
            <CardHeader
              avatar={
                <Avatar>
                  <RouteIcon />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={`${routeDate.format("M월 D일")}의 일정`}
            />
            {route !== null ? (
              <CardContent>
                {route.routeDetailList.map((routeDetail) => (
                  <Card>{routeDetail.placeId}</Card>
                ))}
              </CardContent>
            ) : (
              <CardContent>일정이 아직 없습니다.</CardContent>
            )}
          </Card>
        )}
      </Stack>
    </Container>
  );
}
