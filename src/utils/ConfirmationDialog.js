import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";

const ConfirmationDialog = ({
  open,
  onClose,
  message,
  onConfirm,
  isSuccess,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess === true) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <Box>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle display={"flex"} justifyContent={"end"}>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontSize: "1.15rem",
              margin: "0rem 0.5rem",
            }}
          >
            {message}
          </Typography>
          <Box mt={4} sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              variant="contained"
              sx={{ color: "white" }}
              onClick={onConfirm}
            >
              Yes
            </Button>
            <Button
              sx={{
                background: "#bebdb8",
                "&:hover": {
                  background: "#bebdb8",
                },
              }}
              onClick={onClose}
            >
              No
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ConfirmationDialog;
