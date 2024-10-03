import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'


const userContext = React.createContext();
const UserContext = ({children}) => {
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState({ status: false, message: "" });
    const [user, setUser] = useState({});

    const handleFetchMe = async () => {
      setUserLoading(true);
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
    
      if (!token) {
        setUserError({ status: true, message: "Not logged in" });
        setUserLoading(false);
        return;
      }
    
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
            withCredentials: true, // Send cookies with the request, if necessary
          }
        );
    
        console.log("User Fetch Response:", response); // Check response structure
    
        // Access the correct part of the response object
        setUser(response?.data?.user || {}); // Ensure the `user` state is correctly set
    
        setUserError({ status: false, message: "" });
      } catch (error) {
        console.error("Error fetching user:", error?.response?.data);
        setUserError({ status: true, message: error?.response?.data?.message || "Unauthorized" });
        setUser({}); // Clear user data on error
      }
    
      setUserLoading(false);
    };
    
    
  
     // Effect hook to fetch user data when component mounts
    useEffect(() => {
        handleFetchMe();
    }, []);


    // Object to pass as value to context provider
    const passing = { userLoading, userError, user, handleFetchMe };

     // Returning context provider with passing object as value
    return (
        <userContext.Provider value={passing}>{children}</userContext.Provider>
    );
};


// Custom hook to use user context
const useUserContext = () => useContext(userContext);


// Exporting custom hook and UserContext component
export { useUserContext, UserContext };
