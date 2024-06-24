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
export default function CustomPlaceDialog({
  openAddDialog,
  setOpenAddDialog,
  reload,
  customPlaceInfo,
}) {
  const [newCustomPlaceName, setNewCustomPlaceName] = useState(
    customPlaceInfo ? customPlaceInfo.placeName : ""
  );
  const [newCustomPlace, setNewCustomPlace] = useState(
    customPlaceInfo
      ? customPlaceInfo
      : {
          addressRoad: "",
          address: "",
          latitude: 0,
          longitude: 0,
        }
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const AuthAPI = useAuthAPI();

  const addNewCustomPlace = () => {
    AuthAPI({
      url: "/api/customPlace",
      method: "POST",
      data: { ...newCustomPlace, name: newCustomPlaceName },
      success: () => {
        setOpenAddDialog(false);
        setOpenSnackbar(true);
        reload();
      },
      fail: () => {
        console.log("fail");
      },
    });
  };

  const updateCustomPlace = () => {
    AuthAPI({
      url: "/api/customPlace",
      method: "PUT",
      data: {
        ...newCustomPlace,
        name: newCustomPlaceName,
        id: customPlaceInfo.placeId,
      },
      success: () => {
        setOpenAddDialog(false);
        setOpenSnackbar(true);
        reload();
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
        <DialogTitle>나만의 장소</DialogTitle>
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
          <Button
            variant="contained"
            onClick={customPlaceInfo ? updateCustomPlace : addNewCustomPlace}
          >
            저장
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
