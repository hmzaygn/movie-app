import Box from "@mui/material/Box";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useAuthContext } from "../context/AuthProvider";

const Register = () => {
  const {
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    setUser,
  } = useAuthContext();

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setUser(user.user.email);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box sx={{ ml: 3 }}>
      <TextField
        onChange={(e) => setRegisterEmail(e.target.value)}
        type="email"
        id="email"
        label="Email"
        variant="filled"
      />
      <TextField
        onChange={(e) => setRegisterPassword(e.target.value)}
        type="password"
        id="password"
        label="Password"
        variant="filled"
      />
      <Button onClick={register} variant="outlined">
        Register
      </Button>
    </Box>
  );
};

export default Register;
