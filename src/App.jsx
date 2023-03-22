import { useState } from "react";
import {
  Card,
  Grid,
  Tab,
  TabList,
  Text,
  Title,
  DateRangePicker,
} from "@tremor/react";
import KpiCardGrid from "./KpiCardGrid";
import TableView from "./TableView";
import ChartView from "./ChartView";
import DonutView from "./DonutView";

const App = () => {
  const [selectedView, setSelectedView] = useState("1");
  const [dateRange, setDateRange] = useState([
    new Date(2023, 2, 5),
    new Date(),
  ]);

  return (
    <main className="bg-slate-50 p-6 sm:p-10">
      <div className="md:flex justify-between">
        <div>
          <Title>Vitalize Admin Dashboard</Title>
          <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
        </div>
        <DateRangePicker
          className="max-w-sm pt-3"
          value={dateRange}
          onValueChange={setDateRange}
        />
      </div>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setSelectedView(value)}
        className="mt-6"
      >
        <Tab value="1" text="Overview" />
        <Tab value="2" text="Detail" />
      </TabList>

      {selectedView === "1" ? (
        <>
          <KpiCardGrid dateRange={dateRange} />
          <Grid numColsMd={2} numColsLg={2} className="mt-6 gap-6">
            <ChartView
              dateRange={dateRange}
              event={"Signed up"}
              title={"# of sign ups"}
            />
            <ChartView
              dateRange={dateRange}
              event={"Coaching session subscribed"}
              title={"# of sessions subscribed"}
            />
          </Grid>
          <DonutView />
        </>
      ) : (
        <Card className="mt-6">
          <TableView dateRange={dateRange} />
        </Card>
      )}
    </main>
  );
};

export default App;
