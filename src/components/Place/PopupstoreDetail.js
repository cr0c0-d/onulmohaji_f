import {
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";

function PopupstoreDetail({ detail }) {
  return (
    <Container sx={{ width: "100%" }}>
      {detail !== null ? (
        <Stack>
          <Grid container spacing={2} sx={{ display: "flex" }}>
            <Grid item>
              <img
                id="img_big"
                src={detail.imageList[0]}
                style={{ width: 300 }}
                alt={detail.title}
              />
              {detail.imageList.length > 1 ? (
                <div>
                  {detail.imageList.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      style={{ width: 80, cursor: "pointer" }}
                      alt={index}
                      onClick={() => {
                        document
                          .getElementById("img_big")
                          .setAttribute("src", image);
                      }}
                    />
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
                {detail.placeUrl !== undefined && detail.placeUrl !== "" ? (
                  <a href={detail.placeUrl} target="_blank">
                    홈페이지
                  </a>
                ) : (
                  ""
                )}
              </Typography>
              {detail.url !== "" ? (
                <Typography gutterBottom variant="body1" component="div">
                  <a href={detail.url} target="_blank">
                    링크2
                  </a>
                </Typography>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Stack spacing={3}>
              {detail.contents1 !== null && detail.contents1.length > 0 ? (
                <Card>
                  <CardContent>
                    <div
                      dangerouslySetInnerHTML={{ __html: detail.contents1 }}
                    ></div>
                  </CardContent>
                </Card>
              ) : (
                ""
              )}
              <br />
              {detail.contents2 !== null && detail.contents2.length > 0 ? (
                <Card>
                  <CardContent>
                    <div
                      dangerouslySetInnerHTML={{ __html: detail.contents2 }}
                    ></div>
                  </CardContent>
                </Card>
              ) : (
                ""
              )}
            </Stack>
          </Grid>
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
}

export default PopupstoreDetail;
