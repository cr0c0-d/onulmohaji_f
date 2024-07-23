import { Container, Stack } from "@mui/material";
import { useSearchContext } from "../../../SearchContext";
import PlaceSearchInfo from "./PlaceSearchInfo";
import PlaceTotalList from "../PlaceTotalList";

function PlaceSearchMain() {
  const { searchInfo } = useSearchContext();

  return (
    <Container>
      {searchInfo !== undefined ? (
        <Stack spacing={5}>
          <PlaceSearchInfo />

          <PlaceTotalList />
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
}

export default PlaceSearchMain;
