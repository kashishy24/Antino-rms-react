import React, { useEffect, useState } from "react"
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  useTheme,
  Typography,
  Autocomplete,
} from "@mui/material"
import {
  get_users,
  setFilterParameters,
  setCurrentPage,
  setDataPerPage,
  fetch_users,
  setExportPerPage,
  setExportPage,
} from "../../Redux/Slices/getUsersSlice"
import {
  getAllProjectManagers,
  getProjects,
  getTechStacks,
  getTeamDesignations,
  getDesignations,
  getGroups,
} from "../../Redux/Slices/Lists/ListsSlice"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import FilterSchema from "../Auth/Register/FilterSchema"
import { useNavigate } from "react-router-dom"
import { makeStyles } from "@mui/styles"
import RegisterDeveloperModal from "./RegisterDevModal"
import ExportOptions from "../../utils/DataDownloader/ExportOptions/ExportOptions"
import { DeveloperConfig } from "../../utils/DataDownloader/ExportOptions/ExportConfig"

const DeveloperFilter = ({ status, devStatusHandler }) => {
  console.log("activeapi", status)
  const theme = useTheme()
  const useStyles = makeStyles({
    filterItem: {
      "& div": {
        borderRadius: "0.25rem",
        fontSize: "12px !important",
        backgroundColor: "white",
        fontSize: "10px",
      },
      "& label": {
        fontSize: "12px !important",
      },

      // "& .MuiList-root": {
      //   height: "100px !important",
      // },
    },
    menuPaper: {
      height: 200,
    },
  })

  const classes = useStyles()

  const query = "api/v2/users/search"
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchExport =()=>{
    dispatch(setExportPerPage(221))
    dispatch(setExportPage(0))
    dispatch(fetch_users({}))
  }
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(FilterSchema),
  })
  const [isFresher, setIsFresher] = useState("true")
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const { dataPerPage, currentPage, searchFilters, search_user,totalExport} = useSelector(
    store => store?.getUsers
  )

  const role = localStorage.getItem("designation")

  const {
    projectManagers,
    projects,
    techStacks,
    designations,
    teamDesignations,
    groups,
  } = useSelector(store => store?.lists)
  console.log("projectmanan", projectManagers)
  // const {porjectManagers} =useSelector((store) => store?.lists)

  useEffect(() => {
    dispatch(getTechStacks())
    dispatch(getDesignations())
    // dispatch(getTeamDesignations());
    dispatch(getProjects())
    dispatch(getGroups())
    dispatch(getAllProjectManagers())
    // dispatch(get_reportingPMs());
  }, [])

  useEffect(() => {
    const pmId = teamDesignations?.filter(role => role?.name === "PM")[0]?._id
    console.log(pmId)
  }, [teamDesignations])

  const handleChange = event => {
    setIsFresher(event.target?.value)
  }

  const closeRegisterModalHandler = () => {
    setOpenRegisterModal(false)
  }

  const rowPerPageHandler = event => {
    // dispatch(setCurrentPage(1));
    dispatch(setDataPerPage(event.target?.value))
  }

  const resetHandler = () => {
    const data = { isDeleted: false }
    resetField("keyword")
    resetField("designation")
    resetField("secondarytechStack")
    dispatch(setFilterParameters({}))
    // dispatch(setCurrentPage(1));
    const url = "api/v2/users/search"

    dispatch(
      get_users(
        "api/v2/users/search"
        // {
        // query,
        // dataPerPage, currentPage
        // }
      )
    )
    dispatch(setFilterParameters(data))
  }

  const FormHandler = data => {
    let data1 = { ...data, isDeleted: false }

    const dataKeys = Object.keys(data)

    dataKeys.map(key => {
      data1[`${key}`] = data1[`${key}`]?.trim()
      if (data1[`${key}`] === "") {
        delete data1[`${key}`]
      }
    })
    console.log(data)
    if (Object.keys(data1)?.length === 0) {
      dispatch(setFilterParameters({}))
      dispatch(
        get_users(
          "api/v2/users/search"
          // {
          // query,
          // dataPerPage, currentPage
          // }
        )
      )
    } else {
      // data.limit = dataPerPage;
      // data.page = currentPage;
      // console.log(data);
      const url = "api/v2/users/search"
      // if (data.hasOwnProperty("isAvailable")) {
      //   data.isAvailable = data.isAvailable === "Yes" ? true : false;
      // }
      dispatch(setFilterParameters(data1))
      // dispatch(setCurrentPage(1));
      dispatch(search_user({ data1 }))
    }
  }

  return (
    <Grid
      container
      sx={{
        overflow: "hidden",
        // marginTop: "1rem",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(FormHandler)}
      >
        {openRegisterModal && (
          <RegisterDeveloperModal
            open={openRegisterModal}
            onClose={closeRegisterModalHandler}
          />
        )}

        <Grid
          container
          sx={{
            width: "100%",
            marginTop: "1rem",
            marginLeft: "0px",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            alignItems: "center",
            borderRadius: "10px",
            paddingBottom: "16px",
            paddingRight: "16px",
            // paddingLeft: "15px",
            // flexWrap: "wrap",
            // padding: "16px",
            // display: `${!showFilter && "none"}`,
          }}
          spacing={2}
        >
          {/* <Grid container sx={{ width: "100%", flexWrap: "wrap" }}> */}
          {/* <TextField
            select
            label="Rows"
            type={"text"}
            // defaultValue={10}
            inputProps={{
              style: {
                height: "1px",
              },
            }}
            sx={{
              width: "200px",
            }}
            onChange={rowPerPageHandler}
            name="rows"
          >
            <MenuItem
              sx={{
                fontSize: "12px",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
              key="10"
              value={10}
            >
              10
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: "12px",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
              key="25"
              value={25}
            >
              25
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: "12px",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
              key="50"
              value={50}
            >
              50
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: "12px",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
              key="100"
              value={100}
            >
              100
            </MenuItem>
          </TextField> */}
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "0px ",
              marginLeft: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={4} sm={4} md={3} lg={1.5}>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                FILTER BY{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={8}
              md={6}
              lg={3}
              sx={{ display: "flex", flexDirection: "row" }}
              gap={2}
            >
              <Grid item xs={6}>
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    background: "white",
                    padding: "1px 8px !important",
                    "&:hover": {
                      background: "white",
                    },
                  }}
                >
                  Search
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={resetHandler}
                  sx={{
                    background: "white",
                    width: "100%",
                    padding: "1px 8px !important",
                    "&:hover": {
                      background: "white",
                    },
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className={classes.filterItem}
            xs={6}
            sm={4}
            md={3}
            lg={1.5}
          >
            <TextField
              id="techStack-select"
              select
              label="Tech Stack"
              type={"text"}
              onChange={handleChange}
              name="techStack"
              defaultValue={searchFilters?.techStack}
              SelectProps={{
                MenuProps: { className: classes.menuPaper },
              }}
              // defaultValue={
              //   Object.keys(searchFilters).length === 0
              //     ? ""
              //     : searchFilters?.techStack
              // }
              size="small"
              {...register("techStack")}
              error={errors.techStack ? true : false}
              sx={{ width: "100%" }}
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key="NULL"
                value=""
              >
                Default
              </MenuItem>
              {techStacks?.map(techStack => (
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key={techStack.name}
                  value={techStack._id}
                >
                  {techStack.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            className={classes.filterItem}
            xs={6}
            sm={4}
            md={3}
            lg={1.5}
          >
            <TextField
              id="outlined-required"
              select
              label="Availability"
              defaultValue={searchFilters?.isAvailable}
              // defaultValue={
              //   Object.keys(searchFilters).length === 0
              //     ? ""
              //     : searchFilters?.isAvailable
              // }
              type={"text"}
              sx={{
                width: "100%",
                "& span": {
                  fontSize: "12px !important",
                },
              }}
              onChange={handleChange}
              name="isAvailable"
              size="small"
              {...register("isAvailable")}
              error={errors.isAvailable ? true : false}
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key="NULL"
                value=""
              >
                Default
              </MenuItem>

              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key="mayBeAvailable"
                value="Available"
              >
                Available
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key="available"
                value="Not Available"
              >
                Unavailable
              </MenuItem>
            </TextField>
          </Grid>
          <Grid
            item
            className={classes.filterItem}
            xs={6}
            sm={4}
            md={3}
            lg={1.5}
          >
            <TextField
              id="outlined-required"
              select
              label="Designation"
              onChange={handleChange}
              // defaultValue={
              //   Object.keys(searchFilters).length === 0
              //     ? ""
              //     : searchFilters?.designation
              // }
              defaultValue={searchFilters?.designation}
              sx={{
                width: "100%",
                fontSize: "10px",
              }}
              size="small"
              type={"text"}
              name="designation"
              {...register("designation")}
              SelectProps={{
                MenuProps: { className: classes.menuPaper },
              }}
              error={errors.designation ? true : false}
              // helperText={errors.designation?.message}
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key="NULL"
                value=""
              >
                Default
              </MenuItem>
              {designations?.map(designation => (
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key={designation.name}
                  value={designation._id}
                >
                  {designation.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            className={classes.filterItem}
            xs={6}
            sm={4}
            md={3}
            lg={1.5}
          >
            <TextField
              id="outlined-required"
              select
              label="Secondary Tech Stack"
              size="small"
              type={"text"}
              onChange={handleChange}
              // defaultValue={
              //   Object.keys(searchFilters).length === 0
              //     ? ""
              //     : searchFilters?.role
              // }
              defaultValue={searchFilters?.secondaryTechStack}
              name="secondaryTechStack"
              {...register("secondaryTechStack")}
              error={errors.secondaryTechStack ? true : false}
              // helperText={errors.role?.message}
              sx={{ width: "100%" }}
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key="NULL"
                value=""
              >
                Default
              </MenuItem>
              {techStacks?.map(techStack => (
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key={techStack.name}
                  value={techStack._id}
                >
                  {techStack.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            className={classes.filterItem}
            xs={6}
            sm={4}
            md={3}
            lg={1.5}
          >
            <TextField
              id="outlined-required"
              select
              label="Projects"
              type={"text"}
              onChange={handleChange}
              name="projects"
              defaultValue={searchFilters?.projects}
              SelectProps={{
                MenuProps: { className: classes.menuPaper },
              }}
              // defaultValue={
              //   Object.keys(searchFilters).length === 0
              //     ? ""
              //     : searchFilters?.projects
              // }
              size="small"
              {...register("projects")}
              error={errors.projects ? true : false}
              sx={{ width: "100%" }}
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key=""
                value=""
              >
                Default
              </MenuItem>
              {projects?.map(item => (
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key={item.projects.projectName}
                  value={item.projects._id}
                >
                  {item.projects.projectName}
                </MenuItem>
              ))}
            </TextField>
            {/* <Autocomplete
              // options={developers}
              options={projects}
              // groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.projectName}
              // onChange={(event, value) =>
              //   // formik.setFieldValue("developerId", value?._id)
              // }
              size="small"
              
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: "100%",
                  }}
                  value={searchFilters?.projectName}
                  name="project"
                  label="Project"
                />
              )}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option._id}>
                    {option.projectName}
                  </li>
                );
              }}
            /> */}
          </Grid>
          <Grid
            item
            className={classes.filterItem}
            xs={6}
            sm={4}
            md={3}
            lg={1.5}
          >
            <TextField
              id="outlined-required"
              select
              label="Seniority"
              type={"text"}
              onChange={handleChange}
              name="seniority"
              defaultValue={searchFilters?.seniority}
              // defaultValue={
              //   Object.keys(searchFilters).length === 0
              //     ? ""
              //     : searchFilters?.seniority
              // }
              size="small"
              SelectProps={{
                MenuProps: { className: classes.menuPaper },
              }}
              // style={{ width: "100%", backgroundColor: "white" }}
              {...register("seniority")}
              error={errors.seniority ? true : false}
              sx={{ width: "100%" }}
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key="NULL"
                value=""
              >
                Default
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key="Intern"
                value="Intern"
              >
                Intern
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key="Junior"
                value="Junior"
              >
                Junior
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key="MidLevel"
                value="Mid Level"
              >
                Mid Level
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key="Senior"
                value="Senior"
              >
                Senior
              </MenuItem>
            </TextField>
          </Grid>
          <Grid
            item
            className={classes.filterItem}
            xs={6}
            sm={4}
            md={3}
            lg={1.5}
          >
            <TextField
              id="outlined-required"
              select
              label="Project Manager"
              type={"text"}
              onChange={handleChange}
              name="reportingPm"
              defaultValue={searchFilters?.reportingPm}
              // defaultValue={
              //   Object.keys(searchFilters).length === 0
              //     ? ""
              //     : searchFilters?.reportingPm
              // }
              size="small"
              {...register("pm")}
              SelectProps={{
                MenuProps: { className: classes.menuPaper },
              }}
              error={errors.reportingPm ? true : false}
              sx={{ width: "100%" }}
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key=""
                value=""
              >
                Default
              </MenuItem>
              {projectManagers?.map(pm => (
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key={pm.fullname}
                  value={pm._id}
                >
                  {pm.fullName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            className={classes.filterItem}
            xs={6}
            sm={4}
            md={3}
            lg={1.5}
          >
            <TextField
              id="outlined-required"
              select
              label="Group"
              type={"text"}
              onChange={handleChange}
              name="group"
              defaultValue={searchFilters?.group}
              // defaultValue={
              //   Object.keys(searchFilters).length === 0
              //     ? ""
              //     : searchFilters?.group
              // }
              size="small"
              {...register("group")}
              error={errors.group ? true : false}
              SelectProps={{
                MenuProps: { className: classes.menuPaper },
              }}
              sx={{
                width: "100%",
                // "& .MuiPaper-root": { height: "100px !important" },
              }}
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key=""
                value=""
              >
                Default
              </MenuItem>
              {groups?.map(group => (
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key={group.group[0].groupName}
                  value={group._id}
                >
                  {group?.group[0]?.groupName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "-5px",
            marginLeft: "0px",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "0px !important",
            }}
            gap={1}
          >
            <Grid item>
              {/* <TextField
                select
                label="Rows"
                type={"text"}
                defaultValue={`${dataPerPage}`}
                sx={{
                  // backgroundColor: "white",
                  fontSize: "10px",
                  "& .MuiSelect-select": {
                    fontSize: "12px !important",
                    padding: "4px 8px",
                    backgroundColor: "white",
                  },
                }}
                onChange={rowPerPageHandler}
                InputLabelProps={{
                  style: { fontSize: 12, marginTop: 3 },
                }}
                name="rows"
                size="small"
              >
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key="10"
                  value={10}
                >
                  10
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key="25"
                  value={25}
                >
                  25
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key="50"
                  value={50}
                >
                  50
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: "12px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                  }}
                  key="100"
                  value={100}
                >
                  100
                </MenuItem>
              </TextField> */}
              <TextField
                select
                label="Status"
                type={"text"}
                defaultValue={status}
                sx={{
                  // backgroundColor: "white",
                  fontSize: "10px",
                  width: "100px",
                  "& .MuiSelect-select": {
                    fontSize: "12px !important",
                    padding: "4px 8px",
                    backgroundColor: "white",
                  },
                }}
                onChange={event => devStatusHandler(event.target.value)}
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
            </Grid>
            <Grid
              item
              sx={{
                height: "32px",
              }}
            >
              <TextField
                id="outlined-required"
                name="keyword"
                type={"text"}
                sx={{
                  // padding: "0px",
                  height: "100%",
                  "& div": {
                    height: "100%",
                    backgroundColor: "white",
                  },
                }}
                size="small"
                inputProps={{
                  style: { fontSize: 12 },
                }}
                defaultValue={
                  Object.keys(searchFilters).length === 0
                    ? ""
                    : searchFilters?.keyword
                }
                placeholder="Search name or project"
                {...register("keyword")}
                error={errors.keyword ? true : false}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                sx={{
                  background: "rgba(0, 0, 0, 0.1)",
                  padding: "3px 8px !important",
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "0px !important",
            }}
            gap={1}
          >
            <ExportOptions
              exportingData={totalExport}
              fetchExportData={fetchExport}
              config={DeveloperConfig}
              fileName={"Developer_Records"}
            />
            {role !== "PM" && (
              <Button
                onClick={() => {
                  setOpenRegisterModal(true)
                }}
                variant="contained"
                sx={{ background: "black", color: "white" }}
              >
                Add Developer
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DeveloperFilter
