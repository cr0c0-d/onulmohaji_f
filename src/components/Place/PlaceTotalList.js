import { Stack, Box } from "@mui/material";
import PlaceList from "./PlaceList";
import { useSearchContext } from "../../SearchContext";
import FacilityList from "./FacilityList";
import PlaceSearchInfo from "./SearchInfo/PlaceSearchInfo";

function PlaceTotalList() {
  const { categoryFilter, festival, exhibition, popupstore, facility } =
    useSearchContext();

  return (
    <Stack spacing={5}>
      {festival !== null &&
      categoryFilter.find((obj) => obj.id === "festival").visible ? (
        <Box>
          <PlaceList placeList={festival} type="festival" limit="4" />
        </Box>
      ) : (
        ""
      )}

      {exhibition !== null &&
      categoryFilter.find((obj) => obj.id === "exhibition").visible ? (
        <Box>
          <PlaceList placeList={exhibition} type="exhibition" limit="4" />
        </Box>
      ) : (
        ""
      )}

      {popupstore !== null &&
      categoryFilter.find((obj) => obj.id === "popup").visible ? (
        <Box>
          <PlaceList placeList={popupstore} type="popup" limit="4" />
        </Box>
      ) : (
        ""
      )}

      {/* {facility !== null && facility.length !== 0 ? (
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
      )} */}
      {facility !== null
        ? facility.map((facilityCategory, index) =>
            categoryFilter.find((obj) => obj.id === facilityCategory.type)
              .visible ? (
              <Box>
                <FacilityList
                  facilityList={facilityCategory.facilityList}
                  type={facilityCategory.type}
                  typeName={facilityCategory.typeName}
                  limit={4}
                  key={index}
                />
              </Box>
            ) : (
              ""
            )
          )
        : ""}
    </Stack>
  );
}

export default PlaceTotalList;
