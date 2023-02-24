import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Profile from "./pages/Profile";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.userId,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <Router>
      <div className="navbar">
        {!authState.status ? (
          <>
            <Link to="/login" id="standardLinks">
              Login/Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/" id="standardLinks">
              Home
            </Link>
            <Link to="/addmovie" id="standardLinks">
              Add Movie
            </Link>
            <Link to="/profile" id="profileName">
              <h1>{authState.username}</h1>
            </Link>
            <button id="logoutButton" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>

      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addmovie" element={<AddMovie />} />
            <Route path="/movie/:id" element={<EditMovie />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AuthContext.Provider>
      </div>
    </Router>
  );
}

export default App;
