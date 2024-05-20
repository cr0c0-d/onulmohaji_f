import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  Stack,
  Typography,
  Chip,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import RouteIcon from "@mui/icons-material/Route";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useEffect, useState } from "react";
import { useAuthAPI } from "../AuthAPI";
import { useUser } from "../UserContext";
import { useRoute } from "../RouteContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import SouthIcon from "@mui/icons-material/South";
import MapIcon from "@mui/icons-material/Map";

export default function RouteDraggable() {
  /********************************************* 상태관리, 변수 선언 ***************************************************/
  // route 정보
  const { route, setRoute, routeDate, setRouteDate, getRoute } = useRoute();
  // route 모드 ->  editOrder : 순서 변경 / remove : 삭제 / showRoute : 경로 보기
  const [mode, setMode] = useState("editOrder");
  const { userInfo } = useUser();
  const AuthAPI = useAuthAPI();

  const saveRouteDetailOrder = (routeDetailList) => {
    AuthAPI({
      url: `/api/route`,
      method: "PUT",
      data: routeDetailList,
      success: () => {
        console.log("success");
      },
      fail: () => {
        console.log("fail");
      },
    });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const routeDetailList = Array.from(route.routeDetailList);
    const [reorderedItem] = routeDetailList.splice(result.source.index - 1, 1);
    routeDetailList.splice(result.destination.index - 1, 0, reorderedItem);
    var index = 1;
    for (var i = 0; i < routeDetailList.length; i++) {
      var detail = routeDetailList[i];
      detail = { ...detail, orderNo: i + 1 };
      routeDetailList[i] = detail;
    }

    setRoute({ ...route, routeDetailList: routeDetailList });

    saveRouteDetailOrder(routeDetailList);
  };

  return (
    <Container>
      <br />
      <Stack>
        {userInfo === null || userInfo.id === undefined ? (
          <Typography>로그인 시 날짜별 계획을 관리할 수 있습니다.</Typography>
        ) : (
          <Card>
            <CardHeader
              avatar={
                <Avatar>
                  <RouteIcon />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={`${routeDate.format("M월 D일")}의 일정`}
            />
            <CardContent>
              <ToggleButtonGroup
                color="primary"
                size="small"
                value={mode}
                onChange={(event, newMode) => {
                  if (newMode !== null) {
                    setMode(newMode);
                  }
                }}
                exclusive="true"
              >
                <ToggleButton value="editOrder" key="editOrder">
                  <DehazeIcon />
                  순서 변경
                </ToggleButton>
                ,
                <ToggleButton value="remove" key="remove">
                  <DeleteIcon />
                  삭제
                </ToggleButton>
                ,
                <ToggleButton value="showRoute" key="showRoute">
                  <MapIcon />
                  경로 보기
                </ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
            {route !== null ? (
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="route.routeDetailList">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {route.routeDetailList.map((routeDetail, index) => (
                        <Draggable
                          key={routeDetail.orderNo}
                          draggableId={routeDetail.orderNo.toString()}
                          index={index + 1}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                            >
                              <Card sx={{ display: "flex" }}>
                                <CardMedia
                                  component="img"
                                  sx={{ width: 50 }}
                                  image={routeDetail.thumbnail}
                                  alt="routeDetail.placeName"
                                />
                                <CardContent style={{ width: "100%" }}>
                                  <Stack>
                                    <Typography
                                      gutterBottom
                                      variant="body2"
                                      component="div"
                                    >
                                      {routeDetail.placeName}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      <Chip
                                        label={routeDetail.placeTypeName}
                                        size="small"
                                        variant="outlined"
                                      />
                                    </Typography>
                                  </Stack>
                                </CardContent>
                                <CardContent
                                  style={{
                                    display: "flex",
                                    width: 40,
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  {mode === "editOrder" ? (
                                    <IconButton {...provided.dragHandleProps}>
                                      <DehazeIcon />
                                    </IconButton>
                                  ) : mode === "remove" ? (
                                    <IconButton color="error">
                                      <DeleteIcon />
                                    </IconButton>
                                  ) : (
                                    ""
                                  )}
                                </CardContent>
                              </Card>
                              {mode === "showRoute" &&
                              index + 1 !== route.routeDetailList.length ? (
                                <CardContent sx={{ textAlign: "center" }}>
                                  <Button
                                    startIcon={<SouthIcon />}
                                    variant="contained"
                                    onClick={() =>
                                      window.open(route.routeMapUrlList[index])
                                    }
                                  >
                                    경로 보기
                                  </Button>
                                </CardContent>
                              ) : (
                                ""
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <CardContent>일정이 아직 없습니다.</CardContent>
            )}
          </Card>
        )}
      </Stack>
      <br />
    </Container>
  );
}
