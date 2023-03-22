import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Title, AreaChart } from "@tremor/react";
import { ROOT_URL, PROJECT_ID } from "../config";

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

const ChartView = ({ dateRange, event, title }) => {
  const [chartData, setChartData] = useState([]);

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

        const eventsCount = data.reduce((acc, curr) => {
          const date = new Date(curr.properties.time * 1000)
            .toISOString()
            .split("T")[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const sortedData = Object.entries(eventsCount).sort((a, b) => {
          return new Date(a[0]) - new Date(b[0]);
        });

        let cumulativeCount = 0;
        const processedData = sortedData.map(([date, count]) => {
          cumulativeCount += count;
          return {
            date,
            [event]: cumulativeCount,
          };
        });

        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange, event]);

  return (
    <Card>
      <Title>{title}</Title>
      <AreaChart
        data={chartData}
        index="date"
        categories={[event]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
        showLegend={false}
        className="mt-6"
      />
    </Card>
  );
};

export default ChartView;
