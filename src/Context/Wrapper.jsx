import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc
} from "firebase/firestore";
import { auth, db } from "../firebase/Firebase.config";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userdata, setuserdata] = useState(null);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userdata = docSnap.data();
          setisloading(false);
          setuserdata(userdata);
        } else {
          console.log("user not found");
          setisloading(false);
        }
      } else {
        setisloading(false);
      }
    });

    return () => unsubscribe();
  }, []);

 

  return (
    <DataContext.Provider value={{ userdata, isloading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
