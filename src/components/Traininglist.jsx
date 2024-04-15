import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { getTrainings } from "../trainingapi";
import dayjs from "dayjs";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "activity", filter: true, floatingFilter: true },
    {
      field: "date",
      filter: true,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD.MM.YYYY HH:mm"),
    },
    { field: "duration", filter: true },
    {
      field: "customerName",
      headerName: "Customer Name",
      filter: true,
      floatingFilter: true,
    },
  ]);

  useEffect(() => {
    fetchTrainings();
    // fetchCustomerTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const data = await getTrainings();
      const trainingsWithCustomer = await Promise.all(
        data._embedded.trainings.map(async (training) => {
          const customerData = await fetch(training._links.customer.href).then(
            (response) => response.json()
          );
          return {
            ...training,
            customerName: `${customerData.firstname} ${customerData.lastname}`,
          };
        })
      );
      setTrainings(trainingsWithCustomer);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "100px", color: "#034999" }}>
        TRAINING LIST
      </h2>
      <div
        className="ag-theme-material"
        style={{
          height: "calc(100vh - 20px)",
          width: "calc(100vw - 20px)",
          padding: "20px",
        }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={20}
          onFirstDataRendered={(params) => {
            params.api.sizeColumnsToFit();
          }}
        />
      </div>
    </>
  );
}

export default Traininglist;
