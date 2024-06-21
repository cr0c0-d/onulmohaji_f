import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CustomPlaceAdd from "./CustomPlaceAdd";
import { useState } from "react";
import PlaceInfoSmall from "../Place/PlaceInfoSmall";
import CustomPlaceAddDialog from "./CustomPlaceAddDialog";

export default function CustomPlaceList() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [customPlaceList, setCustomPlaceList] = useState(null);
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
      />
    </Container>
  );
}
