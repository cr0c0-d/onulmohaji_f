import { useEffect, useState } from "react";
import { Box, Container, Grid, Stack, TextField } from "@mui/material";
import CustomPlaceAddMap from "./CustomPlaceAddMap";
import DaumPostCode from "react-daum-postcode";

export default function CustomPlaceAdd({ open }) {
  const { kakao, daum } = window;
  const [searchKeyword, setSearchKeyword] = useState("");
  //const [name, setName] = useState("새로운 나만의 장소");
  const [newCustomPlace, setNewCustomPlace] = useState({
    name: "",
    address_road: "",
    address: "",
    latitude: 0,
    longitude: 0,
  });

  const selectAddress = (data) => {
    console.log(data);
    setSearchKeyword(data.roadAddress || data.autoRoadAddress);
    setNewCustomPlace({
      ...newCustomPlace,
      address_road: data.roadAddress || data.autoRoadAddress,
      address: data.jibunAddress || data.autoJibunAddress,
    });
  };
  return (
    <Box sx={{ padding: "10px" }}>
      <Stack spacing={3}>
        <TextField
          label="장소명"
          value={newCustomPlace.name}
          onChange={(e) => {
            setNewCustomPlace({ ...newCustomPlace, name: e.target.value });
          }}
        />
        <TextField
          label="도로명주소"
          value={newCustomPlace.address_road}
          disabled={true}
          onChange={(e) => {
            setNewCustomPlace({
              ...newCustomPlace,
              address_road: e.target.value,
            });
          }}
        />
        <TextField
          label="지번주소"
          value={newCustomPlace.address}
          disabled={true}
          onChange={(e) => {
            setNewCustomPlace({ ...newCustomPlace, address: e.target.value });
          }}
        />
        <Grid Container sx={{ width: "100%", display: "flex" }}>
          <Grid item sx={{ position: "relative", width: "50%" }}>
            <div
              id="daumFindAddress"
              style={{
                width: "100%",
                height: "600px",
                display: open ? "block" : "none",
              }}
            >
              <DaumPostCode
                onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Grid>
          <Grid item sx={{ width: "50%" }}>
            <CustomPlaceAddMap
              newCustomPlace={newCustomPlace}
              setNewCustomPlace={setNewCustomPlace}
              address={searchKeyword}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
