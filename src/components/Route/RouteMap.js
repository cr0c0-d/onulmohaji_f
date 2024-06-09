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

    const setCenterPoint = () => {
      let sumLatitude = 0;
      let sumLongitude = 0;

      route.routeDetailList.map((routeDetail) => {
        sumLatitude += routeDetail.latitude;
        sumLongitude += routeDetail.longitude;
      });

      const avgLatitude = sumLatitude / route.routeDetailList.length;
      const avgLongtidue = sumLongitude / route.routeDetailList.length;

      map.setCenter(new kakao.maps.LatLng(avgLatitude, avgLongtidue));
    };
    setCenterPoint();

    const setPoints = () => {
      const positionList = []; // 직전 장소, 현재 장소가 저장되는 배열
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

        // 인포윈도우를 생성하고 지도에 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          map: map, // 인포윈도우가 표시될 지도
          position: thisPosition,
          content: `<div style="padding:5px;">${index + 1}. ${
            routeDetail.placeName
          }</div>`,
          // content:
          //   `<div style="width:230px; height: 80px; display:block; padding: 5px;">` +
          //   `<div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-vn7o6b-MuiPaper-root-MuiCard-root">` +
          //   `<img class="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img css-vf01qm-MuiCardMedia-root" src=${
          //     routeDetail.thumbnail ||
          //     process.env.REACT_APP_DEFAULT_SMALL_IMAGE_URL
          //   } alt="${routeDetail.placeName}">` +
          //   `<div class="MuiCardContent-root css-46bh2p-MuiCardContent-root" style="width: 100%;">` +
          //   `<div class="MuiStack-root css-nen11g-MuiStack-root">` +
          //   `<div class="MuiTypography-root MuiTypography-body2 MuiTypography-gutterBottom css-151rudg-MuiTypography-root">${routeDetail.placeName}</div>` +
          //   `<div class="MuiChip-root MuiChip-outlined MuiChip-sizeSmall MuiChip-colorDefault MuiChip-outlinedDefault css-162q9x6-MuiChip-root" style="display:inline-flex;">` +
          //   `<span class="MuiChip-label MuiChip-labelSmall css-rrn746-MuiChip-label">${routeDetail.placeTypeName}</span>` +
          //   `</div></div></div></div></div>`,

          removable: false,
        });
        infowindow.setMap(map);

        if (positionList.length != 2) {
          lastPointName = routeDetail.placeName;
          return;
        }
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

        const setLineMouseOver = (clickLine, lastPointName, thisPointName) => {
          const pathList = clickLine.getPath();
          const infowindowLat =
            (pathList[0].getLat() + pathList[1].getLat()) / 2;
          const infowindowLng =
            (pathList[0].getLng() + pathList[1].getLng()) / 2;

          var routeOverlay = new kakao.maps.CustomOverlay({
            map: map, // 커스텀오버레이를 표시할 지도입니다
            content: `<div style="padding:5px; border:1px solid black; background-color:white;">${lastPointName} → ${thisPointName}</div>`, // 커스텀오버레이에 표시할 내용입니다
            position: new kakao.maps.LatLng(infowindowLat, infowindowLng), // 커스텀오버레이를 표시할 위치입니다.
            xAnchor: -0.1,
            yAnchor: -0.1,
            zIndex: 3,
          });

          // var infowindow = new kakao.maps.InfoWindow({
          //   map: map, // 인포윈도우가 표시될 지도
          //   position: new kakao.maps.LatLng(infowindowLat, infowindowLng),
          //   content: `<div style="padding:5px;">${lastPointName} → ${thisPointName}</div>`,
          //   removable: false,
          // });
          routeOverlay.setMap(null);

          kakao.maps.event.addListener(
            clickLine,
            "mouseover",
            function (mouseEvent) {
              clickLine.setOptions({
                strokeWeight: 5, // 선의 두께입니다
                strokeColor: "#db4040", // 선의 색깔입니다
                strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle: "solid", // 선의 스타일입니다
              });
              routeOverlay.setPosition(mouseEvent.latLng);
              //infowindow.setPosition(mouseEvent.latLng);
              // line에 mouseover시 [시작지점명->도착지점명] 표기
              routeOverlay.setMap(map);
            }
          );

          kakao.maps.event.addListener(
            clickLine,
            "mousemove",
            function (mouseEvent) {
              routeOverlay.setPosition(mouseEvent.latLng);
              //infowindow.setPosition(mouseEvent.latLng);
              // line에 mouseover시 [시작지점명->도착지점명] 표기
              routeOverlay.setMap(map);
            }
          );

          kakao.maps.event.addListener(clickLine, "mouseout", function () {
            clickLine.setOptions({
              strokeWeight: 3, // 선의 두께입니다
              strokeColor: "#db4040", // 선의 색깔입니다
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
    setPoints();

    const setMapBounds = () => {
      while (true) {
        let bounds = map.getBounds();
        console.log("bounds");
        console.log(bounds);

        let isOk = true;

        route.routeDetailList.map((routeDetail) => {
          if (
            bounds.ha < routeDetail.longitude &&
            routeDetail.longitude < bounds.oa &&
            bounds.qa < routeDetail.latitude &&
            routeDetail.latitude < bounds.pa
          ) {
            console.log(
              `${bounds.ha} < ${routeDetail.longitude} < ${bounds.oa}`
            );
            console.log(
              `${bounds.qa} < ${routeDetail.latitude} < ${bounds.pa}`
            );
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
    setMapBounds();
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
