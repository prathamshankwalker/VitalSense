import { Container, Title, Paper, Text, Center } from "@mantine/core";
import Navbar from "../Navbar";
import { IconRun } from "@tabler/icons-react";
import { IconBed } from "@tabler/icons-react";
import { IconWalk } from "@tabler/icons-react";
import { IconArmchair2 } from "@tabler/icons-react";
import styles from './dashboard.module.css'

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

const Dashboard = () => {
  return (
    <>
      <Container size="xl">
        <Title>Hi, John Doe</Title>

        {/* current status */}
        <Paper my="md" shadow="sm" p="md" className={styles.currentCard}>
          <Text>Current Status</Text>
          <Text sx={{textTransform: "uppercase", fontWeight: 800}}>running</Text>
          <Center my="md">
            <IconRun/>
          </Center>
        </Paper>
      </Container>
    </>
  );
};
export default Dashboard;
