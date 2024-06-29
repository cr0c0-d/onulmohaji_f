import { useEffect, useState } from "react";
import { Box, Container, Grid, Stack, TextField } from "@mui/material";
import CustomPlaceAddMap from "./CustomPlaceAddMap";
import DaumPostCode from "react-daum-postcode";

export default function CustomPlaceAdd({
  newCustomPlace,
  setNewCustomPlace,
  newCustomPlaceName,
  setNewCustomPlaceName,
}) {
  const [searchKeyword, setSearchKeyword] = useState("");

  const selectAddress = (data) => {
    setSearchKeyword(data.jibunAddress || data.autoJibunAddress);
    // setNewCustomPlace({
    //   ...newCustomPlace,
    //   addressRoad: data.roadAddress || data.autoRoadAddress,
    //   address: data.jibunAddress || data.autoJibunAddress,
    // });
  };
  return (
    <Box sx={{ padding: "10px" }}>
      <Stack spacing={3}>
        <TextField
          label="장소명"
          value={newCustomPlaceName}
          onChange={(e) => {
            setNewCustomPlaceName(e.target.value);
          }}
        />
        <TextField
          label="도로명주소"
          value={newCustomPlace.addressRoad}
          disabled={true}
        />
        <TextField
          label="지번주소"
          value={newCustomPlace.address}
          disabled={true}
        />
        <Grid Container sx={{ width: "100%", display: "flex" }}>
          <Grid item sx={{ position: "relative", width: "50%" }}>
            <div
              id="daumFindAddress"
              style={{
                width: "100%",
                height: "600px",
                display: "block",
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
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
