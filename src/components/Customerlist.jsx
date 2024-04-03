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
    { field: "streetaddress", filter: true },
    { field: "postcode", filter: true, width: 100 },
    { field: "city", filter: true, width: 100 },
    { field: "email", filter: true },
    { field: "phone", filter: true },
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
      <div className="ag-theme-material" style={{ height: 600, width: 1300 }}>
        <AgGridReact
          rowData={customers}
          floatingFilter={true} // Enable floating filters
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </>
  );
}

export default Customerlist;
