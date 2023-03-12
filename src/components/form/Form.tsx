import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { FC, useEffect, useState } from "react";
import { FormProps, FormValues } from "../../utils/types";
import { buttonText, placeholder } from "./constants";
import FormHead from "./FormHead";

const Form: FC<FormProps> = ({ questions }) => {
  const matches = useMediaQuery("(max-width:900px)");

  const defaultValues: FormValues = {};

  questions.forEach((question) => {
    defaultValues[question.question] = "";
  });

  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    const newDefaultValues: FormValues = {};
    questions.forEach((question) => {
      newDefaultValues[question.question] = "";
      if (question.additionalQuestion) {
        newDefaultValues[question.additionalQuestion] = "";
      }
    });
    setFormValues(newDefaultValues);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(JSON.stringify(formValues, null, 2));
    clearForm();
  };

  useEffect(() => {
    const validateForm = () => {
      for (const question of questions) {
        if (question.required && !formValues[question.question]) {
          return false;
        }
      }
      return true;
    };
    setIsFormValid(validateForm());
  }, [formValues, questions]);

  return (
    <form onSubmit={handleSubmit}>
      <FormHead />
      {questions &&
        questions.map((question, index) => (
          <Box
            sx={{ bgcolor: "white", borderRadius: "7px", mt: "20px" }}
            key={index}
          >
            <Box sx={{ p: "20px 30px" }}>
              <Typography variant="body1" gutterBottom>
                {question.question}{" "}
                {question.required && (
                  <span style={{ color: red["A700"] }}>*</span>
                )}
              </Typography>

              {question.answers ? (
                <FormControl component="fieldset" fullWidth required={true}>
                  <RadioGroup
                    aria-label={question.question}
                    name={question.question}
                    value={formValues[question.question]}
                    onChange={handleChange}
                  >
                    {question.answers.map((answer, index) => (
                      <Box sx={{ display: "flex" }} key={index}>
                        <FormControlLabel
                          value={answer}
                          control={<Radio />}
                          label={`${answer}${answer === "Other" ? ":" : ""}`}
                          key={index}
                        />
                        {answer === "Other" && (
                          <TextField
                            variant="standard"
                            fullWidth
                            name={"Other"}
                            value={
                              formValues[question.question] !== "Other"
                                ? ""
                                : formValues["Other"]
                            }
                            onChange={handleChange}
                            style={{ marginTop: "6px" }}
                            disabled={formValues[question.question] !== "Other"}
                          />
                        )}
                      </Box>
                    ))}
                  </RadioGroup>
                </FormControl>
              ) : (
                <TextField
                  label={placeholder}
                  variant="standard"
                  style={{ width: matches ? "100%" : "35%" }}
                  name={question.question}
                  value={formValues[question.question]}
                  onChange={handleChange}
                />
              )}
              <TextField
                style={{
                  height:
                    question.additionalQuestion &&
                    formValues[question.question] === "TypeScript"
                      ? "71px"
                      : "0",
                  opacity:
                    question.additionalQuestion &&
                    formValues[question.question] === "TypeScript"
                      ? "1"
                      : "0",
                  transition: "height 0.5s, opacity 0.2s ease",
                }}
                variant="standard"
                fullWidth
                multiline
                rows={2}
                name={question.additionalQuestion}
                label={question.additionalQuestion}
                value={
                  question.additionalQuestion
                    ? formValues[question.additionalQuestion]
                    : ""
                }
                onChange={handleChange}
              />
            </Box>
          </Box>
        ))}
      <Box sx={{ textAlign: "right" }}>
        <Button
          sx={{
            mt: 2,
            textTransform: "capitalize",
            backgroundColor: blue[400],
          }}
          type="submit"
          variant="contained"
          disabled={!isFormValid}
        >
          {buttonText}
        </Button>
      </Box>
    </form>
  );
};

export default Form;
