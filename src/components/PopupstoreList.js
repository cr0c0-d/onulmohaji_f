import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const PopupstoreList = ({ popupstoreList }) => {
  return (
    <Grid container spacing={3}>
      {popupstoreList.map((popupstore, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={popupstore.thumbnails}
              alt={popupstore.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {popupstore.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                장소: {popupstore.topLevelAddress}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {popupstore.startDate} ~ {popupstore.endDate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PopupstoreList;
