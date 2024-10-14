import { Button, Container, Stack } from "@mui/material";
import PlaceList from "../Place/PlaceList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../UserContext";
import { useAuthAPI } from "../../AuthAPI";

export default function BookmarkPlaceList() {
  const { userInfo } = useUser();
  const history = useNavigate();
  const AuthAPI = useAuthAPI();
  const [bookmarkPlaceList, setBookmarkPlaceList] = useState(null);

  const getBookmarkPlaceList = () => {
    AuthAPI({
      url: "/api/bookmark/list",
      method: "GET",
      data: null,
      success: (result) => {
        setBookmarkPlaceList(result.data);
      },
      fail: () => {
        console.log("fail");
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getBookmarkPlaceList();
  }, []);

  return (
    <Container>
      {bookmarkPlaceList == null ? (
        ""
      ) : (
        <PlaceList placeList={bookmarkPlaceList} type="bookmark" limit={999} />
      )}
    </Container>
  );
}
