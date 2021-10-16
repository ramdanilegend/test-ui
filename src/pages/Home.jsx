import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useNavigate } from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState({ name: "" });
  const handleValue = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  const [data, setData] = React.useState([]);
  const [item, setItem] = React.useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(value);
    await axios.post(
      "http://18.139.50.74:8080/checklist",
      {
        name: value.name,
      },
      {
        headers: {
          Authorization: "Bearer " + location.state.token,
          //   "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const response = await axios.get("http://18.139.50.74:8080/checklist", {
      headers: {
        Authorization: "Bearer " + location.state.token,
      },
    });
    setData(response.data.data);
    // console.log(response.data);
    // navigate("/home", { state: { token: response.data.data.token } });
  };
  React.useEffect(async () => {
    const response = await axios.get("http://18.139.50.74:8080/checklist", {
      headers: {
        Authorization: "Bearer " + location.state.token,
      },
    });
    setData(response.data.data);
    console.log(response.data.data);
  }, []);
  return (
    <div>
      <div>Check List Name :</div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="name"
          value={value.name}
          onChange={handleValue}
        />
        <Button type="submit" variant="contained">
          Submit Name Cheklist
        </Button>
      </form>
      <Button
        onClick={() => {
          navigate("/login");
        }}
        variant="contained"
      >
        Back Login
      </Button>

      <table>
        <tr>
          <th>Action</th>
          <th>Name</th>
        </tr>

        {data.map((value, key) => (
          <tr key={key}>
            <IconButton
              onClick={async () => {
                navigate("/item", {
                  state: {
                    data: value.items,
                    id: value.id,
                    name: value.name,
                    token: location.state.token,
                  },
                });
              }}
            >
              <CheckBoxIcon />
            </IconButton>
            <IconButton
              aria-label="toggle password visibility"
              onClick={async () => {
                await axios.delete(
                  `http://18.139.50.74:8080/checklist/${value.id}`,
                  {
                    headers: {
                      Authorization: "Bearer " + location.state.token,
                    },
                  }
                );
                const response = await axios.get(
                  "http://18.139.50.74:8080/checklist",
                  {
                    headers: {
                      Authorization: "Bearer " + location.state.token,
                    },
                  }
                );
                setData(response.data.data);
              }}
            >
              <DeleteIcon />
            </IconButton>

            <td>{value.name}</td>
          </tr>
        ))}
      </table>
      <div>Check List Item :</div>
    </div>
  );
}

export default Home;
