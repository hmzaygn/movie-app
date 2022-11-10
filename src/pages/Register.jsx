import Box from "@mui/material/Box";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { useAuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import GoogleIcon from "@mui/icons-material/Google";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const {
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    setUser,
  } = useAuthContext();

  const displayName = `${name} ${lastName}`;

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      await updateProfile(auth.currentUser, { displayName: displayName });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const googleRegister = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
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
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          label="Name"
          variant="filled"
        />
        <TextField
          margin="dense"
          required
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          id="lastname"
          label="Lastname"
          variant="filled"
        />
        <TextField
          margin="dense"
          required
          onChange={(e) => setRegisterEmail(e.target.value)}
          type="email"
          id="email"
          label="Email"
          variant="filled"
        />
        <TextField
          margin="dense"
          required
          onChange={(e) => setRegisterPassword(e.target.value)}
          type="password"
          id="password"
          label="Password"
          variant="filled"
        />
        <Button
          onClick={register}
          startIcon={<FingerprintIcon />}
          variant="contained"
          size="large"
        >
          Register
        </Button>
        <Button
          onClick={googleRegister}
          startIcon={<GoogleIcon />}
          variant="contained"
          size="large"
          margin
        >
          Continue with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
