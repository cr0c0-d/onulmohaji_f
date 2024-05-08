import React from "react";
import { Typography, Grid, Paper } from "@mui/material";

export default function Content() {
  const images = [
    /* 이미지 URL 배열 */
  ];

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        갤러리 제목
      </Typography>
      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper>
              <img
                src={image}
                alt={`gallery-${index}`}
                style={{ width: "100%", height: "auto" }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
