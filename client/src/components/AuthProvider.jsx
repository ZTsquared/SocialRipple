import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const navigate = useNavigate();

  function onLogin() {
    setIsLoggedIn(true);
    navigate("/MainMenu"); //carol: this is where we dicide where we want the user to navigate to once they've logged IN
  }

  function onLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/MainMenu"); //carol: this is where we dicide where we want the user to navigate to once they've logged OUT
  }

  const authObject = {
    isLoggedIn,
    onLogin,
    onLogout,
  };

  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
}
