import './App.css';
import { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from "./pages/Home"
import ActionsMenu from "./pages/ActionsMenu"
import Action from "./pages/Action"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateAction from './pages/CreateAction';
import JoinAction from './pages/JoinAction';
import AuthContext from './contexts/auth';
import Profile from './pages/Profile';

function App() {

  const navigate = useNavigate();

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [authObject] = useState({
    setIsLoggedIn: setIsLoggedIn
  })

  function handleLogout(){
    setIsLoggedIn(false)
    localStorage.clear()
    navigate({pathname: "./"})

  }

  return (

    <AuthContext.Provider value={authObject}>
    <div>
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <nav>Nav bar of our awesome app {loggedIn ? <div><Link to="./Action/Create" className="btn btn-success">Create Action</Link>
                                                         <Link to="./Profile" className="btn btn-success">Profile</Link>
                                                         <button className="btn btn-success" onClick={handleLogout}>Logout</button>
                                                         </div>
                                                  : <div><Link to="./Login" className="btn btn-success">Login</Link>
                                                    <Link to="./Register" className="btn btn-success">Sign In</Link></div>
                                                  }</nav>
                                                  
      </header>
      
        <Routes>
          <Route path="/" element={<Home />}/>                       

          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />}/>
          <Route path="/Profile" element={<Profile />}/>
          
          <Route path="/MainMenu" element={<ActionsMenu />}/>
          <Route path="/Action/View" element={<Action />}/>
          <Route path="/Action/Create" element={<CreateAction />}/>
          <Route path="/Action/Join" element={<JoinAction />}/>

        </Routes>
    
      <footer className="footer">
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light"><Link to="/MainMenu" className="btn btn-success">Home</Link></nav>
        
      </footer>                                            

    </div>
    </AuthContext.Provider>
  )
}

export default App
