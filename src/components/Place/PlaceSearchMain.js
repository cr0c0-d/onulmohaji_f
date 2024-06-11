import axios from "axios";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Container,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Input,
  Button,
  FormControlLabel,
  Checkbox,
  Stack,
  Slider,
  Box,
  IconButton,
  Typography,
  FormLabel,
} from "@mui/material";
import dayjs from "dayjs";
import PlaceList from "./PlaceList";
import { useSearchContext } from "../../SearchContext";
import { CheckBox } from "@mui/icons-material";
import FacilityList from "./FacilityList";
import PlaceInfoSmall from "./PlaceInfoSmall";
import ClearIcon from "@mui/icons-material/Clear";
import PlaceSearchInfo from "./PlaceSearchInfo";

function PlaceSearchMain() {
  const {
    searchInfo,
    setSearchInfo,
    localcodes,
    pickedLocal_1,
    setPickedLocal_1,
    festival,
    exhibition,
    popupstore,
    facility,
  } = useSearchContext();

  return (
    <Container>
      {searchInfo !== undefined ? (
        <Stack spacing={5}>
          <PlaceSearchInfo />

          {festival !== null && festival.length !== 0 ? (
            <Box>
              <PlaceList placeList={festival} type="festival" limit="4" />
            </Box>
          ) : (
            ""
          )}

          {exhibition !== null && exhibition.length !== 0 ? (
            <Box>
              <PlaceList placeList={exhibition} type="exhibition" limit="4" />
            </Box>
          ) : (
            ""
          )}

          {popupstore !== null && popupstore.length !== 0 ? (
            <Box>
              <PlaceList placeList={popupstore} type="popup" limit="4" />
            </Box>
          ) : (
            ""
          )}

          {facility !== null && facility.length !== 0 ? (
            <Box>
              <FacilityList
                facilityList={facility}
                type="facility"
                typeName="시설"
                limit={4}
              />
            </Box>
          ) : (
            ""
          )}
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
}

export default PlaceSearchMain;
