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
} from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useNavigate } from "react-router-dom";
import { useAuthAPI } from "../AuthAPI";
import { useRoute } from "../RouteContext";

const PlaceList = ({ placeList, type, limit = 999, date }) => {
  const [showLimit, setShowLimit] = useState(limit);
  const history = useNavigate();
  const AuthAPI = useAuthAPI();
  const { route, setRoute, routeDate, setRouteDate, getRoute } = useRoute();

  const addRouteDetail = (placeId) => {
    AuthAPI({
      url: "/api/routeDetail",
      method: "POST",
      data: {
        placeId: placeId,
        placeType: type,
        date: date,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Typography variant="h5">
          {type === "exhibition"
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
              setShowLimit(999);
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
        <Grid container spacing={3}>
          {placeList.map((place, index) =>
            index < showLimit ? (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  style={{ cursor: "pointer" }}
                  onClick={() => history(`/${type}/${place.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={place.thumbnails}
                    alt={place.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      {place.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {place.address_short}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {place.startDate} ~ {place.endDate}
                    </Typography>
                  </CardContent>
                </Card>
                <IconButton
                  onClick={() => addRouteDetail(place.id)}
                  color="inherit"
                >
                  <PlaylistAddIcon />
                </IconButton>
              </Grid>
            ) : (
              ""
            )
          )}
        </Grid>
      </Container>
    </Container>
  );
};

export default PlaceList;
