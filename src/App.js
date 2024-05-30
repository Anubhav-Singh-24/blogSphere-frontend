import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import DataProvider from "./context/DataProvider";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import DetailedView from "./components/DetailedView";
import Editor from "./components/Editor";
import LandingPage from "./components/LandingPage";
import Update from "./components/Update";
import ThemeProvider from "./context/ThemeProvider";
import PageNotFound from "./components/PageNotFound";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return localStorage.getItem("accessToken") ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, setAuthentication] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('accessToken')){
      setAuthentication(true)
    }
  },[])
  

  return (
    <ThemeProvider >
      <main className="flex flex-col min-h-[100vh] h-screen dark:bg-[rgba(8,10,21,1)] dark:text-white">
        <DataProvider>
          <BrowserRouter>
            <Navbar
              isAuthenticated={isAuthenticated}
              setAuthentication={setAuthentication}
            />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/myposts"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/myposts" element={<Home />} />
              </Route>
              <Route
                path="/editor"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/editor" element={<Editor />} />
              </Route>
              <Route
                path="/update/:id"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/update/:id" element={<Update />} />
              </Route>
              <Route
                path="/login"
                element={<Login setAuthentication={setAuthentication} />}
              />
              <Route
                path="/detail/:id"
                element={<DetailedView isAuthenticated={isAuthenticated} />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer isAuthenticated={isAuthenticated} />
          </BrowserRouter>
        </DataProvider>
      </main>
    </ThemeProvider>
  );
}

export default App;
