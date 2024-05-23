import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import NaverLoginButton from "../img/btn_naver_login.png";
import GoogleLoginButton from "../img/btn_google_login.png";
import KakaoLoginButton from "../img/btn_kakao_login.png";

export default function Login() {
  /********************************************* 상태관리, 변수 선언 ***************************************************/
  // form 데이터
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // validation 에러
  const [errors, setErrors] = useState({});

  const [loginStatus, setLoginStatus] = useState(false);

  const history = useNavigate();
  const location = useLocation();
  const { userInfo, setUserInfo } = useUser();

  /********************************************* function ***************************************************/
  // 페이지 이동
  const afterLoginRedirect = () => {
    if (
      location.state &&
      location.state.beforeUrl &&
      location.state.beforeUrl !== "/search"
    ) {
      // 이전 페이지 기록이 있으면
      history(location.state.beforeUrl, { state: { ...location.state } });
    } else {
      // 기록이 없으면
      history("/search");
    }
  };

  useEffect(() => {
    if (userInfo.accessToken) {
      setLoginStatus(true);
      afterLoginRedirect();
    }
  }, []);

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
    return newErrors;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      loginApi();
    } else {
      setErrors(formErrors);
    }
  };

  const loginApi = async () => {
    const json = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/loginProcessing`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        email: formData.email,
        password: formData.password,
      },
      withCredentials: true,
    }).catch((error) => {
      // 중복된 이메일
      if (error && error.code === "ERR_BAD_REQUEST") {
        setErrors({
          password: "아이디 혹은 비밀번호가 일치하지 않습니다.",
        });
        return;
      }
    });
    if (json !== undefined && json.status === 200) {
      setUserInfo({
        nickname: json.data.nickname,
        id: json.data.id,
        role: json.data.role,
        localcode: json.data.localcode,
        accessToken: json.data.accessToken,
      });
      history("/");
    }
  };

  const getNaverLoginRequestUrl = async () => {
    const json = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/login/auth/naver`,
      method: "GET",
    }).catch((error) => {
      console.log(error);
      return;
    });
    if (json !== undefined && json.status === 200) {
      console.log(json);
      sessionStorage.setItem("state", json.data.state);
      window.open(json.data.url);
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
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
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  fullWidth
                  id="input_password"
                  label="비밀번호"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                />
              </Grid>
            </Grid>
          </FormControl>
        </Box>
        <br />
        <Container>
          <Stack spacing={2}>
            <Divider />
            <Button fullWidth variant="contained" onClick={onSubmit}>
              로그인
            </Button>
            <Divider />

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => history("/signup")}
            >
              이메일로 회원가입
            </Button>
            <Divider />
          </Stack>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1 }}
            sx={{ padding: "1em" }}
          >
            <Grid item sx={{ width: "50%" }}>
              <img
                style={{ maxWidth: "100%", cursor: "pointer" }}
                src={NaverLoginButton}
                alt="naverLogin"
                onClick={getNaverLoginRequestUrl}
              />
            </Grid>
            <Grid item sx={{ width: "50%" }}>
              <img
                style={{ maxWidth: "100%", cursor: "pointer" }}
                src={KakaoLoginButton}
                alt="kakaoLogin"
              />
            </Grid>
            <Grid item sx={{ width: "50%" }}>
              <img
                style={{ maxWidth: "100%", cursor: "pointer" }}
                src={GoogleLoginButton}
                alt="googleLogin"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}
