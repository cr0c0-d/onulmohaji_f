import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  /********************************************* 상태관리, 변수 선언 ***************************************************/
  // 지역코드
  const [localcodes, setLocalcodes] = useState(null);

  // 선택한 지역코드 대분류
  const [pickedLocal_1, setPickedLocal_1] = useState(null);

  // 비밀번호 표시 여부
  const [showPassword, setShowPassword] = useState(false);

  // form 데이터
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    localcode: 11680,
  });

  // validation 에러
  const [errors, setErrors] = useState({});

  const history = useNavigate();

  /********************************************* function ***************************************************/
  // 비밀번호 표시 여부 토글
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // 지역코드 조회 API 호출
  const getLocalcodes = async () => {
    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/localcode`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (axiosResponse) {
      setLocalcodes(axiosResponse.data);
    }
  };

  // 지역코드 조회
  useEffect(() => {
    getLocalcodes();
  }, []);

  // 지역코드 조회 후 기본값 서울시 강남구로 지정
  useEffect(() => {
    if (localcodes !== null) {
      setPickedLocal_1(11);
    }
  }, [localcodes]);

  // form 데이터 상태관리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // 입력 값의 유효성 검사
  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }
    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    }
    return newErrors;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      signupApi();
    } else {
      setErrors(formErrors);
    }
  };

  const signupApi = async () => {
    const json = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/signup`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        localcodeId: formData.localcode,
        profileImg: "https://i.ibb.co/LzfM6Mx/member1712982423627.jpg",
      }),
    }).catch((error) => {
      // 중복된 이메일
      if (error && error.code === "ERR_BAD_REQUEST") {
        setErrors({
          email: "사용중인 이메일입니다. 다른 이메일을 사용해주세요.",
        });
        return;
      }
    });
    if (json !== undefined && json.status === 201) {
      setErrors({});
      history("/login");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }} />
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box
          component="form"
          noValidate
          //onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  required
                  fullWidth
                  id="input_email"
                  label="이메일"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  helperText={errors.nickname}
                  error={errors.nickname ? true : false}
                  required
                  fullWidth
                  id="input_nickname"
                  label="닉네임"
                  value={formData.nickname}
                  name="nickname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  fullWidth
                  id="input_password"
                  label="비밀번호"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <br />
                {localcodes && pickedLocal_1 ? (
                  <Grid item>
                    <FormLabel>기본 검색 지역 선택</FormLabel>
                    <br />
                    <br />
                    <FormControl>
                      <InputLabel id="input_local1">지역 대분류</InputLabel>
                      <Select
                        id="input_local1"
                        value={pickedLocal_1}
                        label="Age"
                        onChange={(e) => {
                          setPickedLocal_1(e.target.value);

                          setFormData({
                            ...formData,
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
                    <FormControl>
                      <InputLabel id="input_localcode">지역 소분류</InputLabel>
                      <Select
                        id="input_localcode"
                        label="지역 소분류"
                        value={formData.localcode}
                        name="localcode"
                        onChange={handleChange}
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
              </Grid>
            </Grid>
          </FormControl>
        </Box>
        <br />
        <Divider />
        <Button fullWidth variant="contained" onClick={onSubmit}>
          회원가입
        </Button>
      </Box>
    </Container>
  );
}
