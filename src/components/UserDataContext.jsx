// UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [Email, setEmail] = useState("No Email");
  const [Role, setRole] = useState("Role");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {

        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("userrole");
  
        const response = await axios.get(
          `http://localhost:5000/api/v1/auth/${storedRole}`,
          {
            params: {
              token: storedToken,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        // console.log("Successfully fetched details", response.data);
        // console.log(response.data);
        const jsonresponse = await response.data;
        const realdata = jsonresponse.userdata;
        setEmail(realdata.email);
        setRole(realdata.role);
        setUser({ email: realdata.email, role: realdata.role }); // Update user state with current values
    };
  
    fetchUserDetails();
  }, []);
  

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
