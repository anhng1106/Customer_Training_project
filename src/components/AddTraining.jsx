import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: dayjs(),
    duration: "",
    activity: "",
    customer: props.customer._links.customer.href,
  });

  console.log(1111111111, training.customer);

  const handleCustomerChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (
      !training.activity ||
      !training.duration ||
      !training.date ||
      !training.customer
    ) {
      alert("Please complete all fields.");
      return; //return to Save button, ends the function
    }
    const newTraining = {
      ...training,
      customer: props.customer._links.customer.href,
    };
    AddTraining(newTraining);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Add training">
        <IconButton aria-label="add" color="info" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          New Training ({props.customer.firstname} {props.customer.lastname})
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={handleCustomerChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            name="duration"
            label="Duration"
            type="number" // Set the type to number
            value={training.duration}
            onChange={handleCustomerChange}
            fullWidth
            variant="standard"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Date and Time"
                value={training.date}
                onChange={(newDate) =>
                  setTraining({ ...training, date: newDate })
                }
                slotProps={{ textField: { variant: "outlined" } }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
