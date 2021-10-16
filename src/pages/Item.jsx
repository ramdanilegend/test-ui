import React from "react";
import axios from "axios";

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
import { useNavigate, useLocation } from "react-router-dom";

function Item() {
  const location = useLocation();
  const [value, setValue] = React.useState({ itemName: "" });
  const handleValue = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(value);
    await axios.post(
      "http://18.139.50.74:8080/item",
      {
        checklistId: location.state.id,
        itemName: value.itemName,
      },
      {
        headers: {
          Authorization: "Bearer " + location.state.token,
          //   "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    // const response = await axios.get("http://18.139.50.74:8080/checklist", {
    //   headers: {
    //     Authorization: "Bearer " + location.state.token,
    //   },
    // });
    // setData(response.data.data);
    // console.log(response.data);
    // navigate("/home", { state: { token: response.data.data.token } });
  };

  return (
    <div>
      Cheklist Name : {location.state.name}
      <form onSubmit={handleSubmit}>
        <TextField
          name="itemName"
          label="Item Name"
          value={value.itemName}
          onChange={handleValue}
        />
        <Button type="submit" variant="contained">
          Submit Item to checklist Name
        </Button>
      </form>
      <table>
        <tr>
          <th>Name Item</th>
        </tr>
        {location.state.data
          ? location.state.data.map((value, index) => (
              <tr key={index}>
                <td>{value.name}</td>
              </tr>
            ))
          : "no item"}
      </table>
    </div>
  );
}

export default Item;
