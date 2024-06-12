import { DatePicker } from "@mui/x-date-pickers";
import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Input,
  Button,
  IconButton,
  Stack,
  FormLabel,
  InputAdornment,
} from "@mui/material";
import dayjs from "dayjs";
import { useSearchContext } from "../../SearchContext";
import PlaceInfoSmall from "./PlaceInfoSmall";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
export default function PlaceSearchInfo() {
  const [inputKeyword, setInputKeyword] = useState("");
  const {
    searchInfo,
    setSearchInfo,
    localcodes,
    pickedLocal_1,
    setPickedLocal_1,
  } = useSearchContext();
  return (
    <Stack spacing={3}>
      <Grid container spacing={4}>
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
            sx={{ maxWidth: "160px" }}
          />
        </Grid>

        {localcodes && pickedLocal_1 ? (
          <Grid item>
            <FormControl
              disabled={searchInfo.criteriaPlace !== null ? true : false}
            >
              <InputLabel id="label_pickedLocal_1">지역 대분류</InputLabel>
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
            <FormControl
              disabled={searchInfo.criteriaPlace !== null ? true : false}
            >
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
            <Input
              type="text"
              id="input_keyword"
              value={inputKeyword}
              onChange={(e) => {
                setInputKeyword(e.target.value);
              }}
              onKeyDownCapture={(e) => {
                if (e.code === "Enter") {
                  setSearchInfo({
                    ...searchInfo,
                    keyword: inputKeyword,
                  });
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setInputKeyword("");
                      setSearchInfo({ ...searchInfo, keyword: "" });
                    }}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSearchInfo({
                ...searchInfo,
                keyword: inputKeyword,
              });
            }}
          >
            검색
          </Button>
        </Grid>
      </Grid>
      {searchInfo.criteriaPlace !== null ? (
        <Grid container spacing={4}>
          <Grid item>
            <FormControl>
              <FormLabel>현재 검색 기준 장소</FormLabel>
              <PlaceInfoSmall
                placeDetail={searchInfo.criteriaPlace}
                rightButton={
                  <IconButton
                    onClick={() =>
                      setSearchInfo({ ...searchInfo, criteriaPlace: null })
                    }
                  >
                    <ClearIcon />
                  </IconButton>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </Stack>
  );
}
