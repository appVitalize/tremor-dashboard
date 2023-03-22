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

const KpiCard = ({ dateRange, event, title }) => {
  const [metric, setMetric] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const fromDate = dateRange[0].toISOString().split("T")[0];
      const adjustedToDate = new Date(dateRange[1]);
      adjustedToDate.setDate(adjustedToDate.getDate() - 1);
      const toDate = adjustedToDate.toISOString().split("T")[0];

      try {
        const { data } = await axios.get(`${ROOT_URL}/api/mixpanelProxy`, {
          params: {
            projectId: PROJECT_ID,
            fromDate: fromDate,
            toDate: toDate,
            event: `["${event}"]`,
          },
        });

        setMetric(Object.keys(data).length);
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
