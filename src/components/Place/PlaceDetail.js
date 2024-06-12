import {
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
  Card,
  CardContent,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FacilityList from "./FacilityList";
import PopupstoreDetail from "./PopupstoreDetail";

function PlaceDetail({ placeType }) {
  const { placeId } = useParams();
  const [detail, setDetail] = useState(null);
  const [facilities, setFacilities] = useState(null);
  const { kakao } = window;

  const getPlaceDetail = async () => {
    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/${placeType}/${placeId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (axiosResponse) {
      setDetail(axiosResponse.data);
    }
  };

  useEffect(() => {
    getPlaceDetail();
    setFacilities(null);
  }, [placeId]);

  const getFacilities = async (typeCode) => {
    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/facility/place/list?latitude=${detail.latitude}&longitude=${detail.longitude}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (axiosResponse) {
      setFacilities(axiosResponse.data);
    }
  };

  useEffect(() => {
    if (detail) {
      setKakaoMap();
      getFacilities();
    }
  }, [detail]);

  const setKakaoMap = () => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(detail.latitude, detail.longitude),
      level: 3,
    };

    var map = new kakao.maps.Map(container, options);

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(detail.gpsY, detail.gpsX);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  };

  return (
    <Container sx={{ width: "100%" }}>
      {detail === null ? (
        ""
      ) : placeType == "popup" ? (
        <PopupstoreDetail detail={detail} />
      ) : (
        <Stack>
          <Grid container spacing={2} sx={{ display: "flex" }}>
            <Grid item>
              <img
                id="img_big"
                src={detail.imageList[0]}
                style={{ width: 300 }}
                alt={detail.title}
              />
              {detail.imageList.length > 1 ? (
                <div>
                  {detail.imageList.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      style={{ width: 80, cursor: "pointer" }}
                      alt={index}
                      onClick={() => {
                        document
                          .getElementById("img_big")
                          .setAttribute("src", image);
                      }}
                    />
                  ))}
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h3" component="div">
                {detail.title}
              </Typography>
              {detail.subTitle ? (
                <Typography gutterBottom variant="body1" component="div">
                  {detail.startDate} ~ {detail.endDate}
                </Typography>
              ) : (
                ""
              )}
              <Typography gutterBottom variant="body1" component="div">
                {detail.startDate} ~ {detail.endDate}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                장소 : {detail.place} ({detail.address}){" "}
                {detail.placeUrl !== undefined && detail.placeUrl !== "" ? (
                  <a href={detail.placeUrl} target="_blank">
                    홈페이지
                  </a>
                ) : (
                  ""
                )}
              </Typography>
              {detail.url !== "" ? (
                <Typography gutterBottom variant="body1" component="div">
                  <a href={detail.url} target="_blank">
                    링크2
                  </a>
                </Typography>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Stack spacing={3}>
              {detail.contents1 !== null && detail.contents1.length > 0 ? (
                <Card>
                  <CardContent>
                    <div
                      dangerouslySetInnerHTML={{ __html: detail.contents1 }}
                    ></div>
                  </CardContent>
                </Card>
              ) : (
                ""
              )}
              <br />
              {detail.contents2 !== null && detail.contents2.length > 0 ? (
                <Card>
                  <CardContent>
                    <div
                      dangerouslySetInnerHTML={{ __html: detail.contents2 }}
                    ></div>
                  </CardContent>
                </Card>
              ) : (
                ""
              )}
            </Stack>
          </Grid>
        </Stack>
      )}
      {detail !== null ? (
        <Stack spacing={3}>
          <Grid item>
            <div id="map" style={{ minWidth: "100%", height: "400px" }}></div>
          </Grid>

          <Grid container>
            <FacilityList
              facilityList={facilities}
              type="food"
              typeName="음식점"
              limit={4}
            />
          </Grid>
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
}

export default PlaceDetail;
