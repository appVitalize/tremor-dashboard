import { useState, useEffect } from "react";
import axios from "axios";
import {
  BadgeDelta,
  Card,
  Grid,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";
import { ROOT_URL, PROJECT_ID } from "../config";
import { getDateGranularity } from "../helpers";

const KpiCard = ({ dateRange, event, title }) => {
  const [metric, setMetric] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const fromDate = dateRange[0].toISOString().split("T")[0];
      const toDate = dateRange[1].toISOString().split("T")[0];

      try {
        const { data } = await axios.get(`${ROOT_URL}/api/get_kpi_data`, {
          params: {
            event,
            from_date: fromDate,
            to_date: toDate,
            granularity: getDateGranularity(fromDate, toDate),
          },
        });
        setMetric(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange, event]);

  return (
    <Card>
      <div className="truncate">
        <Text>{title}</Text>
        <Metric className="truncate">{metric}</Metric>
      </div>
    </Card>
  );
};

export default KpiCard;
