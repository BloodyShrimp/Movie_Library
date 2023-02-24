import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function Profile() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    id: 0,
  });
  let navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  const getUserData = (id) => {
    axios.get(`http://localhost:8080/users/${id}`).then((res) => {
      if (res.data) {
        setUserInfo(res.data);
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          navigate("/");
        } else {
          getUserData(res.data.userId);
        }
      });
  }, [authState, navigate]);

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      axios
        .delete(`http://localhost:8080/users/${userInfo.id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          localStorage.removeItem("accessToken");
          setAuthState({
            username: "",
            id: 0,
            status: false,
          });
          navigate("/");
        });
    }
  };

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {userInfo.username}</h1>
        <h1>Email: {userInfo.email}</h1>
        <h1>Account creation: {userInfo.createdAt}</h1>
      </div>
      <div className="deleteAccount">
        <button onClick={deleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}

export default Profile;
