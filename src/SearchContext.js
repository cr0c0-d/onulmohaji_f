import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import dayjs from "dayjs";

import { useUser } from "./UserContext";
import { useRoute } from "./RouteContext";
import { useAuthAPI } from "./AuthAPI";

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  /********************************************* 상태관리, 변수 선언 ***************************************************/
  // 검색 조건
  const [searchInfo, setSearchInfo] = useState({
    date: dayjs(new Date()),
    localcode: null,
    keyword: "",
    criteriaPlace: null,
    distance: 3000, // 검색 기준지로부터 거리, 기본값 3km
  });

  const [categoryFilter, setCategoryFilter] = useState([
    { id: "festival", name: "축제", visible: true },
    { id: "exhibition", name: "전시회", visible: true },
    { id: "popup", name: "팝업스토어", visible: true },
    { id: "indoor", name: "실내놀거리", visible: true },
    { id: "food", name: "음식점", visible: true },
    { id: "cafe", name: "카페", visible: true },
    { id: "art", name: "문화예술", visible: true },
    { id: "attraction", name: "관광명소", visible: false },
  ]);

  // const [categoryFilter, setCategoryFilter] = useState({
  //   festival: { name: "축제", visible: true },
  //   exhibition: { name: "전시회", visible: true },
  //   popup: { name: "팝업스토어", visible: true },
  //   indoor: { name: "실내놀거리", visible: true },
  //   food: { name: "음식점", visible: true },
  //   cafe: { name: "카페", visible: true },
  //   art: { name: "문화예술", visible: true },
  //   attraction: { name: "관광명소", visible: false },
  // });

  // 선택 지역코드 - 대분류
  const [pickedLocal_1, setPickedLocal_1] = useState(null);
  // 선택 지역코드 - 소분류
  const [pickedLocal_2, setPickedLocal_2] = useState(null);

  // 축제 정보
  const [festival, setFestival] = useState(null);

  // 전시회 공연 정보
  const [exhibition, setExhibition] = useState(null);

  // 팝업스토어 정보
  const [popupstore, setPopupstore] = useState(null);

  // 시설 정보
  const [facility, setFacility] = useState(null);

  // 지역코드
  const [localcodes, setLocalcodes] = useState(null);

  const { userInfo, settingDone } = useUser();

  const AuthAPI = useAuthAPI();

  // 로그인회원 검색조건 설정값
  const [memberSearchInfo, setMemberSearchInfo] = useState(null);

  const [initYn, setInitYn] = useState(false);

  /********************************************* function ***************************************************/
  // 지역코드 목록 조회 API
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

  const getMemberSearchInfo = () => {
    AuthAPI({
      url: `/api/memberSearchInfo/${userInfo.id}`,
      method: "GET",
      data: null,
      success: (result) => {
        setMemberSearchInfo(result.data);
      },
      fail: () => {
        console.log("FAIL");
      },
    });
  };

  // 지역코드 목록 조회 후
  // 로그인 상태일 경우 => 로그인 회원 검색조건 설정값 조회
  // 비로그인 상태일 경우 => 검색조건 지역 서울시 강남구로 지정
  useEffect(() => {
    if (localcodes !== null) {
      // 로그인 회원정보의 지역정보 불러오는 로직
      if (userInfo) {
        // 로그인 회원 정보가 있으면
        getMemberSearchInfo();
      } else {
        // 로그인정보가 없으면 기본값 서울시 강남구
        setPickedLocal_1(11);
        setSearchInfo({ ...searchInfo, localcode: 11680 });
      }
    }
  }, [localcodes]);

  // 로그인 회원 검색조건 설정값 조회 후
  useEffect(() => {
    if (memberSearchInfo) {
      setPickedLocal_1(
        localcodes.find((obj) => obj.id === memberSearchInfo.localcodeId)
          .parentId
      );
      setSearchInfo({
        ...searchInfo,
        date: dayjs(memberSearchInfo.defaultDateValue),
        localcode: memberSearchInfo.localcodeId,
        distance: memberSearchInfo.distance,
      });
      setInitYn(true);
    }
  }, [memberSearchInfo]);

  // 첫 로딩시 지역코드 목록 조회
  useEffect(() => {
    if (settingDone) {
      getLocalcodes();
    }
  }, [settingDone]);

  const getFestivalList = async () => {
    const axiosResponse = await axios({
      url: `${
        process.env.REACT_APP_API_ROOT
      }/api/festival/list?date=${searchInfo.date.format(
        "YYYY-MM-DD"
      )}&latitude=${
        searchInfo.criteriaPlace !== null
          ? searchInfo.criteriaPlace.latitude
          : localcodes.find((obj) => obj.id === searchInfo.localcode).latitude
      }
      &longitude=${
        searchInfo.criteriaPlace !== null
          ? searchInfo.criteriaPlace.longitude
          : localcodes.find((obj) => obj.id === searchInfo.localcode).longitude
      }
      ${searchInfo.keyword !== "" ? "&keyword=" + searchInfo.keyword : ""}
      &distance=${searchInfo.distance}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (axiosResponse) {
      setFestival(axiosResponse.data);
    }
  };

  const getExhibitionList = async () => {
    const axiosResponse = await axios({
      url: `${
        process.env.REACT_APP_API_ROOT
      }/api/exhibition/list?date=${searchInfo.date.format(
        "YYYY-MM-DD"
      )}&latitude=${
        searchInfo.criteriaPlace !== null
          ? searchInfo.criteriaPlace.latitude
          : localcodes.find((obj) => obj.id === searchInfo.localcode).latitude
      }
      &longitude=${
        searchInfo.criteriaPlace !== null
          ? searchInfo.criteriaPlace.longitude
          : localcodes.find((obj) => obj.id === searchInfo.localcode).longitude
      }
      ${
        searchInfo.keyword !== "" ? "&keyword=" + searchInfo.keyword : ""
      }&distance=${searchInfo.distance}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (axiosResponse) {
      setExhibition(axiosResponse.data);
    }
  };

  const getPopupstoreList = async () => {
    const axiosResponse = await axios({
      url: `${
        process.env.REACT_APP_API_ROOT
      }/api/popup/list?date=${searchInfo.date.format("YYYY-MM-DD")}&latitude=${
        searchInfo.criteriaPlace !== null
          ? searchInfo.criteriaPlace.latitude
          : localcodes.find((obj) => obj.id === searchInfo.localcode).latitude
      }
      &longitude=${
        searchInfo.criteriaPlace !== null
          ? searchInfo.criteriaPlace.longitude
          : localcodes.find((obj) => obj.id === searchInfo.localcode).longitude
      }
      ${
        searchInfo.keyword !== "" ? "&keyword=" + searchInfo.keyword : ""
      }&distance=${searchInfo.distance}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (axiosResponse) {
      setPopupstore(axiosResponse.data);
    }
  };

  const getFacilityList = async () => {
    const axiosResponse = await axios({
      url: `${
        process.env.REACT_APP_API_ROOT
      }/api/facility/local/list?latitude=${
        searchInfo.criteriaPlace !== null
          ? searchInfo.criteriaPlace.latitude
          : localcodes.find((obj) => obj.id === searchInfo.localcode).latitude
      }
      &longitude=${
        searchInfo.criteriaPlace !== null
          ? searchInfo.criteriaPlace.longitude
          : localcodes.find((obj) => obj.id === searchInfo.localcode).longitude
      }
      ${
        searchInfo.keyword !== "" ? "&keyword=" + searchInfo.keyword : ""
      }&distance=${searchInfo.distance}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (axiosResponse) {
      setFacility(axiosResponse.data);
    }
  };
  useEffect(() => {
    if (searchInfo.date !== null && searchInfo.localcode !== null && initYn) {
      setPopupstore(null);
      setExhibition(null);
      setFestival(null);
      setFacility(null);

      getPopupstoreList();
      getExhibitionList();
      getFestivalList();
      getFacilityList();
    }
  }, [searchInfo]);

  return (
    <SearchContext.Provider
      value={{
        searchInfo,
        setSearchInfo,
        categoryFilter,
        setCategoryFilter,
        localcodes,
        pickedLocal_1,
        setPickedLocal_1,
        exhibition,
        popupstore,
        festival,
        facility,
        setMemberSearchInfo,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
