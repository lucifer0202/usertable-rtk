import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    background: `linear-gradient(to bottom, #D6FF7F 0%,#00B3CC 100%)`
  },
  avatar: {
    margin: "8px",
  },
  paper: {
    margin: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
  },
}));

const SignInSide = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (event) => {
    if (!event.target.value) {
      setError("");
    } else if (!isValidEmail(event.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setEmail(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("user", email);
    if (email) {
      navigate("/add");
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          marginTop: "6rem",
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: "#fff",
        }}
      >
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate={false}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              autoFocus
            />
            {error && <h4 style={{ color: "red" }}>{error}</h4>}
            <Button
              onClick={handleSubmit}
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Paper>
    </Grid>
  );
};

export default SignInSide;
