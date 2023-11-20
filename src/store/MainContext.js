import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const MainContext = createContext(null);

const MainContextProvider = (props) => {
  const [userAuth, setUserAuth] = useState(null); // stores the email of a user when they are logged in, its null otherwise
  const [userId, setUserId] = useState(null); //stores unique user id of a user which is guven by firebase
  console.log("Users email id is ", userAuth);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user.email);
      } else {
        setUserAuth(null);
      }
    });
  }, [userAuth]);
  return (
    <MainContext.Provider value={{ userAuth, userId, setUserId }}>
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContextProvider;
