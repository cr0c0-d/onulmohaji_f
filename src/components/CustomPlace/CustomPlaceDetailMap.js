import { useEffect, useState } from "react";
import { Box, Container, Stack, TextField } from "@mui/material";

export default function CustomPlaceDetailMap({ customPlace }) {
  const { kakao } = window;

  const setMap = () => {
    let map;

    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();
    let marker = new kakao.maps.Marker();
    let infowindow = new kakao.maps.InfoWindow();
    let mapContainer = document.getElementById("customPlaceDetailMap");
    let center;
    let mapOption;

    center = new kakao.maps.LatLng(customPlace.latitude, customPlace.longitude);
    mapOption = {
      center: center, // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    // 지도를 생성합니다
    map = new kakao.maps.Map(mapContainer, mapOption);

    const setInfoWindow = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const addressRoad = !!result[0].road_address
          ? result[0].road_address.address_name
          : "";
        const address = result[0].address.address_name;

        let detailAddr = addressRoad
          ? "<div>도로명주소 : " + addressRoad + "</div>"
          : "";
        detailAddr += "<div>지번 주소 : " + address + "</div>";

        const content =
          `<div style="width:300px;text-align:center;padding:6px;">` +
          `<div>${detailAddr}</div></div>`;
        // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
        infowindow.setContent(content);

        infowindow.open(map, marker);
      }
    };

    marker.setPosition(center);
    marker.setMap(map);
    searchDetailAddrFromCoords(center, setInfoWindow);

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
  };

  useEffect(() => {
    setMap();
  }, [customPlace]);

  return (
    <Box sx={{ padding: "10px" }}>
      <div
        id="customPlaceDetailMap"
        style={{ width: "100%", height: "300px" }}
      ></div>
    </Box>
  );
}
