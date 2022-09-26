import { useSelector } from "react-redux";
import {
  GlobalStyles,
  PlayPage,
  StartPage,
  TheContent,
  TheHeader,
} from "./components";
import { gameSelector } from "./store/reducers/gameSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { isDarkMode } = useSelector(gameSelector);

  return (
    <GlobalStyles>
      <BrowserRouter>
        <div id="container" className={isDarkMode ? "darkMode" : ""}>
          <TheHeader />
          <TheContent>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/play" element={<PlayPage />} />
              <Route path="*" element={<StartPage />} />
            </Routes>
          </TheContent>
        </div>
      </BrowserRouter>
    </GlobalStyles>
  );
}

export default App;
