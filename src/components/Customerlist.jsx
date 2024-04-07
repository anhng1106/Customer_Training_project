import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { getCustomers } from "../customerapi";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "firstname", filter: true, floatingFilter: true },
    { field: "lastname", filter: true, floatingFilter: true },
    { field: "email", filter: true, width: 250 },
    { field: "phone", filter: true },
    { field: "streetaddress", filter: true, width: 250 },
    { field: "postcode", filter: true, width: 200 },
    { field: "city", filter: true, width: 200 },
  ]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    getCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "100px", color: "#034999" }}>
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
        <AgGridReact
          rowData={customers}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </>
  );
}

export default Customerlist;
