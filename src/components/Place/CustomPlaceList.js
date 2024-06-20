import { Button, Container, Dialog, DialogTitle } from "@mui/material";
import CustomPlaceAdd from "./CustomPlaceAdd";
import { useState } from "react";
import PlaceInfoSmall from "./PlaceInfoSmall";

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

      <Dialog
        fullWidth={true}
        maxWidth="xl"
        onClose={() => setOpenAddDialog(false)}
        open={openAddDialog}
      >
        <DialogTitle>나만의 장소 추가</DialogTitle>
        {openAddDialog ? <CustomPlaceAdd open={openAddDialog} /> : ""}
      </Dialog>
    </Container>
  );
}
