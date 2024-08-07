import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [accessToken, setAccessToken] = useState(false);
  const [userInitYn, setUserInitYn] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let token = params.get("token");
    if (token && token !== undefined) {
      // 파라미터로 토큰이 있음 => oAuth2로 로그인한 것
      setAccessToken(token);
    } else {
      // 새 액세스토큰 발급 시도 (쿠키에 리프레시 토큰이 있을지도)
      getNewAccessToken();
    }
  }, []);

  useEffect(() => {
    if (!userInitYn) {
      // 액세스토큰이 있으면 사용자 정보 조회
      if (accessToken.length > 0) {
        findMemberByAccessToken(accessToken);
      } else if (accessToken.length === 0) {
        setUserInitYn(true);
      }
    }
  }, [accessToken, userInitYn]);

  const findMemberByAccessToken = async (token) => {
    if (token === undefined) {
      return;
    }
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/token/${token}`,
      method: "GET",
    }).catch((error) => {
      if (error.code === "ERR_NETWORK") {
        findMemberByAccessToken(token);
        return;
      }
    });
    if (response && response.status === 200) {
      const userdata = response.data;

      let newUserInfo = {};
      newUserInfo.nickname = userdata.nickname;
      newUserInfo.id = userdata.id;
      newUserInfo.role = userdata.role;
      newUserInfo.localcode = userdata.localcode;
      newUserInfo.accessToken = token;
      setUserInfo(newUserInfo);
    }
  };

  useEffect(() => {
    if (
      !userInitYn &&
      userInfo !== undefined &&
      userInfo.nickname !== undefined
    ) {
      setUserInitYn(true);
    }
  }, [userInfo]);

  async function getNewAccessToken() {
    const res = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/token`,
      method: "POST",
      data: null,
      withCredentials: true,
    }).catch((error) => {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        getNewAccessToken();
        return;
      } else if (error.code === "ERR_BAD_REQUEST") {
        // 토큰 오류인 경우
        logoutAPI();
      }
      setAccessToken("");
    });

    if (res && (res.status === 201 || res.status === 200)) {
      // 액세스 토큰 재발급이 성공하면 userInfo에 새로운 액세스 토큰 저장
      setAccessToken(res.data.accessToken);
    } else {
    }
  }

  const logoutAPI = async (reloadYn) => {
    await axios({
      url: `${process.env.REACT_APP_API_ROOT}/logout`,
      method: "GET",
      withCredentials: true,
    }).then((response) => {
      if (response.status === 200) {
        //localStorage.removeItem("userdata");
        setUserInfo({});
        if (reloadYn) {
          window.location.href = "/";
        }
      }
    });
  };

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, logoutAPI, userInitYn }}
    >
      {children}
    </UserContext.Provider>
  );
};
