import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/context/userContext";

const CoachSalesChart = () => {
  const userContext = useContext(UserContext);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      // Assuming there's an API to fetch sales data for the coach
      const response = await fetch("/api/coach-sales");
      const data = await response.json();
      setSalesData(data);
    };

    fetchSalesData();
  }, []);

  return (
    <div>
      <LineChart
        width={300}
        height={200}
        data={salesData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default CoachSalesChart;
