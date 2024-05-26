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
} from "@mui/material";
import dayjs from "dayjs";
import PlaceList from "./PlaceList";
import { useSearchContext } from "../SearchContext";
import { CheckBox } from "@mui/icons-material";
import FacilityList from "./FacilityList";

function Main() {
  const {
    searchInfo,
    setSearchInfo,
    localcodes,
    pickedLocal_1,
    setPickedLocal_1,
    exhibition,
    popupstore,
    facility,
  } = useSearchContext();

  return (
    <Container>
      <Stack spacing={3}>
        {searchInfo !== undefined ? (
          <div>
            <Grid container spacing={2}>
              <Grid item>
                <DatePicker
                  label="날짜"
                  format="YYYY-MM-DD"
                  value={dayjs(searchInfo.date)}
                  // minDate={today}
                  minDate={dayjs(new Date())}
                  onChange={(newValue) =>
                    setSearchInfo({ ...searchInfo, date: newValue })
                  }
                  // defaultValue={dayjs(
                  //   "2022-04-17"
                  //   //`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
                  // )}
                />
              </Grid>

              {localcodes && pickedLocal_1 ? (
                <Grid item>
                  <FormControl>
                    <InputLabel id="label_pickedLocal_1">
                      지역 대분류
                    </InputLabel>
                    <Select
                      labelId="label_pickedLocal_1"
                      value={pickedLocal_1}
                      label="Age"
                      onChange={(e) => {
                        setPickedLocal_1(e.target.value);

                        setSearchInfo({
                          ...searchInfo,
                          localcode: localcodes.find(
                            (obj) => obj.parentId === e.target.value
                          ).id,
                        });
                      }}
                    >
                      {localcodes.map((localcode) =>
                        localcode.localLevel === 0 ? (
                          <MenuItem key={localcode.id} value={localcode.id}>
                            {localcode.name}
                          </MenuItem>
                        ) : (
                          ""
                        )
                      )}
                    </Select>
                  </FormControl>{" "}
                  <FormControl>
                    <InputLabel id="label_localcode">지역 소분류</InputLabel>
                    <Select
                      labelId="label_localcode"
                      value={searchInfo.localcode}
                      label="Age"
                      onChange={(e) => {
                        setSearchInfo({
                          ...searchInfo,
                          localcode: e.target.value,
                        });
                      }}
                    >
                      {localcodes.map((localcode) =>
                        localcode.localLevel === 1 &&
                        localcode.parentId === pickedLocal_1 ? (
                          <MenuItem key={localcode.id} value={localcode.id}>
                            {localcode.name}
                          </MenuItem>
                        ) : (
                          ""
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              ) : (
                ""
              )}
              <Grid item>
                <FormControl>
                  <InputLabel>검색어</InputLabel>
                  <Input type="text" id="input_keyword" />
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSearchInfo({
                      ...searchInfo,
                      keyword: document.getElementById("input_keyword").value,
                    });
                  }}
                >
                  검색
                </Button>
              </Grid>
            </Grid>

            {exhibition !== null && exhibition.length !== 0 ? (
              <div>
                <PlaceList placeList={exhibition} type="exhibition" limit="4" />
              </div>
            ) : (
              ""
            )}

            {popupstore !== null && popupstore.length !== 0 ? (
              <div>
                <PlaceList placeList={popupstore} type="popup" limit="4" />
              </div>
            ) : (
              ""
            )}

            {facility !== null && facility.length !== 0 ? (
              <div>
                <FacilityList
                  facilityList={facility}
                  type="facility"
                  typeName="시설"
                  limit={4}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </Stack>
    </Container>
  );
}

export default Main;
