import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

function EditMovie() {
  const [initialValues, setInitialValues] = useState({
    title: "",
    score: "",
    type: "",
    episode: "",
    season: "",
    startedDate: "",
    finishedDate: "",
    status: "",
  });

  let { id } = useParams();
  const navigate = useNavigate();
  // const [movieObject, setMovieObject] = useState({});

  // get movie by id
  const getMovieData = () => {
    axios.get(`http://localhost:8080/movies/byId/${id}`).then((res) => {
      if (res.data) {
        setInitialValues({
          title: res.data.title || "",
          score: res.data.score || "",
          type: res.data.type || "",
          episode: res.data.episode || "",
          season: res.data.season || "",
          startedDate: res.data.startedDate || "",
          finishedDate: res.data.finishedDate || "",
          status: res.data.status || "",
        });
      } else {
        navigate("/");
      }
    });
  };

  const onSubmitEdit = (data) => {
    const formData = {};

    Object.keys(data).forEach((key) => {
      if (data[key] !== "") {
        formData[key] = data[key];
      }
    });
    
    axios
      .patch(`http://localhost:8080/movies/${id}`, formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          navigate("/");
        }
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      axios
        .delete(`http://localhost:8080/movies/${id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            navigate("/");
          }
        });
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    type: Yup.string().required("Type is required"),
    episode: Yup.number("Episode must be a number"),
    season: Yup.number("Season must be a number"),
    startedDate: Yup.date("Started date must be a date"),
    finishedDate: Yup.date("Finished date must be a date"),
    status: Yup.string().required("Status is required"),
  });

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <div className="addMoviePage">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmitEdit}
        validationSchema={validationSchema}
      >
        <Form className="addMovieForm">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputAddMovie"
            name="title"
            placeholder="Ex. Pulp Fiction"
          />

          <label>Score: </label>
          <Field type="number" as="select" id="inputAddMovie" name="score">
            <option value="">Select a score</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Field>

          <label>Type: </label>
          <ErrorMessage name="type" component="span" />
          <Field as="select" id="inputAddMovie" name="type">
            <option value="">Select Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </Field>

          <label>Episode:</label>
          <ErrorMessage name="episode" component="span" />
          <Field
            type="number"
            id="inputAddMovie"
            name="episode"
            placeholder="Ep No."
            min={1}
          />

          <label>Season: </label>
          <ErrorMessage name="season" component="span" />
          <Field
            type="number"
            id="inputAddMovie"
            name="season"
            placeholder="Season No."
            min={1}
          />

          <label>Started Date: </label>
          <ErrorMessage name="startedDate" component="span" />
          <Field id="inputAddMovie" name="startedDate" type="date" />

          <label>Finished Date: </label>
          <ErrorMessage name="finishedDate" component="span" />
          <Field id="inputAddMovie" name="finishedDate" type="date" />

          <label>Status: </label>
          <ErrorMessage name="status" component="span" />
          <Field as="select" id="inputAddMovie" name="status">
            <option value="">Select Status</option>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On-Hold</option>
            <option value="dropped">Dropped</option>
            <option value="plan-to-watch">Plan to Watch</option>
          </Field>

          <div className="addMovieButtons">
            <button id="deleteButton" type="button" onClick={handleDelete}>
              Delete
            </button>
            <button
              id="cancelButton"
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </button>
            <button id="basicButton" type="submit">
              Apply
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default EditMovie;
