import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { getTrainings, addTrainings } from "../trainingapi";
import dayjs from "dayjs";

import AddTraining from "./AddTraining";

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
  }, []);

  //list all trainings
  const fetchTrainings = () => {
    getTrainings()
      .then((data) => {
        // Map over the data to include customerName
        const newData = data.map((training) => {
          return {
            ...training,
            customerName: `${training.customer.firstname} ${training.customer.lastname}`,
          };
        });
        setTrainings(newData);
      })
      .catch((err) => console.log(err));
  };

  //add new trainings
  const addTraining = (newTraining) => {
    addTrainings(newTraining)
      .then(() => fetchTrainings())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "70px", color: "#034999" }}>
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
