import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const MainContext = createContext(null);

const MainContextProvider = (props) => {
  const [userAuth, setUserAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  console.log("User id is ", userId);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user.email);
      } else {
        setUserAuth(null);
      }
    });
  }, []);
  return (
    <MainContext.Provider value={{ userAuth, userId, setUserId }}>
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContextProvider;
