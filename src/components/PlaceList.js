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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlaceList = ({ placeList, type, limit = 999 }) => {
  const history = useNavigate();
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
          <Button size="small" variant="contained">
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
            index < limit ? (
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
