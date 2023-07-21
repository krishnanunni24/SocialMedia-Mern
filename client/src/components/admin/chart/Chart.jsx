import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FetchNewPostsWeekly, FetchNewUsersWeekly } from "../../../api/UserListRequest";
import LoadingSpinner from "../../loading/LoadingSpinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Weekly Users & Posts",
    },
  },
};

const currentDate = new Date();

// Generate labels for the previous week
const labels = [];
for (let i = 6; i >= 0; i--) {
  const date = new Date(currentDate);
  date.setDate(date.getDate() - i);
  labels.push(
    date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
  );
}





export const Chart = () => {
  const [loading, setLoading] = useState(false);
  const [newUsersData, setNewUsersData] = useState([]);
  const [newPostsData, setNewPostsData] = useState([]);
  
  const data = {
    labels,
    datasets: [
      {
        label: "New Users",
        data: newUsersData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "New Posts",
        data: newPostsData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  
  const fetchNewUsersWeekly = async () => {
    {console.log("dataaaa", data)}
    try {
      console.log("fetchNewUsersWeekly");
      const { data } = await FetchNewUsersWeekly();
      console.log("fetchNewUsersWeekly:", data);
      setNewUsersData(data);
    } catch (error) {
      console.error("Error fetching new users weekly:", error);
    }
  };
  const fetchNewPostsWeekly = async () => {
    try {
      console.log("FetchNewPostsWeekly");
      const { data } = await FetchNewPostsWeekly();
      console.log("FetchNewPostsWeekly:", data);
      setNewPostsData(data);
    } catch (error) {
      console.error("Error fetching new users weekly:", error);
    }
  };

  useEffect(() => {
    fetchNewUsersWeekly();
    fetchNewPostsWeekly();
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return <Line options={options} data={data} />;
};
