"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const data = [
    {
      name: "Jan",
      pv: 2400,
    },
    {
      name: "Feb",
      pv: 1398,
    },
    {
      name: "Mar",
      pv: 9800,
    },
    {
      name: "Apr",
      pv: 3908,
    },
    {
      name: "May",
      pv: 4800,
    },
    {
      name: "Jun",
      pv: 3800,
    },
    {
      name: "Jul",
      pv: 4300,
    },
    {
      name: "Aug",
      pv: 9800,
    },
    {
      name: "Sep",
      pv: 3908,
    },
    {
      name: "Oct",
      pv: 4800,
    },
    {
      name: "Nov",
      pv: 3800,
    },
    {
      name: "Dec",
      pv: 4300,
    },
  ];
  return (
    <ResponsiveContainer
      // width="100%"
      // height="100%"
      className={"!max-w-[806px] !max-h-[431px]"}
    >
      <LineChart
        data={data}
        margin={{
          top: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, 10000]} allowDataOverflow />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
