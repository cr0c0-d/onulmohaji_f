import { useEffect, useState } from "react";
import { Box, Container, Grid, Stack, TextField } from "@mui/material";
import CustomPlaceAddMap from "./CustomPlaceAddMap";
import DaumPostCode from "react-daum-postcode";
import CustomPlaceDetailMap from "./CustomPlaceDetailMap";

export default function CustomPlaceDetail({ customPlace }) {
  return (
    <Box sx={{ padding: "10px", width: "100%" }}>
      <Stack spacing={3}>
        {/* <TextField
          label="장소명"
          value={customPlace.placeName}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="도로명주소"
          value={customPlace.addressRoad}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="지번주소"
          value={customPlace.address}
          InputProps={{
            readOnly: true,
          }}
        /> */}
        <CustomPlaceDetailMap customPlace={customPlace} />
      </Stack>
    </Box>
  );
}
