import { Box, Container } from "@mui/material";
import { pink } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ErrorMessage from "./components/errorMessage/ErrorMessage";
import Form from "./components/form/Form";
import Skeleton from "./components/skeleton/Skeleton";
import { errorText } from "./utils/constants";
import { Questionnaire } from "./utils/types";

const boxesHeight = [150, 220, 118, 260];

function App() {
  const [questions, setQuestions] = useState<Questionnaire[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/questionnaires/1")
      .then((response) => {
        setError("");
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        setError(error.message);
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <Container fixed>
      <Box sx={{ bgcolor: pink[50], minHeight: "100vh", p: "20px 10%" }}>
        {error ? (
          <ErrorMessage text={errorText} />
        ) : questions && !!questions.length ? (
          <Form questions={questions} />
        ) : (
          <Skeleton boxesHeight={boxesHeight} />
        )}
      </Box>
    </Container>
  );
}

export default App;
