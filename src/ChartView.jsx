import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Title, AreaChart } from "@tremor/react";
import { getDateGranularity } from "../helpers";
import { ROOT_URL, PROJECT_ID } from "../config";

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

const ChartView = ({ dateRange, events, title, cumulative = false }) => {
  const [chartData, setChartData] = useState([]);

  const getCumulativeData = (data) => {
    const result = [];
    data.forEach((item, index) => {
      if (index === 0) {
        result.push(item);
      } else {
        const prevItem = result[index - 1];
        const cumulatedItem = { date: item.date };
        for (const key in item) {
          if (key !== "date") {
            cumulatedItem[key] = (prevItem[key] || 0) + item[key];
          }
        }
        result.push(cumulatedItem);
      }
    });
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fromDate = dateRange[0].toISOString().split("T")[0];
      const toDate = dateRange[1].toISOString().split("T")[0];

      try {
        const { data } = await axios.get(`${ROOT_URL}/api/get_graph_data`, {
          params: {
            events: JSON.stringify(events),
            from_date: fromDate,
            to_date: toDate,
            granularity: getDateGranularity(fromDate, toDate),
          },
        });
        setChartData(cumulative ? getCumulativeData(data) : data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange, events]);

  return (
    <Card>
      <Title>{title}</Title>
      <AreaChart
        data={chartData}
        index="date"
        categories={events}
        colors={["blue", "red", "green"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default ChartView;
