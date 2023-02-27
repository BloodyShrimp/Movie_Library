import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    id: 0,
  });

  const [createdAtState, setCreatedAtState] = useState("");
  let navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    const getUserData = (id) => {
      fetch(`http://localhost:8080/users/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setUserInfo(data);
            setCreatedAtState(data.createdAt.slice(0, 10));
          } else {
            navigate("/");
          }
        });
    };

    fetch("http://localhost:8080/users/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          navigate("/");
        } else {
          getUserData(data.userId);
        }
      });
  }, [authState, navigate]);

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      fetch(`http://localhost:8080/users/${userInfo.id}`, {
        method: "DELETE",
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
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
        <h1>Account creation: {createdAtState}</h1>
      </div>
      <div className="deleteAccount">
        <button onClick={deleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}

export default Profile;
