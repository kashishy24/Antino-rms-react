import { MenuItem, TextField } from "@mui/material";
import React from "react";

const DeletedDevFilter = ({ status, devStatusHandler }) => {
  return (
    <TextField
      select
      label="Status"
      type={"text"}
      defaultValue={status}
      sx={{
        // backgroundColor: "white",
        fontSize: "10px",
        width: "100px",
        margin: "1rem 0px",
        "& .MuiSelect-select": {
          fontSize: "12px !important",
          padding: "4px 8px",
          backgroundColor: "white",
        },
      }}
      onChange={(event) => devStatusHandler(event.target.value)}
      InputLabelProps={{
        style: { fontSize: 12, marginTop: 3 },
      }}
      name="deleted"
      size="small"
    >
      <MenuItem
        sx={{
          fontSize: "12px",
          paddingTop: "3px",
          paddingBottom: "3px",
        }}
        key="false"
        value={false}
      >
        Active
      </MenuItem>
      <MenuItem
        sx={{
          fontSize: "12px",
          paddingTop: "3px",
          paddingBottom: "3px",
        }}
        key="true"
        value={true}
      >
        Deleted
      </MenuItem>
    </TextField>
  );
};

export default DeletedDevFilter;
