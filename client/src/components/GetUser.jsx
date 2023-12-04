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

      // Judit: for now i'm only passing the user's coordinates
      const userObject = {
        lat: data.latitude,
        lng: data.longitude
      }

      console.log(userObject)

      return userObject
    } catch (error) {
      console.log(error);
    }

  return (
    console.log("hola")
  );
}
