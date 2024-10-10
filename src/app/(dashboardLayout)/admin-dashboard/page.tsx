"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Data types
interface DataPoint {
  month: string;
  payments?: number;
  users?: number;
  posts?: number;
}

interface ActivityData {
  name: string;
  value: number;
}

// Sample Data for charts
const paymentsData: DataPoint[] = [
  { month: "Jan", payments: 4000 },
  { month: "Feb", payments: 3000 },
  { month: "Mar", payments: 5000 },
  { month: "Apr", payments: 4780 },
  { month: "May", payments: 5890 },
  { month: "Jun", payments: 4390 },
  { month: "Jul", payments: 4490 },
  { month: "Aug", payments: 4690 },
  { month: "Sep", payments: 5990 },
  { month: "Oct", payments: 6490 },
  { month: "Nov", payments: 7990 },
  { month: "Dec", payments: 8990 },
];

const usersData: DataPoint[] = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1500 },
  { month: "Mar", users: 2000 },
  { month: "Apr", users: 1700 },
  { month: "May", users: 2300 },
  { month: "Jun", users: 1900 },
  { month: "Jul", users: 2100 },
  { month: "Aug", users: 2500 },
  { month: "Sep", users: 2700 },
  { month: "Oct", users: 2900 },
  { month: "Nov", users: 3100 },
  { month: "Dec", users: 3500 },
];

const postsData: DataPoint[] = [
  { month: "Jan", posts: 500 },
  { month: "Feb", posts: 450 },
  { month: "Mar", posts: 700 },
  { month: "Apr", posts: 600 },
  { month: "May", posts: 750 },
  { month: "Jun", posts: 680 },
  { month: "Jul", posts: 720 },
  { month: "Aug", posts: 800 },
  { month: "Sep", posts: 850 },
  { month: "Oct", posts: 900 },
  { month: "Nov", posts: 920 },
  { month: "Dec", posts: 1000 },
];

const activityData: ActivityData[] = [
  { name: "Payments", value: 40 },
  { name: "Active Users", value: 30 },
  { name: "Posts", value: 20 },
  { name: "Other", value: 10 },
];

// Colors for PieChart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 p-4">
      {/* Monthly Payments Line Chart */}
      <div className="shadow-md p-4 bg-white rounded-lg">
        <h3 className="text-lg font-bold text-center mb-4">Monthly Payments</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={paymentsData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="payments" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Active Users Bar Chart */}
      <div className="shadow-md p-4 bg-white rounded-lg">
        <h3 className="text-lg font-bold text-center mb-4">Active Users</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={usersData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Posts Bar Chart */}
      <div className="shadow-md p-4 bg-white rounded-lg">
        <h3 className="text-lg font-bold text-center mb-4">Monthly Posts</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={postsData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="posts" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Overall Platform Activity Pie Chart */}
      <div className="shadow-md p-4 bg-white rounded-lg">
        <h3 className="text-lg font-bold text-center mb-4">
          Platform Activity
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={activityData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {activityData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
