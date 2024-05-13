import {
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceDetail({ placeDetail }) {
  const [detail, setDetail] = useState(null);
  const [facilities, setFacilities] = useState(null);
  const { kakao } = window;

  const getPlaceDetail = async () => {
    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api${window.location.pathname}`,
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
  }, []);

  const getFacilities = async () => {
    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/facility?categoryId=FD6&latitude=${detail.gpsY}&longitude=${detail.gpsX}`,
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
      center: new kakao.maps.LatLng(detail.gpsY, detail.gpsX),
      level: 3,
    };

    var map = new kakao.maps.Map(container, options);
  };

  return (
    <Container>
      {detail !== null ? (
        <Grid container spacing={2}>
          <Grid item>
            <img
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
                    style={{ width: 80 }}
                    alt={index}
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
              <Link to={detail.placeUrl}>홈페이지</Link>
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              <Link to={detail.url}>링크2</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Stack>
              {detail.contents1.length > 0 ? (
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
              {detail.contents2.length > 0 ? (
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
          <Grid item>
            <div id="map" style={{ width: "500px", height: "400px" }}></div>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </Container>
  );
}

export default PlaceDetail;
