import { TextField, Box, Chip } from "@mui/material";

export default function RouteDetail({ route }) {
  <Box>
    <TextField defaultValue={route.title} label="일정 제목" />
    {route.memberList && route.memberList.length > 0
      ? route.memberList.map((memberName, index) => (
          <Chip label={memberName} variant="outlined" />
        ))
      : ""}
  </Box>;
}
