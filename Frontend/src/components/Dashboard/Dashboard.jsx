import {
  Container,
  Title,
  Paper,
  Text,
  Center,
  Group,
  ColorSwatch,
} from "@mantine/core";
import Navbar from "../Navbar";
import styles from "./dashboard.module.css";
import ValueGenerator from "./ValueGen";
import { useEffect, useState } from "react";
import Status from "./Status";
import { IconActivityHeartbeat } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { getHypertensionData } from "../../state/actions/hypertension";
import EcgStepper from "./EchStepper";

const Dashboard = () => {
  const [heartRate, setHeartRate] = useState(70);
  const [glucose, setGlucose] = useState(0);
  const dispatch = useDispatch();

  const { loading, isHypertension } = useSelector(
    (state) => state.hypertension
  );

  useEffect(() => {
    dispatch(getHypertensionData(glucose, heartRate));
  }, [heartRate, glucose]);

  return (
    <>
      <Container size="xl">
        <Title color="#fff">Hi, John Doe</Title>

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
            radius="lg"
            my="md"
            shadow="sm"
            p="md"
            className={styles.currentCard}
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
              interval={20000}
            />
            <ColorSwatch
              color={glucose > 140 || glucose < 70 ? "red" : "green"}
            />
          </Paper>

          {/* heartrate */}
          <Paper
            radius="lg"
            my="md"
            shadow="sm"
            p="md"
            className={styles.currentCard}
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
              interval={4000}
            />
            <ColorSwatch
              color={heartRate > 140 || heartRate < 70 ? "red" : "green"}
            />
          </Paper>

          {/* hypertension */}
          <Paper
            radius="lg"
            my="md"
            shadow="sm"
            p="md"
            className={styles.currentCard}
          >
            <Text>Current Hypertension State</Text>
            <Text sx={{ textTransform: "uppercase", fontWeight: 800 }}>
              {isHypertension ? "danger" : "safe"}
            </Text>
            <Center my="md">
              <IconActivityHeartbeat size={40} />
            </Center>
            <ColorSwatch
              color={isHypertension > 140 || isHypertension < 70 ? "red" : "green"}
            />
          </Paper>
        </Group>
        <Paper sx={{ width: "250px" }}>
          <Title order={3} my="md">
            ECG Data
          </Title>
          <EcgStepper />
        </Paper>
      </Container>
    </>
  );
};
export default Dashboard;
