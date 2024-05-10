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

function Main() {
  const [pickedDate, setPickedDate] = useState(dayjs(new Date()));
  const [popupstore, setPopupstore] = useState(null);
  const [exhibition, setExhibition] = useState(null);
  const [localcodes, setLocalcodes] = useState(null);
  const [pickedLocal_1, setPickedLocal_1] = useState(null);
  const [pickedLocal_2, setPickedLocal_2] = useState(null);

  const [showAllP, setShowAllP] = useState(false);
  const [showAllE, setShowAllE] = useState(false);

  const getLocalcodes = async () => {
    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/localcode`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (axiosResponse) {
      setLocalcodes(axiosResponse.data);
    }
  };

  useEffect(() => {
    getLocalcodes();
  }, []);

  useEffect(() => {
    if (localcodes !== null) {
      // 로그인 회원정보의 지역정보 불러오는 로직
      // 로그인정보가 없거나 회원정보에 지역 정보가 없으면
      setPickedLocal_1(11);
      setPickedLocal_2(11680);
    }
  }, [localcodes]);

  const getExhibitionList = async () => {
    const axiosResponse = await axios({
      url: `${
        process.env.REACT_APP_API_ROOT
      }/api/exhibition/list?date=${pickedDate.format(
        "YYYY-MM-DD"
      )}&localcodeId=${pickedLocal_2}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (axiosResponse) {
      setExhibition(axiosResponse.data);
    }
  };

  const getPopupstoreList = async () => {
    const axiosResponse = await axios({
      url: `${
        process.env.REACT_APP_API_ROOT
      }/api/popup/list?date=${pickedDate.format(
        "YYYY-MM-DD"
      )}&localcodeId=${pickedLocal_2}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (axiosResponse) {
      setPopupstore(axiosResponse.data);
    }
  };
  useEffect(() => {
    if (pickedDate !== null && pickedLocal_2 !== null) {
      getPopupstoreList();
      getExhibitionList();
    }
  }, [pickedDate, pickedLocal_2]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item>
          <DatePicker
            label="날짜"
            format="YYYY-MM-DD"
            value={dayjs(pickedDate)}
            // minDate={today}
            minDate={dayjs(new Date())}
            onChange={(newValue) => setPickedDate(newValue)}
            // defaultValue={dayjs(
            //   "2022-04-17"
            //   //`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
            // )}
          />
        </Grid>

        {localcodes && pickedLocal_1 ? (
          <Grid item>
            <FormControl>
              <InputLabel id="demo-simple-select-label">지역 대분류</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pickedLocal_1}
                label="Age"
                onChange={(e) => {
                  setPickedLocal_1(e.target.value);

                  setPickedLocal_2(
                    localcodes.find((obj) => obj.parentId === e.target.value).id
                  );
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
              <InputLabel id="demo-simple-select-label">지역 소분류</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pickedLocal_2}
                label="Age"
                onChange={(e) => {
                  setPickedLocal_2(e.target.value);
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
    </Container>
  );
}

export default Main;
