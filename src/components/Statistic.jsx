import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { getTrainings } from "../trainingapi";
import _ from "lodash";

function Statistic() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchTrainingData();
  }, []);

  const fetchTrainingData = () => {
    getTrainings()
      .then((data) => {
        const groupedData = _.groupBy(data, "activity");
        const aggregatedData = _.map(groupedData, (value, key) => ({
          activity: key,
          totalMinutes: _.sumBy(value, "duration"),
        }));
        setChartData(aggregatedData);
      })
      .catch((error) => console.error("Failed to fetch training data:", error));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Training Minutes by Activity</h2>
      <BarChart
        width={1200}
        height={600}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="activity" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalMinutes" fill="#F8C471" />
      </BarChart>
    </div>
  );
}

export default Statistic;
