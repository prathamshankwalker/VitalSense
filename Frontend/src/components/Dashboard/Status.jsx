import {
  Container,
  Title,
  Paper,
  Text,
  Center,
  Group,
  Box,
} from "@mantine/core";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import ValueGenerator from "./ValueGen";
import { IconRun } from "@tabler/icons-react";
import { IconBed } from "@tabler/icons-react";
import { IconWalk } from "@tabler/icons-react";
import { IconArmchair2 } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { getActivity } from "../../state/actions/activitiy";

const Status = () => {
  const [steps, setSteps] = useState(null);
  const [calory, setCalory] = useState(null);
  const [distance, setDistance] = useState(null);
  const dispatch = useDispatch();

  function getIcon(state) {
    if (state === "Running") {
      return <IconRun size={50} />;
    } else if (state === "Sitting") {
      return <IconArmchair2 />;
    } else if (state === "Walking") {
      return <IconWalk size={50} />;
    } else if (state === "Lying") {
      return <IconRun />;
    } else {
      return <IconRun size={50} />;
    }
  }
  const { activity } = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(getActivity(steps, calory, distance));
  }, [steps, calory, distance]);

  useEffect(() => {
    console.log(activity);
  }, [activity]);

  return (
    <>
      {/* steps */}
      <Group>
        <Paper
          radius="lg"
          my="md"
          shadow="sm"
          p="md"
          className={styles.statCard}
        >
          <Text sx={{ textTransform: "uppercase", fontWeight: 800 }}>
            steps
          </Text>
          <ValueGenerator
            value={steps}
            updateFunction={(val) => {
              setSteps((prev) => val);
            }}
            min={10}
            max={1700}
            interval={4000}
          />
        </Paper>

        {/* calories */}
        <Paper
          radius="lg"
          my="md"
          shadow="sm"
          p="md"
          className={styles.statCard}
        >
          <Text sx={{ textTransform: "uppercase", fontWeight: 800 }}>
            calories
          </Text>
          <ValueGenerator
            value={calory}
            updateFunction={(val) => {
              setCalory((prev) => val);
            }}
            min={0.05}
            max={95}
            interval={100000}
          />
        </Paper>

        {/* distance */}
        <Paper
          radius="lg"
          my="md"
          shadow="sm"
          p="md"
          className={styles.statCard}
        >
          <Text sx={{ textTransform: "uppercase", fontWeight: 800 }}>
            distance
          </Text>
          <ValueGenerator
            value={distance}
            updateFunction={(val) => {
              setDistance((prev) => val);
            }}
            min={0.01}
            max={335}
            interval={10000}
          />
        </Paper>

        <Paper
          radius="lg"
          my="md"
          shadow="sm"
          p="md"
          // className={styles.statCard}
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            background:
              " linear-gradient(45deg, var(--mantine-color-teal-3), var(--mantine-color-green-4))",
            height: "130px",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box>
            <Text fw={500}>Current Status</Text>
            <Text sx={{ textTransform: "uppercase", fontWeight: 800, fontSize: 30 }}>
              {activity}
            </Text>
          </Box>
          <Center my="md">{getIcon(activity)}</Center>
        </Paper>
      </Group>
    </>
  );
};
export default Status;
