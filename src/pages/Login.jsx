import Box from "@mui/material/Box";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { useAuthContext } from "../context/AuthProvider";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const navigate = useNavigate();
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    setUser,
  } = useAuthContext();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const googleRegister = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        // console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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

        <Button
          onClick={googleRegister}
          startIcon={<GoogleIcon />}
          variant="contained"
          size="large"
        >
          Continue with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
