import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home"
import ActionsMenu from "./pages/ActionsMenu"
import Action from "./pages/Action"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateAction from './pages/CreateAction';
import JoinAction from './pages/JoinAction';

function App() {

  return (
    <div>

        <Routes>
          <Route path="/" element={<Home />}/>                       

          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />}/>
          
          <Route path="/Action/Menu" element={<ActionsMenu />}/>
          <Route path="/Action/View" element={<Action />}/>
          <Route path="/Action/Create" element={<CreateAction />}/>
          <Route path="/Action/Join" element={<JoinAction />}/>

        </Routes>
    
    </div>
  )
}

export default App
