import { TextField, Box, Chip, Typography } from "@mui/material";
import PlaceInfoSmall from "../Place/PlaceInfoSmall";

export default function RouteDetail({ route }) {
  return (
    <Box>
      <TextField defaultValue={route.title} label="일정 제목" />
      {route.memberList && route.memberList.length > 0 ? (
        <Typography>
          멤버 목록 :
          {route.memberList.map((member) => (
            <Chip label={member.nickname} variant="outlined" key={member.id} />
          ))}
        </Typography>
      ) : (
        ""
      )}

      {route !== null
        ? route.routeDetailList.map((routeDetail) => (
            <PlaceInfoSmall placeDetail={routeDetail} />
          ))
        : ""}
    </Box>
  );
}
