import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function PopupstoreDetail() {
  const [detail, setDetail] = useState(null);

  const getPopupstoreDetail = async () => {
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
    getPopupstoreDetail();
  }, []);

  return (
    <Container>
      {detail !== null ? (
        <Grid container spacing={2}>
          <Grid item>
            <img src={detail.imgUrl} />
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
              <Link to={detail.url}>링크</Link>
            </Typography>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </Container>
  );
}

export default PopupstoreDetail;
