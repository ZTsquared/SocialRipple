import './App.css';
import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home"
import ActionsMenu from "./pages/ActionsMenu"
import Action from "./pages/Action"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateAction from './pages/CreateAction';
import JoinAction from './pages/JoinAction';
import AuthContext from './contexts/auth';

function App() {

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [authObject] = useState({
    setIsLoggedIn: setIsLoggedIn
  })

  function handleLogout(){
    setIsLoggedIn(false)
    localStorage.clear()
  }

  return (

    <AuthContext.Provider value={authObject}>
    <div>
      <header>
        <nav>Nav bar of our awesome app {loggedIn ? <button onClick={handleLogout}>Logout</button> : <Link to="./Login">Login</Link>}</nav>
      </header>
      
        <Routes>
          <Route path="/" element={<Home />}/>                       

          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />}/>
          
          <Route path="/MainMenu" element={<ActionsMenu />}/>
          <Route path="/Action/View" element={<Action />}/>
          <Route path="/Action/Create" element={<CreateAction />}/>
          <Route path="/Action/Join" element={<JoinAction />}/>

        </Routes>
    
    </div>
    </AuthContext.Provider>
  )
}

export default App
