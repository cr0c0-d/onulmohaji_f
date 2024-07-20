import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

export default function PlaceDetailMap({ detail }) {
  const { kakao } = window;
  const setKakaoMap = () => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(detail.latitude, detail.longitude),
      level: 3,
    };

    var map = new kakao.maps.Map(container, options);

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(
      detail.latitude,
      detail.longitude
    );

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  };
  useEffect(() => {
    if (detail !== null) {
      setKakaoMap();
    }
  }, []);

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ width: "100%" }}>
          위치
        </Typography>
        <Divider variant="middle" />
        <Card>
          <CardContent>
            <div id="map" style={{ minWidth: "100%", height: "400px" }}></div>
            <br />
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => {
                window.open(
                  `https://map.kakao.com/link/search/${detail.address}`
                );
              }}
            >
              {detail.address || detail.placeName}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
