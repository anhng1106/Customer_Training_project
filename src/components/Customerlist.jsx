import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import {
  getCustomers,
  addCustomers,
  updatedCustomers,
  deleteCustomer,
} from "../customerapi";
import { addTrainings } from "../trainingapi";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "firstname", filter: true, floatingFilter: true },
    { field: "lastname", filter: true, floatingFilter: true },
    { field: "email", filter: true, width: 200 },
    { field: "phone", filter: true },
    { field: "streetaddress", filter: true, width: 200 },
    { field: "postcode", filter: true, width: 200 },
    { field: "city", filter: true, width: 200 },
    {
      cellRenderer: (params) => (
        <AddTraining addNewTraining={addTraining} customer={params.data} />
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <EditCustomer data={params.data} updatedCustomer={updatedCustomer} />
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <Tooltip title="Delete customer">
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => deleteCustomers(params.data._links.customer.href)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
      width: 150,
    },
  ]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  //list all customers
  const fetchCustomers = () => {
    getCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.log(err));
  };

  //add new customers
  const addCustomer = (newCustomer) => {
    addCustomers(newCustomer)
      .then(() => fetchCustomers())
      .catch((err) => console.log(err));
  };

  //edit customer
  const updatedCustomer = (url, updatedCustomer) => {
    if (window.confirm("Do you want to update this customer?")) {
      updatedCustomers(url, updatedCustomer)
        .then(() => fetchCustomers())
        .catch((err) => console.log(err));
    }
  };

  //delete customer
  const deleteCustomers = (url) => {
    if (window.confirm("Are you sure?")) {
      deleteCustomer(url)
        .then(() => fetchCustomers())
        .catch((err) => console.log(err));
    }
  };

  //add training to customer
  const addTraining = (trainingData) => {
    addTrainings(trainingData)
      .then(() => fetchCustomers())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "70px", color: "#034999" }}>
        CUSTOMER LIST
      </h2>
      <div
        className="ag-theme-material"
        style={{
          height: "calc(100vh - 20px)",
          width: "calc(100vw - 20px)",
          padding: "10px",
        }}
      >
        <AddCustomer addCustomer={addCustomer} />
        <AgGridReact
          rowData={customers}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          onFirstDataRendered={(params) => {
            params.api.sizeColumnsToFit();
          }}
        />
      </div>
    </>
  );
}

export default Customerlist;
