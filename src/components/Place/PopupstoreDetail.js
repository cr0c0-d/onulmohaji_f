import {
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";

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
                {detail.placeName}
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
              {detail.imageList !== null && detail.imageList.length > 0
                ? ShowImageList(detail)
                : ""}
            </Stack>
          </Grid>
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
}

function ShowImageList(detail) {
  const [showAll, setShowAll] = useState(false);
  return (
    <Container>
      <div>
        <Box
          id="imageBox"
          sx={{
            height: showAll ? "auto" : "600px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {showAll ? (
            ""
          ) : (
            <div
              id="gradientBox"
              style={{
                top: 0,
                left: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 0,
                background:
                  "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
                pointerEvents: "none",
              }}
            ></div>
          )}

          <Stack>
            {detail.imageList.map((image, index) => (
              <img src={image} style={{ width: "auto" }} key={index} />
            ))}
          </Stack>
        </Box>
      </div>
      <Button
        sx={{ width: "100%" }}
        variant="outlined"
        onClick={() => setShowAll(!showAll)}
        size="large"
      >
        이미지 {showAll ? "접기" : "전체 보기"}
      </Button>
    </Container>
  );
}

export default PopupstoreDetail;
