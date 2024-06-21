import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomPlaceAdd from "./CustomPlaceAdd";
import { useAuthAPI } from "../../AuthAPI";
export default function CustomPlaceAddDialog({
  openAddDialog,
  setOpenAddDialog,
}) {
  const [newCustomPlaceName, setNewCustomPlaceName] = useState("");
  const [newCustomPlace, setNewCustomPlace] = useState({
    addressRoad: "",
    address: "",
    latitude: 0,
    longitude: 0,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const AuthAPI = useAuthAPI();

  const addNewCustomPlace = () => {
    AuthAPI({
      url: "/api/customPlace",
      method: "POST",
      data: { ...newCustomPlace, name: newCustomPlaceName },
      success: () => {
        console.log("success");
        setOpenAddDialog(false);
        setOpenSnackbar(true);
      },
      fail: () => {
        console.log("fail");
      },
    });
  };

  useEffect(() => {
    if (!openAddDialog) {
      setNewCustomPlace({
        addressRoad: "",
        address: "",
        latitude: 0,
        longitude: 0,
      });
      setNewCustomPlaceName("");
    }
  }, [openAddDialog]);

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        onClose={() => setOpenAddDialog(false)}
        open={openAddDialog}
      >
        <DialogTitle>나만의 장소 추가</DialogTitle>
        <DialogContent>
          <CustomPlaceAdd
            newCustomPlaceName={newCustomPlaceName}
            setNewCustomPlaceName={setNewCustomPlaceName}
            newCustomPlace={newCustomPlace}
            setNewCustomPlace={setNewCustomPlace}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenAddDialog(false);
            }}
          >
            닫기
          </Button>
          <Button variant="contained" onClick={addNewCustomPlace}>
            추가
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        message="저장되었습니다."
      />
    </div>
  );
}
