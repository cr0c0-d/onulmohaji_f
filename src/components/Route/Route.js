import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import RouteIcon from "@mui/icons-material/Route";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { useAuthAPI } from "../../AuthAPI";
import { useUser } from "../../UserContext";
import { useRoute } from "../../RouteContext";

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
                  <div index={routeDetail.orderNo}>
                    <Card sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 50 }}
                        image={routeDetail.thumbnail}
                        alt="routeDetail.placeName"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                        >
                          {routeDetail.placeName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <Chip
                            label={routeDetail.placeTypeName}
                            size="small"
                            variant="outlined"
                          />
                        </Typography>
                      </CardContent>
                    </Card>
                    <br />
                  </div>
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
