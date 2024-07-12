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
import PaymentsIcon from "@mui/icons-material/Payments";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import LinkIcon from "@mui/icons-material/Link";
import CallIcon from "@mui/icons-material/Call";

import { useEffect, useState } from "react";
import { useUser } from "../../UserContext";
import { useRoute } from "../../RouteContext";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../../SearchContext";

export default function ExhibitionDetail({ detail }) {
  const { userInfo } = useUser();
  const { addRouteDetail } = useRoute();
  const history = useNavigate();
  const { searchInfo, setSearchInfo } = useSearchContext();

  return (
    <Container sx={{ width: "100%" }}>
      <br />
      {detail !== null ? (
        <Stack>
          <Typography gutterBottom>
            정보 출처 :{" "}
            <Button
              color="success"
              component="label"
              variant="outlined"
              size="small"
              onClick={() => window.open(`https://www.culture.go.kr/index.do`)}
            >
              문화포털
            </Button>
          </Typography>
          <br />
          <Grid container spacing={2} sx={{ display: "flex" }}>
            <Grid item xl={4}>
              <img
                src={detail.thumbnail}
                style={{ width: "100%" }}
                alt={detail.placeName}
              />
            </Grid>

            <Grid item xl={8}>
              <Stack spacing={2}>
                <Typography gutterBottom variant="h4" component="div">
                  {detail.placeName}{" "}
                  <Chip
                    icon={<PlaylistAddIcon />}
                    label="일정에 추가"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                      if (userInfo.id !== undefined) {
                        addRouteDetail(detail.placeId, "festival");
                      } else {
                        history("/login");
                      }
                    }}
                  />{" "}
                  <Chip
                    icon={<LocationSearchingIcon />}
                    label="주변 검색"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSearchInfo({
                        ...searchInfo,
                        criteriaPlace: detail,
                      });
                      history("/");
                    }}
                  />
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  {detail.startDate} ~ {detail.endDate}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  {detail.address}
                </Typography>
                <Grid item>
                  {detail.placeUrl ? (
                    <Chip
                      icon={<LinkIcon />}
                      label="
                        장소 홈페이지
                      "
                      variant="outlined"
                      onClick={() => {
                        window.open(detail.placeUrl);
                      }}
                    />
                  ) : (
                    ""
                  )}{" "}
                  {detail.url ? (
                    <Chip
                      icon={<LinkIcon />}
                      label="
                        전시회 정보
                      "
                      variant="outlined"
                      onClick={() => {
                        window.open(detail.url);
                      }}
                    />
                  ) : (
                    // <div
                    //   dangerouslySetInnerHTML={{
                    //     __html: detail.homepageUrl,
                    //   }}
                    // ></div>
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
                </Grid>
              </Stack>
            </Grid>
          </Grid>

          <Grid item>
            <br />
            <Stack spacing={3}>
              {detail && (detail.fare || detail.contact) ? (
                <Card>
                  <CardContent>
                    <InfoList detail={detail} />
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
            </Stack>
          </Grid>
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
}

function InfoList({ detail }) {
  const fare = detail.fare.replace("<br>", " / ");
  return (
    <List
      sx={{
        // display: "inline-list-item"
        display: "block",
      }}
    >
      {detail.fare ? (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PaymentsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={fare} />
        </ListItem>
      ) : (
        ""
      )}
      {detail.contact ? (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <CallIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={detail.contact} />
        </ListItem>
      ) : (
        ""
      )}
    </List>
  );
}
