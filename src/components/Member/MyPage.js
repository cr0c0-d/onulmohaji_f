import {
  Box,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import { useSearchContext } from "../../SearchContext";
import { useAuthAPI } from "../../AuthAPI";
import { useUser } from "../../UserContext";
import { useEffect, useState } from "react";
import CategoryFilter from "../Place/SearchInfo/CategoryFilter";

export default function MyPage() {
  const { localcodes, categoryFilter } = useSearchContext();
  const AuthAPI = useAuthAPI();
  const { userInfo } = useUser();

  const [pickedLocal_1, setPickedLocal_1] = useState(null);

  const [searchInfo, setSearchInfo] = useState(null);

  const getUserSearchInfo = () => {
    AuthAPI({
      url: `/api/memberSearchInfo/${userInfo.id}`,
      method: "GET",
      data: null,
      success: (result) => {
        setSearchInfo(result.data);
      },
      fail: () => {
        console.log("FAIL");
      },
    });
  };

  useEffect(() => {
    getUserSearchInfo();
  }, []);

  useEffect(() => {
    if (searchInfo && localcodes) {
      setPickedLocal_1(
        localcodes.find((obj) => obj.id === searchInfo.localcodeId).parentId
      );
    }
  }, [searchInfo, localcodes]);

  const setCategoryFilter = (categoryFilter) => {
    setSearchInfo({ ...searchInfo, categoryFilter });
  };
  return (
    <Container>
      <Box>
        <Typography variant="h5" gutterBottom>
          검색조건 설정
        </Typography>

        {searchInfo && localcodes && pickedLocal_1 ? (
          <FormGroup>
            {/* 날짜 */}
            <FormControl>
              <FormLabel id="defaultDateLabel">날짜 선택 기본값</FormLabel>
              <RadioGroup
                aria-labelledby="defaultDateLabel"
                value={searchInfo.defaultDate}
                name="defaultDate"
                onChange={(e) => {
                  setSearchInfo({
                    ...searchInfo,
                    defaultDate: e.currentTarget.value,
                  });
                }}
              >
                <FormControlLabel
                  value="today"
                  control={<Radio />}
                  label="오늘 날짜 (기본값)"
                />
                <FormControlLabel
                  value="route"
                  control={<Radio />}
                  label="가장 가까운 미래의 일정 날짜"
                />
              </RadioGroup>
            </FormControl>

            <Divider />
            <br />
            {/* 지역 */}
            {localcodes && pickedLocal_1 ? (
              <Grid item>
                <FormLabel id="defaultLocalcode">지역 선택 기본값</FormLabel>
                <br />
                <br />
                <FormControl>
                  <InputLabel id="label_pickedLocal_1">지역 대분류</InputLabel>
                  <Select
                    labelId="label_pickedLocal_1"
                    value={pickedLocal_1}
                    label="Age"
                    onChange={(e) => {
                      setPickedLocal_1(e.target.value);
                    }}
                  >
                    {localcodes.map((localcode) =>
                      localcode.localLevel === 0 ? (
                        <MenuItem key={localcode.id} value={localcode.id}>
                          {localcode.name}
                        </MenuItem>
                      ) : (
                        ""
                      )
                    )}
                  </Select>
                </FormControl>{" "}
                <FormControl>
                  <InputLabel id="label_localcode">지역 소분류</InputLabel>
                  <Select
                    labelId="label_localcode"
                    value={searchInfo.localcodeId}
                    label="local2"
                    onChange={(e) => {
                      setSearchInfo({
                        ...searchInfo,
                        localcodeId: e.target.value,
                      });
                    }}
                  >
                    {localcodes.map((localcode) =>
                      localcode.localLevel === 1 &&
                      localcode.parentId === pickedLocal_1 ? (
                        <MenuItem key={localcode.id} value={localcode.id}>
                          {localcode.name}
                        </MenuItem>
                      ) : (
                        ""
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              ""
            )}
            <br />
            <Divider />
            <br />

            {/* 거리 */}

            <Grid item>
              <FormLabel id="defaultDistanceLabel">검색 범위 기본값</FormLabel>
              <Box sx={{ width: "200px" }}>
                <Slider
                  value={searchInfo.distance}
                  step={1000}
                  marks={[
                    {
                      value: 1000,
                      label: "1km",
                    },

                    {
                      value: 3000,
                      label: "3km",
                    },

                    {
                      value: 5000,
                      label: "5km",
                    },

                    {
                      value: 7000,
                      label: "7km",
                    },

                    {
                      value: 9000,
                      label: "9km",
                    },
                  ]}
                  max={10000}
                  min={1000}
                  onChange={(e) =>
                    setSearchInfo({ ...searchInfo, distance: e.target.value })
                  }
                />
              </Box>
            </Grid>

            {/* 카테고리 */}
            <CategoryFilter
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          </FormGroup>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}
