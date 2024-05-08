import axios from "axios";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Box, Grid, Paper, TextField } from "@mui/material";
import dayjs from "dayjs";
import PopupstoreList from "./PopupstoreList";
import ExhibitionList from "./ExhibitionList";
import PlaceList from "./PlaceList";

function Main() {
  const [pickedDate, setPickedDate] = useState(dayjs(new Date()));
  const [popupstore, setPopupstore] = useState(null);
  const [exhibition, setExhibition] = useState(null);

  const [showAllP, setShowAllP] = useState(false);
  const [showAllE, setShowAllE] = useState(false);

  const getExhibitionList = async () => {
    const axiosResponse = await axios({
      url: `${
        process.env.REACT_APP_API_ROOT
      }/api/exhibition/list?date=${pickedDate.format(
        "YYYY-MM-DD"
      )}&localCode=1`,
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
      }/api/popup/list?date=${pickedDate.format("YYYY-MM-DD")}&localCode=1`,
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
    getPopupstoreList();
    getExhibitionList();
  }, [pickedDate]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item>
          <DatePicker
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

        {exhibition != null ? (
          <Grid item>
            <PlaceList placeList={exhibition} title="전시회 / 공연" />
          </Grid>
        ) : (
          ""
        )}

        {popupstore != null ? (
          <Grid item>
            <PlaceList placeList={popupstore} title="팝업스토어" />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Box>
  );
}

export default Main;
