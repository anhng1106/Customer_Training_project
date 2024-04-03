import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { getTrainings } from "../trainingapi";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "date", filter: true },
    { field: "duration", filter: true },
    { field: "activity", filter: true },
  ]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    getTrainings()
      .then((data) => setTrainings(data._embedded.trainings))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="ag-theme-material" style={{ height: 600, width: 1300 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </>
  );
}

export default Traininglist;
