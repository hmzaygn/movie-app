import Box from "@mui/material/Box";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useAuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

const Register = () => {
  const navigate = useNavigate();
  const {
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
  } = useAuthContext();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      navigate("/");
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
      </Box>
    </Box>
  );
};

export default Register;
