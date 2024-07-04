import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import BuyCredit from "./pages/buyCredit";
import ActivateApp from "./pages/activateApp";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/buy-credit" element={<BuyCredit />} />
        <Route exact path="/upgrade-premium" element={<ActivateApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
