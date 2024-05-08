import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

const PlaceList = ({ placeList, title }) => {
  return (
    <div>
      <Paper>
        <h3>{title}</h3>
        <Divider variant="middle" />

        <Grid container spacing={3}>
          {placeList.map((place, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="350"
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
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default PlaceList;
