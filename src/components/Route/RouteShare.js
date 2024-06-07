import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { useRoute } from "../../RouteContext";
import { useAuthAPI } from "../../AuthAPI";
import { useEffect, useRef, useState } from "react";

export default function RouteShare() {
  const { route } = useRoute();
  const [routePermissionUrl, setRoutePermissionUrl] = useState(null);

  const AuthAPI = useAuthAPI();

  const getPermissionUrl = () => {
    AuthAPI({
      url: `/api/route/permission/url/${route.routeId}`,
      method: "GET",
      data: null,
      success: (result) => {
        setRoutePermissionUrl(result.data);
      },
      fail: () => {
        console.log("fail");
      },
    });
  };

  useEffect(() => {
    getPermissionUrl();
  }, []);

  const urlInputRef = useRef();

  const copyText = () => {
    // input 요소 선택
    // urlInputRef.current.select();
    // urlInputRef.current.setSelectionRange(0, 99999); // 모바일 장치 호환성
    console.log(urlInputRef);
    // 클립보드에 텍스트 복사
    navigator.clipboard
      .writeText(urlInputRef.current.value)
      .then(() => {
        alert("클립보드에 복사됨: " + urlInputRef.current.value);
      })
      .catch((err) => {
        console.error("복사 실패: ", err);
      });
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" component="h2">
        일정 함께 짜기
      </Typography>
      <input
        type="text"
        readOnly
        id="text_routePermissionUrl"
        ref={urlInputRef}
        value={`${process.env.REACT_APP_HOME_URL}/route/permission/${routePermissionUrl}`}
        style={{ width: "80%" }}
      />
      {/* <Typography sx={{ mt: 2 }}></Typography> */}
      <Button onClick={copyText}>복사</Button>
    </Box>
  );
}
