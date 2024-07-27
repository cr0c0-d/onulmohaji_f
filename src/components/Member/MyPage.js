import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useSearchContext } from "../../SearchContext";
import { useAuthAPI } from "../../AuthAPI";
import { useUser } from "../../UserContext";
import { useEffect } from "react";

export default function MyPage() {
  const { localcodes } = useSearchContext();
  const AuthAPI = useAuthAPI();
  const { userInfo } = useUser();

  return (
    <Container>
      <Box>
        <Typography variant="h5" gutterBottom>
          검색조건 설정
        </Typography>

        <FormGroup>
          {/* 날짜 */}
          <FormControl>
            <FormLabel id="defaultDateLabel">날짜 기본값</FormLabel>
            <RadioGroup
              aria-labelledby="defaultDateLabel"
              defaultValue="today"
              name="defaultDate"
            >
              <FormControlLabel
                value="today"
                control={<Radio />}
                label="오늘 날짜(기본값)"
              />
              <FormControlLabel
                value="route"
                control={<Radio />}
                label="가장 가까운 미래의 일정"
              />
            </RadioGroup>
          </FormControl>

          {/* 지역 */}
          {/* {localcodes && pickedLocal_1 ? (
            <Grid item>
              <FormControl
                disabled={searchInfo.criteriaPlace !== null ? true : false}
              >
                <InputLabel id="label_pickedLocal_1">지역 대분류</InputLabel>
                <Select
                  labelId="label_pickedLocal_1"
                  value={pickedLocal_1}
                  label="Age"
                  onChange={(e) => {
                    setPickedLocal_1(e.target.value);

                    setSearchInfo({
                      ...searchInfo,
                      localcode: localcodes.find(
                        (obj) => obj.parentId === e.target.value
                      ).id,
                    });
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
              <FormControl
                disabled={searchInfo.criteriaPlace !== null ? true : false}
              >
                <InputLabel id="label_localcode">지역 소분류</InputLabel>
                <Select
                  labelId="label_localcode"
                  value={searchInfo.localcode}
                  label="Age"
                  onChange={(e) => {
                    setSearchInfo({
                      ...searchInfo,
                      localcode: e.target.value,
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
          )} */}
        </FormGroup>
      </Box>
    </Container>
  );
}
