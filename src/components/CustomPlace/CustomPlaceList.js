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
import CustomPlaceDialog from "./CustomPlaceDialog";

export default function CustomPlaceList() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [customPlaceList, setCustomPlaceList] = useState(null);
  const [dialogCustomPlace, setDialogCustomPlace] = useState(null);

  const AuthAPI = useAuthAPI();

  const findCustomPlaceList = () => {
    AuthAPI({
      url: "/api/customPlace",
      method: "GET",
      data: null,
      success: (result) => {
        setCustomPlaceList(result.data);
      },
      fail: () => {
        console.log("fail");
      },
    });
  };

  const openDialog = (customPlaceInfo) => {
    setDialogCustomPlace(customPlaceInfo);
    setOpenAddDialog(true);
  };
  useEffect(() => {
    findCustomPlaceList();
  }, []);

  return (
    <Container>
      <Button onClick={() => openDialog(null)}>추가</Button>
      {customPlaceList && customPlaceList.length > 0
        ? customPlaceList.map((customPlace) => (
            <PlaceInfoSmall
              placeDetail={customPlace}
              rightButton={null}
              key={customPlace.placeId}
              openDialog={openDialog}
            />
          ))
        : ""}

      {/* <CustomPlaceAddDialog
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        reload={findCustomPlaceList}
        
      /> */}
      {openAddDialog ? (
        <CustomPlaceDialog
          openAddDialog={openAddDialog}
          setOpenAddDialog={setOpenAddDialog}
          reload={findCustomPlaceList}
          customPlaceInfo={dialogCustomPlace}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
