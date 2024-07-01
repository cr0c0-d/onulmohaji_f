import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuthAPI } from "../../AuthAPI";
import { useRoute } from "../../RouteContext";

export default function RouteTitleEdit({ route, open, setOpen }) {
  const [title, setTitle] = useState(route.title);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { getRoute } = useRoute();

  const AuthAPI = useAuthAPI();

  const saveTitle = () => {
    AuthAPI({
      url: "/api/route",
      method: "PUT",
      data: { id: route.routeId, title: title },
      success: () => {
        setOpen(false);
        setOpenSnackbar(true);
        getRoute();
      },
      fail: () => {
        console.log("fail");
      },
    });
  };

  return (
    <div>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <DialogTitle>일정 제목 수정</DialogTitle>
        <DialogContent>
          <br />
          <TextField
            label="일정 제목"
            defaultValue={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            닫기
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              saveTitle();
              setOpen(false);
            }}
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
