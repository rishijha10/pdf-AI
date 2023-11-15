import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const MainContext = createContext(null);

const MainContextProvider = (props) => {
  const [userAuth, setUserAuth] = useState(null);
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
    <MainContext.Provider value={{ userAuth }}>
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContextProvider;
