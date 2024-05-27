import { Button, Container } from "@mui/material";
import PlaceList from "./PlaceList";
import { useSearchContext } from "../SearchContext";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";

export default function PlaceListByType({ type }) {
  const { festival, exhibition, popupstore, facility } = useSearchContext();
  const history = useNavigate();
  return (
    <Container>
      <Button
        startIcon={<KeyboardArrowLeftIcon />}
        onClick={() => {
          history("/");
        }}
      >
        전체 카테고리 보기
      </Button>
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
    </Container>
  );
}
