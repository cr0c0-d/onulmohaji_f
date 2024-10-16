import { Button, Container, Stack } from "@mui/material";
import PlaceList from "./PlaceList";
import { useSearchContext } from "../../SearchContext";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import PlaceSearchInfo from "./SearchInfo/PlaceSearchInfo";
import FacilityList from "./FacilityList";
import { useEffect } from "react";

export default function PlaceListByType({ type }) {
  const { searchInfo, festival, exhibition, popupstore, facility } =
    useSearchContext();
  const history = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      {searchInfo !== undefined ? (
        <Stack spacing={5}>
          <PlaceSearchInfo />
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              startIcon={<KeyboardArrowLeftIcon />}
              onClick={() => {
                history("/");
              }}
            >
              전체 카테고리 보기
            </Button>
          </div>
          {type === "facility" ? (
            <FacilityList
              facilityList={
                facility.find(
                  (obj) =>
                    obj.type ===
                    window.location.pathname.replace("/facility/list/", "")
                ).facilityList
              }
              limit={999}
              type={window.location.pathname.replace("/facility/list/", "")}
              typeName={
                facility.find(
                  (obj) =>
                    obj.type ===
                    window.location.pathname.replace("/facility/list/", "")
                ).typeName
              }
            />
          ) : (
            <PlaceList
              placeList={
                type === "festival"
                  ? festival
                  : type === "exhibition"
                  ? exhibition
                  : type === "popup"
                  ? popupstore
                  : facility
              }
              type={type}
              limit={999}
            />
          )}
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
}
