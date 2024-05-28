import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import dayjs from "dayjs";

import { useUser } from "./UserContext";
import { useRoute } from "./RouteContext";

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  /********************************************* 상태관리, 변수 선언 ***************************************************/
  // 검색 조건
  const [searchInfo, setSearchInfo] = useState({
    date: dayjs(new Date()),
    localcode: null,
    keyword: "",
  });

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

  // 지역코드 목록 조회 후 선택 지역 기본값 지정
  useEffect(() => {
    if (localcodes !== null) {
      // 로그인 회원정보의 지역정보 불러오는 로직
      if (userInfo && userInfo.localcode) {
        // 로그인 회원 정보가 있으면
        setPickedLocal_1(
          localcodes.find((obj) => obj.id === userInfo.localcode).parentId
        );
        setSearchInfo({ ...searchInfo, localcode: userInfo.localcode });
      } else {
        // 로그인정보가 없으면 기본값 서울시 강남구
        setPickedLocal_1(11);
        setSearchInfo({ ...searchInfo, localcode: 11680 });
      }
    }
  }, [localcodes, userInfo]);

  // 첫 로딩시 지역코드 목록 조회
  useEffect(() => {
    getLocalcodes();
  }, []);

  const getFestivalList = async () => {
    const axiosResponse = await axios({
      url: `${
        process.env.REACT_APP_API_ROOT
      }/api/festival/list?date=${searchInfo.date.format(
        "YYYY-MM-DD"
      )}&localcodeId=${searchInfo.localcode}${
        searchInfo.keyword !== "" ? "&keyword=" + searchInfo.keyword : ""
      }`,
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
      )}&localcodeId=${searchInfo.localcode}${
        searchInfo.keyword !== "" ? "&keyword=" + searchInfo.keyword : ""
      }`,
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
      }/api/popup/list?date=${searchInfo.date.format(
        "YYYY-MM-DD"
      )}&localcodeId=${searchInfo.localcode}${
        searchInfo.keyword !== "" ? "&keyword=" + searchInfo.keyword : ""
      }`,
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
      }/api/facility/local/list?localcodeId=${searchInfo.localcode}${
        searchInfo.keyword !== "" ? "&keyword=" + searchInfo.keyword : ""
      }`,
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
    if (searchInfo.date !== null && searchInfo.localcode !== null) {
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
        localcodes,
        pickedLocal_1,
        setPickedLocal_1,
        exhibition,
        popupstore,
        festival,
        facility,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
