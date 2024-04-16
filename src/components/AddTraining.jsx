import { useState, useEffect } from "react";
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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getCustomers } from "../customerapi";

export default function AddTraining({ addTraining }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: dayjs(),
    duration: "",
    activity: "",
    customer: "",
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers when the component mounts
    getCustomers()
      .then((data) => {
        setCustomers(data._embedded.customers); // Assuming response is the array of customers
      })
      .catch((error) => console.error(error));
  }, []); // Empty dependency array to run only once on mount

  const handleCustomerChange = (event) => {
    const selectedCustomer = event.target.value; // This would be the customer's ID
    setTraining({ ...training, customer: selectedCustomer });
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
      return;
    }
    addTraining();
    handleClose();
  };

  console.log(11111111, customers);
  return (
    <>
      <Button
        variant="contained" // Change from 'outlined' to 'contained' for a filled button
        color="primary" // Adjust the color to match your theme
        startIcon={<AddIcon />} // Add icon for the plus symbol
        onClick={handleClickOpen}
        style={{
          margin: "10px", // Add margin if needed
          borderRadius: "25px", // Adjust as needed for oval shape
          padding: "5px 10px", // Top/bottom padding and left/right padding
          textTransform: "none", // Prevent uppercase transform
        }}
      >
        NEW TRAINING
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Activity"
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Duration"
            type="number" // Set the type to number
            value={training.duration}
            onChange={(e) =>
              setTraining({ ...training, duration: e.target.value })
            }
            fullWidth
            variant="standard"
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="customer-select-label">Customer Name</InputLabel>
              <Select
                labelId="customer-select-label"
                id="customer-select"
                value={training.customer}
                label="Customer Name"
                onClick={handleCustomerChange}
              >
                {customers?.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.firstname} {customer.lastname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

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
