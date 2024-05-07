import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Main from "./components/Main";
import { UserProvider } from "./UserContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";

function App() {
  return (
    //<UserProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact path="/" element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
    //</UserProvider>
  );
}

export default App;
