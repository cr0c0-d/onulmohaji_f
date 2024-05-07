import axios from "axios";
import { useUser } from "./UserContext";

export const useAuthAPI = () => {
  const { userInfo, setUserInfo, logoutAPI } = useUser();
  let accessToken = userInfo.accessToken;

  const AuthAPI = async ({ url, method, data, success, fail }) => {
    const authorization = "Bearer " + accessToken;

    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}` + url,
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      data: data,
    }).catch(async (error) => {
      if (error.response.status === 401) {
        const result = await getNewAccessToken();
        if (result) {
          AuthAPI({
            url: url,
            method: method,
            data: data,
            success: success,
            fail: fail,
          });
        } else {
          fail();
        }
      } else {
        return fail(error);
      }
    });
    if (
      axiosResponse &&
      (axiosResponse.status === 200 || axiosResponse.status === 201)
    ) {
      // 200 : ok / 201 : created
      return success(axiosResponse);
    }
  };

  // 새로운 액세스토큰 발급
  async function getNewAccessToken() {
    const authorization = "Bearer " + userInfo.accessToken;

    const res = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/token`,
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: null,
      withCredentials: true,
    }).catch((error) => {
      if (error && error.response.status === 500) {
        // 리프레쉬 토큰도 잘못됨
        return false;
      }
    });

    if (res === undefined) {
      // 리프레쉬 토큰이 잘못됐으면
      setUserInfo({});
      return false;
    }

    if (res.status === 201 || res.status === 200) {
      // 재발급이 성공하면 userInfo에 새로운 액세스 토큰 저장
      setUserInfo({ ...userInfo, accessToken: res.data.accessToken });
      accessToken = res.data.accessToken;

      return true; // 요청을 다시 보냄
    }
  }
  return AuthAPI;
};
