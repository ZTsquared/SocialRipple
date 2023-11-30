import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth";

export default async function getUser() {
    try {
      const response = await fetch(`/api/users/profile`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }

  const userObject = data;


  return (
    undefined
    // <AuthContext.Provider value={userObject}>{children}</AuthContext.Provider>
  );
}
