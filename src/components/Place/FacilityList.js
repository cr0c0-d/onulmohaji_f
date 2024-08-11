import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  Divider,
  Container,
  Button,
  Box,
  Chip,
  IconButton,
  Skeleton,
  Slider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useNavigate } from "react-router-dom";
import { useRoute } from "../../RouteContext";
import { useAuthAPI } from "../../AuthAPI";
import { useUser } from "../../UserContext";
import { useSearchContext } from "../../SearchContext";

const FacilityList = ({ facilityList, type, typeName, limit = 999 }) => {
  const [showLimit, setShowLimit] = useState(limit);
  const history = useNavigate();
  const { route, setRoute, routeDate, setRouteDate, getRoute } = useRoute();
  const AuthAPI = useAuthAPI();
  const { userInfo } = useUser();
  const { searchInfo, setSearchInfo } = useSearchContext();

  const addRouteDetail = (placeId) => {
    AuthAPI({
      url: "/api/routeDetail",
      method: "POST",
      data: {
        placeId: placeId,
        placeType: type,
        date: routeDate.format("YYYY-MM-DD"),
      },
      success: () => {
        getRoute();
      },
      fail: () => {
        console.log("fail");
      },
    });
  };
  return (
    <Container>
      <br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          width: "100%",
        }}
      >
        <Typography variant="h5">{typeName}</Typography>

        {facilityList ? (
          facilityList.length < 5 ? (
            ""
          ) : limit !== 999 ? (
            showLimit !== 999 ? (
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  history(`/facility/list/${type}`);
                }}
              >
                전체보기
              </Button>
            ) : (
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  setShowLimit(4);
                }}
              >
                접기
              </Button>
            )
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </Box>
      <Divider variant="middle" />
      <br />

      <Grid container spacing={3}>
        {facilityList === null ? (
          Array.from({ length: 4 }, (_, index) => index).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <Skeleton variant="rectangular" sx={{ height: 300 }} />
                <CardContent>
                  <Typography gutterBottom variant="body1">
                    <Skeleton />
                  </Typography>
                  <Typography variant="body2">
                    <Skeleton />
                  </Typography>
                  <Typography variant="body2">
                    <Skeleton />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : facilityList.length === 0 ? (
          <Grid item sx={{ alignContent: "center", width: "100%" }}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="body1">검색 결과가 없습니다.</Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          facilityList.map((facility, index) =>
            index < limit ? (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(facility.placeUrl)}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={
                      facility.thumbnail ||
                      process.env.REACT_APP_DEFAULT_IMAGE_URL
                    }
                    alt={facility.placeName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      <Chip label={facility.placeTypeName} />{" "}
                      {facility.placeName}
                    </Typography>

                    {searchInfo.criteriaPlace == null ? (
                      ""
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        <Chip
                          label={
                            facility.distance > 999
                              ? (facility.distance / 1000)
                                  .toString()
                                  .substring(0, 3) + "km"
                              : facility.distance + "m"
                          }
                          size="small"
                          variant="outlined"
                        />
                      </Typography>
                    )}
                  </CardContent>
                  <CardContent sx={{ padding: "0px 16px" }}>
                    <Chip
                      icon={<StarIcon />}
                      label={
                        facility.scoresum != null &&
                        facility.scorecnt != null &&
                        facility.scoresum !== 0 &&
                        facility.scorecnt !== 0
                          ? Math.floor(
                              (facility.scoresum / facility.scorecnt) * 10
                            ) /
                              10 +
                            " (" +
                            facility.scorecnt +
                            ")"
                          : "별점 정보 없음"
                      }
                      size="small"
                      color="warning"
                    />
                  </CardContent>
                  <CardContent>
                    <Chip
                      icon={<PlaylistAddIcon />}
                      label="일정에 추가"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (userInfo.id !== undefined) {
                          addRouteDetail(facility.id);
                        } else {
                          history("/login");
                        }
                      }}
                    />{" "}
                    <Chip
                      icon={<LocationSearchingIcon />}
                      label="주변 검색"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSearchInfo({
                          ...searchInfo,
                          criteriaPlace: facility,
                        });
                        history("/");
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              ""
            )
          )
        )}
      </Grid>
      <br />
    </Container>
  );
};

export default FacilityList;
