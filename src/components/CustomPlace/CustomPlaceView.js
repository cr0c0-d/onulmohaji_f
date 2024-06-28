import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  Divider,
  Container,
  Button,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useAuthAPI } from "../../AuthAPI";
import CustomPlaceDialog from "./CustomPlaceDialog";
import PlaceInfoSmall from "../Place/PlaceInfoSmall";
import CustomPlaceAdd from "./CustomPlaceAdd";
import CustomPlaceDetail from "./CustomPlaceDetail";
import CustomPlaceSmall from "./CustomPlaceSmall";

const CustomPlaceView = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [customPlaceList, setCustomPlaceList] = useState(null);
  const [dialogCustomPlace, setDialogCustomPlace] = useState(null);
  const [newCustomPlaceName, setNewCustomPlaceName] = useState("");
  const [newCustomPlace, setNewCustomPlace] = useState({
    addressRoad: "",
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [selectedCustomPlace, setSelectedCustomPlace] = useState(null);

  const AuthAPI = useAuthAPI();
  const history = useNavigate();

  const findCustomPlaceList = () => {
    AuthAPI({
      url: "/api/customPlace",
      method: "GET",
      data: null,
      success: (result) => {
        setCustomPlaceList(result.data);
        console.log(window.location.pathname);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          width: "100%",
        }}
      >
        <Typography variant="h5">나만의 장소</Typography>
        <Box sx={{ textAlign: "right" }}>
          <Button onClick={() => openDialog(null)}>추가</Button>
        </Box>
      </Box>
      <Divider variant="middle" />
      <br />
      <Container>
        {customPlaceList && customPlaceList.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              // alignItems: "center",
              color: "text.secondary",
              "& svg": {
                m: 1,
              },
            }}
          >
            <Box sx={{ width: selectedCustomPlace ? "50%" : "100%" }}>
              {customPlaceList.map((customPlace) => (
                <Box onClick={() => setSelectedCustomPlace(customPlace)}>
                  <CustomPlaceSmall
                    placeDetail={customPlace}
                    rightButton={
                      <IconButton
                        onClick={() => {
                          setOpenAddDialog(true);
                          setDialogCustomPlace(customPlace);
                        }}
                      >
                        <SettingsIcon />
                      </IconButton>
                    }
                    key={customPlace.placeId}
                    openDialog={openDialog}
                  />
                </Box>
              ))}
            </Box>
            {selectedCustomPlace ? (
              <Divider orientation="vertical" variant="middle" flexItem />
            ) : (
              ""
            )}
            {selectedCustomPlace ? (
              <Box sx={{ width: "50%", display: "flex" }}>
                <CustomPlaceDetail customPlace={selectedCustomPlace} />
              </Box>
            ) : (
              ""
            )}
          </Box>
        ) : (
          <Typography variant="body2">나만의 장소가 없습니다.</Typography>
        )}
      </Container>

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
};

export default CustomPlaceView;
