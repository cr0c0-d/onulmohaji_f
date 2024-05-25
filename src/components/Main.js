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
} from "@mui/material";
import dayjs from "dayjs";
import PlaceList from "./PlaceList";
import { useUser } from "../UserContext";
import { useRoute } from "../RouteContext";
import { useSearchContext } from "../SearchContext";

function Main() {
  const {
    searchInfo,
    setSearchInfo,
    localcodes,
    pickedLocal_1,
    setPickedLocal_1,
    exhibition,
    popupstore,
  } = useSearchContext();

  return (
    <Container>
      {searchInfo !== undefined ? (
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
                <InputLabel id="demo-simple-select-label">
                  지역 대분류
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
                <InputLabel id="demo-simple-select-label">
                  지역 소분류
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={searchInfo.localcode}
                  label="Age"
                  onChange={(e) => {
                    setSearchInfo({ ...searchInfo, localcode: e.target.value });
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

          {exhibition != null ? (
            <Grid item>
              <PlaceList placeList={exhibition} type="exhibition" limit="4" />
            </Grid>
          ) : (
            ""
          )}

          {popupstore != null ? (
            <Grid item>
              <PlaceList placeList={popupstore} type="popup" limit="4" />
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      ) : (
        ""
      )}
    </Container>
  );
}

export default Main;
