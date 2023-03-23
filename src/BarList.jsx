import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";

const data = [
  {
    name: "Twitter",
    value: 456,
  },
  {
    name: "Google",
    value: 351,
  },
  {
    name: "GitHub",
    value: 271,
  },
  {
    name: "Reddit",
    value: 191,
  },
  {
    name: "Youtube",
    value: 91,
  },
];

export default ({ title }) => (
  <Card>
    <Title>{title}</Title>
    <Flex className="mt-4">
      <Text>
        <Bold>Source</Bold>
      </Text>
      <Text>
        <Bold>Visits</Bold>
      </Text>
    </Flex>
    <BarList data={data} className="mt-2" />
  </Card>
);
