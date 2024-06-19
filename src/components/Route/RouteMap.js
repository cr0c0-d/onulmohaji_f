import { Container } from "@mui/material";
import { useRoute } from "../../RouteContext";
import styles from "./RouteMap.css";
import { useEffect } from "react";

export default function RouteMap() {
  const { route } = useRoute();
  const { kakao } = window;

  let map;
  let clickLine = []; // 선 객체
  let dots = {}; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.
  let markers = []; // 마커 목록
  let placeInfowindows = []; // 마커 위에 띄워질 장소 정보 인포윈도우

  // 맵 center 계산하여 반환 -> 각 routeDetail의 좌표의 평균
  const getMapCenter = () => {
    let sumLatitude = 0;
    let sumLongitude = 0;

    route.routeDetailList.map((routeDetail) => {
      sumLatitude += routeDetail.latitude;
      sumLongitude += routeDetail.longitude;
    });

    const avgLatitude = sumLatitude / route.routeDetailList.length;
    const avgLongtidue = sumLongitude / route.routeDetailList.length;

    return new kakao.maps.LatLng(avgLatitude, avgLongtidue);
  };

  // 맵 확대 level을 설정
  // 경로의 모든 지점이 지도 내에 보일 수 있도록
  const setMapBounds = () => {
    while (true) {
      let bounds = map.getBounds();

      let isOk = true;

      route.routeDetailList.map((routeDetail) => {
        if (
          bounds.ha < routeDetail.longitude &&
          routeDetail.longitude < bounds.oa &&
          bounds.qa < routeDetail.latitude &&
          routeDetail.latitude < bounds.pa
        ) {
        } else {
          isOk = false;
        }
      });

      if (isOk) {
        break;
      } else {
        map.setLevel(map.getLevel() + 1);
      }
    }
  };

  // 카카오맵 초기 세팅
  const setKakaoMap = () => {
    const mapCenter = getMapCenter();

    const mapContainer = document.getElementById("routeMap"); // 지도를 표시할 div
    let mapOption = {
      center: mapCenter, // 지도의 중심좌표
      level: 7, // 지도의 확대 레벨
    };

    map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다.

    setMapBounds();
    setPoints();
  };

  const setPoints = () => {
    const positionList = []; // [직전 장소, 현재 장소] 저장되는 배열
    let lastPointName = "";

    route.routeDetailList.map((routeDetail, index) => {
      const thisPosition = new kakao.maps.LatLng(
        routeDetail.latitude,
        routeDetail.longitude
      );

      if (positionList.length == 2) {
        // [A, B]
        positionList.shift(); // [B]
      }
      positionList.push(thisPosition); // [B, C]

      var marker = new kakao.maps.Marker({
        position: thisPosition,
      });

      markers.push(marker);
      marker.setMap(map);

      // 인포윈도우를 생성하고 지도에 표시합니다
      var infowindow = new kakao.maps.InfoWindow({
        map: map, // 인포윈도우가 표시될 지도
        position: thisPosition,
        content: `<div style="padding:5px;">${index + 1}. ${
          routeDetail.placeName
        }</div>`,
        //   // content:
        //   //   `<div style="width:230px; height: 80px; display:block; padding: 5px;">` +
        //   //   `<div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-vn7o6b-MuiPaper-root-MuiCard-root">` +
        //   //   `<img class="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img css-vf01qm-MuiCardMedia-root" src=${
        //   //     routeDetail.thumbnail ||
        //   //     process.env.REACT_APP_DEFAULT_SMALL_IMAGE_URL
        //   //   } alt="${routeDetail.placeName}">` +
        //   //   `<div class="MuiCardContent-root css-46bh2p-MuiCardContent-root" style="width: 100%;">` +
        //   //   `<div class="MuiStack-root css-nen11g-MuiStack-root">` +
        //   //   `<div class="MuiTypography-root MuiTypography-body2 MuiTypography-gutterBottom css-151rudg-MuiTypography-root">${routeDetail.placeName}</div>` +
        //   //   `<div class="MuiChip-root MuiChip-outlined MuiChip-sizeSmall MuiChip-colorDefault MuiChip-outlinedDefault css-162q9x6-MuiChip-root" style="display:inline-flex;">` +
        //   //   `<span class="MuiChip-label MuiChip-labelSmall css-rrn746-MuiChip-label">${routeDetail.placeTypeName}</span>` +
        //   //   `</div></div></div></div></div>`,

        removable: true,
      });
      infowindow.close();
      placeInfowindows.push(infowindow);

      kakao.maps.event.addListener(marker, "click", function (mouseEvent) {
        infowindow.open(map, marker);
      });

      if (positionList.length != 2) {
        lastPointName = routeDetail.placeName;
        return;
      }
      //   // 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
      clickLine = new kakao.maps.Polyline({
        map: map, // 선을 표시할 지도입니다
        path: positionList, // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
        strokeWeight: 3, // 선의 두께입니다
        strokeColor: "#1976d2", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });
      clickLine.setMap(map);
      // // 클릭한 지점에 대한 정보를 지도에 표시합니다
      // displayCircleDot(clickPosition, 0);

      const setLineMouseOver = (clickLine, lastPointName, thisPointName) => {
        const pathList = clickLine.getPath();
        const infowindowLat = (pathList[0].getLat() + pathList[1].getLat()) / 2;
        const infowindowLng = (pathList[0].getLng() + pathList[1].getLng()) / 2;

        var routeOverlay = new kakao.maps.CustomOverlay({
          map: map, // 커스텀오버레이를 표시할 지도입니다
          content: `<div style="padding:5px; border:1px solid black; background-color:white;">${lastPointName} → ${thisPointName}</div>`, // 커스텀오버레이에 표시할 내용입니다
          position: new kakao.maps.LatLng(infowindowLat, infowindowLng), // 커스텀오버레이를 표시할 위치입니다.
          xAnchor: -0.1,
          yAnchor: -0.1,
          zIndex: 3,
        });

        routeOverlay.setMap(null);

        kakao.maps.event.addListener(
          clickLine,
          "mouseover",
          function (mouseEvent) {
            clickLine.setOptions({
              strokeWeight: 5, // 선의 두께입니다
              strokeColor: "#1976d2", // 선의 색깔입니다
              strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
              strokeStyle: "solid", // 선의 스타일입니다
            });
            routeOverlay.setPosition(mouseEvent.latLng);
            // line에 mouseover시 [시작지점명->도착지점명] 표기
            routeOverlay.setMap(map);
          }
        );

        kakao.maps.event.addListener(
          clickLine,
          "mousemove",
          function (mouseEvent) {
            routeOverlay.setPosition(mouseEvent.latLng);
            routeOverlay.setMap(map);
          }
        );

        kakao.maps.event.addListener(clickLine, "mouseout", function () {
          clickLine.setOptions({
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#1976d2", // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
          });
          // line에 mouseover시 [시작지점명->도착지점명] 표기
          routeOverlay.setMap(null);
        });

        kakao.maps.event.addListener(clickLine, "click", function () {
          window.open(route.routeMapUrlList[index - 1]);
        });
      };

      setLineMouseOver(clickLine, lastPointName, routeDetail.placeName);
      lastPointName = routeDetail.placeName;
    });
  };

  useEffect(() => {
    if (route !== null) {
      setKakaoMap();
    }
  }, [route]);

  return (
    <Container>
      <div id="routeMap" style={{ minWidth: "100%", height: "600px" }}></div>
    </Container>
  );
}
