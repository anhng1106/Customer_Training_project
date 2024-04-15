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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

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
        <EditCustomer data={params.data} updatedCustomer={updatedCustomer} />
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <IconButton
          size="small"
          color="error"
          onClick={() => deleteCar(params.data._links.customer.href)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </IconButton>
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

  const updatedCustomer = (url, updatedCustomer) => {
    if (window.confirm("Do you want to update this customer?")) {
      // fetch(url, {
      //   method: "PUT",
      //   headers: { "content-type": "application/json" },
      //   body: JSON.stringify(updatedCustomer),
      // })
      //   .then((response) => {
      //     if (!response.ok) throw new Error("Error when updating customer");
      //     return response.json();
      //   })
      updatedCustomers(url, updatedCustomer)
        .then(() => fetchCustomers())
        .catch((err) => console.log(err));
    }
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      deleteCustomer(url)
        .then(() => fetchCustomers())
        .catch((err) => console.log(err));
    }
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
