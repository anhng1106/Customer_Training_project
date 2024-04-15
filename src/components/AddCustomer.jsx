import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";

export default function AddCustomer({ addCustomer }) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addCustomer(customer);
    handleClose();
  };

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
        NEW CUSTOMER
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            value={customer.firstname}
            onChange={(e) =>
              setCustomer({ ...customer, firstname: e.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Last Name"
            value={customer.lastname}
            onChange={(e) =>
              setCustomer({ ...customer, lastname: e.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Street Address"
            value={customer.streetaddress}
            onChange={(e) =>
              setCustomer({ ...customer, streetaddress: e.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Postcode"
            value={customer.postcode}
            onChange={(e) =>
              setCustomer({ ...customer, postcode: e.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="City"
            value={customer.city}
            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Email"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Phone number"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
