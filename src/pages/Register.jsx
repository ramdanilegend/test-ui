import React from "react";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = React.useState("");
  const [value, setValue] = React.useState({
    username: "",
    password: "",
    email: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleUsername = (event) => {
    setUserName(event.target.value);
  };
  const handleValue = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value);
    axios.post(
      "http://18.139.50.74:8080/register",
      {
        email: value.email,
        username: value.username,
        password: value.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  return (
    <Box display="flex" justifyContent="center" marginTop="120px">
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          marginTop="120px"
        >
          <TextField
            name="email"
            label="Email"
            value={value.email}
            onChange={handleValue}
          />
          <TextField
            name="username"
            label="Username"
            value={value.username}
            onChange={handleValue}
          />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={value.password}
              onChange={handleValue}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Register
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            variant="contained"
          >
            Back Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
