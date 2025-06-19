// authUtils.js
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useData } from "../Context/Wrapper";


export const logoutUser = async () => {
   
  try {
    await signOut(auth);
    console.log("User signed out");
    window.location.reload()
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
