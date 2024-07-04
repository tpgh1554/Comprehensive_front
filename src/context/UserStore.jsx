import { createContext, useState, useEffect } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("loginStatus") || ""
  );

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
