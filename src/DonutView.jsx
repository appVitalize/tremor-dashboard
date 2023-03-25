import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Title, DonutChart } from "@tremor/react";
import { ROOT_URL, PROJECT_ID } from "../config";
import { getDateGranularity, shuffle } from "../helpers";

const DonutView = ({ dateRange, event, property, title }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fromDate = dateRange[0].toISOString().split("T")[0];
      const toDate = dateRange[1].toISOString().split("T")[0];

      try {
        const { data } = await axios.get(`${ROOT_URL}/api/getBreakdownData`, {
          params: {
            event,
            property,
            from_date: fromDate,
            to_date: toDate,
            granularity: getDateGranularity(fromDate, toDate),
          },
        });
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange, event, property]);

  return (
    <Card className="flex flex-col">
      <Title>{title}</Title>
      <DonutChart
        className="h-80 m-auto text-5xl"
        data={categories}
        category="value"
        index="name"
        colors={shuffle([
          "violet",
          "red",
          "teal",
          "yellow",
          "rose",
          "cyan",
          "amber",
          "lime",
        ])}
      />
    </Card>
  );
};

export default DonutView;
