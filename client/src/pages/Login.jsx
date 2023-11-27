import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/auth';

export default function Login() {

    const { setIsLoggedIn } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
      });

    const navigate = useNavigate();
    const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

    const handleSubmit = (event) => {

      event.preventDefault();
      console.log(event);
      localStorage.setItem("token", "this is a token hahah well maybe not");    //just for test
        setIsLoggedIn(true);                                                    //just for test
        navigate({pathname: "/MainMenu"})                                       //just for test

      // login();
    }

    const login = async () => {
        
        try {
          console.log("trying...")
          const { data } = await axios("/api/auth/login", {
                method: "POST",
                data: credentials,
              })
      
          //store it locally
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);

          const userDataToContext = {
            user_id: data.user_id,
            user_name: data.user_name,
            user_type: data.user_type
          }
          setUserData(userDataToContext);
          navigate({pathname: "/MainMenu"});
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="mainMenu">

            <div>
                <h2> Login:</h2>

                <form onSubmit={handleSubmit} action="">

                    <label htmlFor="username_input">username: <br />
                    <input value={username} name="username" onChange={handleChange} id="username" type="text" />
                    </label>
                    <br /><br />
                    <label htmlFor="password_input">password: <br />
                    <input value={password} name="password" onChange={handleChange} id="password" type="password" />
                    <br /><br />
                    </label> <br />
                    <button>login</button>
                </form>

            </div>

    </div>
  )
}