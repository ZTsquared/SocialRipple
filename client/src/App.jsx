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
//auth stuff
import AuthProvider from "./components/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import useAuth from "./hooks/useAuth";

function App() {
  const navigate = useNavigate();

  function handleLogout() {
    console.log("Logged out");
    // onLogout();
    navigate("/");
  }

  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
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
          <Route path="/MainMenu" element={<ActionsMenu />} />
          <Route path="/Action/View" element={<Action />} />
          <Route path="/Action/Create" element={<CreateAction />} />
          <Route path="/Action/Join" element={<JoinAction />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
