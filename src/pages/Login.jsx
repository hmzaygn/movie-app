import Box from "@mui/material/Box";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { useAuthContext } from "../context/AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { loginEmail, setLoginEmail, loginPassword, setLoginPassword } =
    useAuthContext();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

      navigate(-1);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      className="login-container"
      sx={{
        height: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box className="input-area">
        <TextField
          margin="dense"
          required
          onChange={(e) => setLoginEmail(e.target.value)}
          type="email"
          id="email"
          label="Email"
          variant="filled"
        />
        <TextField
          margin="dense"
          required
          onChange={(e) => setLoginPassword(e.target.value)}
          type="password"
          id="password"
          label="Password"
          variant="filled"
        />
        <Button
          onClick={login}
          startIcon={<FingerprintIcon />}
          variant="contained"
          size="large"
        >
          LogIn
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
