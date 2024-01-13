import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
} from "@mui/material";

import React, { useState } from "react";

const DevelopersListing = ({ open, onClose, developersList }) => {
  return (
    <>
      <Box>
        <Dialog
          // className={classes.paper}
          // maxWidth={"md"}
          open={open}
          close={onClose}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "400px", // Set your width here
              },
            },
          }}
        >
          <DialogTitle sx={{ padding: "16px 16px 6px 24px" }}>
            <Grid
              container
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                // color: "#49C5B6",
              }}
            >
              Developers List
              <Button
                sx={{
                  fontSize: "13px",
                  minWidth: "0px",
                  padding: "0px",
                }}
                onClick={onClose}
              >
                X
              </Button>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Box
              // mt={3}
              spacing={1}
            >
              <div
                style={
                  {
                    //    display: 'flex',
                    //    alignItems: 'center',
                    //    marginTop: '1rem',
                    //    flexDirection: 'column',
                  }
                }
              >
                {developersList.length !== 0 ? (
                  developersList?.map((d) => {
                    return (
                      <List>
                        <ListItem key={d._id} sx={{ padding: "0" }}>
                          {d.fullname} {d.lastName}
                        </ListItem>
                      </List>
                    );
                  })
                ) : (
                  <List>
                    <ListItem sx={{ padding: "0" }}>No Data</ListItem>
                  </List>
                )}
              </div>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default DevelopersListing;
