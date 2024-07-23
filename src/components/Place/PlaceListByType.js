import { Button, Container, Stack } from "@mui/material";
import PlaceList from "./PlaceList";
import { useSearchContext } from "../../SearchContext";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import PlaceSearchInfo from "./SearchInfo/PlaceSearchInfo";

export default function PlaceListByType({ type }) {
  const { searchInfo, festival, exhibition, popupstore, facility } =
    useSearchContext();
  const history = useNavigate();
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
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
}
