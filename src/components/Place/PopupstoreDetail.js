import {
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
  Box,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PaymentsIcon from "@mui/icons-material/Payments";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PetsIcon from "@mui/icons-material/Pets";
import FaceIcon from "@mui/icons-material/Face";
import WifiIcon from "@mui/icons-material/Wifi";
import { useState } from "react";

function PopupstoreDetail({ detail }) {
  return (
    <Container sx={{ width: "100%" }}>
      {detail !== null ? (
        <Stack>
          <Grid container spacing={2} sx={{ display: "flex" }}>
            <Grid item xs={3}>
              <img
                src={detail.thumbnail}
                style={{ width: "100%" }}
                alt={detail.placeName}
              />
            </Grid>

            {/* 이미지 클릭하여 크게 보는 부분(contents 하단으로 옮김 - 주석처리)*/}
            {/* <Grid item>
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
            </Grid> */}
            <Grid item xs={9}>
              <Typography gutterBottom variant="h3" component="div">
                {detail.placeName}
              </Typography>

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
              <br />
              {detail !== null ? <PopupInfo detail={detail} /> : ""}
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

function PopupInfo(detail) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <TimeToLeaveIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={detail.parking === 0 ? "주차불가" : "주차가능"}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PaymentsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`입장료 ${detail.free === 0 ? "유료" : "무료"}`}
        />
      </ListItem>
      {detail.noKids === 1 ? (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ChildCareIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="노키즈존" />
        </ListItem>
      ) : (
        ""
      )}
      {detail.food === 1 ? (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FastfoodIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="음식물 반입금지" />
        </ListItem>
      ) : (
        ""
      )}
      {detail.pet === 1 ? (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PetsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="반려동물 불가" />
        </ListItem>
      ) : (
        ""
      )}
      {detail.adult === 1 ? (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="성인만 가능" />
        </ListItem>
      ) : (
        ""
      )}
      {detail.wifi === 1 ? (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WifiIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="와이파이 지원" />
        </ListItem>
      ) : (
        ""
      )}
      {detail.wifi === 1 ? (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WifiIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="와이파이 지원" />
        </ListItem>
      ) : (
        ""
      )}
    </List>
  );
}

export default PopupstoreDetail;
