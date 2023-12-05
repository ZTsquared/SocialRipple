import "./App.css";
import { useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
//pages
import Home from "./pages/Home";
import ActionsMenu from "./pages/ActionsMenu";
import Action from "./pages/Action";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateAction from "./pages/CreateAction";
import JoinAction from "./pages/JoinAction";
import Profile from "./pages/Profile";
import ActionsGroup from "./pages/ActionsGroup";
import ActionsIndividual from "./pages/ActionsIndividual";
//auth stuff
import AuthProvider from "./components/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import NavBar from "./components/NavBar";
import FootBar from "./components/FootBar";

function App() {

  const [showNavbar, setShowNavbar] = useState();
  return (
    <AuthProvider>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          <Route path="/Actions" element={<ActionsMenu />}>
              {/* <Route path="Actions/View/:ActionId" element={<ActionsMenu />} /> */}
              <Route path="/Actions/View/:ActionId" element={<Action />} />
          </Route>
          <Route path="/MainMenu/:typeOfActions" element={<ActionsMenu />} />
          <Route
            path="/Action/Create"
            element={
              <RequireAuth>
                <CreateAction />
              </RequireAuth>
            }
          />

          <Route path="/Action/Join" element={<JoinAction />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
