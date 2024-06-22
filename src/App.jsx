import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/home";
import BuyCredit from "./pages/buyCredit";
import ActivateApp from "./pages/activateApp";
import "react-toastify/dist/ReactToastify.css";
import GetStarted from "./pages/getStarted";
import { useEffect, useState } from "react";
import Loading from "./pages/loading";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setLoggedIn(true);
      setLoading(false);
    } else {
      setLoggedIn(false);
      setLoading(false);
    }

    console.log("mount");
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route
          exact
          path="/get-started"
          element={
            loading ? (
              <Loading />
            ) : loggedIn ? (
              <Home setLoggedIn={setLoggedIn} />
            ) : (
              <GetStarted setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route
          exact
          path="/"
          element={
            loading ? (
              <Loading />
            ) : loggedIn ? (
              <Home setLoggedIn={setLoggedIn} />
            ) : (
              <GetStarted setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route
          exact
          path="/buy-credit"
          element={
            loading ? (
              <Loading />
            ) : loggedIn ? (
              <BuyCredit />
            ) : (
              <GetStarted setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route
          exact
          path="/upgrade-premium"
          element={
            loading ? (
              <Loading />
            ) : loggedIn ? (
              <ActivateApp />
            ) : (
              <GetStarted setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route exact path="*" element={<GetStarted />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
