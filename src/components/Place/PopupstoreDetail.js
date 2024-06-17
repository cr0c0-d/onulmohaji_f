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
  Chip,
} from "@mui/material";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PaymentsIcon from "@mui/icons-material/Payments";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PetsIcon from "@mui/icons-material/Pets";
import FaceIcon from "@mui/icons-material/Face";
import WifiIcon from "@mui/icons-material/Wifi";
import InstagramIcon from "@mui/icons-material/Instagram";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LinkIcon from "@mui/icons-material/Link";

import { useEffect, useState } from "react";

function PopupstoreDetail({ detail }) {
  const getWorkingTime = () => {
    let returnStr = "";
    const workingTimeArr = JSON.parse(detail.workingTime);

    workingTimeArr.map((time) => {
      returnStr += time.day
        ? `<Typography>${time.day} : ${
            time.holiday ? "휴무" : time.startDate + " ~ " + time.endDate
          }</Typography>`
        : "";
    });
    return returnStr;
  };

  return (
    <Container sx={{ width: "100%" }}>
      <br />
      {detail !== null ? (
        <Stack>
          <Grid container spacing={2} sx={{ display: "flex" }}>
            <Grid item xl={4}>
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
            <Grid item xl={8}>
              <Typography gutterBottom variant="h4" component="div">
                {detail.placeName}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                {detail.startDate} ~ {detail.endDate}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                {detail.address}
              </Typography>
              {detail.brandUrl ? (
                <Chip
                  icon={<LinkIcon />}
                  label="브랜드 홈페이지"
                  variant="outlined"
                  onClick={() => {
                    window.open(detail.brandUrl);
                  }}
                />
              ) : (
                ""
              )}{" "}
              {detail.instaUrl ? (
                <Chip
                  icon={<InstagramIcon />}
                  label="인스타그램"
                  variant="outlined"
                  onClick={() => {
                    window.open(detail.instaUrl);
                  }}
                />
              ) : (
                ""
              )}{" "}
              {detail.preRegisterInfo ? (
                <Chip
                  icon={<BookOnlineIcon />}
                  label="온라인 예약"
                  variant="outlined"
                  onClick={() => {
                    window.open(detail.preRegisterInfo.link);
                  }}
                />
              ) : (
                ""
              )}
              {/* 운영시간 */}
              <Card>
                <CardContent>
                  <Stack
                    dangerouslySetInnerHTML={{ __html: getWorkingTime() }}
                  ></Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid item>
            <br />
            <Stack spacing={3}>
              {detail !== null ? (
                <Card>
                  <CardContent>
                    <PopupInfo detail={detail} />
                  </CardContent>
                </Card>
              ) : (
                ""
              )}
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
        이미지 {showAll ? "접기" : "펼치기"}
      </Button>
    </Container>
  );
}

function PopupInfo(detail) {
  return (
    <List sx={{ display: "inline-list-item" }}>
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
    </List>
  );
}

export default PopupstoreDetail;
