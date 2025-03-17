import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-2 border rounded-sm w-full p-2 h-full">
      <h1>Dashboard</h1>
      <BarChart
        xAxis={[
          { scaleType: "band", data: ["Main account", "Sub-accounts", "Safe"] },
        ]}
        series={[{ data: [10, 20, 0] }, { data: [20, 3, 0] }, { data: [6, 5, 0] }]}
        height={250}
        sx={{
          "& .MuiChartsAxis-tickLabel": {
            fill: "white", // X and Y axis label color
          },
          "& .MuiChartsLegend-label": {
            fill: "white", // Legend label color
          },
        }}
      />
      <div className="flex flex-row w-full">
        <PieChart
          className="max-w-100"
          series={[
            {
              data: [
                { id: 0, value: 10, label: "Main account", color: "white" },
                { id: 1, value: 5, label: "Sub-accounts" },
                { id: 2, value: 50, label: "Safe" },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </div>
  );
};

export default Dashboard;
