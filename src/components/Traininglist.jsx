import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { getTrainings, deleteTrainings } from "../trainingapi";
import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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
    {
      cellRenderer: (params) => (
        <Tooltip title="Delete training">
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => deleteTraining(params.data.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
      width: 150,
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

  //delete trainings
  const deleteTraining = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteTrainings(id)
        .then(() => fetchTrainings())
        .catch((err) => console.log(err));
    }
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
