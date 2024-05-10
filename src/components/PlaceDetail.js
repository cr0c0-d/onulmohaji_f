import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceDetail({ placeDetail }) {
  const [detail, setDetail] = useState(null);

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

  return (
    <Container>
      {detail !== null ? (
        <Grid container spacing={2}>
          <Grid item>
            <img src={detail.imageList[0]} style={{ width: 300 }} />
            {detail.imageList.length > 1 ? (
              <div>
                {detail.imageList.map((image, index) => (
                  <img key={index} src={image} style={{ width: 80 }} />
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

          <Grid item>{detail.contents1}</Grid>
          <Grid item>{detail.contents2}</Grid>
        </Grid>
      ) : (
        ""
      )}
    </Container>
  );
}

export default PlaceDetail;
