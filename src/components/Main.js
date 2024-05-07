import axios from "axios";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import PopupstoreList from "./PopupstoreList";

function Main() {
  const [pickedDate, setPickedDate] = useState(dayjs(new Date()));
  const [popupstore, setPopupstore] = useState(null);
  const getPopupstoreList = async () => {
    console.log(pickedDate);
    const axiosResponse = await axios({
      url: `${
        process.env.REACT_APP_API_ROOT
      }/api/popup?date=${pickedDate.format("YYYY-MM-DD")}&localCode=1`,
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
  }, [pickedDate]);

  return (
    <div>
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
      {popupstore != null ? <PopupstoreList popupstoreList={popupstore} /> : ""}
    </div>
  );
}

export default Main;
