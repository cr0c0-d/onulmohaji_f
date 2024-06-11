import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PlaceInfoSmall({ placeDetail, rightButton }) {
  const history = useNavigate();
  return (
    <Card
      sx={{
        display: "flex",
        cursor: "pointer",
      }}
      onClick={() => {
        if (
          placeDetail.placeType === "popup" ||
          placeDetail.placeType === "exhibition" ||
          placeDetail.placeType === "festival"
        ) {
          history(placeDetail.placeUrl);
        } else {
          window.open(placeDetail.placeUrl);
        }
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 50 }}
        image={
          placeDetail.thumbnail || process.env.REACT_APP_DEFAULT_SMALL_IMAGE_URL
        }
        alt={placeDetail.placeName}
      />
      <CardContent style={{ width: "100%" }}>
        <Stack>
          <Typography gutterBottom variant="body2" component="div">
            {placeDetail.placeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Chip
              label={placeDetail.placeTypeName}
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
        onClick={(e) => e.stopPropagation()}
      >
        {rightButton}
      </CardContent>
    </Card>
  );
}
