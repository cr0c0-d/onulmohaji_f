import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import { useAuthAPI } from "../../AuthAPI";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useSearchContext } from "../../SearchContext";
import dayjs from "dayjs";

export default function RoutePermission() {
  const { userInfo, userInitYn } = useUser();
  const [targetRoute, setTargetRoute] = useState(null);
  const { searchInfo, setSearchInfo } = useSearchContext();

  const history = useNavigate();
  const AuthAPI = useAuthAPI();

  // route 정보 조회
  const getRouteInfo = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api${window.location.pathname}`,
      method: "GET",
    }).catch((error) => {
      console.log("route 조회 실패");
    });

    if (response && response.status === 200) {
      setTargetRoute(response.data);
    }
  };

  useEffect(() => {
    getRouteInfo();
  }, []);

  const confirmUserInfo = () => {
    console.log(userInfo);
    // 로그인상태인지 확인
    if (userInfo === null || userInfo.id === undefined) {
      // 비로그인 -> 로그인 페이지로
      history("/login", { state: { beforeUrl: window.location.pathname } });
    }
  };

  useEffect(() => {
    if (userInitYn) {
      if (targetRoute !== null) {
        confirmUserInfo();
      }
    }
  }, [targetRoute, userInitYn]);

  const addRoutePermission = () => {
    AuthAPI({
      url: "/api/route/permission",
      method: "POST",
      data: { routeId: targetRoute.routeId, userId: userInfo.id },
      success: (result) => {
        if (result.status === 201) {
          setSearchInfo({ ...searchInfo, date: dayjs(result.data.routeDate) });
          history("/");
        }
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <GroupAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          일정 참여
        </Typography>
        <Box
          component="form"
          noValidate
          //onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          {targetRoute !== null ? (
            targetRoute.memberList.find((obj) => obj === userInfo.id) !==
            undefined ? (
              <Stack spacing={3}>
                <Typography variant="body1">
                  이미 참여중인 일정입니다.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => history("/")}
                >
                  메인화면으로
                </Button>
              </Stack>
            ) : (
              <Stack spacing={3}>
                <Typography variant="body1">
                  {`${targetRoute.ownerName}님의 ${targetRoute.routeDate} 일정에 참가하시겠습니까?`}
                </Typography>
                <Typography variant="body1">
                  해당 날짜에 이미 일정이 존재하는 경우 덮어씌워집니다.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addRoutePermission}
                >
                  참가하기
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => history("/")}
                >
                  메인화면으로
                </Button>
              </Stack>
            )
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Container>
  );
}
