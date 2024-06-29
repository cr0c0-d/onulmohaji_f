import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRoute } from "../../RouteContext";
import { useUser } from "../../UserContext";
import { useSearchContext } from "../../SearchContext";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export default function CustomPlaceSmall({
  placeDetail,
  rightButton,
  openDialog,
}) {
  const history = useNavigate();
  const { addRouteDetail } = useRoute();
  const { searchInfo, setSearchInfo } = useSearchContext();
  const { userInfo } = useUser();
  return (
    <Card
      sx={{
        display: "flex",
        cursor: "pointer",
      }}
    >
      {placeDetail.placeType === "custom" ? (
        ""
      ) : (
        <CardMedia
          component="img"
          sx={{ width: 50 }}
          image={
            placeDetail.thumbnail ||
            process.env.REACT_APP_DEFAULT_SMALL_IMAGE_URL
          }
          alt={placeDetail.placeName}
        />
      )}

      <CardContent style={{ width: "100%" }}>
        <Stack>
          <Typography gutterBottom variant="body2" component="div">
            {placeDetail.placeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {placeDetail.placeType === "custom" ? (
              placeDetail.address || placeDetail.addressRoad
            ) : (
              <Chip
                label={placeDetail.placeTypeName}
                size="small"
                variant="outlined"
              />
            )}
          </Typography>
          {openDialog !== undefined ? (
            <Box sx={{ display: "inline" }}>
              <Chip
                icon={<PlaylistAddIcon />}
                label="일정에 추가"
                variant="outlined"
                color="primary"
                size="small"
                onClick={(event) => {
                  event.stopPropagation();

                  addRouteDetail(placeDetail.placeId, placeDetail.placeType);
                }}
              />

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
                    criteriaPlace: placeDetail,
                  });
                  history("/");
                }}
              />
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </CardContent>
      <CardContent
        style={{
          display: "flex",
          width: 40,
          justifyContent: "flex-end",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {rightButton}
      </CardContent>
    </Card>
  );
}
