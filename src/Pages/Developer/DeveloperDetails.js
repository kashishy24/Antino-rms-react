import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useRef } from "react";
import '../../Assets/CSS/Developer/Developer.css'
const DeveloperDetails = ({ open, onClose, data }) => {
  //*******outside click event  features ready u want to enable just uncommit the code *******//
  // const modalRef = useRef(null);
  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (!modalRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   };
  //   if (open) {
  //     document.addEventListener("mousedown", handleOutsideClick);
  //   } else {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [open, onClose]);
  return (
    <> 
      <Box >
        <form>
          <Dialog open={open} close={onClose} style={{paddingBottom:"7rem"}} >
          <DialogTitle style={{padding:"1.5rem"}}>
              <Grid container sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#000000",
                }}>
                <Button id="btn-close" sx={{
                    fontSize: "13px",
                    minWidth: "0px",
                  }}
                  onClick={onClose} >
                <CloseIcon />
                </Button>
              </Grid>
            </DialogTitle>
            <DialogContent id="modalContaner">
              <Box spacing={1} >
                <Typography mt={1}></Typography>
                <table >
                <tr>
                  <th >Project Name <spain>|</spain></th>
                  <th >Bilable</th>
                </tr>
                {data.length === 0?<p id="emptydata">Data is empty</p>:
                  data.map((data) => {
                    return (
                      <>
                        <tr >
                          <td >{data?.projectName}</td>
                          <td >{data?.Bilable}</td>
                        </tr>
                      </>
                    );
                  })}
                </table>
              </Box>
            </DialogContent>
          </Dialog>
        </form>
      </Box>
    </>
  );
  // }
};

export default DeveloperDetails;
