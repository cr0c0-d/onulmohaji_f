import { useEffect, useState } from "react";
import { Box, Container, Stack, TextField } from "@mui/material";

export default function CustomPlaceAddMap({
  newCustomPlace,
  setNewCustomPlace,
  searchKeyword,
  setSearchKeyword,
}) {
  const { kakao } = window;

  const setMap = () => {
    let map;

    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();
    let marker = new kakao.maps.Marker();
    let infowindow = new kakao.maps.InfoWindow();
    let mapContainer = document.getElementById("customPlaceMap");
    let center;
    let mapOption;

    center = new kakao.maps.LatLng(
      newCustomPlace.latitude === 0
        ? 37.4970572543978
        : newCustomPlace.latitude,
      newCustomPlace.longitude === 0
        ? 127.028180714381
        : newCustomPlace.longitude
    );

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

        setNewCustomPlace({
          ...newCustomPlace,
          latitude: marker.getPosition().getLat(),
          longitude: marker.getPosition().getLng(),
          address: address,
          addressRoad: addressRoad,
        });

        let detailAddr = addressRoad
          ? "<div>도로명주소 : " + addressRoad + "</div>"
          : "";
        detailAddr += "<div>지번 주소 : " + address + "</div>";

        const content =
          `<div style="width:300px;text-align:center;padding:6px;">` +
          `<div>${detailAddr}</div></div>`;
        // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
        //infowindow = new kakao.maps.InfoWindow({ content: content });
        infowindow.setContent(content);

        infowindow.open(map, marker);
      }
    };

    if (searchKeyword !== "") {
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(searchKeyword, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          center = new kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(center);
          marker.setPosition(center);
          marker.setMap(map);
          searchDetailAddrFromCoords(center, setInfoWindow);
        }
      });
    } else {
      marker.setPosition(center);
      marker.setMap(map);
      searchDetailAddrFromCoords(center, setInfoWindow);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      setNewCustomPlace({
        ...newCustomPlace,
        latitude: mouseEvent.latLng.getLat(),
        longitude: mouseEvent.latLng.getLng(),
      });
      marker.setPosition(mouseEvent.latLng);
      searchDetailAddrFromCoords(mouseEvent.latLng, setInfoWindow);
    });
  };

  useEffect(() => {
    setMap();
  }, [searchKeyword]);

  return (
    <Box sx={{ padding: "10px" }}>
      <div id="customPlaceMap" style={{ width: "100%", height: "600px" }}></div>
    </Box>
  );
}
