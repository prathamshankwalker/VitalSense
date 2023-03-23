import { Container, Title, Paper, Text, Center, Group } from "@mantine/core";
import Navbar from "../Navbar";
import styles from "./dashboard.module.css";
import ValueGenerator from "./ValueGen";
import { useEffect, useState } from "react";
import Status from "./Status";
import { IconActivityHeartbeat } from "@tabler/icons-react";

const Dashboard = () => {
  const [heartRate, setHeartRate] = useState(null);
  const [glucose, setGlucose] = useState(null);

  useEffect(() => {
    console.log("hypertension");
  }, [heartRate, glucose]);

  return (
    <>
      <Container size="xl">
        <Title>Hi, John Doe</Title>

        {/* current status */}
        <Title order={3} mt="xl">
          Monitor Activity
        </Title>
        <Status />

        <Title order={3} mt="xl">
          Monitor Vitals
        </Title>
        <Group>
          {/* glucose */}
          <Paper
            my="md"
            shadow="sm"
            p="md"
            className={styles.currentVitals}
            sx={(theme) => ({
              background: `${
                glucose > 140 ? theme.colors.red[3] : theme.colors.green[3]
              }`,
            })}
          >
            <Text sx={{ textTransform: "uppercase", fontWeight: 800 }}>
              blood glucose
            </Text>
            <ValueGenerator
              value={glucose}
              updateFunction={(val) => {
                setGlucose((prev) => val);
              }}
              min={70}
              max={200}
            />
          </Paper>
          
          {/* heartrate */}
          <Paper
            my="md"
            shadow="sm"
            p="md"
            className={styles.currentVitals}
            sx={(theme) => ({
              background: `${
                heartRate > 140 ? theme.colors.red[3] : theme.colors.green[3]
              }`,
            })}
          >
            <Text sx={{ textTransform: "uppercase", fontWeight: 800 }}>
              heart rate
            </Text>
            <ValueGenerator
              value={heartRate}
              updateFunction={(val) => {
                setHeartRate((prev) => val);
              }}
              min={50}
              max={100}
            />
          </Paper>

              {/* hypertension */}
          <Paper my="md" shadow="sm" p="md" className={styles.currentVitals}>
            <Text>Current Hypertension State</Text>
            <Text sx={{ textTransform: "uppercase", fontWeight: 800 }}>
              danger
            </Text>
            <Center my="md">
              <IconActivityHeartbeat />
            </Center>
          </Paper>
        </Group>
      </Container>
    </>
  );
};
export default Dashboard;
