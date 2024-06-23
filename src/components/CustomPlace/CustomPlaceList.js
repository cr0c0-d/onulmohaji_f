import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CustomPlaceAdd from "./CustomPlaceAdd";
import { useEffect, useState } from "react";
import PlaceInfoSmall from "../Place/PlaceInfoSmall";
import CustomPlaceAddDialog from "./CustomPlaceAddDialog";
import { useAuthAPI } from "../../AuthAPI";

export default function CustomPlaceList() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [customPlaceList, setCustomPlaceList] = useState(null);

  const AuthAPI = useAuthAPI();

  const findCustomPlaceList = () => {
    AuthAPI({
      url: "/api/customPlace",
      method: "GET",
      data: null,
      success: (result) => {
        console.log(result);
        setCustomPlaceList(result.data);
      },
      fail: () => {
        console.log("fail");
      },
    });
  };

  useEffect(() => {
    findCustomPlaceList();
  }, []);

  return (
    <Container>
      <Button onClick={() => setOpenAddDialog(true)}>추가</Button>
      {customPlaceList && customPlaceList.length > 0
        ? customPlaceList.map((customPlace) => (
            <PlaceInfoSmall placeDetail={customPlace} rightButton={null} />
          ))
        : ""}

      <CustomPlaceAddDialog
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        reload={findCustomPlaceList}
      />
    </Container>
  );
}
