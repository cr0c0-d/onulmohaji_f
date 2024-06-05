import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { useAuthAPI } from "../AuthAPI";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddRoutePermission() {
  const { userInfo } = useUser();
  const [targetRoute, setTargetRoute] = useState(null);

  const history = useNavigate();
  const AuthAPI = useAuthAPI();

  // route 정보 조회
  const getRouteInfo = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api${window.location.pathname}`,
      method: "GET",
    }).catch((error) => {
      console.log("route 조회 실패");
      console.log(error);
    });

    if (response && response.status === 200) {
      console.log(response.data);
      setTargetRoute(response.data);
    }
  };

  useEffect(() => {
    getRouteInfo();
  }, []);

  const confirmUserInfo = () => {
    // 로그인상태인지 확인
    if (userInfo !== null && userInfo.id !== undefined) {
      console.log("로그인 상태");

      // 이미 권한이 있는지 확인해야함!!

      const confirmPermission = window.alert(
        `${targetRoute.ownerName}님의 ${targetRoute.routeDate} 일정에 참가하시겠습니까?`
      );
      console.log(confirmPermission);
    } else {
      // 비로그인 -> 로그인 페이지로
      console.log("비로그인 상태");
      history("/login", { state: { beforeUrl: window.location.pathname } });
    }
  };

  useEffect(() => {
    if (targetRoute !== null) {
      confirmUserInfo();
    }
  }, [targetRoute]);

  // ~~님의 ~일 일정에 참가하시겠습니까?

  // 해당 날짜에 내 일정이 이미 있는지 확인
  // 덮어씌울지 물어봄
}
