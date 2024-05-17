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
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const FacilityList = ({ facilityList, type, limit = 999 }) => {
  const [showLimit, setShowLimit] = useState(limit);
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
          가까운 {type === "food" ? "식당" : ""} 목록
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
          {facilityList.map((facility, index) =>
            index < showLimit ? (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(facility.placeUrl)}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={facility.thumbnail}
                    alt={facility.placeName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      {facility.placeName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {facility.categoryName}
                    </Typography>

                    <Chip
                      icon={<StarIcon />}
                      label={
                        facility.scoresum !== 0 && facility.scorecnt !== 0
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
                    <Typography variant="body2" color="text.secondary">
                      {facility.distance}m
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

export default FacilityList;
