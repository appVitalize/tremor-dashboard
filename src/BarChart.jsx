import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Flex, Text, Title, Bold, BarList } from "@tremor/react";
import { ROOT_URL, PROJECT_ID } from "../config";
import { getDateGranularity } from "../helpers";

const BarChart = ({ dateRange, event, property, userProperty, title }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fromDate = dateRange[0].toISOString().split("T")[0];
      const toDate = dateRange[1].toISOString().split("T")[0];

      try {
        if (userProperty) {
          const { data } = await axios.get(`${ROOT_URL}/api/getProfileData`, {
            params: {
              userProperty,
              from_date: fromDate,
              to_date: toDate,
            },
          });
          setCategories(data);
        } else {
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange, event, property]);

  return (
    <Card>
      <Title>{title}</Title>
      <Flex className="mt-4">
        <Text>
          <Bold>Category</Bold>
        </Text>
        <Text>
          <Bold>Count</Bold>
        </Text>
      </Flex>
      <BarList data={categories} className="mt-2" />
    </Card>
  );
};

export default BarChart;
