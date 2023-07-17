import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveData } from "../slices/dataSlice";
import { TextField, Button, Paper, Typography } from "@mui/material";
import Navbar from "../components/navbar";
// import { useNavigate } from "react-router-dom";

const CreateNewUser = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveData({ name, email, phone }));
    setName("");
    setEmail("");
    setPhone("");
    // navigate("/usertable");
  };

  return (
    <>
      <Navbar selectedPage={"Dashboard"} />

      <Paper
        elevation={6}
        sx={{
          p: 2,
          margin: "auto",
          marginTop: "6rem",
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" color={"black"}>
          Create New User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default CreateNewUser;
