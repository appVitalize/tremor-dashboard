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
import KpiCard from "./KpiCard";
import TableView from "./TableView";
import ChartView from "./ChartView";
import DonutView from "./DonutView";
import BarList from "./BarList";

const App = () => {
  const [selectedView, setSelectedView] = useState("1");
  const [dateRange, setDateRange] = useState([
    new Date(2023, 2, 5), // Our launch date was March 5th, 2023
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
          <Grid numColsMd={3} numColsLg={5} className="mt-6 gap-6">
            <KpiCard
              dateRange={dateRange}
              event={"Signed up"}
              title={"# of signups"}
            />
            <KpiCard
              dateRange={dateRange}
              event={"One-on-One request submitted"}
              title={"# of 1:1 requests"}
            />
            <KpiCard
              dateRange={dateRange}
              event={"Coaching session subscribed"}
              title={"# of sessions signups"}
            />
            <KpiCard
              dateRange={dateRange}
              event={"Coaching session"}
              title={"# of sessions joined"}
            />
            <KpiCard
              dateRange={dateRange}
              event={"Meditation track started"}
              title={"# of meditation tracks listened to"}
            />
            <KpiCard
              dateRange={dateRange}
              event={"Daily check-in completed"}
              title={"# of daily check-ins"}
            />
            <KpiCard
              dateRange={dateRange}
              event={"Peer support message sent"}
              title={"# of peer messages sent"}
            />
            <KpiCard
              dateRange={dateRange}
              event={"Additional resources tapped"}
              title={"# of times additional resources tapped"}
            />
          </Grid>
          <Grid numColsMd={2} numColsLg={2} className="mt-6 gap-6">
            <ChartView
              dateRange={dateRange}
              events={["Signed up"]}
              title={"# of sign ups"}
              cumulative={true}
            />
            <ChartView
              dateRange={dateRange}
              events={[
                "Coaching session subscribed",
                "One-on-One request submitted",
              ]}
              title={"Coaching signups"}
              cumulative={true}
            />
            <ChartView
              dateRange={dateRange}
              events={["Meditation track started"]}
              title={"# of meditation tracks listened to"}
              cumulative={false}
            />
            <ChartView
              dateRange={dateRange}
              events={["Daily check-in completed"]}
              title={"# of daily check-ins"}
            />
          </Grid>
          <Grid numColsMd={2} numColsLg={3} className="mt-6 gap-6">
            <DonutView title={"Breakdowns are currently not functional"} />
            <DonutView title={"Breakdowns are currently not functional"} />
            <BarList title={"Breakdowns are currently not functional"} />
          </Grid>
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
