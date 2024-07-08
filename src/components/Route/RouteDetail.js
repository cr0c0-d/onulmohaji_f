import {
  TextField,
  Box,
  Chip,
  Typography,
  Container,
  Divider,
  Stack,
} from "@mui/material";
import PlaceInfoSmall from "../Place/PlaceInfoSmall";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function RouteDetail({ route }) {
  const [title, setTitle] = useState(
    route.title || dayjs(route.routeDate).format("M월 D일의 일정")
  );

  useEffect(() => {
    setTitle(route.title || dayjs(route.routeDate).format("M월 D일의 일정"));
  }, [route]);

  return (
    <Container>
      <Box>
        <Stack spacing={3}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body1">{route.routeDate}</Typography>
          {/* <Typography variant="h6">일정 제목</Typography>
          <TextField
            value={title}
            //label="일정 제목"
            onChange={(e) => setTitle(e.target.value)}
          /> */}
          <Divider />

          {route.memberList && route.memberList.length > 0 ? (
            <Box>
              <Typography variant="h6">멤버 목록</Typography>
              <br />
              <Typography variant="body1">
                {route.memberList.map((member) => (
                  <Chip
                    label={member.nickname}
                    variant="outlined"
                    key={member.id}
                  />
                ))}
              </Typography>
              <br />
              <Divider />
            </Box>
          ) : (
            ""
          )}
          <Box>
            {route !== null
              ? route.routeDetailList.map((routeDetail) => (
                  <PlaceInfoSmall
                    placeDetail={routeDetail}
                    key={routeDetail.id}
                  />
                ))
              : ""}
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
