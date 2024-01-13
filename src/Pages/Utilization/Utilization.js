import * as React from "react";
import Paper from "@mui/material/Paper";
import { Grid, MenuItem, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGroups } from "../../Redux/Slices/Lists/ListsSlice";
import DeveloperUtilization from "./DeveloperUtilization";
import ProjectGrading from "./Projectgrading";

export default function Utilization() {
  const [utilize, setUtilize] = useState("developer");
  const dispatch = useDispatch();
  const { groups } = useSelector((store) => store.lists);

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  const handleGroupChange = (event) => {
    console.log(event.target?.value);
  };

  const handleChange = (event) => {
    setUtilize(event.target?.value);
    // console.log(utilize);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      <Paper
        sx={{
          // width: "100%",
          // width: utilize === "developer" ? "80vw" : "60vw",
          width: "80vw",
        }}
      >
        {utilize === "developer" && <DeveloperUtilization />}
        {utilize === "project" && <ProjectGrading />}
        <div
          style={{
            padding: "10px 20px",
            borderTop: "1px solid lightgray",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid container spacing={1}>
            <Grid item>
              <TextField
                id="outlined-required"
                select
                label="Select"
                type={"text"}
                onChange={handleChange}
                defaultValue="developer"
                sx={{
                  width: "80px",
                  backgroundColor: "white",
                  fontSize: "10px",
                  "& .MuiSelect-select": {
                    fontSize: "12px !important",
                    padding: "3.5px 25px 3.5px 7px !important",
                    height: "20px !important",
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: 12, marginTop: -3 },
                }}
                name="select"
                size="small"
                // style={{ width: "100%", backgroundColor: "white" }}
              >
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key="developer"
                  value="developer"
                >
                  Developer
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key="project"
                  value="project"
                >
                  Project
                </MenuItem>
              </TextField>
            </Grid>
            {utilize === "developer" && (
              <Grid item>
                <TextField
                  id="outlined-required"
                  select
                  label="Group"
                  type={"text"}
                  onChange={handleGroupChange}
                  sx={{
                    width: "80px",
                    backgroundColor: "white",
                    fontSize: "10px",
                    "& .MuiSelect-select": {
                      fontSize: "12px !important",
                      padding: "3.5px 25px 3.5px 7px !important",
                      height: "20px !important",
                    },
                  }}
                  // inputProps={{
                  //   style: { fontSize: 12 },
                  // }}
                  InputLabelProps={{
                    style: { fontSize: 12, marginTop: -3 },
                  }}
                  name="group"
                  size="small"
                  // style={{ width: "100%", backgroundColor: "white" }}
                >
                  {groups?.map((group) => (
                    <MenuItem
                      sx={{
                        fontSize: "12px",
                        paddingTop: "3px",
                        paddingBottom: "3px",
                      }}
                      key={group.group_name}
                      value={group._id}
                    >
                      {group.group_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
          </Grid>
          {/* <Button onClick={clickHandler}>Submit</Button> */}
        </div>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={requiredRow.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </div>
  );
}
