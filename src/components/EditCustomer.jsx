import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

export default function EditCustomer({ data, updatedCustomer }) {
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
    setCustomer({
      firstname: data.firstname,
      lastname: data.lastname,
      streetaddress: data.streetaddress,
      postcode: data.postcode,
      city: data.city,
      email: data.email,
      phone: data.phone,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updatedCustomer(data._links.customer.href, customer);
    handleClose();
  };

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Tooltip title="Edit customer">
        <IconButton aria-label="edit" color="info" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            name="firstname"
            value={customer.firstname}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Last Name"
            name="lastname"
            value={customer.lastname}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Street Address"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Postcode"
            name="postcode"
            value={customer.postcode}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="City"
            name="city"
            value={customer.city}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Phone number"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
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
