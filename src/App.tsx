import "./styles/theme.css";
import "./styles/global.css";
import { Home } from "./Pages/Home";
import { TextContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { ShowMessage } from "./components/ShowMessage/indexs";
import { BrowserRouter, Route, Routes } from "react-router";
import { AboutPomodoro } from "./components/AboutPomodoro";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <>
      <TextContextProvider>
        <ShowMessage>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-pomodoro" element={<AboutPomodoro />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ShowMessage>
      </TextContextProvider>
    </>
  );
}

export { App };
