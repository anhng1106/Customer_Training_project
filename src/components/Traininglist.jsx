import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { getTrainings, getCustomerTraining } from "../trainingapi";
import dayjs from "dayjs";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "activity", filter: true },
    {
      field: "date",
      filter: true,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD.MM.YYYY HH:mm"),
    },
    { field: "duration", filter: true },
    { field: "customerName", headerName: "Customer Name", filter: true },
  ]);

  useEffect(() => {
    fetchTrainings();
    // fetchCustomerTrainings();
  }, []);

  const fetchTrainings = async () => {
    // getTrainings()
    //   .then((data) =>
    //     setTrainings(
    //       data._embedded.trainings.map((training) => ({
    //         ...training,
    //         customerName: training._links.customer.lastname,
    //       }))
    //     )
    //   )
    //   .catch((err) => console.log(err));

    try {
      const data = await getTrainings();
      const trainingsWithCustomer = await Promise.all(
        data._embedded.trainings.map(async (training) => {
          // Assume getCustomerTraining fetches customer data from URL
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

  // const fetchCustomerTrainings = () => {
  //   getCustomerTraining()
  //     .then((data) =>
  //       setCustomerTraining(data._embedded.trainings._links.customer.lastname)
  //     )
  //     .catch((err) => console.log(err));
  // };

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
          padding: "10px",
        }}
      >
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
