import React, { useState } from "react";
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
  IconButton,
  Chip,
} from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useNavigate } from "react-router-dom";
import { useAuthAPI } from "../../AuthAPI";
import { useRoute } from "../../RouteContext";
import { useUser } from "../../UserContext";
import { useSearchContext } from "../../SearchContext";

const PlaceList = ({ placeList, type, limit = 999 }) => {
  const [showLimit, setShowLimit] = useState(limit);
  const history = useNavigate();
  const AuthAPI = useAuthAPI();
  const { route, setRoute, routeDate, setRouteDate, getRoute, addRouteDetail } =
    useRoute();
  const { userInfo } = useUser();
  const { searchInfo, setSearchInfo } = useSearchContext();

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          width: "100%",
        }}
      >
        <Typography variant="h5">
          {type === "festival"
            ? "축제"
            : type === "exhibition"
            ? "전시회 / 공연"
            : type === "popup"
            ? "팝업스토어"
            : ""}
        </Typography>
        {limit !== 999 ? (
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              history(`/${type}/list`);
            }}
          >
            전체보기
          </Button>
        ) : (
          ""
        )}
      </Box>
      <Divider variant="middle" />
      <br />
      <Container>
        {/* {placeList.length === 0 ? (
          <Typography sx={{ width: "100%" }}>검색 결과가 없습니다.</Typography>
        ) : ( */}
        <Grid container spacing={3}>
          {placeList && placeList.length > 0
            ? placeList.map((place, index) =>
                index < showLimit ? (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                      style={{ cursor: "pointer" }}
                      onClick={() => history(`/${type}/${place.placeId}`)}
                    >
                      <CardMedia
                        component="img"
                        height="300"
                        image={place.thumbnail}
                        alt={place.placeName}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="body1"
                          sx={{ fontWeight: "bold" }}
                          component="div"
                        >
                          {place.placeName}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          color="text.secondary"
                        >
                          {place.address_short}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {place.startDate} ~ {place.endDate}
                        </Typography>
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
                              addRouteDetail(place.placeId, type);
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
                              criteriaPlace: place,
                            });
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ) : (
                  ""
                )
              )
            : ""}
        </Grid>
        {/* )} */}
      </Container>
    </Container>
  );
};

export default PlaceList;
