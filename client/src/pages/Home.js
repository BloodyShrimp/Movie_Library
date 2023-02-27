import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfMovies, setListOfMovies] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const getMovies = (userId, status = "") => {
    const accessToken = localStorage.getItem("accessToken");

    fetch(`http://localhost:8080/movies/private/${userId}/?status=${status}`, {
      headers: {
        accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setListOfMovies(data);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/users/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          navigate("/login");
        } else {
          getMovies(data.userId, selectedStatus);
        }
      });
  }, [authState.status, navigate, selectedStatus]);

  return (
    <div className="movie-page">
      <div className="statuses">
        <button onClick={() => setSelectedStatus("")}>All</button>
        <button onClick={() => setSelectedStatus("watching")}>Watching</button>
        <button onClick={() => setSelectedStatus("completed")}>
          Completed
        </button>
        <button onClick={() => setSelectedStatus("on-hold")}>On Hold</button>
        <button onClick={() => setSelectedStatus("dropped")}>Dropped</button>
        <button onClick={() => setSelectedStatus("plan-to-watch")}>
          Plan To Watch
        </button>
      </div>
      <table className="movie-table">
        <thead>
          <tr>
            <th className="movie-title">Title</th>
            <th className="movie-score">Score</th>
            <th className="movie-type">Type</th>
            <th className="movie-episode">Episode</th>
            <th className="movie-season">Season</th>
            <th className="movie-started-date">Started Date</th>
            <th className="movie-finished-date">Finished Date</th>
            <th className="movie-status">Status</th>
            <th className="movie-edit">Edit</th>
          </tr>
        </thead>
        <tbody>
          {listOfMovies.map((value, key) => {
            return (
              <tr key={key} className="movie">
                <td className="movie-title">{value.title}</td>
                <td className="movie-score">{value.score || "-"}</td>
                <td className="movie-type">{value.type}</td>
                <td className="movie-episode">{value.episode || "-"}</td>
                <td className="movie-season">{value.season || "-"}</td>
                <td className="movie-started-date">
                  {value.startedDate || "-"}
                </td>
                <td className="movie-finished-date">
                  {value.finishedDate || "-"}
                </td>
                <td className="movie-status">{value.status}</td>
                <td className="movie-edit">
                  <button
                    onClick={() => {
                      navigate(`/movie/${value.id}`);
                    }}
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
