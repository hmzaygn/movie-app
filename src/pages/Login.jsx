import Box from "@mui/material/Box";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { useAuthContext } from "../context/AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";

const Login = () => {
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    setUser,
  } = useAuthContext();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setUser(user.user.email);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box sx={{ ml: 3, mt: 2 }}>
      <TextField
        onChange={(e) => setLoginEmail(e.target.value)}
        type="email"
        id="email"
        label="Email"
        variant="filled"
      />
      <TextField
        onChange={(e) => setLoginPassword(e.target.value)}
        type="password"
        id="password"
        label="Password"
        variant="filled"
      />
      <Button
        onClick={login}
        startIcon={<FingerprintIcon />}
        variant="outlined"
      >
        LogIn
      </Button>
    </Box>
  );
};

export default Login;
