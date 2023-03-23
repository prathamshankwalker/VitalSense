import { Container, Title, Paper, Text, Center, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import ValueGenerator from "./ValueGen";
import { IconRun } from "@tabler/icons-react";
import { IconBed } from "@tabler/icons-react";
import { IconWalk } from "@tabler/icons-react";
import { IconArmchair2 } from "@tabler/icons-react";

const Status = () => {
  const [steps, setSteps] = useState(null);
  const [calory, setCalory] = useState(null);
  const [distance, setDistance] = useState(null);

  function getIcon(state) {
    if (state === "running") {
      return <IconRun />;
    } else if (state === "sitting") {
      return <IconArmchair2 />;
    } else if (state === "walk") {
      return <IconWalk />;
    } else if (state === "sleeping") {
      return <IconRun />;
    } else {
      return <IconRun />;
    }
  }

  useEffect(() => {
    console.log(steps);
  }, [steps, calory, distance]);

  return (
    <>
      {/* steps */}
      <Group>
        <Paper my="md" shadow="sm" p="md" className={styles.currentCard}>
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
          />
        </Paper>

        {/* calories */}
        <Paper my="md" shadow="sm" p="md" className={styles.currentCard}>
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
          />
        </Paper>

        {/* distance */}
        <Paper my="md" shadow="sm" p="md" className={styles.currentCard}>
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
          />
        </Paper>

        <Paper
          my="md"
          shadow="sm"
          p="md"
          className={styles.currentCard}
          sx={{ flexGrow: 1 }}
        >
          <Text>Current Status</Text>
          <Text sx={{ textTransform: "uppercase", fontWeight: 800 }}>
            running
          </Text>
          <Center my="md">
            <IconRun />
          </Center>
        </Paper>
      </Group>
    </>
  );
};
export default Status;
