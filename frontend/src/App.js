import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import DetailPage from "./pages/DetailPage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:animeId" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App