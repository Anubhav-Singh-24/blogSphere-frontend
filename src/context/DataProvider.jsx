import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");

  useEffect(()=>{
    let token = localStorage.getItem('accessToken')
    if(token){
      const decoded = jwtDecode(token);
      const{name,email} = decoded
      setUserName(email)
      setName(name)
    }
  },[])

  return (
    <DataContext.Provider
      value={{
        name,
        username,
        setName,
        setUserName
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
