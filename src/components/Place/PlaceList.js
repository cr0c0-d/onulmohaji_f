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
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TurnedInNotTwoToneIcon from "@mui/icons-material/TurnedInNotTwoTone";
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
  const { searchInfo, setSearchInfo, bookmarkList, getBookmarkList } =
    useSearchContext();

  const toggleBookmark = (placeType, placeId) => {
    AuthAPI({
      url: `/api/bookmark`,
      method: "POST",
      data: { placeType: placeType, placeId: placeId },
      success: (response) => {
        getBookmarkList();
      },
      fail: () => {
        console.log("fail");
      },
    });
  };

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
        {placeList.length > 4 && limit !== 999 ? (
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
        {placeList.length === 0 ? (
          <Grid item sx={{ alignContent: "center", width: "100%" }}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="body1">검색 결과가 없습니다.</Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {placeList && placeList.length > 0
              ? placeList.map((place, index) =>
                  index < showLimit ? (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Card
                        style={{ cursor: "pointer", position: "relative" }}
                        onClick={() => history(`/${type}/${place.placeId}`)}
                      >
                        <CardMedia
                          component="img"
                          height="300"
                          image={place.thumbnail}
                          alt={place.placeName}
                        />
                        {/* 북마크 오버레이 이미지 */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            zIndex: 1, // 카드의 다른 요소 위에 표시되도록 z-index 설정
                          }}
                        >
                          <IconButton
                            size="large"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(place.placeType, place.placeId);
                            }}
                          >
                            {bookmarkList != null &&
                            bookmarkList.find(
                              (obj) =>
                                obj.placeId == place.placeId &&
                                obj.placeType == place.placeType
                            ) !== undefined ? (
                              <BookmarkIcon color="primary" />
                            ) : (
                              <TurnedInNotTwoToneIcon />
                            )}
                          </IconButton>
                        </Box>
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
                          {searchInfo.criteriaPlace == null ? (
                            ""
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              <Chip
                                label={
                                  place.distance > 999
                                    ? (place.distance / 1000)
                                        .toString()
                                        .substring(0, 3) + "km"
                                    : place.distance + "m"
                                }
                                size="small"
                                variant="outlined"
                              />
                            </Typography>
                          )}
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
              : ""}
          </Grid>
        )}
      </Container>
    </Container>
  );
};

export default PlaceList;
