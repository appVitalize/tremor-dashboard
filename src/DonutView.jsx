import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Title, DonutChart } from "@tremor/react";
import { ROOT_URL, PROJECT_ID } from "../config";
import { getDateGranularity } from "../helpers";

const DonutView = ({
  dateRange,
  event,
  property,
  profileProperty,
  title,
  maxCategories = 8,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fromDate = dateRange[0].toISOString().split("T")[0];
      const toDate = dateRange[1].toISOString().split("T")[0];

      try {
        if (profileProperty) {
          const { data } = await axios.post(
            `${ROOT_URL}/mixpanel-profile-property-data`,
            {
                profileProperty,
                from_date: fromDate,
                to_date: toDate,
            }, {
              headers: {
                'content-type': 'application/json',
              }
            }
          );
          setCategories(data.slice(0, maxCategories));
        } else {
          const { data } = await axios.post(
            `${ROOT_URL}/mixpanel-event-property-data`,
            {
                event,
                property,
                from_date: fromDate,
                to_date: toDate,
                granularity: getDateGranularity(fromDate, toDate),
            }
          );
          setCategories(data.slice(0, maxCategories));
        }
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
        className="h-96 p-5 m-auto text-5xl"
        data={categories}
        category="value"
        index="name"
        colors={[
          "cyan",
          "sky",
          "blue",
          "indigo",
          "violet",
          "purple",
          "fuchsia",
          "pink",
          "rose",
          "red",
          "orange",
          "amber",
          "yellow",
          "lime",
          "green",
          "emerald",
          "teal",
        ]}
      />
    </Card>
  );
};

export default DonutView;
