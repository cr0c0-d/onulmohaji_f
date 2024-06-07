import { Container } from "@mui/material";
import { useRoute } from "../../RouteContext";
import styles from "./RouteMap.css";
import { useEffect } from "react";

export default function RouteMap() {
  const { route } = useRoute();
  const { kakao } = window;

  var drawingFlag = false; // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
  var moveLine; // 선이 그려지고 있을때 마우스 움직임에 따라 그려질 선 객체 입니다
  var clickLine; // 마우스로 클릭한 좌표로 그려질 선 객체입니다
  var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
  var dots = {}; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.

  const setKakaoMap = () => {
    let firstPlace = route.routeDetailList[0];

    var mapContainer = document.getElementById("map"); // 지도를 표시할 div
    let mapOption = {
      center: new kakao.maps.LatLng(firstPlace.latitude, firstPlace.longitude), // 지도의 중심좌표
      level: 7, // 지도의 확대 레벨
    };

    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마우스 드래그로 그려지고 있는 선의 총거리 정보를 표시하거
    // 마우스 오른쪽 클릭으로 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 생성하고 지도에 표시하는 함수입니다
    function showDistance(content, position) {
      if (distanceOverlay) {
        // 커스텀오버레이가 생성된 상태이면

        // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
        distanceOverlay.setPosition(position);
        distanceOverlay.setContent(content);
      } else {
        // 커스텀 오버레이가 생성되지 않은 상태이면

        // 커스텀 오버레이를 생성하고 지도에 표시합니다
        distanceOverlay = new kakao.maps.CustomOverlay({
          map: map, // 커스텀오버레이를 표시할 지도입니다
          content: content, // 커스텀오버레이에 표시할 내용입니다
          position: position, // 커스텀오버레이를 표시할 위치입니다.
          xAnchor: 0,
          yAnchor: 0,
          zIndex: 3,
        });
      }
    }

    // 그려지고 있는 선의 총거리 정보와
    // 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수입니다
    function deleteDistnce() {
      if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
      }
    }

    // 선이 그려지고 있는 상태일 때 지도를 클릭하면 호출하여
    // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 표출하는 함수입니다
    function displayCircleDot(position, distance) {
      // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
      var circleOverlay = new kakao.maps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: position,
        zIndex: 1,
      });

      // 지도에 표시합니다
      circleOverlay.setMap(map);

      if (distance > 0) {
        // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
        var distanceOverlay = new kakao.maps.CustomOverlay({
          content:
            '<div class="dotOverlay">거리 <span class="number">' +
            distance +
            "</span>m</div>",
          position: position,
          yAnchor: 1,
          zIndex: 2,
        });

        // 지도에 표시합니다
        distanceOverlay.setMap(map);
      }

      // 배열에 추가합니다
      dots.push({ circle: circleOverlay, distance: distanceOverlay });
    }

    // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
    function deleteCircleDot() {
      var i;

      for (i = 0; i < dots.length; i++) {
        if (dots[i].circle) {
          dots[i].circle.setMap(null);
        }

        if (dots[i].distance) {
          dots[i].distance.setMap(null);
        }
      }

      dots = [];
    }

    // 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여
    // 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
    // HTML Content를 만들어 리턴하는 함수입니다
    function getTimeHTML(distance) {
      // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
      var walkkTime = (distance / 67) | 0;
      var walkHour = "",
        walkMin = "";

      // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
      if (walkkTime > 60) {
        walkHour =
          '<span class="number">' + Math.floor(walkkTime / 60) + "</span>시간 ";
      }
      walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

      // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
      var bycicleTime = (distance / 227) | 0;
      var bycicleHour = "",
        bycicleMin = "";

      // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
      if (bycicleTime > 60) {
        bycicleHour =
          '<span class="number">' +
          Math.floor(bycicleTime / 60) +
          "</span>시간 ";
      }
      bycicleMin = '<span class="number">' + (bycicleTime % 60) + "</span>분";

      // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
      var content = '<ul class="dotOverlay distanceInfo">';
      content += "    <li>";
      content +=
        '        <span class="label">총거리</span><span class="number">' +
        distance +
        "</span>m";
      content += "    </li>";
      content += "    <li>";
      content += '        <span class="label">도보</span>' + walkHour + walkMin;
      content += "    </li>";
      content += "    <li>";
      content +=
        '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
      content += "    </li>";
      content += "</ul>";

      return content;
    }

    const setPoints = () => {
      const positionList = [];
      route.routeDetailList.map((routeDetail) => {
        positionList.push(
          new kakao.maps.LatLng(routeDetail.latitude, routeDetail.longitude)
        );

        // 인포윈도우를 생성하고 지도에 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          map: map, // 인포윈도우가 표시될 지도
          position: new kakao.maps.LatLng(
            routeDetail.latitude,
            routeDetail.longitude
          ),
          content: `<div style="padding:5px;">${routeDetail.placeName}</div>`,
          removable: false,
        });
        infowindow.setMap(map);
      });

      //   // 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
      clickLine = new kakao.maps.Polyline({
        map: map, // 선을 표시할 지도입니다
        path: positionList, // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
        strokeWeight: 3, // 선의 두께입니다
        strokeColor: "#db4040", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });
      clickLine.setMap(map);
      // // 클릭한 지점에 대한 정보를 지도에 표시합니다
      // displayCircleDot(clickPosition, 0);
    };
    setPoints();
  };

  useEffect(() => {
    if (route !== null) {
      setKakaoMap();
    }
  }, [route]);

  return (
    <Container>
      <div id="map" style={{ minWidth: "100%", height: "400px" }}></div>
    </Container>
  );
}
