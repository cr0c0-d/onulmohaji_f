import { Stack, Box } from "@mui/material";
import PlaceList from "./PlaceList";
import { useSearchContext } from "../../SearchContext";
import FacilityList from "./FacilityList";
import PlaceSearchInfo from "./PlaceSearchInfo";

function PlaceTotalList() {
  const { festival, exhibition, popupstore, facility } = useSearchContext();

  return (
    <Stack spacing={5}>
      {festival !== null && festival.length !== 0 ? (
        <Box>
          <PlaceList placeList={festival} type="festival" limit="4" />
        </Box>
      ) : (
        ""
      )}

      {exhibition !== null && exhibition.length !== 0 ? (
        <Box>
          <PlaceList placeList={exhibition} type="exhibition" limit="4" />
        </Box>
      ) : (
        ""
      )}

      {popupstore !== null && popupstore.length !== 0 ? (
        <Box>
          <PlaceList placeList={popupstore} type="popup" limit="4" />
        </Box>
      ) : (
        ""
      )}

      {facility !== null && facility.length !== 0 ? (
        <Box>
          <FacilityList
            facilityList={facility}
            type="facility"
            typeName="시설"
            limit={4}
          />
        </Box>
      ) : (
        ""
      )}
    </Stack>
  );
}

export default PlaceTotalList;
